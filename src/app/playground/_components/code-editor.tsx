"use client";
import { languages } from "@/app/_utils/languages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  MonacoThemes,
  defineTheme,
  monacoThemes,
} from "../_utils/editor-theme";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
// import type * as monacoType from "monaco-editor";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { excuteCode } from "@/actions/playground/playground";

const defaultCode = `console.log("Hello World! ");`;

type CodeEditorProps = {
  setOutput: (prev: string) => void;
  outputRef: React.RefObject<HTMLDivElement>;
};
export function CodeEditor({ setOutput, outputRef }: CodeEditorProps) {
  const [monacoInstance, setMonacoInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);

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
    if (monacoInstance) {
      const selection = monacoInstance.getSelection();
      // const id = { major: 1, minor: 1 };
      // const op = {
      //   identifier: id,
      //   range: {
      //     startLineNumber: selection?.selectionStartLineNumber || 1,
      //     startColumn: selection?.selectionStartColumn || 1,
      //     endLineNumber: selection?.endLineNumber || 1,
      //     endColumn: selection?.endColumn || 1,
      //   },
      //   text: "This is a tesxt",
      //   forceMoveMarkers: true,
      // };
      // monacoInstance.executeEdits("my-source", [op]);
    }
  };
  const [editorTheme, setEditorTheme] = useState(
    localStorage.getItem("editorTheme") ?? "vs-dark"
  );

  async function runCode() {
    try {
      if (language !== "javascript")
        return alert("Only javascript is supported for now.");
      const { result, error } = await excuteCode(value, language);
      console.log(result);
      if (error && outputRef.current) {
        // const textWithBrs = error.replace(/\r?\n/g, "<br />");
        // outputRef.current.innerHTML = textWithBrs;

        setOutput(error);
      }
      if (result && outputRef.current) {
        // const textWithBrs = result.replace(/\n/g, "<br>");

        // outputRef.current.innerHTML = textWithBrs;
        setOutput(result);
      }
    } catch (err) {
      setOutput(JSON.stringify(err));
      console.log(err);
    }
  }

  const editorMount: OnMount = (editorL: editor.IStandaloneCodeEditor) => {
    setMonacoInstance(editorL);
  };

  useEffect(() => {
    if (monacoInstance) {
      monacoInstance.focus();
      // monacoInstance.getValue();
      monacoInstance.onDidChangeCursorPosition((e) => {
        // console.log(e);
      });
    }
  }, [monacoInstance]);

  function handleThemeChange(theme: string) {
    // setEditorTheme(theme);
    localStorage.setItem("editorTheme", theme);
    if (["light", "vs-dark"].includes(theme)) {
      setEditorTheme(theme);
    } else {
      defineTheme(theme).then((_) => setEditorTheme(theme));
    }
  }

  const handleSaveCode = useCallback(() => {
    localStorage.setItem("savedCode", value);
    console.log("Code saved");
    alert("Code saved");
  }, [value]);
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
        handleSaveCode();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleSaveCode, value]);

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
        <Button className="px-9 font-bold " title="Run Code" onClick={runCode}>
          Run
        </Button>

        <Button
          className="px-9 font-bold "
          onClick={handleSaveCode}
          title="Save Code (CTRL + S)"
        >
          Save
        </Button>
      </div>
      <Editor
        height="80vh"
        width={`100%`}
        language={language}
        value={value}
        theme={editorTheme}
        onMount={editorMount}
        options={{
          minimap: { enabled: false },
          fontSize: 18,
          wordWrap: "on",
          wrappingIndent: "indent",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineNumbers: "on",
          tabSize: 2,
          padding: { top: 10, bottom: 10 },
          "semanticHighlighting.enabled": true,
          cursorBlinking: "smooth",
          fontFamily: "JetBrains Mono",
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
}
