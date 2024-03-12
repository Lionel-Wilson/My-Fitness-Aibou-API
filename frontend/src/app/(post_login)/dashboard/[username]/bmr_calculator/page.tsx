"use client";
import { HomeNavBar } from "@/app/components/Homenavbar";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CssBaseline,
  CssVarsProvider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Select,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import Header from "../../components/JoyUI/Header";
import Sidebar from "../../components/JoyUI/Sidebar";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Option from "@mui/joy/Option";

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

export default function BmrCalculator({
  params,
}: {
  params: { username: string };
}) {
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
  }

  function clearForm() {
    const form = document.getElementById("bmr-form") as HTMLFormElement;

    if (form) {
      form.reset();
    }
  }

  return (
    <>
      <CssVarsProvider
        disableTransitionOnChange
        modeStorageKey="joy-bmr-calculator-color-scheme"
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
                  href="#some-link"
                  fontSize={12}
                  fontWeight={500}
                >
                  BMR Calculator
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
                BMR Calculator
              </Typography>
            </Box>
            <Box>
              <Typography level="body-md" component="p">
                The Basal Metabolic Rate (BMR) Calculator estimates your basal
                metabolic rate—the amount of energy expended while at rest in a
                neutrally temperate environment, and in a post-absorptive state
                (meaning that the digestive system is inactive, which requires
                about 12 hours of fasting).
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
                  <FormControl>
                    <FormLabel
                      sx={{
                        fontSize: {
                          xs: 14,
                          sm: 14,
                          md: 16,
                          lg: 16,
                          xl: 16,
                        },
                      }}
                    >
                      Gender
                    </FormLabel>
                    <Select defaultValue="Male" placeholder="Choose one…">
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                    </Select>
                    <br></br>
                    <FormLabel
                      sx={{
                        fontSize: {
                          xs: 14,
                          sm: 14,
                          md: 16,
                          lg: 16,
                          xl: 16,
                        },
                      }}
                    >
                      Weight
                    </FormLabel>
                    <Input placeholder="70" required />
                    <FormHelperText>(in kilograms)</FormHelperText>
                    <br></br>
                    <FormLabel
                      sx={{
                        fontSize: {
                          xs: 14,
                          sm: 14,
                          md: 16,
                          lg: 16,
                          xl: 16,
                        },
                      }}
                    >
                      Height
                    </FormLabel>
                    <Input placeholder="180" required />
                    <FormHelperText>(in centimeters)</FormHelperText>
                    <br></br>
                    <FormLabel
                      sx={{
                        fontSize: {
                          xs: 14,
                          sm: 14,
                          md: 16,
                          lg: 16,
                          xl: 16,
                        },
                      }}
                    >
                      Age
                    </FormLabel>
                    <Input
                      placeholder="24"
                      sx={{
                        id: "age",
                        name: "age",
                        type: "number",
                        autoComplete: "age",
                      }}
                      required
                    />
                    <br></br>

                    <Button
                      className="bg-blue-700"
                      type="submit"
                      variant="solid"
                    >
                      Calculate
                    </Button>
                  </FormControl>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
}
