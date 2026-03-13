import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileText, Phone, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function GuidancePanel() {
  return (
    <Card className="border-destructive/30 bg-destructive/5 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Recommended Actions
        </CardTitle>
        <CardDescription className="text-zinc-300">
          We detected a high probability of manipulation. Here is what you can do next.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionItem
            icon={<FileText className="w-4 h-4" />}
            title="Save Evidence"
            description="Take screenshots of where the image was posted and download this report."
          />
          <ActionItem
            icon={<AlertCircle className="w-4 h-4" />}
            title="Report Misuse"
            description="Report the post directly to the social media platform where it was found."
          />
          <ActionItem
            icon={<Settings className="w-4 h-4" />}
            title="Update Privacy"
            description="Review and strengthen your social media privacy settings."
          />
          <ActionItem
            icon={<Phone className="w-4 h-4" />}
            title="Contact Authorities"
            description="If you feel threatened, contact local cybercrime authorities."
          />
        </div>
        <div className="pt-4 mt-4 border-t border-border">
          <p className="text-sm text-zinc-400 mb-3">
            Have questions about your safety online? Talk to our AI Safety Assistant.
          </p>
          <Button variant="secondary" className="w-full sm:w-auto" asChild>
            <Link href="#chat">Ask AI Safety Assistant</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex gap-3 p-3 rounded-lg bg-background/40 border border-border/50">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div>
        <h4 className="font-medium text-sm mb-1">{title}</h4>
        <p className="text-xs text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
