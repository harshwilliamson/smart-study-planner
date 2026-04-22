import { useState, useEffect } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className={dark ? "card dark" : "card"}>
      <h2>📝 Notes</h2>

      <button onClick={() => setDark(!dark)}>
        Toggle {dark ? "Light" : "Dark"}
      </button>

      <br />

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={() => {
          if (text) setNotes([...notes, text]);
          setText("");
        }}
      >
        Add
      </button>

      {notes.map((n, i) => (
        <div key={i}>{n}</div>
      ))}
    </div>
  );
}

export default Notes;