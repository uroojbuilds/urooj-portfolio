import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";

// ---------------------------------------------------------------------------
// Auth.js tables — only what a GitHub-OAuth + database-session setup actually
// needs (users, accounts, sessions). No `verificationToken` table is required
// for OAuth-only sign-in (it exists solely for email/magic-link providers),
// and no `authenticator` table is created since no WebAuthn/passkey provider
// is configured. Shape matches @auth/drizzle-adapter's own Postgres schema
// exactly, since the adapter expects these specific column names/types.
// ---------------------------------------------------------------------------

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compositePk: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// ---------------------------------------------------------------------------
// Content tables — one per public section that gets admin CRUD (Phase 9
// spec's explicit list: Projects, Skills/Tools, Experience, Certifications,
// Education). Profile/bio content is intentionally NOT a table here — it was
// not in the phase's CRUD list, and turning a single-owner bio into a
// database row would be over-engineering for content that changes rarely.
//
// Plain string lists (tech stacks, coursework, features, etc.) use Postgres
// native text arrays rather than child tables — these are simple ordered
// string lists with no independent identity or metadata of their own, so a
// separate table per list would over-normalize content this simple.
//
// `sortOrder` on every table lets the admin control display order without
// depending on database insertion order or auto-increment id order.
// ---------------------------------------------------------------------------

export const projects = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  shortDescription: text("short_description").notNull(),
  category: text("category").notNull(),
  duration: text("duration").notNull(),
  status: text("status"),
  techStack: text("tech_stack").array().notNull().default([]),
  github: text("github"),
  liveDemo: text("live_demo"),
  featured: boolean("featured").notNull().default(false),
  problem: text("problem"),
  solution: text("solution"),
  features: text("features").array(),
  howItWorks: text("how_it_works"),
  challenges: text("challenges"),
  lessonsLearned: text("lessons_learned"),
  image: text("image"),
  imageAlt: text("image_alt"),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  // GitHub import metadata (Phase 10) — all optional. Populated only when a
  // project originated from (or was linked to) a GitHub repository via the
  // admin discovery workflow; NULL for hand-created projects. `githubRepoId`
  // is GitHub's own stable numeric repo ID (not the owner/name string, which
  // can change on rename) and is the definitive key used to detect "this
  // repo was already imported" before creating a duplicate draft.
  githubRepoId: integer("github_repo_id").unique(),
  githubOwner: text("github_owner"),
  githubRepoName: text("github_repo_name"),
  githubDefaultBranch: text("github_default_branch"),
  githubLastSyncedAt: timestamp("github_last_synced_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const skillAreas = pgTable("skill_area", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  skills: text("skills").array().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const toolGroups = pgTable("tool_group", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const tools = pgTable("tool", {
  id: uuid("id").primaryKey().defaultRandom(),
  toolGroupId: uuid("tool_group_id")
    .notNull()
    .references(() => toolGroups.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  projectSlugs: text("project_slugs").array(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const experience = pgTable("experience", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  organization: text("organization").notNull(),
  role: text("role").notNull(),
  duration: text("duration").notNull(),
  status: text("status", { enum: ["ongoing", "completed"] }).notNull(),
  description: text("description").notNull(),
  type: text("type"),
  location: text("location"),
  organizationUrl: text("organization_url"),
  responsibilities: text("responsibilities").array(),
  achievements: text("achievements").array(),
  technologies: text("technologies").array(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const certifications = pgTable("certification", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  date: text("date").notNull(),
  category: text("category", {
    enum: ["Professional Development", "Technical Training"],
  }).notNull(),
  credentialId: text("credential_id"),
  credentialUrl: text("credential_url"),
  certificateImage: text("certificate_image"),
  certificatePdf: text("certificate_pdf"),
  description: text("description"),
  skills: text("skills").array(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const education = pgTable("education", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  period: text("period"),
  location: text("location"),
  link: text("link"),
  coursework: text("coursework").array(),
  gpa: text("gpa"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
