"use client";
import React, { useState } from "react";
import { CodeEditor } from "../_components/code-editor";

export default function Playground() {
  const [output, setOutput] = useState("");
  return (
    <div className="mx-3 flex my-3 gap-3">
      {/* <p>Playground {params.id}</p> */}
      <CodeEditor setOutput={setOutput} />
      <Output output={output} />
    </div>
  );
}

function Output({ output }: { output: string }) {
  return (
    <div className="my-3 w-[40%] border border-primary rounded-lg p-3">
      <p className="py-3 font-bold">Output</p>
      <hr />
      <p className="leading-8">{output}</p>
    </div>
  );
}
