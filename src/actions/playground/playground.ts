"use server";

import axios from "axios";
const qs = require("qs");

const supportedLanguages = {
  javascript: "js",
  python: "py",
  java: "java",
  c: "c",
  go: "go",
  cpp: "cpp",
  csharp: "csharp",
};
export async function excuteCode(
  code: string,
  language: string,
  input?: string
): Promise<{ result?: string; error?: string }> {
  if (!supportedLanguages[language as keyof typeof supportedLanguages])
    return { error: "Language not supported" };

  var data = qs.stringify({
    code: code,
    language: supportedLanguages[language as keyof typeof supportedLanguages],
    input: input,
  });
  const config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    // console.log(response.data);
    const { error, output } = response.data;
    if (error) {
      const formattedError = error.replace(/\n/g, "<br />");
      return { error: formattedError };
    }
    return { result: output };
  } catch (err) {
    console.log(err);
    return { error: "Error while executing code" };
  }
}
