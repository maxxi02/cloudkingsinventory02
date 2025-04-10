'use client';

import { toast } from 'react-hot-toast';

export default function useToast() {
  return {
    toast,
    successToast: (message: string) => toast.success(message),
    errorToast: (message: string) => toast.error(message),
    loadingToast: (message: string) => toast.loading(message),
  };
}
