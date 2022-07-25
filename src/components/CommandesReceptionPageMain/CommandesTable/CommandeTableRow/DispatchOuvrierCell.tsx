import TableCell from "@mui/material/TableCell";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FC, useEffect, useState } from "react";
import { getAll } from "../../../../firebase";

type Props = {
  setSelectedOuvrier: (ouvrierId: string) => void;
};

const DispatchOuvrierCell: FC<Props> = ({ setSelectedOuvrier }) => {
  const [ouvriers, setOuvriers] = useState([]);
  useEffect(() => {
    getAll("ouvriers").then((res) => {
      setOuvriers(res);
    });
  }, []);

  return (
    <TableCell>
      <Select
        fullWidth
        onChange={(e) => {
          setSelectedOuvrier(e.target.value);
        }}
        defaultValue=""
      >
        <MenuItem value=""></MenuItem>
        {ouvriers.map((ouvrier) => {
          const displayName = `${ouvrier.firstName} ${ouvrier.lastName}`;
          return (
            <MenuItem key={ouvrier.id} value={ouvrier.id}>
              {displayName}
            </MenuItem>
          );
        })}
      </Select>
    </TableCell>
  );
};

export default DispatchOuvrierCell;
