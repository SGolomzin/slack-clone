import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";
import { PlusIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Hint } from "~/components/hint";
import { Button } from "~/components/ui/button";

interface WorkspaceSectionProps {
	children: React.ReactNode;
	label: string;
	hint: string;
	onNew?: () => void;
}

export const WorkspaceSection = ({ children, label, hint, onNew }: WorkspaceSectionProps) => {
	const [on, toggle] = useToggle(true);

	return (
		<div className="flex flex-col mt-3 px-2">
			<div className="flex items-center px-3.5 group">
				<Button
					variant="transparent"
					className="p-0.5 text-sm text-[#F9EDFFCC] shrink-0 size-6"
					onClick={toggle}
				>
					<FaCaretDown className={cn("size-4 transition-transform", { "rotate-180 ": on })} />
				</Button>
				<Button
					variant="transparent"
					size="sm"
					className="group px-1.5 text-sm text-[#F9EDFFCC] h-6 justify-start overflow-hidden items-center"
				>
					<span className="truncate">{label}</span>
				</Button>
				{onNew && (
					<Hint label={hint} side="top" align="center">
						<Button
							onClick={onNew}
							variant="transparent"
							size="iconSm"
							className="opacity-0 focus:opacity-100 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#F9EDFFCC] size-6 shrink-0"
						>
							<PlusIcon className="size-5"/>
						</Button>
					</Hint>
				)}
			</div>
			{on && children}
		</div>
	);
};