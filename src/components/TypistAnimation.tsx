import Typist from "react-typist-component";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { JSX } from "react";

type TypistAnimationProps = {
  restartKey: boolean;
  rawCode: string;
  codeLanguage: string;
};

export default function TypistAnimation({
  codeLanguage,
  rawCode,
  restartKey,
}: TypistAnimationProps) {
  const parseCode = (code: string) => {
    const lines = code.split("\n");
    const elements: JSX.Element[] = [];
    let delay = 0;

    for (let line of lines) {
      const delayMatch = line.match(/\/\/ DELAY:\s*(\d+)/);
      if (delayMatch) {
        delay = parseInt(delayMatch[1], 10);
        line = line.replace(/\/\/ DELAY:\s*\d+/, "");
      } else {
        delay = 0;
      }

      elements.push(
        <div key={elements.length}>
          <Typist.Delay ms={delay} />
          <SyntaxHighlighter
            language={codeLanguage}
            style={oneDark}
            customStyle={{ margin: 0, padding: 0 }}
          >
            {line === "" ? " " : line}
          </SyntaxHighlighter>
        </div>
      );
    }

    return elements;
  };

  return (
    <Typist
      typingDelay={10}
      hideCursorWhenDone={true}
      restartKey={restartKey}
      startDelay={1000}
      cursor="|"
    >
      {parseCode(rawCode)}
    </Typist>
  );
}
