import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "~/components/ui/button";
import { useWorkspaceId } from "~/hooks/use-workspace-id";
import { cn } from "~/lib/utils";

const sidebarItemsVariants = cva(
	"flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
	{
		variants: {
			variant: {
				default: "text-[#F9EDFFCC]",
				active: "text-[#481349] bg-accent/30 hover:bg-accent/90",
			}
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

interface SidebarItemProps {
	label: string;
	id: string;
	icon: LucideIcon | IconType;
	variant?: VariantProps<typeof sidebarItemsVariants>["variant"];
}

export const SidebarItem = ({ label, id, icon: Icon, variant }: SidebarItemProps) => {
	const workspaceId = useWorkspaceId();

	return (
		<Button
			variant="transparent"
			size="sm"
			className={cn(sidebarItemsVariants({ variant }))}
			asChild
		>
			<Link href={`/worksapce/${workspaceId}/channel/${id}`}>
				<Icon className="size-3.5 mr-1 shrink-0"/>
				<span className="text-sm truncate">{label}</span>
			</Link>
		</Button>
	);
};