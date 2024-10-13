import { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogClose,
	DialogFooter
} from "~/components/ui/dialog";
import { TrashIcon } from "lucide-react";


interface PreferencesModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	initialValue: string;
};

export const PreferencesModal = ({ open, setOpen, initialValue }: PreferencesModalProps) => {
	const [value, setValue] = useState(initialValue);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0 overflow-hidden">
				<DialogHeader className="p-4 border-b">
					<DialogTitle>
						{value}
					</DialogTitle>
				</DialogHeader>
				<div className="px-4 pb-4 flex flex-col gap-y-2">
					<div className="px-5 py-4 rounded-lg border cursor-pointer hover:bg-accent/20">
						<div className="flex items-center justify-between">
							<p className="text-sm font-semibold">
								Workspace name
							</p>
							<p className="text-sm text-[#1263a3] hover:underline font-semibold">
								Edit
							</p>
						</div>
						<p className="text-sm">
							{value}
						</p>
					</div>
					<button
						disabled={false}
						onClick={() => {}}
						className="flex items-center gap-x-2 px-5 py-4 rounded-lg border cursor-pointer hover:bg-accent/20 text-rose-600"
					>
						<TrashIcon className="size-4" />
						<p className="text-sm font-semibold">Delete Workspace</p>
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
};