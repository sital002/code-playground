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
import { useState } from "react";
import {
  MonacoThemes,
  defineTheme,
  monacoThemes,
} from "../_utils/editor-theme";

export function CodeEditor() {
  const [value, setValue] = useState("# this is a test");
  const params = useParams();
  const [language, setLanguage] = useState(params.id as string);
  const [theme, setTheme] = useState("vs-dark");

  const handleEditorChange = (value: string | undefined) => {
    setValue(value || "");
  };

  function handleThemeChange(theme: MonacoThemes) {
    if (["light", "vs-dark"].includes(theme)) {
      setTheme(theme);
    } else {
      defineTheme(theme).then((_) => setTheme(theme));
    }
  }
  return (
    <div className="w-[60%]">
      <div className="flex gap-3">
        <Select onValueChange={(e) => setLanguage(e)}>
          <SelectTrigger className="w-[180px] my-3">
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
        <Select onValueChange={handleThemeChange}>
          <SelectTrigger className="w-[180px] my-3">
            <SelectValue placeholder={"Select Theme"} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(monacoThemes).map((theme) => (
              <SelectItem value={theme} key={theme}>
                {monacoThemes[theme as MonacoThemes]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
