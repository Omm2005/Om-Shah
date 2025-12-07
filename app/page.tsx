
import SideNav from "@/components/SideNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import ProjectList from "@/components/ProjectList";
import VaultList from "@/components/VaultList";
import KindWords from "@/components/KindWords";
import AboutContent from "@/content/about.mdx";
import navigation from "@/content/navigation.json";
import socialLinks from "@/content/social.json";

export default function Home() {
  return (
    <>
      <main className="flex flex-col min-h-screen w-full py-2 px-4 md:px-6 lg:px-10">
        <div className="space-y-6 pt-10 min-h-screen w-full max-w-3xl mx-auto" id="about">
          {/* Name */}
          <h1 className="text-4xl font-medium flex items-center gap-3 leading-tight">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/pfp.jpg" />
              <AvatarFallback>OS</AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <div className="text-sm text-foreground/60 hidden sm:block">Hi, I&apos;m</div>
              <div className="flex items-baseline sm:gap-1 flex-wrap">
                <span className="text-foreground">Om Shah</span>
                <span className="text-foreground/60 text-base">(ओम शाह)</span>
              </div>
            </div>
          </h1>

          {/* Bio */}
          <AboutContent />
          <div className="flex items-center gap-4 pt-2">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity hover:underline hover:underline-offset-2"
              >
                <Image
                  src={link.iconLight}
                  alt={link.label}
                  width={20}
                  height={20}
                  className="block dark:hidden"
                />
                <Image
                  src={link.iconDark}
                  alt={link.label}
                  width={20}
                  height={20}
                  className="hidden dark:block"
                />
                <span className="text-foreground/80 text-sm hidden sm:block">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="min-h-screen flex flex-col justify-center py-10 w-full max-w-4xl mx-auto" id="projects">
          <h2 className="text-xl font-semibold text-foreground mb-6 px-3">
            Projects
          </h2>
          <ProjectList />
        </div>
        <div className="min-h-screen flex flex-col justify-center py-10 w-full max-w-4xl mx-auto mb-5 sm:mb-0" id="vault">
          <h2 className="text-xl font-semibold text-foreground mb-6 px-4">
            Vault
          </h2>
          <VaultList />
        </div>
        <div className="w-full max-w-4xl mx-auto py-8 h-screen flex flex-col justify-center" id="kind-words">
          <h2 className="text-xl font-semibold text-foreground mb-6 px-4">
            Kind Words
          </h2>
          <KindWords />
        </div>
      </main>
      <SideNav items={navigation.sidebar} />
    </>
  );
}
