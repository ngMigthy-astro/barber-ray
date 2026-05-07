interface SectionHeaderProps {
  title: string;
  subtitle: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 md:mb-24 ${centered ? "text-center" : "text-left"}`}>
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-2xs font-black uppercase tracking-mega mb-6 ${centered ? "mx-auto" : ""}`}>
        {subtitle}
      </div>
      <h2 className="text-5xl md:text-7xl font-black text-gradient leading-ultra-tight">
        {title}
      </h2>
    </div>
  );
}
