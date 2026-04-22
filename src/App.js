import { useState, useEffect } from "react";
import "./App.css";

function App() {
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

  const addNote = () => {
    if (!text.trim()) return;
    setNotes([...notes, text]);
    setText("");
  };

  const deleteNote = (i) => {
    setNotes(notes.filter((_, index) => index !== i));
  };

  return (
    <div className={dark ? "container dark" : "container"}>
      <h1>Notes (React Module)</h1>

      <button onClick={() => setDark(!dark)}>
        Toggle {dark ? "Light" : "Dark"} Mode
      </button>

      <br /><br />

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write note..."
      />

      <button onClick={addNote}>Add</button>

      {notes.length === 0 && <p>No notes yet</p>}

      {notes.map((note, i) => (
        <div key={i} className="card">
          {note}
          <br />
          <button onClick={() => deleteNote(i)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;