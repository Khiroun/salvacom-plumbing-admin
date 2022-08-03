import { FC, useState } from "react";
import { deleteDocument } from "../../../../../firebase";
import Dialog from "../../../../Dialog";

type Props = {
  commandeId: string;
};

const DeleteButton: FC<Props> = ({ commandeId }) => {
  const [deleting, setDeleting] = useState(false);
  const deleteCommande = async () => {
    setDeleting(true);
    await deleteDocument("commandes", commandeId);
    setDeleting(false);
  };

  return (
    <Dialog
      action={deleteCommande}
      buttonText="Annuler"
      buttonStyle={{ color: "red" }}
      title={
        deleting
          ? "Suppression en cours..."
          : "Voulez-vous vraiment annuler cette commande ?"
      }
      yesButtonStyle={{ color: "red" }}
    />
  );
};

export default DeleteButton;
