import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Search, LockKeyhole, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AIChat } from "@/components/AIChat";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex-1 flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        {/* Animated background gradient aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
        
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Advanced AI Detection System
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Protect Your Identity from DeepFake Misuse
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
            With the rise of generative AI, your digital likeness is at risk. 
            Upload an image to detect potential manipulations and secure your online presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Link href="/upload">Upload Image for Analysis</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 bg-zinc-950/50 border-t border-border">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Platform Capabilities</h2>
            <p className="max-w-[900px] text-zinc-400 md:text-lg">
              Comprehensive tools designed to analyze, detect, and protect your digital identity against synthetic media threats.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<ShieldAlert className="h-10 w-10 text-primary mb-4" />}
              title="Deepfake Detection"
              description="Identify potential image manipulation, face swaps, or synthetic content indicators using advanced algorithms."
            />
            <FeatureCard 
              icon={<Search className="h-10 w-10 text-primary mb-4" />}
              title="Reverse Image Search"
              description="Discover potential duplicate or altered versions of your images circulating across the web."
            />
            <FeatureCard 
              icon={<LockKeyhole className="h-10 w-10 text-primary mb-4" />}
              title="Privacy Protection"
              description="We do not store your images. All analysis is done securely and privately."
            />
            <FeatureCard 
              icon={<Lightbulb className="h-10 w-10 text-primary mb-4" />}
              title="Safety Guidance"
              description="Receive actionable steps on what to do if you suspect your identity is being misused online."
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Still Have Questions?</h2>
              <p className="text-zinc-400 md:text-lg">
                Our AI Safety Assistant is here to provide guidance and answer any questions you might have about online safety, deepfakes, and protecting your digital identity.
              </p>
              <ul className="space-y-2 mt-4 text-zinc-300">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Ask about how to report misuse
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Learn about managing digital privacy
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Get step-by-step guidance
                </li>
              </ul>
            </div>
            
            <div className="w-full max-w-md mx-auto lg:mx-0">
               <AIChat />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors duration-300">
      <CardHeader>
        {icon}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-zinc-400">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
