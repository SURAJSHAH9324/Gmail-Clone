import { React, Suspense } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SuspenseLoader from "../Components/common/SuspenseLoader";
import { Box, styled } from "@mui/material";
const Wrapper = styled(Box)`
    display: flex;
`;
function Main() {
  const [openDrawer, setOpenDrawer] = useState("true");
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };
  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <Wrapper>
        <Sidebar toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
        <Suspense fallback={SuspenseLoader}>
          <Outlet context={{ openDrawer }} />
        </Suspense>
      </Wrapper>
    </>
  );
}

export default Main;
