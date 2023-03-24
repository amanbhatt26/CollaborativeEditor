import { WebsocketProvider } from "y-websocket";
import { Array as YArray, Doc } from "yjs";

export type Operation = {
  type:
    | "single"
    | "paste"
    | "backspace"
    | "delete"
    | "cut"
    | "copy"
    | "undo"
    | "redo"
    | "selectAll";

  content?: Element[] | null;
};

export type Element = {
  type: "char" | "cursor";
  id?: string;
  content?: string;
  color: string;
};

export type EditorProps = {
  id: string;
  backendURL: string;
  roomName: string;
  editorName: string;
  colorScheme: string;
};

export type EditorState = {
  doc: Doc | null;
  array: YArray<Element> | null;
  socket:WebSocket|null
};
