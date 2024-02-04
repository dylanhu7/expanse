import { relations, sql, type InferSelectModel } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `curator_${name}`);

export const spaces = createTable(
  "space",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 256 }),
    ownerId: varchar("ownerId", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (example) => ({
    ownerIdIdx: index("space_ownerId_idx").on(example.ownerId),
  }),
);

export const assets = createTable(
  "asset",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    title: varchar("title", { length: 256 }),
    description: text("description"),
    imageUrl: varchar("imageUrl", { length: 256 }),
    year: integer("year"),
    ownerId: varchar("ownerId", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (example) => ({
    ownerIdIdx: index("asset_ownerId_idx").on(example.ownerId),
  }),
);

export const spaceAssets = createTable(
  "spaceAsset",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    assetId: uuid("assetId")
      .references(() => assets.id)
      .notNull(),
    spaceId: uuid("spaceId")
      .references(() => spaces.id)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
    x: integer("x").notNull(),
    y: integer("y").notNull(),
    scale: real("scale").notNull(),
    wallId: uuid("wallId").references(() => walls.id),
    onCanonicalWall: boolean("onCanonicalWall").notNull(),
  },
  (example) => ({
    assetIdIdx: index("assetId_idx").on(example.assetId),
    spaceIdIdx: index("spaceId_idx").on(example.spaceId),
  }),
);

export const walls = createTable(
  "wall",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    spaceId: uuid("spaceId")
      .references(() => spaces.id)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
    x1: integer("x1").notNull(),
    y1: integer("y1").notNull(),
    x2: integer("x2").notNull(),
    y2: integer("y2").notNull(),
  },
  (example) => ({
    spaceIdIdx: index("wall_spaceId_idx").on(example.spaceId),
  }),
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export type Space = InferSelectModel<typeof spaces>;
export type Asset = InferSelectModel<typeof assets>;
