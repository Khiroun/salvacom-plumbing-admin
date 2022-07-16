import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FC, useEffect, useState } from "react";
import { getAll, updateDocument } from "../../../../firebase";
import ActionCellContent from "./ActionCellContent";
import { useRouter } from "next/router";

type Props = {
  id: string;
  name: string;
  address: string;
  phone: string;
  service: string;
  subService: string;
  site: string;
  displayTime: string;
};

const CommandeTableRow: FC<Props> = ({
  id,
  name,
  address,
  phone,
  service,
  subService,
  site,
  displayTime,
}) => {
  const [ouvriers, setOuvriers] = useState([]);
  const [SelectedOuvrier, setSelectedOuvrier] = useState("");
  const router = useRouter();

  useEffect(() => {
    getAll("ouvriers").then((res) => {
      setOuvriers(res);
    });
  }, []);
  const valider = async () => {
    if (SelectedOuvrier) {
      await updateDocument("commandes", id, {
        ouvrier: SelectedOuvrier,
        status: "attente",
      });
      router.push("/commandes/attente");
    }
  };
  return (
    <TableRow>
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
            return (
              <MenuItem key={ouvrier.id} value={ouvrier.id}>
                {ouvrier.email}
              </MenuItem>
            );
          })}
        </Select>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{service}</TableCell>
      <TableCell>{subService}</TableCell>
      <TableCell>{site}</TableCell>
      <TableCell>{displayTime}</TableCell>
      <TableCell>
        <ActionCellContent valider={valider} />
      </TableCell>
    </TableRow>
  );
};

export default CommandeTableRow;
