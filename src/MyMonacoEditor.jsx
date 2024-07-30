import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Monaco from "@monaco-editor/react"; // Importa monaco aquí
import * as monaco from "monaco-editor";

const MyMonacoEditor = ({ defaultValue, selectedWord, onWordClick }) => {
  const editorRef = useRef(null);
  const [decorations, setDecorations] = useState([]);

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();

      // Limpia decoraciones anteriores
      const newDecorations = [];

      // Selección de línea donde se encuentra la palabra

      // const functionComponentPattern = new RegExp(
      //   `const\\s+${selectedWord}\\s*=\\s*(\\(.*?\\)|[^\\s(]+)\\s*=>|function\\s+${selectedWord}\\s*\\(`,
      //   "g"
      // );
      // const classComponentPattern = new RegExp(
      //   `class\\s+${selectedWord}\\s+extends\\s+React\\.Component`,
      //   "g"
      // );

      // Selección de sólo palabras
      if (selectedWord) {
        const functionComponentPattern = new RegExp(
          `\\b${selectedWord}\\b(?=\\s*=\\s*(\\(.*?\\)|[^\\s(]+)\\s*=>|\\s*\\()`,
          "g"
        );
        const classComponentPattern = new RegExp(
          `\\b${selectedWord}\\b(?=\\s+extends\\s+React\\.Component)`,
          "g"
        );

        const lines = model.getLinesContent();

        // Busqueda de expresiones
        lines.forEach((line, lineIndex) => {
          let match;
          while ((match = functionComponentPattern.exec(line)) !== null) {
            newDecorations.push({
              range: new monaco.Range(
                lineIndex + 1,
                match.index + 1,
                lineIndex + 1,
                match.index + 1 + match[0].length
              ),
              options: {
                inlineClassName: "highlight",
              },
            });
          }
          while ((match = classComponentPattern.exec(line)) !== null) {
            newDecorations.push({
              range: new monaco.Range(
                lineIndex + 1,
                match.index + 1,
                lineIndex + 1,
                match.index + 1 + match[0].length
              ),
              options: {
                inlineClassName: "highlight",
              },
            });
          }
        });
      }

      // Resaltado
      const newDecorationIds = editorRef.current.deltaDecorations(
        decorations,
        newDecorations
      );
      if (
        newDecorationIds.length !== decorations.length ||
        !newDecorationIds.every((id, index) => id === decorations[index])
      ) {
        setDecorations(newDecorationIds);
      }
    }
  }, [selectedWord, decorations]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    editor.onMouseDown((e) => {
      const position = e.target.position;
      const model = editor.getModel();
      const word = model.getWordAtPosition(position);

      if (word) {
        const clickedWord = word.word;

        const newSelectedWord = (prevWord) =>
          prevWord === clickedWord ? null : clickedWord;

        // Imprimir la palabra seleccionada y su estado de resaltado
        console.log(
          `Selected word: ${clickedWord}, Highlighted: ${
            newSelectedWord(selectedWord) !== null
          }`
        );

        onWordClick(newSelectedWord);
      }
    });
  };

  return (
    <div style={{ width: "400px", height: "400px" }}>
      <Monaco
        height="100%"
        defaultLanguage="javascript"
        defaultValue={defaultValue}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 11,
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

MyMonacoEditor.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  selectedWord: PropTypes.string,
  onWordClick: PropTypes.func.isRequired,
};

export default MyMonacoEditor;
