import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getClient = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("person", {
            name: args.name,
            email: args.email,
            subject: args.subject,
            message: args.message
        });
    }
});