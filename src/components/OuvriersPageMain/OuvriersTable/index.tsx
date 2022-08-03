import { useGetAllSnapshot } from "../../../firebase";
import MyTable from "../../MyTable";
import OuvriersRowInner from "./OuvriersRowInner";
const OuvriersTable = () => {
  const { data, loading } = useGetAllSnapshot("ouvriers");
  const columns = [
    "Nom",
    "Prénom",
    "Email",
    "Mot de passe",
    "Téléphone",
    "Adresse",
    "Description",
    "",
  ];
  const renderRow = (row) => {
    return <OuvriersRowInner ouvrier={row} />;
  };

  return (
    <MyTable
      columns={columns}
      data={data}
      renderRow={renderRow}
      loading={loading}
    />
  );
};

export default OuvriersTable;
