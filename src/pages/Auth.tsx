"use client";

import { useState, useEffect } from "react";
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

// Define types for user and profile
interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: "university" | "admin";
  institution_name?: string;
}

interface AuthResponse {
  user: any;
  profile: UserProfile;
  error?: {
    message: string;
  };
}

const Auth = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
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

  // Check if user is already logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setProfile(data.profile);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // API endpoints your backend should provide:
  // 1. POST /api/auth/login - for user login
  // 2. POST /api/auth/signup - for user registration
  // 3. GET /api/auth/me - to get current user profile (protected route)
  // 4. POST /api/auth/logout - for user logout (optional)


   const getCSRFToken = () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
    return cookieValue || "";
  };
  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);
        return { user: data.user, profile: data.profile };
      } else {
        return { user: null, profile: null, error: data.error };
      }
    } catch (error) {
      return { 
        user: null, 
        profile: null, 
        error: { message: "Network error. Please try again." } 
      };
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData: { full_name: string; role: "university" | "admin"; institution_name?: string }
  ): Promise<AuthResponse> => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, ...userData }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);
        return { user: data.user, profile: data.profile };
      } else {
        return { user: null, profile: null, error: data.error };
      }
    } catch (error) {
      return { 
        user: null, 
        profile: null, 
        error: { message: "Network error. Please try again." } 
      };
    }
  };

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
      const { user: loggedInUser, profile: userProfile, error } = await signIn(loginEmail, loginPassword);

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Please check your email and confirm your account");
        } else {
          toast.error(error.message);
        }
      } else {
        setUser(loggedInUser);
        setProfile(userProfile);
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

      const { user: newUser, profile: newProfile, error } = await signUp(signupEmail, signupPassword, userData);

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
        setUser(newUser);
        setProfile(newProfile);
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

  // The rest of your UI code remains exactly the same...
  // [Keep all the JSX code from your original component exactly as is]
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