import { SignInForm } from "@/app/(auth)/_components/signin-form";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInForm />
    </main>
  );
}