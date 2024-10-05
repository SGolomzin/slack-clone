import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
	args: {
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			throw new Error("Unathorized");
		}

		// TODO: Create a proper joinCode generator
		const joinCode = "123456";

		return await ctx.db.insert("workspaces", {
			userId,
			name: args.name,
			joinCode,
		});
	},
})

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("workspaces").collect();
	},
})