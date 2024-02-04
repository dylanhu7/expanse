import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { spaceAssets, spaces, walls } from "~/server/db/schema";

export const spaceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(spaces)
        .values({
          name: input.name,
          ownerId: ctx.session.user.id,
        })
        .returning();
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const space = await ctx.db
        .select()
        .from(spaces)
        .where(eq(spaces.id, input.id))
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
      await ctx.db.delete(spaces).where(eq(spaces.id, input.id));
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

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const space = await ctx.db
        .select()
        .from(spaces)
        .where(eq(spaces.id, input.id))
        .limit(1);
      if (!space.length || !space[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Space not found",
        });
      }
      return space[0];
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
    .input(
      z.object({
        spaceId: z.string(),
        assetId: z.string(),
        x: z.number(),
        y: z.number(),
        scale: z.number(),
        wallId: z.string(),
        onCanonicalWall: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(spaceAssets)
        .values({
          spaceId: input.spaceId,
          assetId: input.assetId,
          x: input.x,
          y: input.y,
          scale: input.scale,
          wallId: input.wallId,
          onCanonicalWall: input.onCanonicalWall,
        })
        .returning();
    }),

  updateAsset: protectedProcedure
    .input(
      z.object({
        spaceAssetId: z.string(),
        x: z.number(),
        y: z.number(),
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
      return await ctx.db
        .update(spaceAssets)
        .set({
          x: input.x,
          y: input.y,
          scale: input.scale,
        })
        .where(eq(spaceAssets.id, input.spaceAssetId))
        .returning();
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

  getWalls: publicProcedure
    .input(z.object({ spaceId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(walls)
        .where(eq(walls.spaceId, input.spaceId));
    }),

  addWall: protectedProcedure
    .input(
      z.object({
        spaceId: z.string(),
        x1: z.number().int(),
        y1: z.number().int(),
        x2: z.number().int(),
        y2: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const space = await ctx.db
        .select()
        .from(spaces)
        .where(eq(spaces.id, input.spaceId))
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
      return await ctx.db
        .insert(walls)
        .values({
          spaceId: input.spaceId,
          x1: input.x1,
          y1: input.y1,
          x2: input.x2,
          y2: input.y2,
        })
        .returning();
    }),

  removeWall: protectedProcedure
    .input(z.object({ wallId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const wall = await ctx.db
        .select()
        .from(walls)
        .where(eq(walls.id, input.wallId))
        .limit(1);
      if (!wall.length || !wall[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wall not found",
        });
      }
      const space = await ctx.db
        .select()
        .from(spaces)
        .where(eq(spaces.id, wall[0].spaceId))
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
      // Remove all assets on this wall
      await ctx.db
        .delete(spaceAssets)
        .where(eq(spaceAssets.wallId, input.wallId));
      // Remove the wall
      await ctx.db.delete(walls).where(eq(walls.id, input.wallId));
    }),

  updateWall: protectedProcedure
    .input(
      z.object({
        wallId: z.string(),
        x1: z.number().int(),
        y1: z.number().int(),
        x2: z.number().int(),
        y2: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const wall = await ctx.db
        .select()
        .from(walls)
        .where(eq(walls.id, input.wallId))
        .limit(1);
      if (!wall.length || !wall[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wall not found",
        });
      }
      const space = await ctx.db
        .select()
        .from(spaces)
        .where(eq(spaces.id, wall[0].spaceId))
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
      return await ctx.db
        .update(walls)
        .set({
          x1: input.x1,
          y1: input.y1,
          x2: input.x2,
          y2: input.y2,
        })
        .where(eq(walls.id, input.wallId))
        .returning();
    }),
});
