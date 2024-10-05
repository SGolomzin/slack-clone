import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { useWorkspaceId } from "~/hooks/use-workspace-id";
import { useGetWorkspace } from "~/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "~/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "~/features/workspaces/store/use-create-workspace-modal";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkspaceSwitcher = () => {
	const router = useRouter();
	const workspaceId = useWorkspaceId();

	const [_open, setOpen] = useCreateWorkspaceModal();

	const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
	const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();

	const filteredWorkspaces = workspaces?.filter(
		(ws) => ws?._id !== workspaceId
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="size-9 rounded-lg relative overflow-hidden bg-[#ABABAB] hover:bg-[#ABABAB]/80 text-slate-800 font-semibold text-xl">
				{workspaceLoading ? (
					<Loader className="size-5 animate-spin shrink-0"/>
				) : (
					workspace?.name.charAt(0).toUpperCase()
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" align="start" className="w-64">
				<DropdownMenuItem
					onClick={() => router.push(`/workspace/${workspaceId}`)}
					className="cursor-pointer flex-col justify-start items-start capitalize"
				>
					{workspace?.name}
					<span className="text-xs text-muted-foreground">
						Active workspace
					</span>
				</DropdownMenuItem>
				{filteredWorkspaces?.map((ws) => (
					<DropdownMenuItem
						key={ws._id}
						className="cursor-pointer capitalize"
						onClick={() => router.push(`/workspace/${ws._id}`)}
					>
						<div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
							{ws.name.charAt(0).toUpperCase()}
						</div>
						<p className="truncate">{ws.name}</p>
					</DropdownMenuItem>
				))}
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => setOpen(true)}
				>
					<div className="shrink-0 size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
						<Plus />
					</div>
					<p className="truncate">Create a new workspace</p>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};