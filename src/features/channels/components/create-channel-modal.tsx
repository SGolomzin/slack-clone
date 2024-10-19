import { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { useCreateChannelModal } from "~/features/channels/store/use-create-channel-modal";
import { useCreateChannel } from "~/features/channels/api/use-create-channel";
import { useGetWorkspace } from "~/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "~/hooks/use-workspace-id";


export const CreateChannelModal = () => {
	const workspaceId = useWorkspaceId();
	const [open, setOpen] = useCreateChannelModal();
	const { mutate, isPending } = useCreateChannel();

	const [name, setName] = useState("");

	const handleClose = () => {
		setName("");
		setOpen(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// replace all spaces with dashes
		const value = e.target.value
			.replace(/\s+/g, "-")
			.toLowerCase();
		setName(value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate(
			{ name, workspaceId },
			{
				onSuccess: (id) => {
				// 	TODO: Redirect to new channel
					handleClose();
				},
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a channel </DialogTitle>
				</DialogHeader>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<Input
						value={name}
						disabled={isPending}
						onChange={handleChange}
						required
						autoFocus
						minLength={3}
						maxLength={80}
						placeholder="e.g. plan-budget"
					/>
					<div className="flex justify-end">
						<Button disabled={isPending}>
							Create
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}