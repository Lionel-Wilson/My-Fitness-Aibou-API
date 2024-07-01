"use client";
import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import {
  Card,
  DonutChart,
  List,
  ListItem,
  ProgressCircle,
} from "@tremor/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const data = [
  {
    name: "Goal Calories",
    amount: 1940,
    color: "bg-cyan-500",
  },
  {
    name: "Food",
    amount: 1200,
    color: "bg-blue-500",
  },
  {
    name: "Exercise",
    amount: 150,
    color: "bg-indigo-500",
  },
];

function calculateCalorieProgress() {
  var basegoal = data[0].amount;
  var food = data[1].amount;
  var exercise = data[2].amount;

  var progress = ((food - exercise) / basegoal) * 100;
  return progress;
}
function calculateRemainingCalories() {
  var basegoal = data[0].amount;
  var food = data[1].amount;
  var exercise = data[2].amount;

  var remaining = basegoal - food + exercise;
  return remaining;
}

export default function Example() {
  var progress = calculateCalorieProgress();
  var remainingCalories = calculateRemainingCalories();
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg">
        <Typography level="h4" component="h1">
          Calories
        </Typography>
        <Typography level="h5" component="h2">
          Remaining = Goal - Food + Exercise
        </Typography>
        <Box
          mt={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProgressCircle value={progress} size="lg" />
        </Box>
        {/*<DonutChart
          className="mt-8"
          data={data}
          category="amount"
          index="name"
          showTooltip={false}
          colors={["cyan", "blue", "indigo", "violet", "fuchsia"]}
          variant="donut"
          showAnimation={true}
  />*/}
        <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span>Category</span>
          <span>Amount</span>
        </p>
        <List className="mt-2">
          {data.map((item) => (
            <ListItem key={item.name} className="space-x-6">
              <div className="flex items-center space-x-2.5 truncate">
                <span
                  className={classNames(
                    item.color,
                    "h-2.5 w-2.5 shrink-0 rounded-sm"
                  )}
                  aria-hidden={true}
                />
                <span className="truncate dark:text-dark-tremor-content-emphasis">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {item.amount}
                </span>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}
