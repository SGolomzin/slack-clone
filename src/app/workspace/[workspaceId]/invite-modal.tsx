import { CopyIcon } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogClose,
	DialogFooter
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

import { useWorkspaceId } from "~/hooks/use-workspace-id";

interface InviteModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	name: string;
	joinCode: string;
}

export const InviteModal = ({ open, setOpen, name, joinCode }: InviteModalProps) => {
	const workspaceId = useWorkspaceId();
	const handleCopy = () => {
		const inviteLink = `${window.location.origin}/join/${workspaceId}`;

		navigator.clipboard
			.writeText(inviteLink)
			.then(() => toast.success("Invite link copied to clipboard"));
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite people to your workspace</DialogTitle>
					<DialogDescription>
						Use the code below to invite people to your workspace
					</DialogDescription>
					<div className="flex flex-col gap-y-4 items-center justify-center py-10">
						<p
							className="text-4xl font-bold tracking-widest uppercase"
						>{joinCode}</p>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleCopy}
						>
							Copy link
							<CopyIcon className="size-4 ml-2" />
						</Button>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};