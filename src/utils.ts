import { YArray } from "yjs/dist/src/internals";
import { Element, Operation } from "./types";

export function yArraytoString(array: YArray<Element> | null): string {
  if (array === null) return "";
  let text = "";
  array.forEach((el) => {
    if (el.type === "char") {
      text += el.content;
    }
  });
  return text;
}

export function elArraytoString(array: Element[] | null): string {
  if (array === null) return "";
  let text = "";
  array.forEach((el) => {
    if (el.type === "char") {
      text += el.content;
    }
  });
  return text;
}

export function insertToYArray(
  array: YArray<Element> | null,
  index: number,
  el: Element
) {
  if (array === null) return;

  array.insert(index, [el]);
}

export function deleteCursorFromYArray(
  array: YArray<Element> | null,
  id: string
) {
  let delIndex = -1;
  array?.forEach((el, index) => {
    if (el.type === "cursor") {
      if (el.id === id) delIndex = index;
    }
  });

  if (delIndex === -1) return;
  array?.delete(delIndex, 1);
}

export function locateCursor(
  array: YArray<Element> | null,
  id: string
): number {
  let curIndex = -1;
  array?.forEach((el, index) => {
    if (el.type === "cursor") {
      if (el.id === id) curIndex = index;
    }
  });

  return curIndex;
}

export function backspaceChar(array: YArray<Element> | null, index: number) {
  if (array === null) return;
  let delIndex = index;
  while (delIndex >= 0 && array.get(delIndex).type === "cursor") {
    delIndex -= 1;
  }

  if (delIndex >= 0) {
    array.delete(delIndex, 1);
  }
}

export function deleteChar(array: YArray<Element> | null, index: number) {
  if (array === null) return;
  let delIndex = index;
  while (delIndex < array.length && array.get(delIndex).type === "cursor") {
    delIndex += 1;
  }

  if (delIndex < array.length) {
    array.delete(delIndex, 1);
  }
}

export function findCursorInsertPosOffset(
  array: YArray<Element> | null,
  index: number
): number {
  if (array === null) return 0;
  let count = index;
  let iter = 0;
  let offset = 0;
  while (count > 0) {
    if (array.get(iter).type === "cursor") offset += 1;
    if (array.get(iter).type === "char") count -= 1;
    iter += 1;
  }
  return offset;
}

export function eventToOperation(
  event: React.KeyboardEvent<HTMLTextAreaElement>
): Operation | null {
  if (event.ctrlKey) {
    /* Special events */

    // if (event.key === "v") {
    //   return {
    //     type: "paste",
    //     selectionStart: textRef.current.selectionStart,
    //     selectionEnd: textRef.current.selectionEnd,
    //     content: await navigator.clipboard.readText(),
    //   };
    // }

    // if (event.key === "x") {
    //   return {
    //     type: "cut",
    //     selectionStart: textRef.current.selectionStart,
    //     selectionEnd: textRef.current.selectionEnd,
    //   };
    // }

    // if (event.key === "c") {
    //   return {
    //     type: "copy",
    //     selectionStart: textRef.current.selectionStart,
    //     selectionEnd: textRef.current.selectionEnd,
    //   };
    // }

    // if (event.key === "z") {
    //   return {
    //     type: "undo",
    //     selectionStart: textRef.current.selectionStart,
    //     selectionEnd: textRef.current.selectionEnd,
    //   };
    // }

    // if (event.key === "y") {
    //   return {
    //     type: "redo",
    //     selectionStart: textRef.current.selectionStart,
    //     selectionEnd: textRef.current.selectionEnd,
    //   };
    // }

    // if (event.key === "a") {
    //   textRef.current.selectionStart = 0;
    //   textRef.current.selectionEnd = textRef.current.value.length;
    //   return {
    //     type: "selectAll",
    //     selectionStart: textRef.current.selectionStart,
    //     selectionEnd: textRef.current.selectionEnd,
    //   };
    // }

    return null;
  }

  if (event.key === "Backspace") {
    return {
      type: "backspace",
    };
  }

  if (event.key === "Delete") {
    return {
      type: "delete",
    };
  }

  if (event.key === "Enter") {
    return {
      type: "single",
      content: [{ type: "char", content: "\n", color: "#000000" }],
    };
  }

  if (event.key.length > 1) {
    return null;
  }

  return {
    type: "single",
    content: [{ type: "char", content: event.key, color: "#000000" }],
  };
}
