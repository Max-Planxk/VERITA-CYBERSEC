import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-primary">
          <ShieldCheck className="h-6 w-6" />
          <span>IdentityGuard</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/upload" className="text-sm font-medium hover:text-primary transition-colors">
            Analyze Image
          </Link>
        </div>
      </div>
    </nav>
  );
}
