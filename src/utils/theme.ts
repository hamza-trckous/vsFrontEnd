export const theme = {
  colors: {
    blue: "blue",
    pink: "pink",
    green: "green",
    red: "red",
    orange: "orange",
    teal: "teal",
    f8f9fa: "#f8f9fa",
    dark: "#343a40",
    muted: "#6c757d",
    white: "#ffffff",
    black: "#000000",
    gray: "#adb5bd",
  },

  fonts: {
    primary: "Arial",
    secondary: "Helvetica",
  },
};

export const themeGradients = {
  teal: "from-teal-400 via-teal-500 to-teal-300",
  blue: "from-blue-400 via-blue-500 to-blue-300",
  red: "from-red-400 via-red-500 to-red-300",
  green: "from-green-400 via-green-500 to-green-300",
  purple: "from-purple-400 via-purple-500 to-purple-300",
  orange: "from-orange-400 via-orange-500 to-orange-300",
  yellow: "from-yellow-400 via-yellow-500 to-yellow-300",
  pink: "from-pink-400 via-pink-500 to-pink-300",
  gray: "from-gray-400 via-gray-500 to-gray-300",
  black: "from-black-400 via-black-500 to-black-300",
};

export const borderHoverClasses = {
  teal: "hover:border-teal-200",
  blue: "hover:border-blue-200",
  red: "hover:border-red-200",
  green: "hover:border-green-200",
  yellow: "hover:border-yellow-200",
  purple: "hover:border-purple-200",
  pink: "hover:border-pink-200",
  gray: "hover:border-gray-200",
  black: "hover:border-black-200",
} as const;

export const themeColors = {
  teal: {
    gradient: "from-teal-400 via-teal-500 to-teal-300",
    basics: "teal",
    hover: "hover:border-teal-200",
    secondary: "emerald",
  },
  blue: {
    gradient: "from-blue-400 via-blue-500 to-blue-300",
    basics: "blue",
    hover: "hover:border-blue-200",
    secondary: "sky",
  },
  red: {
    gradient: "from-red-400 via-red-500 to-red-300",
    basics: "red",
    hover: "hover:border-red-200",
    secondary: "rose",
  },
  green: {
    gradient: "from-green-400 via-green-500 to-green-300",
    basics: "green",
    hover: "hover:border-green-200",
    secondary: "emerald",
  },
  yellow: {
    gradient: "from-yellow-400 via-yellow-500 to-yellow-300",
    basics: "yellow",
    hover: "hover:border-yellow-200",
    secondary: "orange",
  },
  purple: {
    gradient: "from-purple-400 via-purple-500 to-purple-300",
    basics: "purple",
    hover: "hover:border-purple-200",
    secondary: "fuchsia",
  },
  pink: {
    gradient: "from-pink-400 via-pink-500 to-pink-300",
    basics: "pink",
    hover: "hover:border-pink-200",
    secondary: "rose",
  },
  gray: {
    gradient: "from-gray-400 via-gray-500 to-gray-300",
    basics: "gray",
    hover: "hover:border-gray-200",
    secondary: "zinc",
  },
} as const;
export type ThemeColor = typeof themeColors;

export type ColorName =
  | "teal"
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "gray";

// exportconst {currentColor} = (: ColorName | undefined) =>
//   ( ?? "teal") as keyof typeof themeColors;
