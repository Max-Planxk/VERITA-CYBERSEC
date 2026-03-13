"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  "Uploading Image",
  "Running DeepFake Detection",
  "Checking Image Similarity",
  "Generating Risk Report",
];

export function LoadingAnalysis() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Advance progress roughly every 1000ms
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full bg-card/50 backdrop-blur border-border/50">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
          Analyzing Media...
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6 max-w-sm mx-auto">
          {steps.map((step, index) => {
            const isCompleted = currentStep > index;
            const isCurrent = currentStep === index;
            const isPending = currentStep < index;

            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 ${
                  isCurrent ? "text-primary" : isCompleted ? "text-muted-foreground" : "text-zinc-600"
                }`}
              >
                <div className="relative">
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </motion.div>
                  ) : isCurrent ? (
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  ) : (
                    <CircleDashed className="w-6 h-6" />
                  )}
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute top-8 left-[11px] w-[2px] h-6 -translate-y-1 ${
                        isCompleted ? "bg-emerald-500/50" : "bg-border"
                      }`}
                    />
                  )}
                </div>
                <span className={`font-medium ${isCurrent ? "text-lg" : "text-base"}`}>
                  {step}
                </span>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
