import { SiteConfig } from "@/components/builder/siteGenerator";
import Icon from "@/components/ui/icon";

interface Props {
  site: SiteConfig | null;
  onChange: (updates: Partial<SiteConfig>) => void;
}

const COLORS = [
  "#7c3aed", "#db2777", "#0ea5e9", "#10b981",
  "#f59e0b", "#ef4444", "#ec4899", "#06b6d4",
];

const FONTS = ["Golos Text", "Oswald", "Montserrat", "Rubik", "IBM Plex Sans"];

export default function SettingsPanel({ site, onChange }: Props) {
  if (!site) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
        <Icon name="Settings" size={28} className="text-white/20" />
        <p className="text-white/30 text-sm">Сначала сгенерируй сайт в чате</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full p-4 space-y-6">
      {/* Title */}
      <div>
        <label className="settings-label">Название сайта</label>
        <input
          className="settings-input"
          value={site.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>

      {/* Tagline */}
      <div>
        <label className="settings-label">Слоган</label>
        <input
          className="settings-input"
          value={site.tagline}
          onChange={(e) => onChange({ tagline: e.target.value })}
        />
      </div>

      {/* Primary Color */}
      <div>
        <label className="settings-label">Основной цвет</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ primaryColor: c })}
              className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: c,
                borderColor: site.primaryColor === c ? "#fff" : "transparent",
                boxShadow: site.primaryColor === c ? `0 0 0 2px ${c}` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Secondary Color */}
      <div>
        <label className="settings-label">Акцентный цвет</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ secondaryColor: c })}
              className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: c,
                borderColor: site.secondaryColor === c ? "#fff" : "transparent",
                boxShadow: site.secondaryColor === c ? `0 0 0 2px ${c}` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Font */}
      <div>
        <label className="settings-label">Шрифт</label>
        <div className="space-y-1.5">
          {FONTS.map((f) => (
            <button
              key={f}
              onClick={() => onChange({ font: f })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors border ${
                site.font === f
                  ? "border-violet-500/60 bg-violet-500/15 text-white"
                  : "border-white/8 bg-white/4 text-white/50 hover:text-white/80 hover:bg-white/8"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Dark mode */}
      <div>
        <label className="settings-label">Тема</label>
        <div className="flex gap-2">
          <button
            onClick={() => onChange({ darkMode: true })}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm border transition-colors ${
              site.darkMode
                ? "border-violet-500/60 bg-violet-500/15 text-white"
                : "border-white/8 bg-white/4 text-white/40 hover:text-white/70"
            }`}
          >
            <Icon name="Moon" size={14} />
            Тёмная
          </button>
          <button
            onClick={() => onChange({ darkMode: false })}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm border transition-colors ${
              !site.darkMode
                ? "border-violet-500/60 bg-violet-500/15 text-white"
                : "border-white/8 bg-white/4 text-white/40 hover:text-white/70"
            }`}
          >
            <Icon name="Sun" size={14} />
            Светлая
          </button>
        </div>
      </div>

      {/* Sections */}
      <div>
        <label className="settings-label">Разделы</label>
        <div className="space-y-1.5">
          {site.sections.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/4 border border-white/8"
            >
              <Icon name="GripVertical" size={14} className="text-white/25" />
              <span className="text-sm text-white/70 flex-1 capitalize">
                {{
                  hero: "Главный экран",
                  about: "О нас",
                  services: "Услуги",
                  portfolio: "Портфолио",
                  contact: "Контакты",
                  faq: "FAQ",
                }[s.type] || s.type}
              </span>
              <Icon name="Check" size={14} className="text-violet-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
