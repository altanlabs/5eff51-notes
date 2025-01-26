import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function IndexPage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = () => {
    const newNote = "New Note";
    setNotes([...notes, newNote]);
    setSelectedNote(notes.length);
  };

  const updateNote = (content) => {
    if (selectedNote !== null) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNote] = content;
      setNotes(updatedNotes);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-50 dark:bg-gray-800 p-4 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Notes</h2>
        <Button onClick={addNote} className="mb-4 bg-blue-600 text-white rounded shadow">
          New Note
        </Button>
        <ul className="space-y-2">
          {notes.map((note, index) => (
            <li
              key={index}
              className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${
                selectedNote === index ? "bg-gray-200 dark:bg-gray-600" : ""
              }`}
              onClick={() => setSelectedNote(index)}
            >
              {note.substring(0, 20)}...
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-8 bg-white dark:bg-gray-900">
        {selectedNote !== null ? (
          <Textarea
            value={notes[selectedNote]}
            onChange={(e) => updateNote(e.target.value)}
            className="w-full h-full border-none bg-transparent"
          />
        ) : (
          <div className="text-gray-500 dark:text-gray-400">Select a note to view or edit</div>
        )}
      </div>
    </div>
  );
}
