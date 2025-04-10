import { Suspense } from 'react';
import ResetPassword from './_resetpassword';

const ForgotPassword = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
};

export default ForgotPassword;
