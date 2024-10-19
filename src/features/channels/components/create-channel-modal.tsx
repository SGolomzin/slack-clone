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


export const CreateChannelModal = () => {
	const [open, setOpen] = useCreateChannelModal();

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

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a channel </DialogTitle>
				</DialogHeader>
				<form className="space-y-4">
					<Input
						value={name}
						disabled={false}
						onChange={handleChange}
						required
						autoFocus
						minLength={3}
						maxLength={80}
						placeholder="e.g. plan-budget"
					/>
					<div className="flex justify-end">
						<Button
							disabled={false}

						>
							Create
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}