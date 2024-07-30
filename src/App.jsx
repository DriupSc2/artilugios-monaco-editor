// src/App.jsx
import { useState } from "react";
import MyMonacoEditor from "./MyMonacoEditor";

const codeSnippets = [
  ` return (
    <div>
      {codeSnippets.map((code, index) => (
        <MyMonacoEditor
          key={index}
          id={index + 1}
          defaultValue={code} // Pasar el código predefinido
          selectedWord={selectedWord}
          onWordClick={setSelectedWord}
        />
      ))}
    </div>`,
  `const MyMonacoEditor = ({ defaultValue, selectedWord, onWordClick }) => {
  const editorRef = useRef(null);
  const [decorations, setDecorations] = useState([]);
`,
  `
MyMonacoEditor.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  selectedWord: PropTypes.string,
  onWordClick: PropTypes.func.isRequired,
};

export default MyMonacoEditor;
`,
];

const App = () => {
  const [selectedWord, setSelectedWord] = useState(null);

  return (
    <div>
      {codeSnippets.map((code, index) => (
        <MyMonacoEditor
          key={index}
          id={index + 1}
          defaultValue={code} // Pasar el código predefinido
          selectedWord={selectedWord}
          onWordClick={setSelectedWord}
        />
      ))}
    </div>
  );
};

export default App;
