import Typography from "@mui/material/Typography";
import { FC } from "react";
type Props = {
  children?: (JSX.Element | string) | (JSX.Element | string)[];
};
const SectionTitle: FC<Props> = ({ children }) => {
  return (
    <Typography variant="h1" textAlign="center" color="GrayText">
      {children}
    </Typography>
  );
};

export default SectionTitle;
