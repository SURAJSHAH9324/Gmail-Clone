import React, { useState } from "react";
import {
  Box,
  Dialog,
  InputBase,
  Typography,
  styled,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteOutlined } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background: #f2f6fc;
  & > p {
    font-size: 14px;
    font-weight: 500;
  }
`;

const dialogStyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: "10px 10px 0 0",
  boxShadow: "none",
};

const RecipientWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  & > div {
    font-size: 14px;
    border-bottom: 1px solid #f5f5f5;
    margin-top: 10px;
  }
`;

const ContentBox = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Footer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const SendButton = styled(Button)`
  background: #0b57d0;
  color: #fff;
  font-weight: 500;
  width: 100px;
  border-radius: 18px;
  padding: 5px 20px;
  text-transform: none;
`;

function ComposeMail({ openDialog, setOpenDialog }) {
  const [data, setData] = useState({});
  const sentEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);
  const config = {
    Host: "smtp.elasticemail.com",
    Username: "abhishek2003@yopmail.com",
    Password: "B3290992ACD2CE31D14456D5D57C82F16670",
    Port: 2525,
  };

  const closeComposeMail = (e) => {
    e.preventDefault();
    const payload = {
      to: data.to,
      from: "surajshah77881@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "Code For Interview",
      starred: false,
      type: "draft",
    };
    saveDraftService.call(payload);
    if (!saveDraftService.error) {
      setOpenDialog(false);
      setData({});
    } else {
      // Handle error case
    }
  };

  const sendMail = (e) => {
    e.preventDefault();
    if (window.Email) {
      window.Email.send({
        ...config,
        To: data.to,
        From: "surajshah77881@gmail.com",
        Subject: data.subject,
        Body: data.body,
      }).then((message) => alert(message));
    }
    const payload = {
      to: data.to,
      from: "surajshah77881@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "Code For Interview",
      starred: false,
      type: "sent",
    };
    sentEmailService.call(payload);
    if (!sentEmailService.error) {
      setOpenDialog(false);
      setData({});
    } else {
      // Handle error case
    }
    setOpenDialog(false);
  };

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>New Message</Typography>
        <CloseIcon fontSize="small" onClick={closeComposeMail} />
      </Header>
      <RecipientWrapper>
        <InputBase placeholder="Recipient" name="to" onChange={onValueChange} />
        <InputBase
          placeholder="Subject"
          name="subject"
          onChange={onValueChange}
        />
      </RecipientWrapper>
      <ContentBox>
        <TextField
          multiline
          rows={10}
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            flex: 1,
          }}
          name="body"
          onChange={onValueChange}
        />
      </ContentBox>
      <Footer>
        <SendButton onClick={sendMail}>Send</SendButton>
        <DeleteOutlined onClick={() => setOpenDialog(false)} />
      </Footer>
    </Dialog>
  );
}

export default ComposeMail;
