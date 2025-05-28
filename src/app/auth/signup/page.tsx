
"use client";

import Link from 'next/link';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLogo from '@/components/AppLogo';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.94 11.06A10.81 10.81 0 0 0 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.19 0 9.45-3.93 9.95-8.94h-9.95V11h7.18c-.31 2.28-1.79 4.17-3.82 5.34V13.2C17.15 12.51 19.2 10.44 20.94 11.06Z"/>
  </svg>
);


export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
           <Link href="/" className="inline-block mx-auto mb-4">
            <AppLogo />
          </Link>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Join E-Commerce Hub today!</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
           <div className="mt-4 text-center text-sm">
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => {
                // Mock Google Sign-Up
                localStorage.setItem('userType', 'user');
                window.location.href = '/shop';
            }}>
               <GoogleIcon /> <span className="ml-2">Sign Up with Google</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 pt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
