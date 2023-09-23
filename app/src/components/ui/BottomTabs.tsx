import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationProps,
} from "@mui/material";
import React from "react";
import { HomeRounded as HomeIcon } from "@mui/icons-material";
import { BookOutlined as GuideIcon } from "@mui/icons-material";
import { AccountCircle as ProfileIcon } from "@mui/icons-material";
import { useHistory } from "react-router";

type BottomTabProps = {
  tab: "home" | "guides" | "profile";
};

const BottomTabs: React.FC<BottomNavigationProps & BottomTabProps> = ({
  ...props
}) => {
  const history = useHistory();
  return (
    <BottomNavigation
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "90px" }}
      showLabels
      value={props?.tab}
      onChange={(_, newValue) => {
        history.push("/" + newValue);
      }}
    >
      <BottomNavigationAction label="Home" value={"home"} icon={<HomeIcon />} />
      <BottomNavigationAction
        label="Guides"
        value={"guides"}
        icon={<GuideIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value={"profile"}
        icon={<ProfileIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomTabs;
