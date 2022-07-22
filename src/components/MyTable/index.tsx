import { FC, useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";

type Props = {
  data: any[];
  columns: string[];
  renderRow: (row: any) => JSX.Element;
  loading?: boolean;
};
const MyTable: FC<Props> = ({ data, columns, renderRow, loading }) => {
  const [search, setSearch] = useState("");
  const tableData = [];
  data.forEach((item) => {
    let exists = false;
    for (let key in item) {
      const value = item[key];
      if (typeof value === "string") {
        if (value.toLowerCase().includes(search.toLowerCase())) {
          exists = true;
        }
      }
    }
    if (exists) {
      tableData.push(item);
    }
  });
  if (loading) return <CircularProgress />;

  return (
    <Paper>
      <SearchBar search={search} setSearch={setSearch} />
      {tableData.length === 0 ? (
        <Paper
          sx={{
            width: "50%",
            margin: "auto",
            marginTop: "2rem",
          }}
        >
          <Typography variant="h3" color="GrayText" textAlign="center">
            Aucun résultat
          </Typography>
        </Paper>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((item) => {
                return <TableRow key={item.id}>{renderRow(item)}</TableRow>;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default MyTable;
