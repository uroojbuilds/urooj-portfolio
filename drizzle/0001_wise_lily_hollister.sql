ALTER TABLE "project" ADD COLUMN "github_repo_id" integer;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "github_owner" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "github_repo_name" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "github_default_branch" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "github_last_synced_at" timestamp;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_github_repo_id_unique" UNIQUE("github_repo_id");