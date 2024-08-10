import React from "react";
import { Box, Divider, Typography, styled } from "@mui/material";

const Component = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: 50,
  opacity: '.8',
  width: '100%'
});

const StyleDivider = styled(Divider)({
  marginTop: 50,
  width: '100%'
});

function NoMails({ message = {} }) {
  return (
    <Component>
      <Typography>{message.heading || "No Mails"}</Typography>
      <Typography>
        {message.subHeading || "Your inbox is empty"}
      </Typography>
      <StyleDivider />
    </Component>
  );
}

export default NoMails;
