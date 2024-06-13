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
import { useEffect, useRef, useState } from "react";
import {
  MonacoThemes,
  defineTheme,
  monacoThemes,
} from "../_utils/editor-theme";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
// import type * as monacoType from "monaco-editor";

const defaultCode = "# this is a test";
export function CodeEditor() {
  const [value, setValue] = useState(
    localStorage.getItem("savedCode") || defaultCode
  );
  const { theme: currentTheme } = useTheme();
  // const editorRef = useRef<monacoType.editor.IStandaloneCodeEditor>();
  const params = useParams();
  // const monacoRef = useRef<typeof import("monaco-editor")>();
  const [language, setLanguage] = useState(params.id as string);

  const handleEditorChange = (value: string | undefined) => {
    setValue(value || "");
  };
  const [editorTheme, setEditorTheme] = useState(
    localStorage.getItem("editorTheme") ?? "vs-dark"
  );
  function handleThemeChange(theme: string) {
    // setEditorTheme(theme);
    localStorage.setItem("editorTheme", theme);
    if (["light", "vs-dark"].includes(theme)) {
      setEditorTheme(theme);
    } else {
      defineTheme(theme).then((_) => setEditorTheme(theme));
    }
  }
  useEffect(() => {
    const savedTheme = localStorage.getItem("editorTheme");
    if (currentTheme && savedTheme) {
      setEditorTheme(
        savedTheme ? savedTheme : currentTheme === "dark" ? "vs-dark" : "light"
      );
      defineTheme(savedTheme).then((_) => setEditorTheme(savedTheme));
    }
  }, [currentTheme]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // editorRef.current?.getAction("editor.action.formatDocument")?.run();
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        localStorage.setItem("savedCode", value);
        console.log("Code saved");
        alert("Code saved");
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [value]);

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
        <Select defaultValue={editorTheme} onValueChange={handleThemeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue defaultValue={"test"} />
          </SelectTrigger>
          <SelectContent>
            {monacoThemes.map((theme) => (
              <SelectItem value={theme.value} key={theme.value}>
                {theme.name}
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
        theme={editorTheme}
        onChange={handleEditorChange}
      />
    </div>
  );
}
