"use client";
import Card from "@mui/joy/Card";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import { LineChart } from "@tremor/react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box } from "@mui/joy";

const chartdata = [
  {
    date: "Jan 22",
    Weight: 95,
  },
  {
    date: "Feb 22",
    Weight: 96,
  },
  {
    date: "Mar 22",
    Weight: 98,
  },
  {
    date: "Apr 22",
    Weight: 99,
  },
  {
    date: "May 22",
    Weight: 95,
  },
  {
    date: "Jun 22",
    Weight: 93,
  },
  {
    date: "Jul 22",
    Weight: 94,
  },
  {
    date: "Aug 22",
    Weight: 92,
  },
  {
    date: "Sep 22",
    Weight: 91,
  },
  {
    date: "Oct 22",
    Weight: 90,
  },
  {
    date: "Nov 22",
    Weight: 92,
  },
  {
    date: "Dec 22",
    Weight: 94,
  },
];

const valueFormatter = function (number: number | bigint) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export default function LineChartUsageExample() {
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg ">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h4" component="h1">
            Weight (Last 90 days)
          </Typography>
          <Box pt={0.2}>
            <AddRoundedIcon></AddRoundedIcon>
          </Box>
        </Box>

        <LineChart
          className="mt-4 h-72"
          data={chartdata}
          index="date"
          yAxisWidth={45}
          categories={["Weight"]}
          colors={["indigo"]}
          showAnimation={true}
          //valueFormatter={valueFormatter}
        />

        <List className="mt-2">
          <ListItem className="space-x-6">
            <div className="flex items-center space-x-2.5 truncate">
              <span
                className={"bg-indigo-500 h-2.5 w-2.5 shrink-0 rounded-sm"}
                aria-hidden={true}
              />
              <span className="truncate dark:text-dark-tremor-content-emphasis">
                Current Weight
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                94kg
              </span>
              <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis"></span>
            </div>
          </ListItem>
        </List>
      </Card>
    </>
  );
}
