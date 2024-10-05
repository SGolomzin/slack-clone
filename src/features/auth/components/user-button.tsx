"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "~/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "~/features/auth/api/use-current-user";
import { Loader, LogOut } from "lucide-react";

export const UserButton = () => {
	const { data: userData, isLoading } = useCurrentUser();
	const { signOut } = useAuthActions();
	const router = useRouter()

	if (isLoading) return <Loader className="size-4 animate-spin text-muted-foreground" />;

	if (!userData) {
		return null;
	}

	const { name, image} = userData;

	const avatarFallback = name!.charAt(0).toUpperCase();

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className="outline-none relative">
				<Avatar className="size-10 hover:opacity-75 transition">
					<AvatarImage alt={name} src={image} />
					<AvatarFallback>
						{avatarFallback}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" side="right" className="w-60">
				<DropdownMenuItem onClick={
					() => signOut().then(() => router.push("/auth"))
				} className="h-10">
					<LogOut  className="size-4 mr-2" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}