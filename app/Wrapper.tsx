'use client';
import { ThemeProvider } from '@/context/theme-provider';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '../context/query-provider';
import { AuthProvider } from '@/context/auth-provider';
import { SidebarProvider } from '@/components/ui/AceSidebar';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider
            defaultTheme="light"
            attribute="class"
            enableSystem={false}
            disableTransitionOnChange
          >
            <>{children}</>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  backgroundColor: '#333',
                  color: '#fff',
                },
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </SidebarProvider>
  );
};

export default Wrapper;
