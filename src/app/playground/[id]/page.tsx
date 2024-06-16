"use client";
import React, { useRef, useState } from "react";
import { CodeEditor } from "../_components/code-editor";

export default function Playground() {
  const [output, setOutput] = useState("");
  const outputRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="mx-3 flex my-3 gap-3">
      <CodeEditor setOutput={setOutput} outputRef={outputRef} />
      <Output output={output} outputRef={outputRef} />
    </div>
  );
}

type OutputProps = {
  output: string;
  outputRef: React.RefObject<HTMLDivElement>;
};
function Output({ output, outputRef }: OutputProps) {
  return (
    <div className="my-3 w-[40%] border border-primary rounded-lg p-3">
      <p className="py-3 font-bold">Output</p>
      <hr />
      <div className="leading-8" ref={outputRef}></div>
    </div>
  );
}
