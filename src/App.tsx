import { Editor } from "./Components/Editor";
import { v4 as uuid } from "uuid";
import randomColor from "randomcolor";
import {Routes, Route, useParams} from "react-router-dom";

export const App = () => {
  return (
    <div className="h-[100vh] w-[100vw]">
      <Routes>
        <Route path="/" element={<div>Home Page</div>}/>
        <Route path="/document/:id" element={<EditorPage/>}/>
        <Route path="*" element={<div>Page Not Found</div>}/>
      </Routes>
     
    </div>
  );
};

const EditorPage = ()=>{
  const {id} = useParams(); 
  return <div className="h-[100vh] w-[100vw]">
    <div className="h-wrap w-full"> Document {id}</div>
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
}
