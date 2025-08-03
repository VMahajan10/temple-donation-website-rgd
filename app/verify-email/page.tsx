"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, ArrowLeft, RefreshCw } from "lucide-react"

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const email = searchParams.get("email") || "your email"

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()

    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call for verification
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes, accept any 6-digit code
      if (verificationCode === "123456" || verificationCode.length === 6) {
        toast({
          title: "Email verified successfully!",
          description: "Welcome to Radha Govind Dham DC. You can now access your account.",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Invalid verification code",
          description: "Please check your email and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)

    try {
      // Simulate API call to resend code
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Verification code sent",
        description: "A new verification code has been sent to your email.",
      })

      // Reset countdown
      setCountdown(60)
      setCanResend(false)
    } catch (error) {
      toast({
        title: "Failed to resend code",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  const handleBackToSignup = () => {
    router.push("/register")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="relative w-32 h-24 mx-auto mb-4 rounded-lg overflow-hidden">
            <Image src="/images/radha-krishna-deities.jpeg" alt="Radha Krishna Deities" fill className="object-cover" />
          </div>
          <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a 6-digit verification code to
            <br />
            <span className="font-medium text-orange-600">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                  setVerificationCode(value)
                }}
                required
                placeholder="Enter 6-digit code"
                className="text-center text-lg tracking-widest font-mono"
                maxLength={6}
              />
              <p className="text-xs text-gray-500 mt-1 text-center">Enter the 6-digit code sent to your email</p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || verificationCode.length !== 6}>
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Didn't receive the code?</p>
              <Button
                variant="outline"
                onClick={handleResendCode}
                disabled={!canResend || isResending}
                className="flex items-center gap-2 bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 ${isResending ? "animate-spin" : ""}`} />
                {isResending ? "Sending..." : canResend ? "Resend Code" : `Resend in ${countdown}s`}
              </Button>
            </div>

            <div className="text-center">
              <Button variant="ghost" onClick={handleBackToSignup} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Sign Up
              </Button>
            </div>
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-700 text-center">
              <strong>Demo:</strong> Use code <span className="font-mono bg-blue-100 px-1 rounded">123456</span> to
              verify, or enter any 6-digit code.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
