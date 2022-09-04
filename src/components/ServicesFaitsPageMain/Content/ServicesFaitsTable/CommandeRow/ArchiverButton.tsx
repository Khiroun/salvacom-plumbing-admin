import { Button, CircularProgress } from "@mui/material";
import { FC, useState } from "react";
import { updateDocument } from "../../../../../firebase";
type Props = {
  commandeId: string;
};
const ArchiverButton: FC<Props> = ({ commandeId }) => {
  const [loading, setLoading] = useState(false);
  const btnClicked = async () => {
    const answer = confirm("Voulez vous vraiment archiver");
    if (!answer) return;
    setLoading(true);
    await updateDocument("commandes", commandeId, { status: "archived" }).catch(
      () => {
        setLoading(false);
        alert("Une erreur s'est produite");
      }
    );
    setLoading(false);
  };
  if (loading) return <CircularProgress />;
  return (
    <>
      <Button onClick={btnClicked}>Archiver</Button>
    </>
  );
};

export default ArchiverButton;
