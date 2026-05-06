import { SiteConfig } from "@/components/builder/siteGenerator";
import Icon from "@/components/ui/icon";

interface Props {
  site: SiteConfig | null;
  mode: "desktop" | "mobile";
}

export default function PreviewPanel({ site, mode }: Props) {
  if (!site) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl border-2 border-dashed border-white/15 flex items-center justify-center">
            <Icon name="Globe" size={32} className="text-white/20" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center">
            <Icon name="Sparkles" size={10} className="text-violet-400" />
          </div>
        </div>
        <div>
          <p className="text-white/30 font-medium">Здесь появится превью сайта</p>
          <p className="text-white/15 text-sm mt-1">Опиши идею в чате слева</p>
        </div>
        <div className="grid grid-cols-3 gap-2 w-full max-w-xs mt-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-lg bg-white/3 border border-white/5 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const bg = site.darkMode ? "#0a0a14" : "#ffffff";
  const fg = site.darkMode ? "#e2e8f0" : "#111827";
  const cardBg = site.darkMode ? "#13131f" : "#f9fafb";
  const borderColor = site.darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const mutedColor = site.darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";

  const wrapper = mode === "mobile"
    ? "flex items-start justify-center py-6 overflow-y-auto h-full"
    : "flex items-start justify-center overflow-y-auto h-full";

  const frameStyle = mode === "mobile"
    ? { width: 375, minHeight: 667, flexShrink: 0 }
    : { width: "100%", minHeight: "100%" };

  const content = (
    <div
      style={{
        ...frameStyle,
        backgroundColor: bg,
        color: fg,
        fontFamily: `'${site.font}', sans-serif`,
      }}
    >
      {/* Nav */}
      <nav
        style={{
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${borderColor}`,
          position: "sticky",
          top: 0,
          backgroundColor: bg,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${site.primaryColor}, ${site.secondaryColor})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 12,
            }}
          >
            {site.logo}
          </div>
          <span style={{ fontWeight: 700, fontSize: 16 }}>{site.title}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Услуги", "О нас", "Контакты"].map((link) => (
            <span
              key={link}
              style={{ fontSize: 13, color: mutedColor, padding: "4px 8px", cursor: "pointer" }}
            >
              {link}
            </span>
          ))}
        </div>
      </nav>

      {/* Sections */}
      {site.sections.map((section, idx) => {
        if (section.type === "hero") {
          return (
            <div
              key={idx}
              style={{
                padding: mode === "mobile" ? "48px 24px" : "72px 48px",
                background: `linear-gradient(135deg, ${site.primaryColor}22, ${site.secondaryColor}11)`,
                borderBottom: `1px solid ${borderColor}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 240,
                  height: 240,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${site.primaryColor}30, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 100,
                  background: `${site.primaryColor}20`,
                  color: site.primaryColor,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 16,
                  border: `1px solid ${site.primaryColor}30`,
                }}
              >
                ✦ {site.tagline}
              </div>
              <h1
                style={{
                  fontSize: mode === "mobile" ? 28 : 40,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: 16,
                  whiteSpace: "pre-line",
                }}
              >
                {section.title}
              </h1>
              {section.subtitle && (
                <p style={{ fontSize: 16, color: mutedColor, marginBottom: 28, lineHeight: 1.6 }}>
                  {section.subtitle}
                </p>
              )}
              {section.cta && (
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    style={{
                      padding: "12px 24px",
                      borderRadius: 10,
                      background: `linear-gradient(135deg, ${site.primaryColor}, ${site.secondaryColor})`,
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {section.cta}
                  </button>
                  <button
                    style={{
                      padding: "12px 24px",
                      borderRadius: 10,
                      background: "transparent",
                      color: fg,
                      fontWeight: 600,
                      fontSize: 14,
                      border: `1px solid ${borderColor}`,
                      cursor: "pointer",
                    }}
                  >
                    Подробнее
                  </button>
                </div>
              )}
            </div>
          );
        }

        if (section.type === "about") {
          return (
            <div
              key={idx}
              style={{ padding: mode === "mobile" ? "36px 24px" : "56px 48px", borderBottom: `1px solid ${borderColor}` }}
            >
              <SectionTag color={site.primaryColor}>О нас</SectionTag>
              <h2 style={{ fontSize: mode === "mobile" ? 22 : 28, fontWeight: 700, marginBottom: 12 }}>
                {section.title}
              </h2>
              {section.subtitle && (
                <p style={{ color: mutedColor, lineHeight: 1.7, fontSize: 15, maxWidth: 600 }}>
                  {section.subtitle}
                </p>
              )}
            </div>
          );
        }

        if (section.type === "services" || section.type === "portfolio") {
          return (
            <div
              key={idx}
              style={{
                padding: mode === "mobile" ? "36px 24px" : "56px 48px",
                borderBottom: `1px solid ${borderColor}`,
                backgroundColor: idx % 2 === 0 ? "transparent" : (site.darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"),
              }}
            >
              <SectionTag color={site.primaryColor}>{section.type === "services" ? "Услуги" : "Работы"}</SectionTag>
              <h2 style={{ fontSize: mode === "mobile" ? 22 : 28, fontWeight: 700, marginBottom: 24 }}>
                {section.title}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: mode === "mobile" ? "1fr" : "repeat(3, 1fr)",
                  gap: 16,
                }}
              >
                {section.items?.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      padding: "20px",
                      borderRadius: 12,
                      backgroundColor: cardBg,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    {item.icon && (
                      <div
                        style={{
                          fontSize: 24,
                          marginBottom: 10,
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          background: `${site.primaryColor}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </div>
                    )}
                    <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 15 }}>{item.title}</div>
                    <div style={{ color: mutedColor, fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (section.type === "faq") {
          return (
            <div
              key={idx}
              style={{ padding: mode === "mobile" ? "36px 24px" : "56px 48px", borderBottom: `1px solid ${borderColor}` }}
            >
              <SectionTag color={site.primaryColor}>FAQ</SectionTag>
              <h2 style={{ fontSize: mode === "mobile" ? 22 : 28, fontWeight: 700, marginBottom: 24 }}>
                {section.title}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {section.items?.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      padding: "16px 20px",
                      borderRadius: 10,
                      backgroundColor: cardBg,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{item.title}</div>
                    <div style={{ color: mutedColor, fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (section.type === "contact") {
          return (
            <div
              key={idx}
              style={{
                padding: mode === "mobile" ? "36px 24px" : "56px 48px",
                textAlign: "center",
                background: `linear-gradient(135deg, ${site.primaryColor}15, ${site.secondaryColor}08)`,
              }}
            >
              <SectionTag color={site.primaryColor}>Контакты</SectionTag>
              <h2 style={{ fontSize: mode === "mobile" ? 22 : 32, fontWeight: 700, marginBottom: 12 }}>
                {section.title}
              </h2>
              {section.subtitle && (
                <p style={{ color: mutedColor, marginBottom: 24, fontSize: 15 }}>{section.subtitle}</p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 360, margin: "0 auto" }}>
                <input
                  placeholder="Ваше имя"
                  style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: site.darkMode ? "rgba(255,255,255,0.06)" : "#fff",
                    color: fg,
                    fontSize: 14,
                    outline: "none",
                  }}
                />
                <input
                  placeholder="Телефон или email"
                  style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: site.darkMode ? "rgba(255,255,255,0.06)" : "#fff",
                    color: fg,
                    fontSize: 14,
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    padding: "13px",
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${site.primaryColor}, ${site.secondaryColor})`,
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 15,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {section.cta || "Отправить"}
                </button>
              </div>
            </div>
          );
        }

        return null;
      })}

      {/* Footer */}
      <div
        style={{
          padding: "20px 24px",
          textAlign: "center",
          borderTop: `1px solid ${borderColor}`,
          fontSize: 13,
          color: mutedColor,
        }}
      >
        © 2025 {site.title} · Сделано с ❤️
      </div>
    </div>
  );

  return (
    <div className={wrapper}>
      {mode === "mobile" ? (
        <div
          style={{
            border: "2px solid rgba(255,255,255,0.12)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            ...frameStyle,
          }}
        >
          {content}
        </div>
      ) : (
        content
      )}
    </div>
  );
}

function SectionTag({ color, children }: { color: string; children: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 100,
        background: `${color}18`,
        color,
        fontSize: 11,
        fontWeight: 700,
        marginBottom: 10,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}
