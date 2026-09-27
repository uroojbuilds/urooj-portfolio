import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { certifications } from "@/lib/db/schema";
import { CertificationForm } from "@/app/admin/(protected)/certifications/CertificationForm";
import { updateCertification } from "@/lib/actions/certifications";

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [cert] = await db.select().from(certifications).where(eq(certifications.id, id));
  if (!cert) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">Edit certification</h1>
      <div className="mt-6">
        <CertificationForm action={updateCertification.bind(null, id)} cert={cert} />
      </div>
    </div>
  );
}
