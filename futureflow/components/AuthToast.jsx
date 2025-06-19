
'use client';

import { useSession } from "@clerk/nextjs";
import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";

export const AuthToast = () => {
  const { isLoaded, session } = useSession();

  useEffect(() => {
    if (!isLoaded) return;

    if (session) {
      const isNewSession = session.createdAt && 
        Date.now() - session.createdAt.getTime() < 5000;
      
      if (isNewSession) {
        toast.success(
          `Welcome ${session.user.firstName || ''}! You've signed in successfully.`,
          { 
            duration: 2000,
            className: 'text-lg p-6', // Larger text and padding
            style: {
              fontSize: '1.125rem', // 18px
              lineHeight: '1.75rem', // 28px
              minWidth: '400px',
              padding: '1.5rem',
            }
          }
        );
        setTimeout(() => {
          toast.info(
            "Check out Industry Insights tailored to your skills and bio!",
            { 
              duration: 7000,
              className: 'text-lg p-6',
              style: {
                fontSize: '1.125rem',
                lineHeight: '1.75rem',
                minWidth: '400px',
                padding: '1.5rem',
              }
            }
          );
        }, 1500);
      }
    }
  }, [session, isLoaded]);

  return (
    <Toaster 
      position="bottom-right" 
      richColors 
      toastOptions={{
        className: 'text-lg',
        style: {
          fontSize: '1.125rem',
          lineHeight: '1.75rem',
          minWidth: '400px',
          padding: '1.5rem',
        }
      }}
    />
  );
};