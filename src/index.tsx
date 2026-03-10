import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

// --- App ---

function App() {
  const input_ref = useRef<HTMLSelectElement>(null);
  const template_ref = useRef<HTMLSelectElement>(null);

  const [inputs, set_inputs] = useState<string[]>([]);
  const [templates, set_templates] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      set_inputs((await (await fetch("/api/inputs")).json()).inputs);
      set_templates((await (await fetch("/api/templates")).json()).templates);
    })();
  }, []);

  const [status, set_status] = useState("Ready");

  async function onSubmit() {
    const input = input_ref.current!.value;
    const template = template_ref.current!.value;
    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify({ input, template }),
    });
    const result = await response.json();
    if (result.success) {
      set_status("Success");
    } else {
      set_status(`Error:\n\n${result.error}`);
    }
  }

  return (
    <div>
      <div className="title">resume-formatter</div>
      <div className="prompt">Choose input</div>
      <select className="select" ref={input_ref} defaultValue={inputs[0]}>
        {inputs.map((input) => (
          <option value={input}>{input}</option>
        ))}
      </select>
      <div>Choose template</div>
      <select className="select" ref={template_ref} defaultValue={templates[0]}>
        {templates.map((template) => (
          <option value={template}>{template}</option>
        ))}
      </select>
      <div className="controls">
        <button className="submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
      <div className="status">
        <pre>{status}</pre>
      </div>
    </div>
  );
}

// --- Mount ---

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
