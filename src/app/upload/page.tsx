"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadBox } from "@/components/UploadBox";
import { LoadingAnalysis } from "@/components/LoadingAnalysis";

export default function UploadPage() {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate an API call
    setTimeout(() => {
      // Navigate to results page after analysis
      // In a real app, you would pass the id or file data
      router.push(`/results`);
    }, 4000); // 4 seconds of animation
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 md:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">Scan Image</h1>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Upload an image below to run our DeepFake Identity Guard analysis. 
          We'll check for synthetic generation markers, face swaps, and metadata anomalies.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {!isAnalyzing ? (
          <UploadBox onAnalyze={handleAnalyze} />
        ) : (
          <LoadingAnalysis />
        )}
      </div>
    </div>
  );
}
