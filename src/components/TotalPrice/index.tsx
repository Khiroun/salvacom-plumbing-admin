import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { FC } from "react";
type Props = {
  minPrice: number;
  maxPrice: number;
  moyPrice: number;
};
const TotalPrice: FC<Props> = ({ minPrice, maxPrice, moyPrice }) => {
  return (
    <Paper
      style={{
        width: "55%",
        margin: "1em 0",
        display: "flex",
      }}
    >
      <PriceBox>
        <Typography variant="h5" color="GrayText">
          Min
        </Typography>
        <Typography variant="h6">{minPrice} da</Typography>
      </PriceBox>
      <PriceBox>
        <Typography variant="h5" color="GrayText">
          Moy
        </Typography>
        <Typography variant="h6" color="Highlight">
          {moyPrice} da
        </Typography>
      </PriceBox>
      <PriceBox>
        <Typography variant="h5" color="GrayText">
          Max
        </Typography>
        <Typography variant="h6">{maxPrice} da</Typography>
      </PriceBox>
    </Paper>
  );
};
const PriceBox = styled(Box)`
  padding: 1em;
  border-right: 1px solid #999;
  flex: 1;
`;
export default TotalPrice;
