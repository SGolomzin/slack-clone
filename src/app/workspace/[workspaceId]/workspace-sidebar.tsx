import { useWorkspaceId } from "~/hooks/use-workspace-id";
import { useCurrentMember } from "~/features/members/api/use-current-member";
import { useGetWorkspace } from "~/features/workspaces/api/use-get-workspace";
import { AlertTriangleIcon, HashIcon, Loader, MessageSquareTextIcon, SendHorizonalIcon } from "lucide-react";
import { WorkspaceHeader } from "~/app/workspace/[workspaceId]/workspace-header";
import { SidebarItem } from "~/app/workspace/[workspaceId]/sidebar-item";
import { useGetChannels } from "~/features/channels/api/use-get-channels";
import { WorkspaceSection } from "~/app/workspace/[workspaceId]/workspace-section";
import { useGetMembers } from "~/features/members/api/use-get-members";
import { UserItem } from "~/app/workspace/[workspaceId]/user-item";

export const WorkspaceSidebar = () => {
	const workspaceId = useWorkspaceId();

	const { data: member, isLoading: memberIsLoading} = useCurrentMember({ workspaceId });
	const { data: workspace, isLoading: workspaceIsLoading} = useGetWorkspace({ id: workspaceId });
	const { data: channels, isLoading: channelsIsLoading} = useGetChannels({ workspaceId });
	const { data: members, isLoading: membersIsLoading} = useGetMembers({ workspaceId });

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
			<div className="flex flex-col px-2 mt-3">
				<SidebarItem
					label="Threads"
					icon={MessageSquareTextIcon}
					id="threads"
				/><SidebarItem
					label="Drafts & Sent"
					icon={SendHorizonalIcon}
					id="drafts"
				/>
			</div>
			<WorkspaceSection
				label="Channels"
				hint="New channel"
				onNew={() => {}}
			>
				{channels?.map((item) => (
					<SidebarItem
						key={item._id}
						icon={HashIcon}
						label={item.name}
						id={item._id}
					/>
				))}
			</WorkspaceSection>
			<WorkspaceSection
				label="Direct messages"
				hint="New direct message"
				onNew={() => {}}
			>
				{members?.map((item) => (
					<UserItem
						key={item._id}
						label={item.user.name}
						id={item._id}
						image={item.user.image}
					/>
				))}
			</WorkspaceSection>
		</div>
	)
}