import { useState } from "react";
import NoteCard from "../components/NoteCard";

export default function Notes({ notes, createNote, logout }) {
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    createNote(description);
    setDescription("");
  };

  return (
    <div>
      <div className="row">
        <h2>Notes</h2>
        <button className="btn small align-right" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Create Note Section */}
      <div className="card note-input">
        <h3>Create Note</h3>
        <textarea
          placeholder="Note description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn" onClick={handleAdd}>
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="card">
        <h3>Your Notes</h3>
        {notes.length === 0 && <p className="meta">No notes yet.</p>}
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard key={note._id} description={note.description} />
          ))}
        </div>
      </div>
    </div>
  );
}
