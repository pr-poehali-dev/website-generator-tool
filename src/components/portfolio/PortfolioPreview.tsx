import { PortfolioData, Theme } from "@/components/PortfolioGenerator";
import Icon from "@/components/ui/icon";

interface Props {
  data: PortfolioData;
  theme: Theme;
  onBack: () => void;
}

export default function PortfolioPreview({ data, theme, onBack }: Props) {
  const { about, projects, accentColor } = data;

  const handleCopy = () => {
    const json = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(json);
  };

  return (
    <div className="animate-fade-in-up pt-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Готово!</h2>
          <p className="text-muted-foreground text-sm">Вот как выглядит твоё портфолио</p>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          <Icon name="ArrowLeft" size={15} />
          Изменить
        </button>
      </div>

      <div
        className="rounded-2xl overflow-hidden border border-border shadow-2xl"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        <div
          className="relative px-8 py-12 text-white overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${accentColor}cc, ${accentColor}44)`,
            backgroundColor: theme === "dark" ? "#0f0f1a" : "#1a1a2e",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${accentColor} 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ec4899 0%, transparent 50%)`,
            }}
          />

          <div className="relative flex items-center gap-6">
            {about.avatar ? (
              <img
                src={about.avatar}
                alt={about.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white/20 flex-shrink-0"
              />
            ) : (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white/20 flex-shrink-0"
                style={{ backgroundColor: `${accentColor}44` }}
              >
                {about.name ? about.name[0].toUpperCase() : "?"}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold mb-1">{about.name || "Имя не указано"}</h1>
              <p className="text-white/80 text-lg">{about.title || "Специализация"}</p>
              <div className="flex gap-3 mt-3">
                {about.email && (
                  <a href={`mailto:${about.email}`} className="text-white/60 hover:text-white transition-colors">
                    <Icon name="Mail" size={16} />
                  </a>
                )}
                {about.telegram && (
                  <span className="text-white/60">
                    <Icon name="Send" size={16} />
                  </span>
                )}
                {about.github && (
                  <span className="text-white/60">
                    <Icon name="Github" size={16} />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="px-8 py-8 space-y-8"
          style={{
            backgroundColor: theme === "dark" ? "#0f0f1a" : "#ffffff",
            color: theme === "dark" ? "#e2e8f0" : "#1a1a2e",
          }}
        >
          {about.bio && (
            <div>
              <h3
                className="text-lg font-bold mb-3 flex items-center gap-2"
                style={{ color: accentColor }}
              >
                <Icon name="User" size={18} />
                О себе
              </h3>
              <p className="leading-relaxed opacity-80">{about.bio}</p>
            </div>
          )}

          {about.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: accentColor }}>
                <Icon name="Zap" size={18} />
                Навыки
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                      border: `1px solid ${accentColor}40`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                <Icon name="Briefcase" size={18} />
                Проекты
              </h3>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-xl overflow-hidden border"
                    style={{
                      borderColor: `${accentColor}30`,
                      backgroundColor: theme === "dark" ? "#1a1a2e" : "#f8f9ff",
                    }}
                  >
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-base">{project.title}</h4>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0"
                            style={{ color: accentColor }}
                          >
                            <Icon name="ExternalLink" size={16} />
                          </a>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-sm mt-1.5 opacity-70">{project.description}</p>
                      )}
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-xs"
                              style={{
                                backgroundColor: `${accentColor}15`,
                                color: accentColor,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-3 justify-center">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          <Icon name="Copy" size={16} />
          Скопировать данные
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-all"
        >
          <Icon name="Download" size={16} />
          Сохранить PDF
        </button>
      </div>
    </div>
  );
}
