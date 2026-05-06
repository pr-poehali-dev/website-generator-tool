import { useState } from "react";
import { AboutData } from "@/components/PortfolioGenerator";
import Icon from "@/components/ui/icon";

const ACCENT_COLORS = [
  "#a855f7",
  "#ec4899",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
];

interface Props {
  data: AboutData;
  accentColor: string;
  onUpdate: (data: Partial<AboutData>) => void;
  onAccentChange: (color: string) => void;
  onNext: () => void;
}

export default function AboutSection({ data, accentColor, onUpdate, onAccentChange, onNext }: Props) {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      onUpdate({ skills: [...data.skills, trimmed] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    onUpdate({ skills: data.skills.filter((s) => s !== skill) });
  };

  const canContinue = data.name.trim() && data.title.trim();

  return (
    <div className="animate-fade-in-up pt-4">
      <h2 className="text-2xl font-bold mb-1">О создателе</h2>
      <p className="text-muted-foreground mb-6 text-sm">Расскажи о себе — это основа твоего портфолио</p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Имя *" icon="User">
            <input
              className="input-field"
              placeholder="Иван Иванов"
              value={data.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
            />
          </Field>
          <Field label="Должность / специализация *" icon="Briefcase">
            <input
              className="input-field"
              placeholder="Frontend разработчик"
              value={data.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
            />
          </Field>
        </div>

        <Field label="О себе" icon="FileText">
          <textarea
            className="input-field resize-none"
            rows={3}
            placeholder="Кратко о себе, опыте и подходе к работе..."
            value={data.bio}
            onChange={(e) => onUpdate({ bio: e.target.value })}
          />
        </Field>

        <Field label="Фото (URL)" icon="Image">
          <input
            className="input-field"
            placeholder="https://example.com/photo.jpg"
            value={data.avatar}
            onChange={(e) => onUpdate({ avatar: e.target.value })}
          />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Email" icon="Mail">
            <input
              className="input-field"
              placeholder="hello@example.com"
              value={data.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
            />
          </Field>
          <Field label="Telegram" icon="Send">
            <input
              className="input-field"
              placeholder="@username"
              value={data.telegram}
              onChange={(e) => onUpdate({ telegram: e.target.value })}
            />
          </Field>
          <Field label="GitHub" icon="Github">
            <input
              className="input-field"
              placeholder="github.com/user"
              value={data.github}
              onChange={(e) => onUpdate({ github: e.target.value })}
            />
          </Field>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
            <Icon name="Zap" size={14} />
            Навыки
          </label>
          <div className="flex gap-2 mb-2">
            <input
              className="input-field flex-1"
              placeholder="React, Figma, Python..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              +
            </button>
          </div>
          {data.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-border bg-muted"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="hover:text-destructive ml-0.5">
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
            <Icon name="Palette" size={14} />
            Акцентный цвет
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {ACCENT_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => onAccentChange(color)}
                className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                style={{
                  backgroundColor: color,
                  borderColor: accentColor === color ? "white" : "transparent",
                  boxShadow: accentColor === color ? `0 0 0 2px ${color}` : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Далее
          <Icon name="ArrowRight" size={18} />
        </button>
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
        <Icon name={icon} size={14} />
        {label}
      </label>
      {children}
    </div>
  );
}