import React from "react";
import { Drawer, styled } from "@mui/material";
import SideBarContent from "./SideBarContent";

const StyledDrawer = styled(Drawer)`
    margin-top: 54px;
`
function Sidebar({openDrawer}) {
  return (
    <StyledDrawer
      anchor="left"
      open={openDrawer}
      hideBackdrop={true}
      ModalProps={{
        keepMounted: true,
      }}
      variant="persistent"
      sx={{
        '& .MuiDrawer-paper':{
          width: 250,
          borderRight: 'none',
          background: '#f5F5F5',
          marginTop: '64px',
          height: 'calc(100vh - 64px)'
        }
      }}
    >
      <SideBarContent/>
    </StyledDrawer>
  );
}

export default Sidebar;
