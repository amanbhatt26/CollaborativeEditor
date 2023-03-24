import { Element } from "../../types";
import { YArray } from "yjs/dist/src/internals";
import * as React from "react";
import { Cursor } from "./Cursor";
import randomColor from "randomcolor";

export type EditorDisplayProps = {
  array: Element[] | null;
  cursorColor: string;
};

export type DisplayElement = {
  type: "cursor-arr" | "text";
  content?: string;
  arr?: Element[];
};

export const EditorDisplay = ({ array, cursorColor }: EditorDisplayProps) => {
  if (array === null) return <div></div>;
  let text = "";
  let cursorArr: Element[] = [];
  let displayEl: DisplayElement[] = [];

  array.forEach((el) => {
    if (el.type === "char") {
      displayEl.push({ type: "cursor-arr", arr: cursorArr });
      cursorArr = [];
      text += el.content;
    } else {
      displayEl.push({ type: "text", content: text });
      text = "";
      cursorArr.push(el);
    }
  });

  if (cursorArr.length > 0) {
    displayEl.push({ type: "cursor-arr", arr: cursorArr });
  }
  if (text.length > 0) {
    displayEl.push({ type: "text", content: text });
  }
  return (
    <>
      {displayEl.map((el) => {
        if (el.type === "text") {
          return el.content;
        } else if (el.type === "cursor-arr") {
          return (
            <span className="relative h-[1rem] w-[0rem]">
              {el.arr?.map((cu) => {
                return <Cursor color={cu.color} />;
              })}
            </span>
          );
        }
      })}
    </>
  );
};
