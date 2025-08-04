export type ThemeColor = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  "muted-foreground": string;
  border: string;
};

export type Theme = {
  name: string;
  colors: ThemeColor;
  font: string;
  borderRadius: string;
  description: string;
};

export const themes: Theme[] = [
  {
    name: "Modern Dark",
    description: "Professional dark theme with accent colors",
    colors: {
      primary: "230 60% 50%",
      secondary: "262 83% 58%",
      accent: "199 89% 48%",
      background: "220 13% 18%",
      foreground: "0 0% 98%",
      muted: "217 33% 17%",
      "muted-foreground": "215 20% 65%",
      border: "216 34% 17%",
    },
    font: "'Inter', sans-serif",
    borderRadius: "0.75rem",
  },
  {
    name: "Ocean Breeze",
    description: "Calming blues and teals for a fresh look",
    colors: {
      primary: "199 89% 48%",
      secondary: "185 72% 43%",
      accent: "172 66% 50%",
      background: "210 20% 98%",
      foreground: "200 50% 3%",
      muted: "210 40% 96.1%",
      "muted-foreground": "215 20% 65.1%",
      border: "214 32% 91%",
    },
    font: "'Plus Jakarta Sans', sans-serif",
    borderRadius: "1rem",
  },
  {
    name: "Royal Purple",
    description: "Rich purple and gold for a luxurious feel",
    colors: {
      primary: "267 75% 31%",
      secondary: "262 83% 58%",
      accent: "45 93% 47%",
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      "muted-foreground": "240 5% 64.9%",
      border: "240 3.7% 15.9%",
    },
    font: "'Manrope', sans-serif",
    borderRadius: "0.5rem",
  },
  {
    name: "Emerald Dawn",
    description: "Fresh and natural with emerald accents",
    colors: {
      primary: "152 60% 52%",
      secondary: "142 71% 45%",
      accent: "124 58% 45%",
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      muted: "240 4.8% 95.9%",
      "muted-foreground": "240 3.8% 46.1%",
      border: "240 5.9% 90%",
    },
    font: "'DM Sans', sans-serif",
    borderRadius: "0.875rem",
  },
  {
    name: "Midnight Dream",
    description: "Dark and mysterious with neon accents",
    colors: {
      primary: "263 85% 50%",
      secondary: "334 85% 55%",
      accent: "190 95% 39%",
      background: "222 47% 11%",
      foreground: "210 40% 98%",
      muted: "217 33% 17%",
      "muted-foreground": "215 20% 65%",
      border: "216 34% 17%",
    },
    font: "'Space Grotesk', sans-serif",
    borderRadius: "1rem",
  },
];

export const fonts = {
  inter: {
    name: "Inter",
    import: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
  plusJakarta: {
    name: "Plus Jakarta Sans",
    import: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
  },
  manrope: {
    name: "Manrope",
    import: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap",
  },
  dmSans: {
    name: "DM Sans",
    import: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap",
  },
  spaceGrotesk: {
    name: "Space Grotesk",
    import: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
  },
};

export function getThemeVariables(theme: Theme): Record<string, string> {
  return {
    "--font-sans": theme.font,
    "--radius": theme.borderRadius,
    "--background": `hsl(${theme.colors.background})`,
    "--foreground": `hsl(${theme.colors.foreground})`,
    "--primary": `hsl(${theme.colors.primary})`,
    "--primary-foreground": "0 0% 98%",
    "--secondary": `hsl(${theme.colors.secondary})`,
    "--secondary-foreground": "0 0% 98%",
    "--accent": `hsl(${theme.colors.accent})`,
    "--accent-foreground": "0 0% 98%",
    "--muted": `hsl(${theme.colors.muted})`,
    "--muted-foreground": `hsl(${theme.colors["muted-foreground"]})`,
    "--border": `hsl(${theme.colors.border})`,
  };
} 