import { Editor } from "./Components/Editor";
import { v4 as uuid } from "uuid";
import randomColor from "randomcolor";

export const App = () => {
  return (
    <div className="h-[100vh] w-[100vw]">
      <Editor
        id={uuid()}
        roomName="room-1"
        editorName="editor-1"
        backendURL="ws://localhost:8080"
        colorScheme={randomColor({
          luminosity: "dark",
          alpha: 1,
        })}
      />
    </div>
  );
};
