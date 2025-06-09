"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Clock
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  const salaryData = insights?.salaryRanges.map((range) => ({
    name: range.name,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };
  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffic: true }
  );

  return (
    <div className="space-y-8">
      {/* Header with last updated */}
      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className="px-3 py-1.5 text-sm font-medium bg-muted/50"
        >
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          Last updated: {lastUpdatedDate}
        </Badge>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">
              MARKET OUTLOOK
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {insights.marketOutlook}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Next update in {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">
              INDUSTRY GROWTH
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {insights.growthRate.toFixed(1)}%
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Progress
                value={insights.growthRate}
                className="h-2 [&>div]:bg-emerald-500"
              />
              <span className="text-xs text-muted-foreground">YoY</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">
              DEMAND LEVEL
            </CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {insights.demandLevel}
            </div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">
              TOP SKILLS
            </CardTitle>
            <Brain className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.topSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-2.5 py-1 text-xs font-medium"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Salary Ranges by Role</CardTitle>
          <CardDescription className="text-sm">
            Comparison of minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salaryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={(value) => `$${value}K`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-lg">
                          <p className="font-medium text-sm mb-1">{label}</p>
                          <div className="space-y-1">
                            {payload.map((item) => (
                              <div
                                key={item.name}
                                className="flex items-center"
                              >
                                <div
                                  className="w-2 h-2 rounded-full mr-2"
                                  style={{ backgroundColor: item.color }}
                                />
                                <p className="text-sm font-medium">
                                  {item.name}:{" "}
                                  <span className="text-primary">
                                    ${item.value}K
                                  </span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="min"
                  fill="#94a3b8"
                  name="Min Salary"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="median"
                  fill="#64748b"
                  name="Median Salary"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="max"
                  fill="#475569"
                  name="Max Salary"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends and Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Key Industry Trends</CardTitle>
            <CardDescription className="text-sm">
              Current trends shaping the industry landscape
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span className="text-sm leading-relaxed">{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Recommended Skills</CardTitle>
            <CardDescription className="text-sm">
              High-value skills to focus on developing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="px-3 py-1 text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
