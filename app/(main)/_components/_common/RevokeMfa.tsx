'use client';
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { revokeMFAMutationFn } from '@/lib/api';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { AxiosResponse } from 'axios';

const RevokeMfa = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: revokeMFAMutationFn,
    onSuccess: (response: AxiosResponse<{ message: string }>) => {
      queryClient.invalidateQueries({
        queryKey: ['authUser'],
      });
      toast.success(response.data.message);
    },
    onError: () => {
      toast.error('Error revoking MFA');
    },
  });

  const handleClick = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <Button
      disabled={isPending}
      className="h-[35px] !text-[#c40006d3] !bg-red-100 shadow-none mr-1"
      onClick={handleClick}
    >
      {isPending && <Loader className="animate-spin" />}
      Revoke Access
    </Button>
  );
};

export default RevokeMfa;
