import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FC, useState } from "react";
import { updateDocument } from "../../firebase";

type Props = {
  notes: string[];
  commandeId: string;
  setNotes: any;
};

const NotesInput: FC<Props> = ({ notes, commandeId, setNotes }) => {
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          onClick={() => setNotesOpen((prev) => !prev)}
          color={notesOpen ? "error" : "primary"}
        >
          {notesOpen ? "Annuler" : "Ajouter une note"}
        </Button>
        {notesOpen && noteText.length >= 3 && (
          <Button
            onClick={async () => {
              await updateDocument("commandes", commandeId, {
                notes: [noteText, ...notes],
              });
              setNoteText("");
              setNotes((prev) => [noteText, ...prev]);
              setNotesOpen(false);
            }}
          >
            Ajouter
          </Button>
        )}
      </div>
      {notesOpen && (
        <TextField
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
      )}
    </div>
  );
};

export default NotesInput;
