import { SignUpForm } from "@/app/(auth)/_components/signup-form";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignUpForm />
    </main>
  );
}
