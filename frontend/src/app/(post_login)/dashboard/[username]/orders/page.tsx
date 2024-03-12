"use client";
import { Button } from "@headlessui/react";
import {
  CssVarsProvider,
  CssBaseline,
  Box,
  Breadcrumbs,
  Typography,
} from "@mui/joy";
import Link from "next/link";
import Header from "../../components/JoyUI/Header";
import OrderList from "../../components/JoyUI/OrderList";
import OrderTable from "../../components/JoyUI/OrderTable";
import Sidebar from "../../components/JoyUI/Sidebar";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

export default function Page({ params }: { params: { username: string } }) {
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
      <CssVarsProvider
        disableTransitionOnChange
        modeStorageKey="joy-orders-color-scheme"
        defaultColorScheme="light"
        defaultMode="light"
      >
        <CssBaseline />
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
                  href={`/dashboard/${params.username}`}
                  fontSize={12}
                  fontWeight={500}
                >
                  Dashboard
                </Link>
                <Typography color="primary" fontWeight={500} fontSize={12}>
                  Orders
                </Typography>
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
                Orders
              </Typography>
              <Button
                color="primary"
                startDecorator={<DownloadRoundedIcon />}
                size="sm"
              >
                Download PDF
              </Button>
            </Box>
            <OrderTable />
            <OrderList />
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
}
