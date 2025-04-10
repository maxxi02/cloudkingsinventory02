'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Frown, Loader } from 'lucide-react';
import Link from 'next/link';
import { resetPasswordMutationFn } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { RiBox3Fill } from 'react-icons/ri';

export default function ResetPassword() {
  const router = useRouter();

  const params = useSearchParams();
  const code = params.get('code');
  const exp = Number(params.get('exp'));
  const now = Date.now();

  const isValid = code && exp && exp > now;

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordMutationFn,
  });

  const formSchema = z
    .object({
      password: z.string().trim().min(1, {
        message: 'Password is required',
      }),
      confirmPassword: z.string().trim().min(1, {
        message: 'Confirm password is required',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Password does not match',
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!code) {
      router.replace('/forgot-password?email=');
      return;
    }
    const data = {
      password: values.password,
      verificationCode: code,
    };
    mutate(data, {
      onSuccess: () => {
        toast.success('Password updated successfully!');
        router.replace('/');
      },
      onError: (error) => {
        console.log(error);
        toast.error('Something went wrong, please try again later.');
      },
    });
  };

  return (
    <main className="w-full md:min-h-[590px] min-h-[100dvh] h-full max-w-full flex items-center justify-center px-4">
      {isValid ? (
        <div className="flex flex-col items-center w-full max-w-md h-full p-4 md:p-5 rounded-md">
          {' '}
          {/* 💡 Adjusted padding */}
          <div
            className="flex items-center w-full justify-center gap-2 text-2xl md:text-3xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-4 md:mt-8
        text-center sm:text-left max-w-md"
          >
            <RiBox3Fill className="w-6 h-6 md:w-8 md:h-8" />
            <span className="text-xl md:text-2xl">Reset password</span>
          </div>
          <p className="mb-4 md:mb-6 text-center sm:text-left text-sm md:text-[15px] dark:text-[#f1f7feb5] font-normal px-2">
            {' '}
            {/* 💡 Added horizontal padding */}
            Change your password and don&apos;t forget it this time.
          </p>
          <div className="w-full mx-auto bg-white p-4 md:rounded-2xl md:p-6 dark:bg-black shadow-sm md:shadow-lg">
            <Form {...form}>
              <form
                className="flex flex-col gap-4 md:gap-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-[#f1f7feb5] text-xs md:text-sm">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            autoComplete="off"
                            {...field}
                            type="password"
                            className="text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-[#f1f7feb5] text-xs md:text-sm">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            autoComplete="off"
                            {...field}
                            type="password"
                            className="text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <button
                  className="group/btn relative block h-12 md:h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-sm md:shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 text-sm md:text-base"
                  type="submit"
                  disabled={isPending}
                >
                  <span className="absolute inset-0 flex items-center justify-center gap-2">
                    {isPending ? (
                      <Loader className="animate-spin w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <>Update</>
                    )}
                  </span>
                  <BottomGradient />
                </button>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100dvh] flex flex-col gap-2 items-center justify-center rounded-md px-4">
          {' '}
          <div className="size-10 md:size-12">
            {' '}
            <Frown size="100%" className="animate-bounce text-red-500" />{' '}
          </div>
          <h2 className="text-lg md:text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold text-center">
            Invalid or expired reset link
          </h2>
          <p className="mb-2 text-center text-xs md:text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            You can request a new password reset link
          </p>
          <Link href="/forgot-password?email=" className="w-full max-w-xs">
            {' '}
            <Button className="h-12 md:h-10 w-full cursor-pointer" size="sm">
              {' '}
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to forgot password
            </Button>
          </Link>
        </div>
      )}
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
