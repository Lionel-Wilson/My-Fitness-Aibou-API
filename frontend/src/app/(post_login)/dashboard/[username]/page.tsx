"use client";
import { useEffect, useState } from "react";

//JoyUI imports:
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import Sidebar from "../components/JoyUI/Sidebar";

import Header from "../components/JoyUI/Header";
import DonutChart from "../components/tremor/DonutChart";
import LineChartUsageExample from "../components/tremor/LineChart";
import Divider from "@mui/material/Divider";

//JoyUI imports end

export default function Page({ params }: { params: { username: string } }) {
  const [user, setUser] = useState({
    userName: "",
    about: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    password: "",
    dob: "", // You might want to initialize it based on your date format
    gender: "",
  });
  //const cookies = new Cookies();
  //const storedUserID = cookies.get("userID");

  useEffect(() => {
    const getUniqueUser = async () => {
      try {
        console.log("trying get request");

        const response = await fetch("/api/get_user_details", {
          method: "GET",
        });
        console.log("back from trying get request");
        console.log(response);

        const userDetails: UserDetails = await response.json();

        setUser(userDetails);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUniqueUser();
  }, []);

  return (
    <>
      {/* TO-DO Remove when JOYUI intergration complete
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <p className="text-gray-100">{user.firstName}'s Dashboard Page</p>
        <br></br>

        <p className="text-gray-100">User details:</p>
        <p className="text-gray-100">First name: {user.firstName}</p>
        <p className="text-gray-100">Last name: {user.lastName}</p>
        <p className="text-gray-100">Gender: {user.gender}</p>
        <p className="text-gray-100">Username: {user.userName}</p>
        <p className="text-gray-100">Date of Birth: {user.dob}</p>
        <p className="text-gray-100">Country: {user.country}</p>
      </div>
    </div>
    */}
      <CssVarsProvider disableTransitionOnChange defaultMode="light">
        <Box sx={{ display: "flex", minHeight: "100dvh" }}>
          <Header />
          <Sidebar usernameSlug={params.username} />
          <Box
            component="main"
            className="MainContent"
            sx={{
              px: { xs: 2, md: 6 },
              pt: {
                xs: "calc(12px + var(--Header-height))",
                sm: "calc(12px + var(--Header-height))",
                md: 3,
              },
              pb: { xs: 2, sm: 2, md: 3 },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              height: "100dvh",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                separator={<ChevronRightRoundedIcon fontSize="sm" />}
                sx={{ pl: 0 }}
              >
                <Link
                  underline="none"
                  color="neutral"
                  href="#some-link"
                  aria-label="Home"
                >
                  <HomeRoundedIcon />
                </Link>
                <Link
                  underline="hover"
                  color="neutral"
                  href="#some-link"
                  fontSize={12}
                  fontWeight={500}
                >
                  Dashboard
                </Link>
              </Breadcrumbs>
            </Box>
            <Box
              sx={{
                display: "flex",
                mb: 1,
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "start", sm: "center" },
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Typography level="h2" component="h1">
                Overview
              </Typography>
            </Box>
            <Box>
              <Typography level="h3" component="h2">
                Welcome back {user.firstName}!
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "space-evenly",
                  lg: "space-evenly",
                  xl: "space-evenly",
                },
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                  xl: "row",
                },
              }}
            >
              <Box ml={4} mr={4} mt={4}>
                <DonutChart></DonutChart>
              </Box>
              <Box ml={4} mr={4} mt={4} mb={4}>
                <LineChartUsageExample></LineChartUsageExample>
              </Box>
            </Box>
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
}
