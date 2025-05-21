//Mutation is like a we want to make a operation like a insert create delete

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    pictureURL: v.string(),
  },
  handler: async (ctx, args) => {
    //If user already exist
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (!user[0]?.email) {
      const userData = {   name: args.name,
        email: args.email,
        pictureURL: args?.pictureURL,
        credits: 3000,
      }
      //If not , insert new  user
      const result = await ctx.db.insert("users",userData)
      return userData;
    }
    return user[0];
  },
});

// .collect()
// This part actually runs the query and gives you back the results as an array (a list).
// ctx.db.query("users")
// You're saying:
// "Hey database, I want to search inside the 'users' collection (like a table of users)."
// ctx.db is your connection to the database.
// .query("users") means you're going to search or filter inside the "users" list.