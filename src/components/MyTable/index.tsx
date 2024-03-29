import { FC, useCallback, useRef, useState } from "react";
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
import { Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import TotalPrice from "../TotalPrice";

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
  const tableRef = useRef(null);
  const reactToPrintContent = useCallback(() => {
    return tableRef.current;
  }, [tableRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
  });
  if (loading) return <CircularProgress />;
  const priceMinMax = [0, 0];
  tableData.map((item) => {
    let minPrice = 0;
    let maxPrice = 0;
    const selectedService = item.selectedService;
    if (selectedService) {
      selectedService.map((s) => {
        minPrice += s.priceRange[0];
        maxPrice += s.priceRange[1];
      });
    }
    priceMinMax[0] += minPrice;
    priceMinMax[1] += maxPrice;
  });
  return (
    <Paper>
      {priceMinMax[0] > 0 && (
        <TotalPrice
          minPrice={priceMinMax[0]}
          maxPrice={priceMinMax[1]}
          moyPrice={(priceMinMax[0] + priceMinMax[1]) / 2}
        />
      )}
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
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button onClick={handlePrint}>Imprimer</Button>
          </div>
          <TableContainer ref={tableRef}>
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
        </div>
      )}
    </Paper>
  );
};

export default MyTable;
