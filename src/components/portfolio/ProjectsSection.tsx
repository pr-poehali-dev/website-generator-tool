import { useState } from "react";
import { Project } from "@/components/PortfolioGenerator";
import Icon from "@/components/ui/icon";

interface Props {
  projects: Project[];
  onUpdate: (projects: Project[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const emptyProject = (): Project => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  tags: [],
  link: "",
  image: "",
});

export default function ProjectsSection({ projects, onUpdate, onNext, onBack }: Props) {
  const [editing, setEditing] = useState<Project | null>(null);
  const [tagInput, setTagInput] = useState("");

  const addProject = () => {
    const p = emptyProject();
    setEditing(p);
    setTagInput("");
  };

  const saveProject = () => {
    if (!editing) return;
    const exists = projects.find((p) => p.id === editing.id);
    if (exists) {
      onUpdate(projects.map((p) => (p.id === editing.id ? editing : p)));
    } else {
      onUpdate([...projects, editing]);
    }
    setEditing(null);
  };

  const deleteProject = (id: string) => {
    onUpdate(projects.filter((p) => p.id !== id));
  };

  const editProject = (p: Project) => {
    setEditing({ ...p });
    setTagInput("");
  };

  const addTag = () => {
    if (!editing) return;
    const t = tagInput.trim();
    if (t && !editing.tags.includes(t)) {
      setEditing({ ...editing, tags: [...editing.tags, t] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    if (!editing) return;
    setEditing({ ...editing, tags: editing.tags.filter((t) => t !== tag) });
  };

  if (editing) {
    return (
      <div className="animate-fade-in-up pt-4">
        <h2 className="text-2xl font-bold mb-1">
          {projects.find((p) => p.id === editing.id) ? "Редактирование проекта" : "Новый проект"}
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">Заполни информацию о проекте</p>

        <div className="space-y-4">
          <div>
            <label className="field-label">Название *</label>
            <input
              className="input-field"
              placeholder="Мой крутой проект"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Описание</label>
            <textarea
              className="input-field resize-none"
              rows={3}
              placeholder="Что делает этот проект?"
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Изображение (URL)</label>
            <input
              className="input-field"
              placeholder="https://example.com/preview.jpg"
              value={editing.image}
              onChange={(e) => setEditing({ ...editing, image: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Ссылка на проект</label>
            <input
              className="input-field"
              placeholder="https://myproject.com"
              value={editing.link}
              onChange={(e) => setEditing({ ...editing, link: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Теги / технологии</label>
            <div className="flex gap-2 mb-2">
              <input
                className="input-field flex-1"
                placeholder="React, TypeScript..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
              />
              <button
                onClick={addTag}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
              >
                +
              </button>
            </div>
            {editing.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {editing.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-border bg-muted">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-destructive ml-0.5">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-3 justify-end">
          <button
            onClick={() => setEditing(null)}
            className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={saveProject}
            disabled={!editing.title.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-40"
          >
            <Icon name="Check" size={16} />
            Сохранить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up pt-4">
      <h2 className="text-2xl font-bold mb-1">Проекты</h2>
      <p className="text-muted-foreground mb-6 text-sm">Добавь свои работы — можно пропустить</p>

      <div className="space-y-3 mb-4">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {p.image ? (
              <img src={p.image} alt={p.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Icon name="Image" size={20} className="text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{p.title}</p>
              {p.tags.length > 0 && (
                <div className="flex gap-1 mt-1 flex-wrap">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{t}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => editProject(p)}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
              >
                <Icon name="Pencil" size={15} />
              </button>
              <button
                onClick={() => deleteProject(p.id)}
                className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
              >
                <Icon name="Trash2" size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addProject}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <Icon name="Plus" size={18} />
        Добавить проект
      </button>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all"
        >
          {projects.length === 0 ? "Пропустить" : "Готово"}
          <Icon name="ArrowRight" size={18} />
        </button>
      </div>
    </div>
  );
}
