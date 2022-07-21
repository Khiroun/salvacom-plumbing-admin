import TableCell from "@mui/material/TableCell";
import { FC } from "react";
import DeleteButton from "./DeleteButton";
import ManageButton from "./ManageButton";
import MyTable from "../../MyTable";

type Props = {
  services: any[];
  loading: boolean;
};
const ServicesTable: FC<Props> = ({ services, loading }) => {
  const columns = ["Nom", "Description", ""];
  const renderRow = (service) => {
    return (
      <>
        <TableCell component="th" scope="row">
          {service.name}
        </TableCell>
        <TableCell align="right">{service.description}</TableCell>
        <TableCell
          align="right"
          sx={{
            display: "flex",
          }}
        >
          <DeleteButton id={service.id} />
          <ManageButton id={service.id} />
        </TableCell>
      </>
    );
  };
  const data = services ? services : [];
  return (
    <MyTable
      columns={columns}
      data={data}
      renderRow={renderRow}
      loading={loading}
    />
  );
};
export default ServicesTable;
