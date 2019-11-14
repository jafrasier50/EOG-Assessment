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
import GraphStatsReducer from "../store/reducers/GraphStats";

const useStyles = makeStyles({
  card: {
    margin: "5% 25%"
  }
});

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

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

const pastMinute = new Date().getTime() - 60000;

const GraphStats = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const getGraphData = state => {
    return state.graphStats.graphData;
  };
  const graphData = useSelector(getGraphData);

  const [result] = useQuery({
    query: measurementQueryDynamic,
    variables: {
      input: {
        metricName: "flareTemp",
        after: pastMinute
      }
    }
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    const { getMeasurements } = data;

    dispatch({ type: actions.RECEIVED_MEASUREMENT, getMeasurements });
  }, [dispatch, data, error]);
  console.log(graphData);

  graphData.forEach(d => {
    d.at = new Date(d.at).toLocaleString();
  });

  if (fetching) return <LinearProgress />;

  return (
    <Card className={classes.card}>
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
