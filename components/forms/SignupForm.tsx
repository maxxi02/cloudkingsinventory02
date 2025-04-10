'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { registerMutationFn } from '@/lib/api';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/ALabel';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from '@tabler/icons-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import Link from 'next/link';
import { RiBox3Fill } from 'react-icons/ri';
import { ModeToggle } from '../ui/modeToggle';
import { BackgroundLines } from '../ui/background-lines';
import { Loader, MailCheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
// this part is the signup page
export function SignupForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const formSchema = z
    .object({
      name: z.string().trim().min(1, {
        message: 'Name is required',
      }),
      email: z.string().trim().email().min(1, {
        message: 'Email is required',
      }),
      password: z.string().trim().min(1, {
        message: 'Password is required',
      }),
      confirmPassword: z.string().min(1, {
        message: 'Confirm Password is required',
      }),
    })
    .refine((val) => val.password === val.confirmPassword, {
      message: 'Password does not match',
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      mutate(values, {
        onSuccess: () => {
          setIsSubmitted(true);
        },
        onError: (error) => {
          console.log(error);
          toast.error(`${error.message}`);
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <>
      <BackgroundLines>
        <div className="grid lg:grid-cols-2 px-6 sm:px-10 gap-4 h-screen w-full items-center justify-center place-items-center relative mx-auto ">
          {isSubmitted ? (
            <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md absolute">
              <div className="size-[48px]">
                <MailCheckIcon size="48px" className="animate-bounce" />
              </div>
              <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
                Check your email
              </h2>
              <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
                We just sent a verification link to {form.getValues().email}.
              </p>
              <button
                onClick={() => {
                  if (isSubmitted) {
                    router.push('/');
                    toast.success('Directing to login page😺');
                  }
                  setIsSubmitted(false);
                }}
                className="group/btn relative block h-10 min-w-sm mx-auto rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                type="submit"
              >
                <span className="absolute inset-0 flex items-center justify-center ">
                  Signin <>&rarr;</>
                  <BottomGradient />
                </span>
              </button>
            </div>
          ) : (
            <>
              <div className="hidden flex-col lg:items-start  text-neutral-800 dark:text-neutral-200  lg:flex">
                <RiBox3Fill size={180} className="hover:text-red-500" />
                <h2 className="bg-clip-text text-transparent text-start bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                  Cloud Kings <br />
                  Smart Inventory System
                </h2>
                <p className="min-w-xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-neutral-700 dark:text-neutral-400 text-start">
                  Cloud Kings is a smart inventory system that helps you manage
                  your inventory efficiently. It provides real-time tracking,
                  analytics, and reporting features to help you make informed
                  decisions.
                </p>
              </div>
              <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
                <div className="flex items-center justify-between z-51">
                  <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">
                    Signup
                  </h2>
                  <ModeToggle />
                </div>
                <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                  Create your fucking account to get started.
                </p>

                <Form {...form}>
                  <form
                    className="my-8"
                    action="submit"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                      <LabelInputContainer>
                        <Label htmlFor="name">Name</Label>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Nivek Amures"
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-8">
                      <Label htmlFor="email">Email</Label>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="nivekamures@gmail.com"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-8">
                      <Label htmlFor="name">Password</Label>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="••••••••"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-8">
                      <Label htmlFor="name">Confirm Password</Label>
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="••••••••"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>

                    <button
                      className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                      type="submit"
                      disabled={isPending}
                    >
                      <span className="absolute inset-0 flex items-center justify-center ">
                        {isPending ? (
                          <Loader className="animate-spin text-center" />
                        ) : (
                          <>Create</>
                        )}
                        <BottomGradient />
                      </span>
                    </button>
                    <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                    <p className="mb-6 text-center  text-base dark:text-[#f1f7feb5] font-normal">
                      Already have an account?{' '}
                      <Link className="text-blue-500" href="/">
                        Sign in
                      </Link>
                      .
                    </p>
                    <div className="flex flex-col space-y-4">
                      <button
                        className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                        type="submit"
                      >
                        <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          GitHub
                        </span>
                        <BottomGradient />
                      </button>
                      <button
                        className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                        type="submit"
                      >
                        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          Google
                        </span>
                        <BottomGradient />
                      </button>
                      <button
                        className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                        type="submit"
                      >
                        <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          OnlyFans
                        </span>
                        <BottomGradient />
                      </button>

                      <p className="text-xs font-normal mt-4">
                        By signing up, you agree to our{' '}
                        <a className="text-primary hover:underline" href="#">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a className="text-primary hover:underline" href="#">
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          )}
        </div>
      </BackgroundLines>
    </>
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

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};
