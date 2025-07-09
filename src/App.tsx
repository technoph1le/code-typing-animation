import { useState } from "react";
import TypistAnimation from "./components/TypistAnimation";
import CodeEditor from "./components/CodeEditor";

const languages = [
  "javascript",
  "html",
  "css",
  "md",
  "bash",
  "python",
  "c",
  "cpp",
  "sql",
  "java",
  "visual-basic",
  "assembly",
  "typescript",
  "php",
];

function App() {
  const [restartKey, setRestartKey] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement);
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const [rawCode, setRawCode] = useState(
    `function greet(name) {
  console.log("Hello, " + name);
}
// DELAY: 2000
greet("Techno");
`
  );

  const toggleRestart = () => {
    setRestartKey((prev) => !prev);
  };

  const toggleFullScreen = () => {
    const container = document.querySelector(".typist-animation-wrapper");

    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(null);
    } else {
      if (container) {
        container
          .requestFullscreen()
          .then(() => {
            setIsFullScreen(container);
          })
          .catch((err) => {
            console.error(
              `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
          });
      }
    }
  };

  return (
    <main>
      <section className="code-editor-wrapper">
        <CodeEditor rawCode={rawCode} setRawCode={setRawCode} />
        <div className="button-group button-group--left">
          <select
            className="select"
            name="languages"
            id="languages"
            onChange={(e) => setCodeLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section
        className={`typist-animation-wrapper ${
          isFullScreen ? "fullscreen" : ""
        }`}
      >
        <TypistAnimation
          codeLanguage={codeLanguage}
          rawCode={rawCode}
          restartKey={restartKey}
        />
        <div className="button-group button-group--right">
          <button className="button" onClick={toggleFullScreen}>
            🖼️ Fullscreen mode
          </button>
          <button className="button" onClick={toggleRestart}>
            ✨ Start animation
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
