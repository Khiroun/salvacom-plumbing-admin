import { FC, useState } from "react";
import Box from "@mui/material/Box";
import MyMenuItem from "./MyMenuItem";
import MyCollapse from "./MyCollapse";

type Props = {
  text: string;
  tabs: {
    id: string;
    text: string;
  }[];
  setCurrentTab: (tab: string) => void;
  currentTab: string;
};
const SublinksMenuItem: FC<Props> = ({
  text,
  tabs,
  setCurrentTab,
  currentTab,
}) => {
  const [open, setOpen] = useState(true);
  const toggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box>
      <MyMenuItem text={text} toggle={toggle} />
      <MyCollapse
        open={open}
        tabs={tabs}
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
      />
    </Box>
  );
};

export default SublinksMenuItem;
