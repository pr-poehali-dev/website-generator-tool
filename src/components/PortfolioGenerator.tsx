import { useState } from "react";
import ThemeToggle from "@/components/portfolio/ThemeToggle";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview";
import StepIndicator from "@/components/portfolio/StepIndicator";

export type Theme = "dark" | "light";

export interface AboutData {
  name: string;
  title: string;
  bio: string;
  email: string;
  telegram: string;
  github: string;
  avatar: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

export interface PortfolioData {
  about: AboutData;
  projects: Project[];
  accentColor: string;
}

const defaultData: PortfolioData = {
  about: {
    name: "",
    title: "",
    bio: "",
    email: "",
    telegram: "",
    github: "",
    avatar: "",
    skills: [],
  },
  projects: [],
  accentColor: "#a855f7",
};

const STEPS = ["О создателе", "Проекты", "Готово"];

export default function PortfolioGenerator() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [step, setStep] = useState(0);
  const [data, setData] = useState<PortfolioData>(defaultData);

  const updateAbout = (about: Partial<AboutData>) => {
    setData((prev) => ({ ...prev, about: { ...prev.about, ...about } }));
  };

  const updateProjects = (projects: Project[]) => {
    setData((prev) => ({ ...prev, projects }));
  };

  const updateAccentColor = (color: string) => {
    setData((prev) => ({ ...prev, accentColor: color }));
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <div className="grid-bg fixed inset-0 pointer-events-none" />

        <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border glass bg-background/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
              P
            </div>
            <span className="font-bold text-lg gradient-text">PortfolioGen</span>
          </div>
          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} />
        </header>

        {step < 2 && (
          <div className="relative z-10 max-w-2xl mx-auto px-6 pt-8">
            <StepIndicator steps={STEPS} current={step} />
          </div>
        )}

        <main className="relative z-10 max-w-2xl mx-auto px-6 pb-16">
          {step === 0 && (
            <AboutSection
              data={data.about}
              accentColor={data.accentColor}
              onUpdate={updateAbout}
              onAccentChange={updateAccentColor}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <ProjectsSection
              projects={data.projects}
              onUpdate={updateProjects}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <PortfolioPreview data={data} theme={theme} onBack={() => setStep(1)} />
          )}
        </main>
      </div>
    </div>
  );
}
