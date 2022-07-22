import MyTable from "../../MyTable";
import useGetCommandes from "./useGetCommandes";
import CommandeTableRow from "./CommandeTableRow";
import formatDate from "../../../utils/formatDate";

const CommandesTable = () => {
  const { commandes, loading } = useGetCommandes();

  const columns = [
    "Dispatch Ouvrier",
    "Nom Et Prénom",
    "Adresse",
    "Téléphone",
    "Service",
    "Sous service",
    "Site",
    "Envoyé le",
    "",
  ];
  const renderRow = (commande) => {
    const displayTime = formatDate(commande.timestamp);
    return (
      <CommandeTableRow
        id={commande.id}
        name={commande.name}
        address={commande.address}
        phone={commande.phone}
        service={commande.serviceName}
        subService={commande.selectedSubService}
        site={commande.siteName}
        displayTime={displayTime}
      />
    );
  };
  return (
    <MyTable
      columns={columns}
      data={commandes}
      renderRow={renderRow}
      loading={loading}
    />
  );
};

export default CommandesTable;
