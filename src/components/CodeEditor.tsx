type CodeEditorProps = {
  setRawCode: (code: string) => void;
  rawCode: string;
};

export default function CodeEditor({ rawCode, setRawCode }: CodeEditorProps) {
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRawCode(event.target.value);
  };

  return (
    <div className="code-editor">
      <textarea
        value={rawCode}
        onChange={handleInput}
        spellCheck={false}
        className="code-editor__textarea"
      />
    </div>
  );
}
