import { useWorkspaceId } from "~/hooks/use-workspace-id";
import { useCurrentMember } from "~/features/members/api/use-current-member";
import { useGetWorkspace } from "~/features/workspaces/api/use-get-workspace";
import { AlertTriangleIcon, Loader } from "lucide-react";
import { WorkspaceHeader } from "~/app/workspace/[workspaceId]/workspace-header";

export const WorkspaceSidebar = () => {
	const workspaceId = useWorkspaceId();

	const { data: member, isLoading: memberIsLoading} = useCurrentMember({ workspaceId });
	const { data: workspace, isLoading: workspaceIsLoading} = useGetWorkspace({ id: workspaceId });

	if (workspaceIsLoading || memberIsLoading) {
		return (
			<div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
				<Loader className="size-5 animate-spin text-white" />
			</div>
		)
	}

	if (!workspace || !member) {
		return (
			<div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
				<AlertTriangleIcon className="size-5 text-white"/>
				<p className="text-white text-sm">
					Workspace not found
				</p>
			</div>
		)
	}

	return (
		<div className="flex flex-col bg-[#5E2C5F] h-full">
			<WorkspaceHeader workspace={workspace} isAdmin={member.role === 'admin'}/>
		</div>
	)
}