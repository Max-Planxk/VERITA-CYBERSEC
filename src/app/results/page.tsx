"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GuidancePanel } from "@/components/GuidancePanel";

// Mock Data
const MOCK_RESULT = {
  score: 82, // High risk
  level: "HIGH RISK" as "HIGH RISK" | "SUSPICIOUS" | "SAFE",
  indicators: [
    { name: "Manipulation Probability", value: 87 },
    { name: "Face Swap Detection", value: 92 },
    { name: "Metadata Anomalies", value: 65 },
    { name: "Reverse Image Similarity", value: 40 },
  ],
};

export default function ResultsPage() {
  const [progress, setProgress] = useState(0);
  
  // Fake animation of the progress bar
  useEffect(() => {
    const timer = setTimeout(() => setProgress(MOCK_RESULT.score), 500);
    return () => clearTimeout(timer);
  }, []);

  const isHighRisk = MOCK_RESULT.level === "HIGH RISK";
  const isSuspicious = MOCK_RESULT.level === "SUSPICIOUS";
  const isSafe = MOCK_RESULT.level === "SAFE";

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis Report</h1>
          <p className="text-zinc-400">Review the deepfake detection results.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/upload">Analyze Another Scan</Link>
          </Button>
          <Button onClick={() => window.print()} className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Image & Score */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur">
            <div className="aspect-square bg-zinc-900 relative">
              {/* Dummy Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                Uploaded Image Preview
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-zinc-400">Risk Assessment</span>
                <Badge
                  variant={isHighRisk ? "destructive" : isSuspicious ? "default" : "secondary"}
                  className={`
                    ${isHighRisk ? "bg-destructive/20 text-destructive border-transparent" : ""}
                    ${isSuspicious ? "bg-yellow-500/20 text-yellow-500 border-transparent hover:bg-yellow-500/20" : ""}
                    ${isSafe ? "bg-emerald-500/20 text-emerald-500 border-transparent" : ""}
                  `}
                >
                  {isHighRisk && <ShieldAlert className="w-3 h-3 mr-1" />}
                  {isSuspicious && <AlertTriangle className="w-3 h-3 mr-1" />}
                  {isSafe && <ShieldCheck className="w-3 h-3 mr-1" />}
                  {MOCK_RESULT.level}
                </Badge>
              </div>
              <div className="flex items-end gap-2 my-4">
                <span className="text-5xl font-bold tracking-tighter">{MOCK_RESULT.score}</span>
                <span className="text-xl text-zinc-500 mb-1">/ 100</span>
              </div>
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details & Guidance */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Detection Indicators</CardTitle>
              <CardDescription>Breakdown of synthetic media markers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {MOCK_RESULT.indicators.map((indicator, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{indicator.name}</span>
                    <span className="text-zinc-400">{indicator.value}%</span>
                  </div>
                  <Progress value={indicator.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {(isHighRisk || isSuspicious) && <GuidancePanel />}
        </div>
      </div>
    </div>
  );
}
