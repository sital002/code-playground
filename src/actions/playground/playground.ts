"use server";

// import { exec } from "child_process";
import fs from "fs";
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
export async function excuteCode(code: string, language: string) {
  if (language !== "javascript")
    return { error: "Only javascript is supported for now." };

  // console.log("The code is ", code);

  fs.writeFile("./test.js", code, (err) => {
    if (err) {
      console.error(err);
      return { error: "Error while writing file" };
    } else {
      console.log("File written succesfully");
    }
  });
  try {
    const { stdout, stderr } = await exec("node test.js");
    return { result: stdout, error: stderr };
  } catch (err: any) {
    // console.log(err.message);
    return { error: JSON.stringify(err.message) };
  }
}
