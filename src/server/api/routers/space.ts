import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { spaceAssets, spaces } from "~/server/db/schema";

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

  getAssets: publicProcedure
    .input(z.object({ spaceId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(spaceAssets)
        .where(eq(spaceAssets.spaceId, input.spaceId));
    }),

  addAsset: protectedProcedure
    .input(z.object({ spaceId: z.string(), assetId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(spaceAssets).values({
        spaceId: input.spaceId,
        assetId: input.assetId,
        x: 0,
        y: 0,
        scale: 1,
      });
    }),

  updateAsset: protectedProcedure
    .input(
      z.object({
        spaceAssetId: z.string(),
        x: z.number().int(),
        y: z.number().int(),
        scale: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const spaceAsset = await ctx.db
        .select()
        .from(spaceAssets)
        .where(eq(spaceAssets.id, input.spaceAssetId))
        .limit(1);
      if (!spaceAsset.length || !spaceAsset[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Asset not found",
        });
      }
      const space = await ctx.db
        .select()
        .from(spaces)
        .where(eq(spaces.id, spaceAsset[0].spaceId))
        .limit(1);
      if (!space.length || !space[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Space not found",
        });
      }
      if (space[0].ownerId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Space does not belong to you",
        });
      }
      await ctx.db
        .update(spaceAssets)
        .set({
          x: input.x,
          y: input.y,
          scale: input.scale,
        })
        .where(eq(spaceAssets.id, input.spaceAssetId));
    }),

  removeAsset: protectedProcedure
    .input(z.object({ spaceAssetId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const spaceAsset = await ctx.db
        .select()
        .from(spaceAssets)
        .where(eq(spaceAssets.id, input.spaceAssetId))
        .limit(1);
      if (!spaceAsset.length || !spaceAsset[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Asset not found",
        });
      }
      const space = await ctx.db
        .select()
        .from(spaces)
        .where(eq(spaces.id, spaceAsset[0].spaceId))
        .limit(1);
      if (!space.length || !space[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Space not found",
        });
      }
      if (space[0].ownerId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Space does not belong to you",
        });
      }
      await ctx.db
        .delete(spaceAssets)
        .where(eq(spaceAssets.id, input.spaceAssetId));
    }),
});
