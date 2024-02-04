import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { assets } from "~/server/db/schema";

export const assetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        imageUrl: z.string().min(1).url().optional(),
        year: z.number().int().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(assets).values({
        title: input.title,
        description: input.description,
        imageUrl: input.imageUrl,
        year: input.year,
        ownerId: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        imageUrl: z.string().min(1).url().optional(),
        year: z.number().int().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const asset = await ctx.db
        .select()
        .from(assets)
        .where(eq(assets.id, input.id))
        .limit(1);
      if (!asset.length || !asset[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Asset not found",
        });
      }
      if (asset[0].ownerId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Asset does not belong to you",
        });
      }
      await ctx.db
        .update(assets)
        .set({
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          year: input.year,
        })
        .where(eq(assets.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const asset = await ctx.db
        .select()
        .from(assets)
        .where(eq(assets.id, input.id))
        .limit(1);
      if (!asset.length || !asset[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Asset not found",
        });
      }
      if (asset[0].ownerId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Asset does not belong to you",
        });
      }
      await ctx.db.delete(assets).where(eq(assets.id, input.id));
    }),

  getMine: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(assets)
      .where(eq(assets.ownerId, ctx.session.user.id));
  }),
});
