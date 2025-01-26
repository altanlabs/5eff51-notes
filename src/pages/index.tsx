import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function IndexPage() {
  const [folders, setFolders] = useState<{ name: string; notes: string[] }[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  const addFolder = () => {
    const newFolder = { name: "New Folder", notes: [] };
    setFolders([...folders, newFolder]);
    setSelectedFolder(folders.length);
    setSelectedNote(null);
  };

  const addNote = () => {
    if (selectedFolder !== null) {
      const newNote = "New Note";
      const updatedFolders = [...folders];
      updatedFolders[selectedFolder].notes.push(newNote);
      setFolders(updatedFolders);
      setSelectedNote(updatedFolders[selectedFolder].notes.length - 1);
    }
  };

  const updateNote = (content: string) => {
    if (selectedFolder !== null && selectedNote !== null) {
      const updatedFolders = [...folders];
      updatedFolders[selectedFolder].notes[selectedNote] = content;
      setFolders(updatedFolders);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-50 dark:bg-gray-800 p-4 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Folders</h2>
        <Button onClick={addFolder} className="mb-4 bg-blue-600 text-white rounded shadow">
          New Folder
        </Button>
        <ul className="space-y-2">
          {folders.map((folder, folderIndex) => (
            <li key={folderIndex}>
              <div
                className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${
                  selectedFolder === folderIndex ? "bg-gray-200 dark:bg-gray-600" : ""
                }`}
                onClick={() => {
                  setSelectedFolder(folderIndex);
                  setSelectedNote(null);
                }}
              >
                {folder.name}
              </div>
              {selectedFolder === folderIndex && (
                <ul className="pl-4 mt-2 space-y-1">
                  {folder.notes.map((note, noteIndex) => (
                    <li
                      key={noteIndex}
                      className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${
                        selectedNote === noteIndex ? "bg-gray-200 dark:bg-gray-600" : ""
                      }`}
                      onClick={() => setSelectedNote(noteIndex)}
                    >
                      {note.slice(0, 20)}...
                    </li>
                  ))}
                  <Button onClick={addNote} className="mt-2 bg-green-600 text-white rounded shadow">
                    New Note
                  </Button>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-8 bg-white dark:bg-gray-900">
        {selectedFolder !== null && selectedNote !== null ? (
          <Textarea
            value={folders[selectedFolder].notes[selectedNote]}
            onChange={(e) => updateNote(e.target.value)}
            className="w-full h-full border-none bg-transparent"
          />
        ) : (
          <div className="text-gray-500 dark:text-gray-400">Select a folder and note to view or edit</div>
        )}
      </div>
    </div>
  );
}
