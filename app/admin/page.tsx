"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import {
  Users,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Clock,
  Award,
  Activity,
  BarChart3,
  Calendar,
  Download,
  Settings,
  Menu,
  X,
} from "lucide-react"

export default function AdminDashboard() {
  // Mock data for demonstration
  const stats = {
    totalUsers: 2847,
    activeUsers: 1923,
    totalLessons: 156,
    completedLessons: 8934,
    avgSessionTime: "24 min",
    userGrowth: 12.5,
  }

  const userData = [
    {
      id: "USR001",
      username: "sarah_chen",
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      cefrLevel: "B2",
      lastLogin: "2024-01-15 14:30",
      loginCount: 127,
      joinDate: "2023-08-15",
      status: "Active",
      completedLessons: 45,
      totalStudyTime: "23h 45m",
    },
    {
      id: "USR002",
      username: "mike_johnson",
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      cefrLevel: "A2",
      lastLogin: "2024-01-15 09:15",
      loginCount: 89,
      joinDate: "2023-09-22",
      status: "Active",
      completedLessons: 32,
      totalStudyTime: "18h 20m",
    },
    {
      id: "USR003",
      username: "emma_wilson",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      cefrLevel: "C1",
      lastLogin: "2024-01-14 16:45",
      loginCount: 203,
      joinDate: "2023-06-10",
      status: "Active",
      completedLessons: 78,
      totalStudyTime: "45h 12m",
    },
    {
      id: "USR004",
      username: "david_kim",
      name: "David Kim",
      email: "david.kim@email.com",
      cefrLevel: "B1",
      lastLogin: "2024-01-13 11:20",
      loginCount: 156,
      joinDate: "2023-07-03",
      status: "Inactive",
      completedLessons: 56,
      totalStudyTime: "31h 08m",
    },
    {
      id: "USR005",
      username: "lisa_rodriguez",
      name: "Lisa Rodriguez",
      email: "lisa.rodriguez@email.com",
      cefrLevel: "A1",
      lastLogin: "2024-01-15 13:10",
      loginCount: 67,
      joinDate: "2023-10-18",
      status: "Active",
      completedLessons: 23,
      totalStudyTime: "12h 35m",
    },
    {
      id: "USR006",
      username: "alex_brown",
      name: "Alex Brown",
      email: "alex.brown@email.com",
      cefrLevel: "B2",
      lastLogin: "2024-01-12 08:30",
      loginCount: 98,
      joinDate: "2023-08-28",
      status: "Inactive",
      completedLessons: 41,
      totalStudyTime: "22h 15m",
    },
  ]

  const recentActivities = [
    { user: "Sarah Chen", activity: "Completed Advanced Grammar Quiz", time: "2 min ago", score: 95 },
    { user: "Mike Johnson", activity: "Finished Reading Passage: Business English", time: "5 min ago", score: 88 },
    { user: "Emma Wilson", activity: "AI Conversation Session", time: "8 min ago", score: 92 },
    { user: "David Kim", activity: "Word Scramble Game", time: "12 min ago", score: 100 },
    { user: "Lisa Rodriguez", activity: "Flashcard Review: Vocabulary Set 3", time: "15 min ago", score: 87 },
  ]

  const userStats = [
    { level: "A1 (Beginner)", count: 456, percentage: 16 },
    { level: "A2 (Elementary)", count: 623, percentage: 22 },
    { level: "B1 (Intermediate)", count: 789, percentage: 28 },
    { level: "B2 (Upper-Intermediate)", count: 534, percentage: 19 },
    { level: "C1 (Advanced)", count: 312, percentage: 11 },
    { level: "C2 (Proficient)", count: 133, percentage: 4 },
  ]

  const popularContent = [
    { title: "Basic Vocabulary Flashcards", users: 1234, completion: 89 },
    { title: "Business English Reading", users: 987, completion: 76 },
    { title: "Grammar Quiz: Present Tense", users: 856, completion: 92 },
    { title: "AI Conversation: Daily Life", users: 743, completion: 68 },
    { title: "Word Scramble: Animals", users: 621, completion: 95 },
  ]

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "activities", label: "Learning Activities", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const dailyLoginData = [
    { date: "Jan 8", logins: 245 },
    { date: "Jan 9", logins: 312 },
    { date: "Jan 10", logins: 289 },
    { date: "Jan 11", logins: 356 },
    { date: "Jan 12", logins: 423 },
    { date: "Jan 13", logins: 378 },
    { date: "Jan 14", logins: 445 },
    { date: "Jan 15", logins: 512 },
  ]

  console.log("[v0] Daily login data:", dailyLoginData)

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button>Add New User</Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>User List</CardTitle>
                <CardDescription>Comprehensive user data and management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">User ID</th>
                        <th className="text-left p-3 font-semibold">Username</th>
                        <th className="text-left p-3 font-semibold">Name</th>
                        <th className="text-left p-3 font-semibold">Email</th>
                        <th className="text-left p-3 font-semibold">CEFR Level</th>
                        <th className="text-left p-3 font-semibold">Last Login</th>
                        <th className="text-left p-3 font-semibold">Login Count</th>
                        <th className="text-left p-3 font-semibold">Join Date</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                        <th className="text-left p-3 font-semibold">Study Time</th>
                        <th className="text-left p-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((user, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono text-sm">{user.id}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-xs">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <span className="font-medium">{user.username}</span>
                            </div>
                          </td>
                          <td className="p-3 font-medium">{user.name}</td>
                          <td className="p-3 text-gray-600">{user.email}</td>
                          <td className="p-3">
                            <Badge
                              variant={
                                user.cefrLevel.startsWith("C")
                                  ? "default"
                                  : user.cefrLevel.startsWith("B")
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {user.cefrLevel}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-gray-600">{user.lastLogin}</td>
                          <td className="p-3">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                              {user.loginCount}
                            </span>
                          </td>
                          <td className="p-3 text-sm text-gray-600">{user.joinDate}</td>
                          <td className="p-3">
                            <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                          </td>
                          <td className="p-3 text-sm">
                            <div>
                              <div className="font-medium">{user.totalStudyTime}</div>
                              <div className="text-gray-500 text-xs">{user.completedLessons} lessons</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "activities":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Learning Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Flashcard Sessions</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quiz Completions</span>
                      <span className="font-semibold">1,923</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reading Exercises</span>
                      <span className="font-semibold">1,456</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AI Conversations</span>
                      <span className="font-semibold">987</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.slice(0, 5).map((activity, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-gray-600">{activity.activity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>User Registration</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Export</span>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Auto-approve Content</span>
                    <Button variant="outline" size="sm">
                      Disabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Backup Schedule</span>
                    <Button variant="outline" size="sm">
                      Daily
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Analytics Tracking</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Daily User Logins
                </CardTitle>
                <CardDescription>User login activity over the past 8 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyLoginData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#374151" }} axisLine={{ stroke: "#d1d5db" }} />
                      <YAxis tick={{ fontSize: 12, fill: "#374151" }} axisLine={{ stroke: "#d1d5db" }} />
                      <Bar dataKey="logins" fill="#3b82f6" radius={[4, 4, 0, 0]} stroke="#2563eb" strokeWidth={1} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />+{stats.userGrowth}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Activity className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
                  <p className="text-xs text-gray-600 mt-1">
                    {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total users
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
                  <BookOpen className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completedLessons.toLocaleString()}</div>
                  <p className="text-xs text-gray-600 mt-1">Across {stats.totalLessons} available lessons</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Session Time</CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgSessionTime}</div>
                  <p className="text-xs text-gray-600 mt-1">Per learning session</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Distribution by CEFR Level */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    User Distribution by CEFR Level
                  </CardTitle>
                  <CardDescription>Current distribution of users across proficiency levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{stat.level}</span>
                        <span className="text-sm text-gray-600">{stat.count} users</span>
                      </div>
                      <Progress value={stat.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Most Popular Content
                  </CardTitle>
                  <CardDescription>Top performing lessons and activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {popularContent.map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{content.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {content.users} users • {content.completion}% completion rate
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-3">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                  Recent Learning Activities
                </CardTitle>
                <CardDescription>Latest user interactions and completions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {activity.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{activity.user}</p>
                          <p className="text-gray-600 text-xs">{activity.activity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={activity.score >= 90 ? "default" : activity.score >= 80 ? "secondary" : "outline"}
                        >
                          {activity.score}%
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                  activeSection === item.id ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" : "text-gray-700"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 lg:ml-0">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {menuItems.find((item) => item.id === activeSection)?.label || "Dashboard"}
                </h1>
                <p className="text-gray-600 mt-2">Monitor platform performance and user engagement</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Reports
              </Button>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  )
}
