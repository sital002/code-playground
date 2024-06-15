"use client";
import React, { useRef, useState } from "react";
import { CodeEditor } from "../_components/code-editor";

export default function Playground() {
  const [output, setOutput] = useState("");
  const outputRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="mx-3 flex my-3 gap-3">
      {/* <p>Playground {params.id}</p> */}
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
  const formattedOutput = output.replace(/\n/g, "<br />");
  const lines = output
    .split(/\r?\n/)
    .map((line, index) => <p key={index}>{line}</p>);
  // console.log(formattedOutput);
  console.log(lines);
  return (
    <div className="my-3 w-[40%] border border-primary rounded-lg p-3">
      <p className="py-3 font-bold">Output</p>
      <hr />
      <div
        className="leading-8"
        ref={outputRef}
        // dangerouslySetInnerHTML={{ __html: formattedOutput }}
      >
        {lines}
      </div>
    </div>
  );
}
