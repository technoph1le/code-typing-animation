import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeEditorProps = {
  setRawCode: (code: string) => void;
  rawCode: string;
  codeLanguage: string;
};

export default function CodeEditor({
  codeLanguage,
  rawCode,
  setRawCode,
}: CodeEditorProps) {
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRawCode(event.target.value);
  };

  return (
    <div className="code-editor">
      <SyntaxHighlighter
        language={codeLanguage}
        style={oneDark}
        customStyle={{ margin: 0, pointerEvents: "none" }}
        className="code-editor__syntax-highlighter"
        wrapLines={true}
      >
        {rawCode}
      </SyntaxHighlighter>
      <textarea
        value={rawCode}
        onChange={handleInput}
        spellCheck={false}
        className="code-editor__textarea"
      />
    </div>
  );
}
