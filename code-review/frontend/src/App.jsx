import "./App.css";
import {useState, useEffect } from "react";
import Editor from "react-simple-code-editor"
import "prismjs/themes/prism-tomorrow.css";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight"; 
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import prism from "prismjs";

function App() {

  const [code, setCode] = useState(` function sum(){
  return 1+2;
}
`)

const [review, setreview] = useState(``)

  useEffect(() => {
    prism.highlightAll();
  },[]);

  async function reviewcode(){
    const response = await axios.post('http://localhost:3000/ai/get-review',{code})
setreview(response.data)
  }

  return (
    <>
      <main>
      <div className="left">
  <div className="code" style={{ height: "100%", overflowY: "auto" }}>
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 20,
        // border: "1px solid #ddd",
        borderRadius: "5px",
        height: "calc(100% - 50px)", // Reduce the height to leave space for any bottom elements, like 'review'
        width: "100%",
        overflowY: "auto", // Ensure it can scroll if content overflows
      }}
    />
  </div>
 <div onClick={reviewcode} className="review">Review </div>
        </div>

        <div className="right">
        <Markdown  rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
