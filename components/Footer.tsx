import { Mail } from "lucide-react";
import type { Dictionary } from "@/content";
import { site, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";
import { WhatsAppIcon, InstagramIcon, LinkedInIcon, FacebookIcon } from "./icons";

const socialIcons = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
};

export function Footer({ t }: { t: Dictionary }) {
  const f = t.footer;
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-ink-950 pb-28 pt-16 md:pb-12">
      <div className="container-iq">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo name={t.brand.name} alt={t.brand.logoAlt} size={40} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">{f.tagline}</p>
          </div>

          <nav aria-label={f.linksTitle}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-subtle">{f.linksTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {t.nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-fg-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-subtle">{f.contactTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={whatsappLink(t.whatsapp.defaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-mint-400"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>
                    <span className="sr-only">{f.whatsappLabel}: </span>
                    {site.whatsappDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${f.email}`}
                  className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-mint-400"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  <span>
                    <span className="sr-only">{f.emailLabel}: </span>
                    {f.email}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-subtle">{f.socialTitle}</h2>
            <ul className="mt-4 flex gap-3">
              {f.social.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      aria-label={s.name}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-colors hover:border-mint-400/50 hover:text-mint-400"
                    >
                      <Icon className="h-[1.1rem] w-[1.1rem]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t.brand.name}. {f.rights}
          </p>
          <p className="font-display tracking-[0.2em]">{t.brand.short}</p>
        </div>
      </div>
    </footer>
  );
}
