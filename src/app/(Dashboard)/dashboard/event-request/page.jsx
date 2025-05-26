'use client'
import React, { useState } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { 
  Clock,
  Download,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Star,
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { dummyData } from '../_components/dummyData'

export default function EventRequest() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [timeFilter, setTimeFilter] = useState("30")

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-sm">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm">
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-sm">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500"
      case "cancelled":
        return "bg-red-500" 
      case "pending":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredEvents = dummyData.filter((event) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "approved" && event.status === "completed") ||
      (activeTab === "pending" && event.status === "pending") ||
      (activeTab === "rejected" && event.status === "cancelled")

    return matchesTab
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      year: date.getFullYear(),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleViewDetails = (eventId) => {
    router.push(`/dashboard/event-request/${eventId}`)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6  min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Event Management Dashboard
          </h1>
          <p className="text-gray-600">Comprehensive event tracking and analytics</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
          <Button variant="outline" className="shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters and Table */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto bg-gray-100">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  All history
                </TabsTrigger>
                <TabsTrigger value="approved" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Approved
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Pending
                </TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Rejected
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full sm:w-40 shadow-sm">
                <Clock className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100 bg-gray-50/50">
                  <TableHead className="font-semibold text-gray-900 w-[120px]">Date</TableHead>
                  <TableHead className="font-semibold text-gray-900 w-[40%]">Event Details</TableHead>
                  <TableHead className="font-semibold text-gray-900 w-[15%]">Phone Number</TableHead>
                  <TableHead className="font-semibold text-gray-900 w-[100px]">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => {
                  const dateInfo = formatDate(event.submittedDate)
                  return (
                    <TableRow
                      key={event.id}
                      className="border-gray-50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-200 group cursor-pointer"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                              <span className="text-sm font-bold text-gray-900">{dateInfo.day}</span>
                              <span className="text-xs text-gray-600">{dateInfo.month}</span>
                            </div>
                            <div
                              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(event.status)}`}
                            />
                          </div>
                          <div className="hidden sm:block">
                            <div className="text-xs text-gray-500">{dateInfo.weekday}</div>
                            <div className="text-xs text-gray-400">{dateInfo.year}</div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-4 max-w-md">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                                {event.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                {event.name}
                              </div>
                              <div className="text-xs text-gray-500">by {event.organizer}</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 line-clamp-2 max-w-md">{event.description}</div>
                        </div>
                      </TableCell>

                      <TableCell className="py-4">
                        <div className="text-sm text-gray-600">{event.phone || 'N/A'}</div>
                      </TableCell>

                      <TableCell className="py-4">{getStatusBadge(event.status)}</TableCell>

                      <TableCell className="py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:bg-blue-500 hover:text-white bg-gray-50 shadow-sm font-semibold"
                            onClick={() => handleViewDetails(event.id)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>

                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center text-sm text-gray-600 px-2">
        <span>
          Showing {filteredEvents.length} of {dummyData.length} events
        </span>
      </div>
    </div>
  )
}
