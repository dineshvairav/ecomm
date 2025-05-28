
import Link from 'next/link';
import { SignInForm } from '@/components/auth/SignInForm';
import { GuestLoginForm } from '@/components/auth/GuestLoginForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLogo from '@/components/AppLogo';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.94 11.06A10.81 10.81 0 0 0 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.19 0 9.45-3.93 9.95-8.94h-9.95V11h7.18c-.31 2.28-1.79 4.17-3.82 5.34V13.2C17.15 12.51 19.2 10.44 20.94 11.06Z"/>
  </svg>
);


export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mx-auto mb-4">
            <AppLogo />
          </Link>
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Sign in to access your account or continue as a guest.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="guest">Guest</TabsTrigger>
            </TabsList>
            <TabsContent value="email" className="pt-6">
              <SignInForm />
              <div className="mt-4 text-center text-sm">
                <Button variant="outline" className="w-full mb-4" onClick={() => {
                  // Mock Google Sign-In
                  localStorage.setItem('userType', 'user');
                  window.location.href = '/shop';
                }}>
                  <GoogleIcon /> <span className="ml-2">Sign In with Google</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="guest" className="pt-6">
              <GuestLoginForm />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 pt-4">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
