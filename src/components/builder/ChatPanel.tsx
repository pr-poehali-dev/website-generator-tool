import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  role: "user" | "bot";
  text: string;
}

interface Props {
  messages: Message[];
  prompt: string;
  loading: boolean;
  onPromptChange: (v: string) => void;
  onGenerate: (text: string) => void;
}

const SUGGESTIONS = [
  "Сайт для ресторана «Берёзка»",
  "Лендинг для фитнес-клуба",
  "Сайт дизайн-студии",
  "Интернет-магазин одежды",
];

export default function ChatPanel({ messages, prompt, loading, onPromptChange, onGenerate }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onGenerate(prompt);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center animate-pulse-glow">
              <Icon name="Wand2" size={26} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">Опиши свой сайт</p>
              <p className="text-white/40 text-sm mt-1">Напиши пару слов о бизнесе — и я сгенерирую сайт</p>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full mt-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => onGenerate(s)}
                  className="text-left px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/50 transition-all text-sm text-white/70 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 animate-fade-in-up ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {msg.role === "bot" && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Wand2" size={13} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-violet-600 text-white rounded-tr-sm"
                    : "bg-white/8 text-white/90 rounded-tl-sm border border-white/8"
                } ${loading && i === messages.length - 1 && msg.role === "bot" ? "animate-pulse" : ""}`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        {loading && messages[messages.length - 1]?.role === "bot" && (
          <div className="flex gap-1.5 px-4">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/8">
        <div className="flex gap-2 items-end bg-white/6 border border-white/10 rounded-xl px-3 py-2 focus-within:border-violet-500/60 transition-colors">
          <textarea
            ref={inputRef}
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Опиши сайт, который хочешь создать..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 resize-none outline-none leading-relaxed max-h-32"
            style={{ scrollbarWidth: "none" }}
          />
          <button
            onClick={() => onGenerate(prompt)}
            disabled={!prompt.trim() || loading}
            className="w-8 h-8 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-colors mb-0.5"
          >
            {loading ? (
              <Icon name="Loader" size={14} className="text-white animate-spin" />
            ) : (
              <Icon name="ArrowUp" size={14} className="text-white" />
            )}
          </button>
        </div>
        <p className="text-white/20 text-xs text-center mt-2">Enter — отправить · Shift+Enter — новая строка</p>
      </div>
    </div>
  );
}