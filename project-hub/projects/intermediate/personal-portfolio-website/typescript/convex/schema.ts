import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    person: defineTable({
        name: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string()
    })
})