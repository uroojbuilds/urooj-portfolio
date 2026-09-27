/**
 * One-time seed: copies the CURRENT static data/*.ts files (the existing,
 * approved factual content from Phases 5–8) into the database tables defined
 * in lib/db/schema.ts.
 *
 * This is a script you run yourself once DATABASE_URL points at a real,
 * migrated database — it is never imported by the app and never runs
 * automatically. It was written but NOT executed in this environment: there
 * is no reachable DATABASE_URL here, so running it now is not possible. See
 * the Phase 9 report for exactly what "written but not run" means.
 *
 * Usage (after `npm run db:generate` and `npm run db:migrate`):
 *   npx tsx lib/db/seed.ts
 *
 * Safe to re-run: every insert uses onConflictDoNothing on the natural
 * unique key (slug/id), so re-running after a partial seed won't duplicate
 * rows or overwrite anything already in the database.
 */
import { db } from "@/lib/db";
import {
  projects,
  skillAreas,
  toolGroups,
  tools,
  experience,
  certifications,
  education,
} from "@/lib/db/schema";

import { projects as staticProjects } from "@/data/projects";
import { skillAreas as staticSkillAreas, toolGroups as staticToolGroups } from "@/data/skills";
import { experience as staticExperience } from "@/data/experience";
import { certifications as staticCertifications } from "@/data/certifications";
import { education as staticEducation } from "@/data/education";

async function seedProjects() {
  if (staticProjects.length === 0) return;
  await db
    .insert(projects)
    .values(
      staticProjects.map((p) => ({
        slug: p.slug,
        name: p.name,
        shortDescription: p.shortDescription,
        category: p.category,
        duration: p.duration,
        status: p.status,
        techStack: p.techStack,
        github: p.github,
        liveDemo: p.liveDemo,
        featured: p.featured,
        problem: p.problem,
        solution: p.solution,
        features: p.features,
        howItWorks: p.howItWorks,
        challenges: p.challenges,
        lessonsLearned: p.lessonsLearned,
        image: p.image,
        imageAlt: p.imageAlt,
        published: true,
      }))
    )
    .onConflictDoNothing({ target: projects.slug });
  console.log(`Seeded ${staticProjects.length} project(s).`);
}

async function seedSkills() {
  if (staticSkillAreas.length > 0) {
    await db
      .insert(skillAreas)
      .values(
        staticSkillAreas.map((a) => ({
          slug: a.id,
          title: a.title,
          description: a.description,
          skills: a.skills,
        }))
      )
      .onConflictDoNothing({ target: skillAreas.slug });
    console.log(`Seeded ${staticSkillAreas.length} skill area(s).`);
  }

  for (const group of staticToolGroups) {
    const [inserted] = await db
      .insert(toolGroups)
      .values({ slug: group.id, title: group.title })
      .onConflictDoNothing({ target: toolGroups.slug })
      .returning({ id: toolGroups.id });

    // onConflictDoNothing returns nothing on a skipped row — look the
    // existing group up instead so its tools can still be seeded/attached.
    const groupId =
      inserted?.id ??
      (
        await db.query.toolGroups.findFirst({
          where: (tg, { eq }) => eq(tg.slug, group.id),
        })
      )?.id;

    if (!groupId) continue;

    if (group.tools.length > 0) {
      await db
        .insert(tools)
        .values(
          group.tools.map((t) => ({
            toolGroupId: groupId,
            name: t.name,
            projectSlugs: t.projectSlugs,
          }))
        )
        .onConflictDoNothing();
    }
  }
  console.log(`Seeded ${staticToolGroups.length} tool group(s) and their tools.`);
}

async function seedExperience() {
  if (staticExperience.length === 0) return;
  await db
    .insert(experience)
    .values(
      staticExperience.map((e) => ({
        slug: e.id,
        organization: e.organization,
        role: e.role,
        duration: e.duration,
        status: e.status,
        description: e.description,
        type: e.type,
        location: e.location,
        organizationUrl: e.organizationUrl,
        responsibilities: e.responsibilities,
        achievements: e.achievements,
        technologies: e.technologies,
      }))
    )
    .onConflictDoNothing({ target: experience.slug });
  console.log(`Seeded ${staticExperience.length} experience entr(y/ies).`);
}

async function seedCertifications() {
  // The database schema requires issuer/date/category (NOT NULL) — unlike
  // the static data type, which allows them to be genuinely unset for a
  // certificate whose details aren't documented yet (e.g. "WordPress +
  // UI/UX"). Rather than inventing placeholder values to satisfy the schema
  // or loosening the schema's constraints, incomplete records are simply
  // skipped here with a clear warning — add the missing details to
  // data/certifications.ts once known, then re-run this script.
  const complete = staticCertifications.filter(
    (c): c is typeof c & { issuer: string; date: string; category: NonNullable<typeof c.category> } =>
      Boolean(c.issuer && c.date && c.category)
  );
  const skipped = staticCertifications.filter((c) => !complete.includes(c as typeof complete[number]));

  if (skipped.length > 0) {
    console.warn(
      `Skipped ${skipped.length} certification(s) missing issuer/date/category (not invented): ` +
        skipped.map((c) => c.title).join(", ")
    );
  }

  if (complete.length > 0) {
    await db
      .insert(certifications)
      .values(
        complete.map((c) => ({
          slug: c.id,
          title: c.title,
          issuer: c.issuer,
          date: c.date,
          category: c.category,
          credentialId: c.credentialId,
          credentialUrl: c.credentialUrl,
          certificateImage: c.certificateImage,
          certificatePdf: c.certificatePdf,
          description: c.description,
          skills: c.skills,
        }))
      )
      .onConflictDoNothing({ target: certifications.slug });
    console.log(`Seeded ${complete.length} certification(s).`);
  }
}

async function seedEducation() {
  if (staticEducation.length === 0) return;
  await db
    .insert(education)
    .values(
      staticEducation.map((e) => ({
        slug: e.id,
        institution: e.institution,
        degree: e.degree,
        period: e.period,
        location: e.location,
        link: e.link,
        coursework: e.coursework,
        gpa: e.gpa,
      }))
    )
    .onConflictDoNothing({ target: education.slug });
  console.log(`Seeded ${staticEducation.length} education entr(y/ies).`);
}

async function main() {
  console.log("Seeding database from data/*.ts ...");
  await seedProjects();
  await seedSkills();
  await seedExperience();
  await seedCertifications();
  await seedEducation();
  console.log("Done. Compare the admin dashboard counts against the source files to verify.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
