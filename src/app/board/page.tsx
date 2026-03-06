import Image from "next/image";
import Link from "next/link";

const BOARD_MEMBERS = [
  {
    name: "Director One",
    title: "Co-Founder & President",
    image: "/board-member-1.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    name: "Director Two",
    title: "Co-Founder & Vice President",
    image: "/board-member-2.jpg",
    bio: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
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
                <p className="text-text-secondary text-base leading-relaxed font-[family-name:var(--font-body)]">
                  {member.bio}
                </p>
              </div>
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
