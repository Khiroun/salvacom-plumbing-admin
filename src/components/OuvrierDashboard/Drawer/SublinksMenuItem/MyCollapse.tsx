import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import MenuList from "@mui/material/MenuList";
import { FC } from "react";

type Props = {
  open: boolean;
  tabs: {
    id: string;
    text: string;
  }[];
  setCurrentTab: (tab: string) => void;
  currentTab: string;
};
const MyCollapse: FC<Props> = ({ open, tabs, setCurrentTab, currentTab }) => {
  return (
    <Collapse in={open}>
      <MenuList
        style={{
          marginLeft: "1em",
        }}
      >
        {tabs.map((tab) => {
          return (
            <MenuItem
              key={tab.text + tab.id}
              onClick={() => {
                setCurrentTab(tab.id);
              }}
              sx={{
                backgroundColor: currentTab === tab.id ? "primary.dark" : "",
                color: currentTab === tab.id ? "white" : "",
              }}
            >
              <>{tab.text}</>
            </MenuItem>
          );
        })}
      </MenuList>
    </Collapse>
  );
};
export default MyCollapse;
