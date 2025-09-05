"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { Shield, Building, Users } from "lucide-react";

const Auth = () => {
  const { user, profile, loading, signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"university" | "admin" | "">("");
  const [institutionName, setInstitutionName] = useState("");

  // Redirect authenticated users
  useEffect(() => {
    if (user && profile) {
      // Handled by Navigate below
    }
  }, [user, profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1E201E]">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#ECDFCC] border-t-transparent"></div>
      </div>
    );
  }

  if (user && profile) {
    return (
      <Navigate
        to={profile.role === "admin" ? "/admin-dashboard" : "/university-dashboard"}
        replace
      />
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(loginEmail, loginPassword);

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Please check your email and confirm your account");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Logged in successfully!");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!role) {
      toast.error("Please select your role");
      return;
    }

    if (role === "university" && !institutionName.trim()) {
      toast.error("Please enter your institution name");
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        full_name: fullName,
        role: role as "university" | "admin",
        ...(role === "university" && { institution_name: institutionName }),
      };

      const { error } = await signUp(signupEmail, signupPassword, userData);

      if (error) {
        if (error.message.includes("User already registered")) {
          toast.error("An account with this email already exists");
        } else if (
          error.message.includes("Password should be at least 6 characters")
        ) {
          toast.error("Password should be at least 6 characters long");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success(
          "Account created successfully! Please check your email to confirm your account."
        );
        // Reset form
        setSignupEmail("");
        setSignupPassword("");
        setFullName("");
        setRole("");
        setInstitutionName("");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#1E201E]">
      {/* Smooth Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E201E] via-[#3C3D37] to-[#697565] bg-[length:400%_400%] animate-gradientMove" />

      {/* Floating Glowing Orbs */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-[#ECDFCC] rounded-full opacity-20 blur-md animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
          }}
        />
      ))}

      {/* Slow Rotating Icons */}
      <Shield className="absolute top-10 left-10 text-[#ECDFCC]/40 h-20 w-20 animate-slow-spin" />
      <Building className="absolute bottom-20 right-12 text-[#697565]/50 h-16 w-16 animate-slow-float" />
      <Users className="absolute top-28 right-24 text-[#ECDFCC]/30 h-16 w-16 animate-slow-spin" />

      {/* Auth Card */}
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-14 w-14 text-[#ECDFCC] animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-[#ECDFCC] drop-shadow-lg tracking-wide">
            Jharkhand CertifyTrust
          </h1>
          <p className="text-[#ECDFCC]/80 mt-2 text-lg animate-fadeIn">
            Secure Certificate Verification Platform
          </p>
        </div>

        <Card className="border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl hover:shadow-[#ECDFCC]/20 transition">
          <Tabs defaultValue="login" className="w-full">
            {/* Tabs */}
            <TabsList className="grid w-full grid-cols-2 bg-[#3C3D37]/40 backdrop-blur-md rounded-t-2xl">
              <TabsTrigger
                value="login"
                className="text-lg text-[#ECDFCC] data-[state=active]:bg-[#697565]/70 data-[state=active]:text-white"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-lg text-[#ECDFCC] data-[state=active]:bg-[#697565]/70 data-[state=active]:text-white"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-xl text-[#ECDFCC]">Welcome Back</CardTitle>
                <CardDescription className="text-[#ECDFCC]/70">
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-[#ECDFCC]">
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="bg-[#3C3D37]/50 text-[#ECDFCC] placeholder-[#ECDFCC]/40 focus:ring-[#697565] focus:border-[#697565]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-[#ECDFCC]">
                      Password
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="bg-[#3C3D37]/50 text-[#ECDFCC] placeholder-[#ECDFCC]/40 focus:ring-[#697565] focus:border-[#697565]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#697565] text-white hover:bg-[#5C6755] transition-transform hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle className="text-xl text-[#ECDFCC]">Create Account</CardTitle>
                <CardDescription className="text-[#ECDFCC]/70">
                  Join the secure certificate verification platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-[#ECDFCC]">
                      Full Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="bg-[#3C3D37]/50 text-[#ECDFCC] placeholder-[#ECDFCC]/40 focus:ring-[#697565] focus:border-[#697565]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-[#ECDFCC]">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="bg-[#3C3D37]/50 text-[#ECDFCC] placeholder-[#ECDFCC]/40 focus:ring-[#697565] focus:border-[#697565]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-[#ECDFCC]">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password (min. 6 characters)"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      minLength={6}
                      className="bg-[#3C3D37]/50 text-[#ECDFCC] placeholder-[#ECDFCC]/40 focus:ring-[#697565] focus:border-[#697565]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-[#ECDFCC]">
                      Role
                    </Label>
                    <Select
                      onValueChange={(value: "university" | "admin") => setRole(value)}
                      required
                    >
                      <SelectTrigger className="bg-[#3C3D37]/50 text-[#ECDFCC] focus:ring-[#697565] focus:border-[#697565]">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="university">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            University/Institution
                          </div>
                        </SelectItem>
                        <SelectItem value="admin">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            System Administrator
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {role === "university" && (
                    <div className="space-y-2">
                      <Label htmlFor="institution" className="text-[#ECDFCC]">
                        Institution Name
                      </Label>
                      <Input
                        id="institution"
                        type="text"
                        placeholder="Enter your institution name"
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        required
                        className="bg-[#3C3D37]/50 text-[#ECDFCC] placeholder-[#ECDFCC]/40 focus:ring-[#697565] focus:border-[#697565]"
                      />
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-[#697565] text-white hover:bg-[#5C6755] transition-transform hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
