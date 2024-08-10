import React, { useEffect, useState, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { API_URLS } from "../services/api.urls";
import useApi from "../hooks/useApi";
import {
  Box,
  Checkbox,
  List,
  CircularProgress,
 
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Mail from "./Mail";
import NoMails from "./NoMails";
import { EMPTY_TABS } from "../Constant/Constant";
const Email = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [refreshScreen, setRefreshScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { openDrawer } = useOutletContext();
  const { type } = useParams();
  const getEmailsService = useApi(API_URLS.getEmailFromType);
  const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);
  const deleteEmailsService = useApi(API_URLS.deleteEmail);
  useEffect(() => {
    setLoading(true);
    getEmailsService.call({}, type).finally(() => setLoading(false));
  }, [type, refreshScreen]);

  const selectAllEmails = useCallback(
    (e) => {
      if (e.target.checked) {
        const emails =
          getEmailsService?.response?.map((email) => email._id) || [];
        setSelectedEmails(emails);
      } else {
        setSelectedEmails([]);
      }
    },
    [getEmailsService?.response]
  );

  const handleSelectEmail = useCallback((id) => {
    setSelectedEmails((prevSelectedEmails) =>
      prevSelectedEmails.includes(id)
        ? prevSelectedEmails.filter((emailId) => emailId !== id)
        : [...prevSelectedEmails, id]
    );
  }, []);

  const deleteSelectedEmails = () => {
    if (type === "bin") {
      deleteEmailsService.call(selectedEmails);
    } else {
      moveEmailsToBinService.call(selectedEmails);
    }
    setRefreshScreen(prevState => !prevState);
  };

  return (
    <Box
      style={
        openDrawer
          ? { marginLeft: 250, width: "calc(100% - 250px)" }
          : { width: "100%" }
      }
    >
      <Box
        style={{
          padding: "20px 10px 0 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox onChange={selectAllEmails} />
        <DeleteOutline
          style={{ cursor: "pointer" }}
          onClick={(e) => deleteSelectedEmails(e)}
        />
      </Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <List>
            {getEmailsService.response.map((email) => (
              <Mail
                key={email._id}
                email={email}
                selectedEmails={selectedEmails}
                handleSelectEmail={handleSelectEmail}
                setRefreshScreen={setRefreshScreen}
              />
            ))}
          </List>
          {getEmailsService?.response?.length === 0 && (
            <NoMails message={EMPTY_TABS[type]} />
          )}
        </>
      )}
    </Box>
  );
};

export default Email;
