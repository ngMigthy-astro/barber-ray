import { UserCircle2 } from "lucide-react";
import { LuInstagram } from "react-icons/lu";
import SectionHeader from "../shared/ui/SectionHeader";
import StarRating from "../shared/ui/StarRating";

interface TeamMember {
  name: string;
  role: string;
  image_url?: string;
  instagram: string;
  rating: number;
  reviews?: number;
  specialties: string[];
}

interface TeamProps {
  readonly members: TeamMember[];
  readonly config: {
    readonly title: string;
    readonly subtitle: string;
  };
}

export default function Team({ members = [], config }: TeamProps) {
  return (
    <section id="team" className="py-24 bg-bg px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title={config.title}
          subtitle={config.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member.name}
              className="bg-surface rounded-2xl p-6 flex flex-col items-center text-center gap-4 border border-surface hover:border-primary transition-colors group"
            >
              <div className="w-24 h-24 rounded-full bg-bg border-2 border-primary overflow-hidden flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {member.image_url ? (
                  <img 
                    src={member.image_url} 
                    alt={member.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <UserCircle2 className="w-14 h-14" />
                )}
              </div>

              <div>
                <h3 className="text-xl font-black group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-primary text-sm font-medium">
                  {member.role}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <StarRating rating={member.rating} />
                <p className="text-text-muted text-xs">
                  {member.rating.toFixed(1)} · {member.reviews} reseñas
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {member.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="text-xs bg-bg text-primary border border-primary px-3 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <a
                href={`https://instagram.com/${member.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mt-auto"
              >
                <LuInstagram className="w-4 h-4" />
                {member.instagram}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
