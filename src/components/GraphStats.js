import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { Provider, createClient, useQuery } from "urql";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import { Card, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//styling
const useStyles = makeStyles({
  card: {
    margin: "5% 25%"
  }
});

//access to graphQL
const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

//puts query into variable "measurementQueryDynamic"
const measurementQueryDynamic = `
query($input: MeasurementQuery!){
  getMeasurements(input: $input){
    metric
    at
    value
    unit
  }
}
`;
//grabs data from past 60 seconds
const pastMinute = new Date().getTime() - 60000;
//styling

const GraphStats = () => {
  const classes = useStyles();
  // sets reacthook useDispatch() into variable
  const dispatch = useDispatch();
  //passes state into getGraphData
  const getGraphData = state => {
    //returns graphData from state
    return state.graphStats.graphData;
  };
  //sets graphData equal to hook useSelector which passe function getGraphData
  const graphData = useSelector(getGraphData);
  //sets array which contains result equal to urql function useQuery
  const [result] = useQuery({
    //tells us which query were using from line 30
    query: measurementQueryDynamic,
    variables: {
      input: {
        //specifys which metric name we are querying
        metricName: "flareTemp",
        //gives time frame of data we need, see pastMinute line 41
        after: pastMinute
      }
    }
  });
  // deconstructing variables from result
  const { fetching, data, error } = result;
  // useEffect hook
  // notice the array of [dispatch, data, error]
  // this means we are using this hook to monitor any change in these variables
  // if any of those variables change, it will re-render the whole component.
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    const { getMeasurements } = data;

    dispatch(
      { type: actions.RECEIVED_MEASUREMENT, getMeasurements }
      // { type: actions.FLARE_TEMP_BUTTON_TOGGLE, toggleFlareTemp }
    );
  }, [dispatch, data, error]);
  console.log(graphData);
  // this is mutating the at value from milliseconds into a date string that the LineChart component can understand.
  graphData.forEach(d => {
    d.at = new Date(d.at).toLocaleString();
  });
  // if fetching is true, display the loading thingy
  if (fetching) return <LinearProgress />;

  const showFlareTemp = () => {
    console.log(graphData);
  };

  return (
    <Card className={classes.card}>
      <Button variant="contained" onClick={showFlareTemp}>
        flareTemp Toggle
      </Button>
      <LineChart
        width={600}
        height={300}
        data={graphData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="at" />
        <YAxis dataKey="value" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="at"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
      </LineChart>
    </Card>
  );
};

export default () => {
  return (
    <Provider value={client}>
      <GraphStats />
    </Provider>
  );
};
