import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(), //clerkId
    email: v.string(), //email address
    name: v.string(), //name
    isPro: v.boolean(), //isPro
    proSince: v.optional(v.number()), //proSince
    lemonSqueezyCustomerId: v.optional(v.string()), //lemonsqueezyId
    lemonSqueezyOrderId: v.optional(v.string()), //lemonsqueezyOrderId
  }).index("by_user_id", ["userId"]),

  codeExceutions: defineTable({
    userId: v.string(), //clerkId
    language: v.string(), //result
    code: v.string(), //code
    output: v.optional(v.string()), //output
    error: v.optional(v.string()), //error\
  })
    //Writing index so you can easily access it by userId
    .index("by_user_id", ["userId"]),

  snippets: defineTable({
    userId: v.string(), //clerkId
    title: v.string(), //title
    code: v.string(), //code
    language: v.string(), //language
    userName: v.string(), // Store user's name for easy access
  }).index("by_user_id", ["userId"]),

  snippetComments: defineTable({
    snippetId: v.id("snippets"), //snippetId
    userId: v.string(), //clerkId
    userName: v.string(),
    content: v.string(), // This will store html content
  }).index("by_snippet_id", ["snippetId"]),

  stars: defineTable({
    snippetId: v.id("snippets"), //snippetId
    userId: v.id("users"), //clerkId
  })
    .index("by_user_id", ["userId"])
    .index("by_snippet_id", ["snippetId"])
    .index("by_user_id_and_snippet_id", ["userId", "snippetId"]),
});
