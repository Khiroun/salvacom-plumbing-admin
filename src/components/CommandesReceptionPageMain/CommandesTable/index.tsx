import MyTable from "../../MyTable";
import useGetCommandes from "./useGetCommandes";
import CommandeTableRow from "./CommandeTableRow";

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
    const arr = commande.timestamp && commande.timestamp.split(" ");
    const month = arr[1];
    const day = arr[2];
    const year = arr[3];
    const time = arr[4];
    const timeArr = time.split(":");
    const hour = timeArr[0];
    const minut = timeArr[1];
    const displayTime = `${day}/${month}/${year} a ${hour}:${minut}`;
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
