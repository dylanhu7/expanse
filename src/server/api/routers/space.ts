import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { spaces } from "~/server/db/schema";

export const spaceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(spaces).values({
        name: input.name,
        ownerId: ctx.session.user.id,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(spaces);
  }),

  getMine: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(spaces)
      .where(eq(spaces.ownerId, ctx.session.user.id));
  }),
});
