import { loader } from "@monaco-editor/react";
// import themes from "monaco-themes/themes/themelist.json";

export const monacoThemes = [
  {
    name: "Active4D",
    value: "active4d",
  },
  {
    name: "All Hallows Eve",
    value: "all-hallows-eve",
  },
  {
    name: "Amy",
    value: "amy",
  },
  {
    name: "Birds of Paradise",
    value: "birds-of-paradise",
  },
  {
    name: "Blackboard",
    value: "blackboard",
  },
  {
    name: "Brilliance Black",
    value: "brilliance-black",
  },
  {
    name: "Brilliance Dull",
    value: "brilliance-dull",
  },
  {
    name: "Chrome DevTools",
    value: "chrome-devtools",
  },
  {
    name: "Clouds Midnight",
    value: "clouds-midnight",
  },
  {
    name: "Clouds",
    value: "clouds",
  },
  {
    name: "Cobalt",
    value: "cobalt",
  },
  {
    name: "Dawn",
    value: "dawn",
  },
  {
    name: "Dreamweaver",
    value: "dreamweaver",
  },
  {
    name: "Eiffel",
    value: "eiffel",
  },
  {
    name: "Espresso Libre",
    value: "espresso-libre",
  },
  {
    name: "GitHub",
    value: "github",
  },
  {
    name: "IDLE",
    value: "idle",
  },
  {
    name: "Katzenmilch",
    value: "katzenmilch",
  },
  {
    name: "Kuroir Theme",
    value: "kuroir-theme",
  },
  {
    name: "LAZY",
    value: "lazy",
  },
  {
    name: "MagicWB (Amiga)",
    value: "magicwb--amiga-",
  },
  {
    name: "Merbivore Soft",
    value: "merbivore-soft",
  },
  {
    name: "Merbivore",
    value: "merbivore",
  },
  {
    name: "Monokai Bright",
    value: "monokai-bright",
  },
  {
    name: "Monokai",
    value: "monokai",
  },
  {
    name: "Night Owl",
    value: "night-owl",
  },
  {
    name: "Oceanic Next",
    value: "oceanic-next",
  },
  {
    name: "Pastels on Dark",
    value: "pastels-on-dark",
  },
  {
    name: "Slush and Poppies",
    value: "slush-and-poppies",
  },
  {
    name: "Solarized-dark",
    value: "solarized-dark",
  },
  {
    name: "Solarized-light",
    value: "solarized-light",
  },
  {
    name: "SpaceCadet",
    value: "spacecadet",
  },
  {
    name: "Sunburst",
    value: "sunburst",
  },
  {
    name: "Textmate (Mac Classic)",
    value: "textmate--mac-classic-",
  },
  {
    name: "Tomorrow-Night-Blue",
    value: "tomorrow-night-blue",
  },
  {
    name: "Tomorrow-Night-Bright",
    value: "tomorrow-night-bright",
  },
  {
    name: "Tomorrow-Night-Eighties",
    value: "tomorrow-night-eighties",
  },
  {
    name: "Tomorrow-Night",
    value: "tomorrow-night",
  },
  {
    name: "Tomorrow",
    value: "tomorrow",
  },
  {
    name: "Twilight",
    value: "twilight",
  },
  {
    name: "Upstream Sunburst",
    value: "upstream-sunburst",
  },
  {
    name: "Vibrant Ink",
    value: "vibrant-ink",
  },
  {
    name: "Xcode_default",
    value: "xcode-default",
  },
  {
    name: "Zenburnesque",
    value: "zenburnesque",
  },
  {
    name: "iPlastic",
    value: "iplastic",
  },
  {
    name: "idleFingers",
    value: "idlefingers",
  },
  {
    name: "krTheme",
    value: "krtheme",
  },
  {
    name: "monoindustrial",
    value: "monoindustrial",
  },
];
export type MonacoThemes = (typeof monacoThemes)[number]["value"];

const defineTheme = (theme: string) => {
  const currentTheme = monacoThemes.find((t) => t.value === theme);
  return new Promise((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${currentTheme?.name}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res("done");
    });
  });
};

export { defineTheme };
