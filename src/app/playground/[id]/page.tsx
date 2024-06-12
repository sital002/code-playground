import React from "react";
import { CodeEditor } from "../_components/code-editor";

export default function Playground({ params }: { params: { id: string } }) {
  return (
    <div className="mx-3 flex my-3 gap-3">
      {/* <p>Playground {params.id}</p> */}
      <CodeEditor />
      <Output />
    </div>
  );
}

function Output() {
  return (
    <div className="my-3 w-[40%] border border-primary rounded-lg p-3">
      <p>Output</p>
    </div>
  );
}
