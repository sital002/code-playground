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

export function CodeEditor() {
  const [value, setValue] = useState("# this is a test");
  const params = useParams();
  const [language, setLanguage] = useState(params.id as string);
  const [theme, setTheme] = useState("vs-dark");

  const handleEditorChange = (value: string | undefined) => {
    setValue(value || "");
  };

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
        {/* <Select onValueChange={(e) => setLanguage(e)}>
          <SelectTrigger className="w-[180px] my-3">
            <SelectValue placeholder={"Select Theme"} />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem value={language.name} key={language.name}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
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
