import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  FileText,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Settings,
  Shield,
  Upload,
} from "lucide-react";
import { Navigate } from "react-router-dom";
import { c } from "node_modules/framer-motion/dist/types.d-Cjd591yU";

const UniversityDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setLoading(false);
          alert("No auth token found, redirecting to /auth");
          window.location.href = "/auth";
          return;
        }

        // Verify token with backend
        const response = await fetch("http://127.0.0.1:8000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`, // 👈 MUST match Django's expectation
          },
        });
        console.log("Auth check response:", response);
        if (response.ok) {
          const data = await response.json();
          console.log("data all good")
          setUser(data.user);
        } else {
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signOut = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    window.location.href = "/auth";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#3B82F6] border-t-transparent"></div>
      </div>
    );
  }

  // if (!user) {
  //   alert("You must be logged in to access the University Dashboard.");
  //   return <Navigate to="/auth" replace />;
  // }

  const stats = [
    {
      title: "Total Certificates",
      value: "2,340",
      icon: FileText,
      color: "text-[#3B82F6]",
      bg: "bg-blue-500/10",
    },
    {
      title: "Verified Certificates",
      value: "2,315",
      icon: CheckCircle2,
      color: "text-[#10B981]",
      bg: "bg-green-500/10",
    },
    {
      title: "Flagged Certificates",
      value: "25",
      icon: AlertTriangle,
      color: "text-[#EF4444]",
      bg: "bg-red-500/10",
    },
    {
      title: "Pending Verifications",
      value: "12",
      icon: Upload,
      color: "text-[#F59E0B]",
      bg: "bg-yellow-500/10",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "verified",
      message: "100 certificates successfully verified.",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "flagged",
      message: "2 suspicious certificates flagged.",
      time: "30 minutes ago",
    },
    {
      id: 3,
      type: "uploaded",
      message: "50 new certificates uploaded for verification.",
      time: "1 hour ago",
    },
  ];

  const pendingCertificates = [
    {
      student: "Rohit Sharma",
      course: "B.Tech CSE",
      year: "2023",
      status: "pending",
    },
    {
      student: "Priya Singh",
      course: "MBA",
      year: "2022",
      status: "pending",
    },
    {
      student: "Aman Verma",
      course: "B.Sc Physics",
      year: "2023",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111827] text-white relative transition-all duration-500">
      {/* Header */}
      <header className="bg-[#1F2937] shadow-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-wide text-white">
              University Dashboard
            </h1>
            <p className="text-gray-400">
              Manage certificates, verifications & reports
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-[#3B82F6] text-white px-3 py-1 rounded-lg">
              University Portal
            </Badge>
            <Button
              variant="outline"
              onClick={signOut}
              className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all duration-300"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-[#1F2937] border border-gray-700 shadow-lg rounded-xl transform hover:scale-105 transition-all duration-500"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-7 w-7 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-[#1F2937] shadow-lg rounded-xl border border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="h-5 w-5 text-[#3B82F6]" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start justify-between p-4 rounded-lg bg-[#111827] hover:bg-[#1F2937] transition-all duration-300"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-white">{activity.message}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                      <Badge
                        className={`px-2 py-1 rounded-md ${activity.type === "verified"
                            ? "bg-green-500/20 text-[#10B981]"
                            : activity.type === "flagged"
                              ? "bg-red-500/20 text-[#EF4444]"
                              : "bg-yellow-500/20 text-[#F59E0B]"
                          }`}
                      >
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-[#1F2937] shadow-lg rounded-xl border border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="h-5 w-5 text-[#3B82F6]" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start bg-[#3B82F6] hover:bg-blue-700 transition-all duration-300 text-white">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Certificates
                </Button>
                <Button className="w-full justify-start bg-[#10B981] hover:bg-green-700 transition-all duration-300 text-white">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Verify Certificates
                </Button>
                <Button className="w-full justify-start bg-[#F59E0B] hover:bg-yellow-600 transition-all duration-300 text-white">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
                <Button className="w-full justify-start bg-[#8B5CF6] hover:bg-purple-700 transition-all duration-300 text-white">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pending Certificates */}
        <div className="mt-10">
          <Card className="bg-[#1F2937] shadow-lg rounded-xl border border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <GraduationCap className="h-5 w-5 text-[#3B82F6]" />
                Pending Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300">
                        Student
                      </th>
                      <th className="text-left py-3 px-4 text-gray-300">
                        Course
                      </th>
                      <th className="text-left py-3 px-4 text-gray-300">
                        Year
                      </th>
                      <th className="text-left py-3 px-4 text-gray-300">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingCertificates.map((cert, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-[#111827] transition-all duration-300"
                      >
                        <td className="py-3 px-4 font-medium text-white">
                          {cert.student}
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {cert.course}
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {cert.year}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-yellow-500/20 text-[#F59E0B]">
                            {cert.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all"
                          >
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UniversityDashboard;