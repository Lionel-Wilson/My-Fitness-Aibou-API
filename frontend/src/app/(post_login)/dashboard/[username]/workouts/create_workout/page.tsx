"use client";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CssBaseline,
  CssVarsProvider,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalDialog,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import Header from "../../../components/JoyUI/Header";
import Sidebar from "../../../components/JoyUI/Sidebar";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Add from "@mui/icons-material/Add";
import * as React from "react";

export default function Workouts({ params }: { params: { username: string } }) {
  const [open, setOpen] = React.useState<boolean>(false);
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
                  Create workout
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
                New Workout
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
              <React.Fragment>
                <Button
                  className="bg-blue-700"
                  startDecorator={<Add />}
                  variant="solid"
                  color="primary"
                  onClick={() => setOpen(true)}
                >
                  Add exercise
                </Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                  <ModalDialog>
                    <DialogTitle>Add new exercise</DialogTitle>
                    <DialogContent>
                      Fill in the exercise information.
                    </DialogContent>
                    <form
                      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        setOpen(false);
                      }}
                    >
                      <Stack spacing={2}>
                        <FormControl>
                          <FormLabel>Name</FormLabel>
                          <Input autoFocus required />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Notes</FormLabel>
                          <Textarea minRows={2} size="md" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Current Weight</FormLabel>
                          <Input />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Current number of max reps</FormLabel>
                          <Input />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Number of sets</FormLabel>
                          <Input />
                        </FormControl>
                        <Button
                          type="submit"
                          className="bg-blue-700"
                          startDecorator={<Add />}
                          variant="solid"
                          color="primary"
                        >
                          Add
                        </Button>
                      </Stack>
                    </form>
                  </ModalDialog>
                </Modal>
              </React.Fragment>
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
                  md: "row",
                  lg: "row",
                  xl: "row",
                },
              }}
            >
              <Box
                mt={4}
                mb={4}
                sx={{
                  display: "flex",
                  justifyContent: {
                    xs: "center",
                    sm: "center",
                    md: "center",
                    lg: "center",
                    xl: "center",
                  },
                }}
              >
                <FormControl>
                  <FormLabel>
                    <Typography level="title-lg" component="h1">
                      Notes
                    </Typography>
                  </FormLabel>

                  <Textarea
                    minRows={2}
                    size="lg"
                    sx={{
                      width: {
                        xs: 382,
                        sm: 382,
                        md: 500,
                        lg: 500,
                        xl: 500,
                      },
                    }}
                  />
                </FormControl>
              </Box>
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
                  md: "row",
                  lg: "row",
                  xl: "row",
                },
              }}
            >
              <Box
                mb={4}
                sx={{
                  display: "flex",
                  justifyContent: {
                    xs: "center",
                    sm: "center",
                    md: "center",
                    lg: "center",
                    xl: "center",
                  },
                }}
              >
                <Card
                  size="lg"
                  sx={{
                    width: {
                      xs: 382,
                      sm: 382,
                      md: 500,
                      lg: 500,
                      xl: 500,
                    },
                  }}
                >
                  <Box>
                    <Typography level="title-lg" component="h1">
                      Pull ups
                    </Typography>
                    <Typography level="body-md" component="h2">
                      Calistenic focused
                    </Typography>
                  </Box>

                  <Divider />
                  <Box>
                    <Typography level="title-lg" component="h1">
                      Bench Press
                    </Typography>
                    <Typography level="body-md" component="h2">
                      Weight focused
                    </Typography>
                  </Box>
                </Card>
              </Box>
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
                type="submit"
              >
                Create workout
              </Button>
            </Box>
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
}
