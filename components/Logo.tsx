import Image from "next/image";

type LogoProps = {
  name: string;
  alt: string;
  size?: number;
  showName?: boolean;
};

export function Logo({ name, alt, size = 36, showName = true }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <Image
        src="/logo-iq-256.png"
        alt={alt}
        width={size}
        height={size}
        className="rounded-[10px] ring-1 ring-line-strong"
        priority
      />
      {showName && (
        <span className="font-display text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-fg">
          {name}
        </span>
      )}
    </span>
  );
}
