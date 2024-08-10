import React, { useState } from "react";
import { Box, Button, List, ListItem, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";
import { SIDEBAR_DATA } from "../config/sidebar-config";
import ComposeMail from "./ComposeMail";
import { NavLink, useParams } from "react-router-dom";
import {routes} from "../routes/routes";
const Container = styled(Box)`
  padding: 8px;
  & > ul {
    padding: 10px 0 0 5px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    & > a {
      text-decoration: none;
      color: inherit;
    }
    & > ul > a > li > svg {
      margin-right: 20px;
    }
  }
`;
const ComposedButton = styled(Button)({
  background: "#c2e7ff",
  color: "001d35",
  padding: 15,
  borderRadius: 16,
  textTransform: "none",
  minWidth: 140,
});
function SideBarContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const { type } = useParams();

  const onComposeClick = () => {
    setOpenDialog(true);
  };

  return (
    <Container>
      <ComposedButton onClick={() => onComposeClick()}>
        <CreateOutlined style={{ marginRight: 10 }} />
        Composed
      </ComposedButton>
      <List>
        {SIDEBAR_DATA.map((data) => (
          <NavLink
            key={data.name}
            to={`${routes.emails.path}/${data.name.toLowerCase()}`}
            
          >
            <ListItem style={
                type === data.name.toLowerCase()
                  ? {
                      backgroundColor: "#d3e3fd",
                      borderRadius: "0 16px 16px 0",
                    }
                  : {}
              }>
              <data.icon fontSize="small" />
              {data.title}
            </ListItem>
          </NavLink>
        ))}
      </List>
      <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </Container>
  );
}

export default SideBarContent;
