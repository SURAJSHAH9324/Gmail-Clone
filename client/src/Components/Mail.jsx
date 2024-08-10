import React from "react";
import { Box, Typography, Checkbox, styled } from "@mui/material";
import { StarBorder, Star } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
const Wrapper = styled(Box)`
  padding: 0 0 0 10px;
  background: #f2f6fc;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 10px 0;

  & > div {
    display: flex;
    width: 100%;
  }

  & > div > p {
    font-size: 14px;
  }
`;

const Indicator = styled(Typography)`
  font-size: 12px !important;
  background: #ddd;
  color: #222;
  border-radius: 4px;
  margin-right: 6px;
  padding: 0 4px;
`;

const Mail = ({
  email,
  selectedEmails,
  handleSelectEmail,
  setRefreshScreen,
}) => {
  const navigate = useNavigate();
  const toggleStarredService = useApi(API_URLS.toggleStarredEmail);
  const toggleStarredMails = () => {
    toggleStarredService.call({
      id: email._id,
      value: !email.starred,
    });
    setRefreshScreen((prevState) => !prevState);
  };
  return (
    <Wrapper>
      <Checkbox
        size="small"
        checked={selectedEmails.includes(email._id)}
        onChange={() => handleSelectEmail(email._id)}
      />
      {
      email.starred ? (
        <Star
          fontSize="small"
          style={{ marginRight: 10 , color:'#FFF200' }}
          onClick={() => toggleStarredMails()}
        />
      ) : (
        <StarBorder
          fontSize="small"
          style={{ marginRight: 10 }}
          onClick={() => toggleStarredMails()}
        />
      )}

      <Box
        onClick={() => navigate(routes.view.path, { state: { email: email } })}
      >
        <Typography
          style={{
            width: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {email.name}
        </Typography>

        <Indicator>Inbox</Indicator>

        <Typography
          style={{
            flexGrow: 1,
            marginLeft: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {email.subject} {email.body && "-"} {email.body}
        </Typography>

        <Typography
          style={{
            marginLeft: "auto",
            fontSize: 12,
            color: "#888",
            marginRight: 20,
          }}
        >
          {new window.Date(email.date).getDate()}{" "}
          {new window.Date(email.date).toLocaleString("default", {
            month: "long",
          })}
        </Typography>
      </Box>
    </Wrapper>
  );
};

export default Mail;
