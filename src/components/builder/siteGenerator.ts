export interface SiteSection {
  type: "hero" | "about" | "services" | "portfolio" | "contact" | "faq";
  title: string;
  subtitle?: string;
  items?: { title: string; desc: string; icon?: string }[];
  cta?: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  darkMode: boolean;
  sections: SiteSection[];
  logo: string;
  tagline: string;
}

const COLORS = [
  { primary: "#7c3aed", secondary: "#db2777" },
  { primary: "#0ea5e9", secondary: "#6366f1" },
  { primary: "#10b981", secondary: "#0ea5e9" },
  { primary: "#f59e0b", secondary: "#ef4444" },
  { primary: "#ec4899", secondary: "#8b5cf6" },
  { primary: "#06b6d4", secondary: "#3b82f6" },
];

const FONTS = ["Golos Text", "Oswald", "Montserrat", "Rubik", "IBM Plex Sans"];

function pickFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function detectType(prompt: string): {
  title: string;
  tagline: string;
  description: string;
  sections: SiteSection[];
} {
  const p = prompt.toLowerCase();

  if (p.includes("ресторан") || p.includes("кафе") || p.includes("еда") || p.includes("пицц")) {
    return {
      title: extractName(prompt) || "La Bella",
      tagline: "Вкус, который запоминается",
      description: "Ресторан изысканной кухни",
      sections: [
        { type: "hero", title: "Добро пожаловать", subtitle: "Ресторан с душой и историей", cta: "Забронировать стол" },
        { type: "about", title: "О нас", subtitle: "Мы готовим с любовью с 2010 года. Каждое блюдо — это история вкуса и традиций." },
        { type: "services", title: "Наше меню", items: [
          { title: "Завтраки", desc: "Свежие блюда каждое утро с 8:00", icon: "☀️" },
          { title: "Обеды", desc: "Бизнес-ланч и авторская кухня", icon: "🍽️" },
          { title: "Ужины", desc: "Романтическая атмосфера вечером", icon: "🕯️" },
        ]},
        { type: "contact", title: "Бронирование", subtitle: "Оставьте заявку и мы свяжемся с вами", cta: "Забронировать" },
      ],
    };
  }

  if (p.includes("студи") || p.includes("агентств") || p.includes("дизайн") || p.includes("сайт")) {
    return {
      title: extractName(prompt) || "Studio",
      tagline: "Создаём цифровые продукты будущего",
      description: "Дизайн-студия и веб-агентство",
      sections: [
        { type: "hero", title: "Делаем сайты,\nкоторые продают", subtitle: "Дизайн, разработка, маркетинг — всё под ключ", cta: "Обсудить проект" },
        { type: "services", title: "Услуги", items: [
          { title: "Дизайн", desc: "UI/UX, брендинг, фирменный стиль", icon: "✦" },
          { title: "Разработка", desc: "Сайты, лендинги, веб-приложения", icon: "⚡" },
          { title: "SEO", desc: "Продвижение в поисковых системах", icon: "📈" },
        ]},
        { type: "portfolio", title: "Портфолио", items: [
          { title: "Проект 1", desc: "Лендинг для IT-стартапа" },
          { title: "Проект 2", desc: "Интернет-магазин одежды" },
          { title: "Проект 3", desc: "Корпоративный сайт" },
        ]},
        { type: "contact", title: "Связаться с нами", subtitle: "Расскажите о проекте — мы отвечаем за 1 час", cta: "Написать" },
      ],
    };
  }

  if (p.includes("фитнес") || p.includes("спорт") || p.includes("трен") || p.includes("зал")) {
    return {
      title: extractName(prompt) || "FitLife",
      tagline: "Твоё тело — твоя ответственность",
      description: "Фитнес-клуб нового поколения",
      sections: [
        { type: "hero", title: "Начни меняться сегодня", subtitle: "Современный зал, опытные тренеры, результат — гарантирован", cta: "Первое занятие бесплатно" },
        { type: "services", title: "Программы", items: [
          { title: "Персональный тренинг", desc: "Индивидуальная программа под ваши цели", icon: "💪" },
          { title: "Групповые классы", desc: "Йога, кардио, функциональный тренинг", icon: "🏃" },
          { title: "Онлайн-программы", desc: "Занимайся из любой точки мира", icon: "🌍" },
        ]},
        { type: "faq", title: "Вопросы и ответы", items: [
          { title: "Есть ли пробное занятие?", desc: "Да, первое занятие абсолютно бесплатно для новых клиентов." },
          { title: "Какой режим работы?", desc: "Работаем ежедневно с 6:00 до 23:00." },
          { title: "Можно ли заморозить абонемент?", desc: "Да, заморозка доступна на срок до 30 дней в год." },
        ]},
        { type: "contact", title: "Записаться", subtitle: "Оставь номер — перезвоним в течение 10 минут", cta: "Записаться" },
      ],
    };
  }

  if (p.includes("магазин") || p.includes("продаж") || p.includes("товар") || p.includes("интернет")) {
    return {
      title: extractName(prompt) || "Shop",
      tagline: "Всё, что тебе нужно — здесь",
      description: "Интернет-магазин",
      sections: [
        { type: "hero", title: "Лучшие товары\nпо лучшим ценам", subtitle: "Доставка по всей России за 2-3 дня", cta: "Перейти в каталог" },
        { type: "services", title: "Категории", items: [
          { title: "Новинки", desc: "Свежие поступления каждую неделю", icon: "✨" },
          { title: "Хиты продаж", desc: "Самые популярные товары", icon: "🔥" },
          { title: "Распродажа", desc: "Скидки до 70%", icon: "🏷️" },
        ]},
        { type: "about", title: "Почему мы?", subtitle: "10 лет на рынке, 50 000+ довольных клиентов, гарантия качества на всю продукцию." },
        { type: "contact", title: "Свяжитесь с нами", subtitle: "Поможем с выбором товара", cta: "Написать" },
      ],
    };
  }

  // Default — universal business
  return {
    title: extractName(prompt) || "Business",
    tagline: "Профессионально. Надёжно. Результативно.",
    description: "Бизнес-сайт",
    sections: [
      { type: "hero", title: extractName(prompt) || "Ваш бизнес онлайн", subtitle: "Профессиональный сайт, который привлекает клиентов", cta: "Узнать подробнее" },
      { type: "about", title: "О нас", subtitle: "Мы помогаем бизнесу расти и развиваться. Наш опыт — ваш результат." },
      { type: "services", title: "Услуги", items: [
        { title: "Консультация", desc: "Бесплатный разбор вашей ситуации", icon: "💬" },
        { title: "Реализация", desc: "Полное сопровождение проекта", icon: "🚀" },
        { title: "Поддержка", desc: "На связи 24/7 после запуска", icon: "🛡️" },
      ]},
      { type: "contact", title: "Контакты", subtitle: "Напишите нам — ответим за 15 минут", cta: "Написать" },
    ],
  };
}

function extractName(prompt: string): string {
  const match = prompt.match(/["«»]([^"«»]+)["«»]/);
  if (match) return match[1];
  const words = prompt.split(" ");
  const skip = ["сделай", "создай", "хочу", "нужен", "нужна", "сайт", "для", "про", "мне", "я", "лендинг", "генератор", "сайта"];
  const name = words.find((w) => w.length > 3 && !skip.includes(w.toLowerCase()));
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
}

export function generateSiteFromPrompt(prompt: string): SiteConfig {
  const colors = pickFrom(COLORS);
  const { title, tagline, description, sections } = detectType(prompt);

  return {
    title,
    tagline,
    description,
    primaryColor: colors.primary,
    secondaryColor: colors.secondary,
    font: pickFrom(FONTS),
    darkMode: Math.random() > 0.4,
    sections,
    logo: title.substring(0, 2).toUpperCase(),
  };
}
