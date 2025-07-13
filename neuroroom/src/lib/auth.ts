// In this code i export the auth db betterauth to work together and also the database drizzleadapter provider pg postgres
//and also spread the schema that is in the db/schema.ts file
//and also enable the email and password authentication

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
});
