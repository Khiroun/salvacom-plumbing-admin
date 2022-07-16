import { FC, useState } from "react";
import Box from "@mui/material/Box";
import MyMenuItem from "./MyMenuItem";
import MyCollapse from "./MyCollapse";
import { useRouter } from "next/router";

type Props = {
  link: string;
  text: string;
  subLinks: {
    link: string;
    text: string;
  }[];
};
const SublinksMenuItem: FC<Props> = ({ link, text, subLinks }) => {
  const router = useRouter();
  const path = router.asPath;
  const [open, setOpen] = useState(() => path.includes(link));
  const toggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box>
      <MyMenuItem link={link} text={text} toggle={toggle} />
      <MyCollapse open={open} subLinks={subLinks} />
    </Box>
  );
};

export default SublinksMenuItem;
