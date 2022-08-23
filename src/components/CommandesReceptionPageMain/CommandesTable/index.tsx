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

    "Site",
    "Envoyé le",
    "Prix",
    "",
  ];
  const renderRow = (commande) => {
    const displayTime = formatDate(commande.timestamp);
    const maxPrice = commande.selectedService.reduce((acc, curr) => {
      return acc + curr.priceRange[1];
    }, 0);
    const minPrice = commande.selectedService.reduce((acc, curr) => {
      return acc + curr.priceRange[0];
    }, 0);
    return (
      <CommandeTableRow
        id={commande.id}
        name={commande.name}
        address={commande.address}
        phone={commande.phone}
        site={commande.siteName}
        displayTime={displayTime}
        price={[minPrice, maxPrice]}
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
