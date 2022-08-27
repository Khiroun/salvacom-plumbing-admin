import { FC } from "react";

type Props = {
  notes: string[];
};
const Notes: FC<Props> = ({ notes }) => {
  return (
    <div>
      Notes:{" "}
      <ul>
        {notes.map((note) => {
          return <li key={note}>{note}</li>;
        })}
      </ul>
    </div>
  );
};

export default Notes;
