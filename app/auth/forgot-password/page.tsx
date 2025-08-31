"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRequestPasswordReset, useVerifyResetCode, useResetPassword } from "@/hooks/use-api";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const router = useRouter();

  const [requestResetState, requestResetActions] = useRequestPasswordReset();
  const [verifyCodeState, verifyCodeActions] = useVerifyResetCode();
  const [resetPasswordState, resetPasswordActions] = useResetPassword();

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(pwd)) {
      return "Password must contain at least one number.";
    }
    if (!/[^a-zA-Z0-9]/.test(pwd)) {
      return "Password must contain at least one special character.";
    }
    return null;
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await requestResetActions.execute(email);
      toast.success("Reset code sent! Check the console for the code.");
      setStep("code");
    } catch (error) {
      toast.error("Failed to send reset code. Please try again.");
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      toast.error("Please enter the reset code");
      return;
    }

    try {
      await verifyCodeActions.execute(email, code);
      toast.success("Code verified! Please enter your new password.");
      setStep("password");
    } catch (error) {
      toast.error("Invalid or expired code. Please try again.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword) {
      toast.error("Please enter your new password");
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    try {
      await resetPasswordActions.execute(email, code, newPassword);
      toast.success("Password reset successful! Please sign in.");
      router.push("/auth/signin");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md animate-card hover-lift">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            {step === "email" && "Enter your email to receive a reset code"}
            {step === "code" && "Enter the reset code sent to your email"}
            {step === "password" && "Enter your new password"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === "email" && (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={requestResetState.loading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={requestResetState.loading}
              >
                {requestResetState.loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Send Reset Code"
                )}
              </Button>
            </form>
          )}

          {step === "code" && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Reset Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={verifyCodeState.loading}
                />
                <p className="text-xs text-gray-500">
                  Check the console for the reset code (for demo purposes)
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={verifyCodeState.loading}
              >
                {verifyCodeState.loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Verify Code"
                )}
              </Button>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={resetPasswordState.loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={resetPasswordState.loading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={resetPasswordState.loading}
              >
                {resetPasswordState.loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
          
          <div className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link href="/auth/signin" className="text-teal-600 hover:underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 