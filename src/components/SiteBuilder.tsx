import { useState } from "react";
import ChatPanel from "@/components/builder/ChatPanel";
import PreviewPanel from "@/components/builder/PreviewPanel";
import SettingsPanel from "@/components/builder/SettingsPanel";
import Icon from "@/components/ui/icon";
import { generateSiteFromPrompt, SiteConfig } from "@/components/builder/siteGenerator";

type Tab = "chat" | "settings";

export default function SiteBuilder() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [site, setSite] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  const handleGenerate = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);
    setPrompt("");

    await new Promise((r) => setTimeout(r, 300));
    setMessages((prev) => [...prev, { role: "bot", text: "Генерирую сайт по твоему описанию..." }]);

    await new Promise((r) => setTimeout(r, 1200));
    const generated = generateSiteFromPrompt(text);
    setSite(generated);

    setMessages((prev) => [
      ...prev.slice(0, -1),
      { role: "bot", text: `Готово! Создал сайт «${generated.title}» — проверь превью справа. Можешь уточнить детали или попросить изменить любой блок.` },
    ]);
    setLoading(false);
  };

  const handleSettingsChange = (updates: Partial<SiteConfig>) => {
    setSite((prev) => prev ? { ...prev, ...updates } : prev);
  };

  return (
    <div className="h-screen flex flex-col bg-[#0a0a12] text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-[#0d0d1a] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-black">
            S
          </div>
          <span className="font-bold text-base gradient-text">SiteGen</span>
          <span className="text-white/20 text-sm hidden sm:block">— Генератор сайтов</span>
        </div>
        <div className="flex items-center gap-2">
          {site && (
            <>
              <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode("desktop")}
                  className={`p-1.5 rounded-md transition-colors ${previewMode === "desktop" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  <Icon name="Monitor" size={14} />
                </button>
                <button
                  onClick={() => setPreviewMode("mobile")}
                  className={`p-1.5 rounded-md transition-colors ${previewMode === "mobile" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  <Icon name="Smartphone" size={14} />
                </button>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors text-sm font-medium">
                <Icon name="Download" size={14} />
                <span className="hidden sm:inline">Скачать</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-full sm:w-[380px] flex-shrink-0 flex flex-col border-r border-white/8">
          {/* Tabs */}
          <div className="flex border-b border-white/8">
            {(["chat", "settings"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === tab
                    ? "text-white border-b-2 border-violet-500"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <Icon name={tab === "chat" ? "MessageSquare" : "Sliders"} size={14} />
                {tab === "chat" ? "Чат" : "Настройки"}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === "chat" ? (
              <ChatPanel
                messages={messages}
                prompt={prompt}
                loading={loading}
                onPromptChange={setPrompt}
                onGenerate={handleGenerate}
              />
            ) : (
              <SettingsPanel site={site} onChange={handleSettingsChange} />
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="hidden sm:flex flex-1 flex-col bg-[#07070f]">
          <PreviewPanel site={site} mode={previewMode} />
        </div>
      </div>
    </div>
  );
}
