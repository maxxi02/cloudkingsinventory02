import { SignupForm } from '@/components/forms/SignupForm';
import { Suspense } from 'react';

export default function SignUp() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
