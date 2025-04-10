'use client';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, MailCheckIcon, Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

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
import { forgotPasswordMutationFn } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { RiBox3Fill } from 'react-icons/ri';

export default function ForgotPassword() {
  const params = useSearchParams();

  const email = params.get('email');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordMutationFn,
  });

  const formSchema = z.object({
    email: z.string().trim().email().min(1, {
      message: 'Email is required',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
        toast.success(
          'Email sent! Please check your inbox for further instructions.',
        );
      },
      onError: (error) => {
        console.log(error);
        toast.error('Something went wrong, please try again later.');
      },
    });
  };

  return (
    <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center">
      {!isSubmitted ? (
        <div className="flex flex-col items-center min-w-svh h-full p-5 rounded-md">
          <div
            className="flex items-center w-full justify-center gap-2 text-3xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8
        text-center sm:text-left max-w-md"
          >
            <RiBox3Fill />
            <span className="text-2xl">Reset password</span>
          </div>
          <p className="mb-6 max-w-[400px] mx-auto text-center  text-base dark:text-[#f1f7feb5] font-normal">
            Include the email address associated with your account and
            we&apos;ll send you an email with instructions to reset your
            password.
          </p>
          <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
            <Form {...form}>
              <form
                className="flex flex-col gap-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="mb-0">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="nivekamures@gmail.com"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <button
                  className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                  type="submit"
                  disabled={isPending}
                >
                  <span className="absolute inset-0 flex items-center justify-center ">
                    {isPending ? (
                      <Loader className="animate-spin text-center" />
                    ) : (
                      <>Send</>
                    )}
                    <BottomGradient />
                  </span>
                </button>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <div className="size-[48px]">
            <MailCheckIcon size="48px" className="animate-bounce" />
          </div>
          <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
            Check your email
          </h2>
          <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            We just sent a password reset link to {form.getValues().email}.
          </p>
          <Link href="/">
            <Button className="h-[40px] z-99 cursor-pointer">
              Go to login
              <ArrowRight />
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
