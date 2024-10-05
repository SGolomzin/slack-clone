import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogHeader,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

import { useCreateWorkspaceModal } from "~/features/workspaces/store/use-create-workspace-modal";
import { useCreateWorkspace } from "~/features/workspaces/api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const CreateWorkspaceModal = () => {
	const router = useRouter();
	const [open, setOpen] = useCreateWorkspaceModal();
	const [name, setName] = useState("");

	const { mutate, isPending } = useCreateWorkspace()

	const handleClose = () => {
		setOpen(false);
		setName("");
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate({ name }, {
			onSuccess(id) {
				toast.success("Workspace created successfully.");
				router.push(`/workspace/${id}`);
				handleClose();
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a workspace</DialogTitle>
				</DialogHeader>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						disabled={isPending}
						required
						autoFocus
						minLength={3}
						placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
					/>
					<div className="flex justify-end">
						<Button disabled={isPending}>
							Create
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}