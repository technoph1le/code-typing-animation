import { useState } from "react";
import TypistAnimation from "./components/TypistAnimation";
import CodeEditor from "./components/CodeEditor";

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
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="md">Markdown</option>
            <option value="bash">Terminal</option>
            <option value="py">Python</option>
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
