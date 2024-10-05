"use client";

import { UserButton } from "~/features/auth/components/user-button";

import { useGetWorkspaces } from "~/features/workspaces/api/use-get-workspaces";
import { useMemo, useEffect } from "react";
import { useCreateWorkspaceModal } from "~/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();

  const { data: workspacesData, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => workspacesData?.[0]?._id, [workspacesData]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
      console.log("Open creation modal");
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
