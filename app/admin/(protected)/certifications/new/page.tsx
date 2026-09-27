import { CertificationForm } from "@/app/admin/(protected)/certifications/CertificationForm";
import { createCertification } from "@/lib/actions/certifications";

export default function NewCertificationPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">New certification</h1>
      <div className="mt-6">
        <CertificationForm action={createCertification} />
      </div>
    </div>
  );
}
