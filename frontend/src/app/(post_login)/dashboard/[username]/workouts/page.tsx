"use client";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CssBaseline,
  CssVarsProvider,
  Link,
  Typography,
} from "@mui/joy";
import Header from "../../components/JoyUI/Header";
import Sidebar from "../../components/JoyUI/Sidebar";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Add from "@mui/icons-material/Add";
import * as React from "react";

function formatFormData(formData: FormData) {
  var age: number = parseInt(formData.get("age") as string);
  var weight: number = parseInt(formData.get("weight") as string);
  var height: number = parseInt(formData.get("height") as string);
  var gender: string = formData.get("gender") as string;

  // Now you can use ExerciseName, CurrentWeight, MaxReps, and Notes in your code

  return {
    Age: age,
    Weight: weight,
    Height: height,
    Gender: gender,
  };
}

export default function Workouts({ params }: { params: { username: string } }) {
  /*
  const [bmrResult, setBmrResult] = useState();

  async function getBmr(formData: FormData) {
    const rawFormData = formatFormData(formData);

    fetch("/api/bmr_calculator", {
      method: "POST",
      body: JSON.stringify(rawFormData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      })
      .then((data) => {
        setBmrResult(data);
      });
  }*/

  var workoutsExist = true;

  return (
    <>
      <CssVarsProvider
        disableTransitionOnChange
        modeStorageKey="joy-workouts-color-scheme"
        defaultColorScheme="light"
        disableNestedContext
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
                  href="#some-link"
                  fontSize={12}
                  fontWeight={500}
                >
                  Workouts
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
                Workouts
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "center",
                  xl: "center",
                },
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "column",
                  lg: "column",
                  xl: "column",
                },
              }}
            >
              <Button
                className="bg-blue-700"
                startDecorator={<Add />}
                variant="solid"
                color="primary"
              >
                Create Workout
              </Button>
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
              {workoutsExist ? (
                <Box ml={4} mr={4} mt={4}>
                  <Card
                    size="lg"
                    sx={{
                      width: {
                        xs: 300,
                        sm: 320,
                        md: 500,
                        lg: 500,
                        xl: 500,
                      },
                    }}
                  >
                    <Typography level="body-md" component="p">
                      You have workouts.
                    </Typography>
                  </Card>
                </Box>
              ) : (
                <Box ml={4} mr={4} mt={4}>
                  <Card
                    size="lg"
                    sx={{
                      width: {
                        xs: 300,
                        sm: 320,
                        md: 500,
                        lg: 500,
                        xl: 500,
                      },
                    }}
                  >
                    <Typography level="body-md" component="p">
                      You have no workouts.
                    </Typography>
                  </Card>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
}
