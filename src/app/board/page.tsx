import Image from "next/image";
import Link from "next/link";

const BOARD_MEMBERS = [
  {
    name: "Everett Nate Yockey",
    title: "Co-Founder & Chief Creative Officer",
    image: "/board-member-1.jpg",
    bio: "Everett Nate Yockey is a Director and Cinematographer based in Portland, Oregon. With an eye for cinematic storytelling and a background spanning commercial brand work and narrative film, Everett brings a considered, visual-first approach to every project. He works with brands, agencies, and filmmakers across Portland, Seattle, and the broader Pacific Northwest and beyond.\n\nAvailable for commercial campaigns, branded content, short films, and feature work. Get in touch to collaborate.",
    linkedin: "https://www.linkedin.com/in/everettyockey/",
  },
  {
    name: "Ben Posedel",
    title: "Co-Founder & Chief Operating Officer",
    image: "/board-member-2.jpg",
    bio: "Senior Program Manager/Producer\nSenior Program Manager with 14+ Years Leading Cross-Functional Teams and Managing Data-Driven Projects. Beginning with ideation for client pitches all the way to delivery of projects on time and on budget and everything in between all the while maintaining positive working relationships.",
    linkedin: "https://www.linkedin.com/in/ben-posedel-846a1115",
  },
];

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Back link */}
        <Link
          href="/"
          className="text-text-muted text-sm tracking-[0.1em] uppercase hover:text-foreground transition-colors flex items-center gap-2 font-[family-name:var(--font-body)] mb-12"
        >
          &larr; Back
        </Link>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/wabodogs-logo-color.png"
            alt="WABO DOGS"
            width={400}
            height={80}
            className="w-[200px] md:w-[300px]"
          />
        </div>

        {/* Title */}
        <h1 className="text-foreground text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-bold text-center mb-2">
          Board of Directors
        </h1>
        <p className="text-text-muted text-xs tracking-[0.2em] uppercase text-center mb-16 font-[family-name:var(--font-heading)]">
          Leadership Team
        </p>

        {/* Board Members */}
        <div className="space-y-16">
          {BOARD_MEMBERS.map((member, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              {/* Photo */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="relative aspect-square w-full max-w-[280px] mx-auto md:mx-0 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1">
                <h2 className="text-foreground text-xl font-[family-name:var(--font-heading)] font-bold mb-1">
                  {member.name}
                </h2>
                <p className="text-text-muted text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-heading)] mb-4">
                  {member.title}
                </p>
                <div className="text-text-secondary text-base leading-relaxed font-[family-name:var(--font-body)] space-y-3">
                  {member.bio.split("\n\n").map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))}
                </div>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-text-muted hover:text-foreground transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-sm font-[family-name:var(--font-heading)] tracking-wider uppercase">
                      LinkedIn
                    </span>
                  </a>
                )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-text-muted text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)]">
            WABO DOGS Sports and Leisure Club
          </p>
        </div>
      </div>
    </div>
  );
}
