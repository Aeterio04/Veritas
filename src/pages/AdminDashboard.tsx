import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Building,
  AlertTriangle,
  BarChart3,
  Settings,
  Database,
  Activity,
  FileX,
  CheckCircle2,
} from "lucide-react";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, profile, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#3B82F6] border-t-transparent"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/auth" replace />;
  }

  if (profile.role !== "admin") {
    return <Navigate to="/university-dashboard" replace />;
  }

  const systemStats = [
    {
      title: "Total Universities",
      value: "87",
      icon: Building,
      trend: "+3",
      color: "text-[#3B82F6]",
      bg: "bg-blue-500/10",
    },
    {
      title: "Active Users",
      value: "2,847",
      icon: Users,
      trend: "+127",
      color: "text-[#10B981]",
      bg: "bg-green-500/10",
    },
    {
      title: "Fraud Detected",
      value: "143",
      icon: AlertTriangle,
      trend: "-12",
      color: "text-[#EF4444]",
      bg: "bg-red-500/10",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      icon: Activity,
      trend: "0.1%",
      color: "text-[#8B5CF6]",
      bg: "bg-purple-500/10",
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "fraud",
      message: "Suspicious certificate detected from XYZ University",
      time: "10 minutes ago",
      severity: "high",
    },
    {
      id: 2,
      type: "system",
      message: "New university registration pending approval",
      time: "1 hour ago",
      severity: "medium",
    },
    {
      id: 3,
      type: "verification",
      message: "Bulk verification completed for ABC College",
      time: "2 hours ago",
      severity: "low",
    },
  ];

  const universities = [
    {
      name: "Ranchi University",
      certificates: "4,521",
      verified: "4,498",
      flagged: "3",
      status: "active",
    },
    {
      name: "BIT Mesra",
      certificates: "2,847",
      verified: "2,840",
      flagged: "2",
      status: "active",
    },
    {
      name: "Sido Kanhu University",
      certificates: "1,923",
      verified: "1,920",
      flagged: "1",
      status: "active",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111827] text-white relative transition-all duration-500">
      {/* Header */}
      <header className="bg-[#1F2937] shadow-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-wide text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">
              System Administration & Monitoring
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-[#EF4444] text-white px-3 py-1 rounded-lg">
              Administrator
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
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {systemStats.map((stat, index) => (
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
                    <p className="text-sm text-gray-400">
                      <span className={stat.color}>{stat.trend}</span> this month
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

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-[#1F2937] shadow-lg rounded-xl border border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="h-5 w-5 text-[#3B82F6]" />
                  Admin Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start bg-[#3B82F6] hover:bg-blue-700 transition-all duration-300 text-white">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Universities
                </Button>
                <Button className="w-full justify-start bg-[#8B5CF6] hover:bg-purple-700 transition-all duration-300 text-white">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Settings
                </Button>
                <Button className="w-full justify-start bg-[#10B981] hover:bg-green-700 transition-all duration-300 text-white">
                  <Database className="mr-2 h-4 w-4" />
                  Database Management
                </Button>
                <Button className="w-full justify-start bg-[#F59E0B] hover:bg-yellow-600 transition-all duration-300 text-white">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  System Analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <div className="lg:col-span-2">
            <Card className="bg-[#1F2937] shadow-lg rounded-xl border border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <AlertTriangle className="h-5 w-5 text-[#EF4444]" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start justify-between p-4 rounded-lg bg-[#111827] hover:bg-[#1F2937] transition-all duration-300"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {alert.type === "fraud" && (
                            <FileX className="h-4 w-4 text-[#EF4444]" />
                          )}
                          {alert.type === "system" && (
                            <Settings className="h-4 w-4 text-[#3B82F6]" />
                          )}
                          {alert.type === "verification" && (
                            <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                          )}
                          <span className="font-medium capitalize text-white">
                            {alert.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{alert.message}</p>
                        <p className="text-xs text-gray-400">{alert.time}</p>
                      </div>
                      <Badge
                        className={`px-2 py-1 rounded-md ${
                          alert.severity === "high"
                            ? "bg-red-500/20 text-[#EF4444]"
                            : alert.severity === "medium"
                            ? "bg-yellow-500/20 text-[#F59E0B]"
                            : "bg-green-500/20 text-[#10B981]"
                        }`}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* University Overview */}
        <div className="mt-10">
          <Card className="bg-[#1F2937] shadow-lg rounded-xl border border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Building className="h-5 w-5 text-[#3B82F6]" />
                University Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300">
                        University
                      </th>
                      <th className="text-left py-3 px-4 text-gray-300">
                        Certificates
                      </th>
                      <th className="text-left py-3 px-4 text-gray-300">
                        Verified
                      </th>
                      <th className="text-left py-3 px-4 text-gray-300">
                        Flagged
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
                    {universities.map((uni, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-[#111827] transition-all duration-300"
                      >
                        <td className="py-3 px-4 font-medium text-white">
                          {uni.name}
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {uni.certificates}
                        </td>
                        <td className="py-3 px-4 text-[#10B981]">
                          {uni.verified}
                        </td>
                        <td className="py-3 px-4 text-[#EF4444]">
                          {uni.flagged}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              uni.status === "active"
                                ? "bg-green-500/20 text-[#10B981]"
                                : "bg-gray-600 text-gray-200"
                            }
                          >
                            {uni.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all"
                          >
                            View Details
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

export default AdminDashboard;
