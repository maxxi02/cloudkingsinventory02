'use client';
import { toast } from 'react-hot-toast';
import { verifyEmailMutationFn } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RiBox3Fill } from 'react-icons/ri';

export default function ConfirmAccount() {
  const router = useRouter();

  const params = useSearchParams();
  const code = params.get('code');

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailMutationFn,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!code) {
      toast.error('Invalid code', { duration: 5000 });
      return;
    }
    mutate(
      { code },
      {
        onSuccess: () => {
          toast.success('Account confirmed successfully', { duration: 5000 });
          router.replace('/');
        },
        onError: (error) => {
          toast.error(`${error.message}.`, { duration: 5000 });
        },
      },
    );
  };

  return (
    <main className="w-full min-h-[100dvh] flex items-center justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-md p-4 md:p-6 rounded-md">
        {/* Header Section */}
        <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold mb-4 mt-4 md:mt-8">
          <RiBox3Fill className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-xl md:text-2xl">Confirm account</span>
        </div>

        {/* Instruction Text */}
        <p className="mb-6 text-center text-sm md:text-[15px] dark:text-[#f1f7feb5] px-4">
          To confirm your account, please click the button below.
        </p>

        {/* Form Section */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-6">
              <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                <span className="absolute inset-0 flex items-center justify-center ">
                  {isPending ? (
                    <Loader className="animate-spin text-center" />
                  ) : (
                    <>Confirm Account</>
                  )}
                  <BottomGradient />
                </span>
              </button>
            </div>
          </form>

          {/* Contact Information */}
          <p className="text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] px-4">
            If you have any issues confirming your account, please contact{' '}
            <a
              className="text-blue-500 hover:text-blue-600 underline transition-colors"
              href="mailto:notoriorojan06@gmail.com"
            >
              notoriorojan06@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
