import { SubmissionForm } from '@/components/form-submit';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SubmissionForm />
      <Link href="/data">
        <Button>Dashboard</Button>
        <Toaster />
      </Link>
    </main>
  );
}
