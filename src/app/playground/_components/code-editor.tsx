"use client";
import { languages } from "@/app/_utils/languages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@monaco-editor/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MonacoThemes,
  defineTheme,
  monacoThemes,
} from "../_utils/editor-theme";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function CodeEditor() {
  const [value, setValue] = useState("# this is a test");
  const { theme: currentTheme } = useTheme();
  const params = useParams();
  const [language, setLanguage] = useState(params.id as string);

  const handleEditorChange = (value: string | undefined) => {
    setValue(value || "");
  };
  const savedTheme = useLocalStorage("theme");
  const [theme, setTheme] = useState(
    currentTheme === "dark" ? "vs-dark" : "light"
  );

  function handleThemeChange(theme: MonacoThemes) {
    if (["light", "vs-dark"].includes(theme)) {
      setTheme(theme);
    } else {
      defineTheme(theme).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    if (currentTheme) {
      setTheme(currentTheme === "dark" ? "vs-dark" : "light");
    }
  }, [currentTheme]);

  return (
    <div className="w-[60%]">
      <div className="flex gap-3 my-3">
        <Select onValueChange={(e) => setLanguage(e.toLowerCase())}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={language} />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem value={language.name} key={language.name}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue="gasdrf" onValueChange={handleThemeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue defaultValue={"test"} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(monacoThemes).map((theme) => (
              <SelectItem value={theme} key={theme}>
                {monacoThemes[theme as MonacoThemes]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="px-9 font-bold " disabled title="Submit">
          Run
        </Button>
      </div>
      <Editor
        height="70vh"
        width={`100%`}
        language={language}
        value={value}
        theme={theme}
        onChange={handleEditorChange}
      />
    </div>
  );
}
