import Icon from "@/components/ui/icon";
import { Theme } from "@/components/PortfolioGenerator";

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted hover:bg-accent/10 transition-all duration-200 text-sm font-medium"
    >
      {theme === "dark" ? (
        <>
          <Icon name="Sun" size={16} />
          <span>Светлая</span>
        </>
      ) : (
        <>
          <Icon name="Moon" size={16} />
          <span>Тёмная</span>
        </>
      )}
    </button>
  );
}
