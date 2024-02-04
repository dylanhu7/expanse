import { spaceRouter } from "~/server/api/routers/space";
import { createTRPCRouter } from "~/server/api/trpc";
import { assetRouter } from "./routers/asset";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  space: spaceRouter,
  asset: assetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
