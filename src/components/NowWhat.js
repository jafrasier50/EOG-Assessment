import React, { useEffect, useState } from "react";
import { useQuery, createClient, Provider } from "urql";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    margin: "5% 25%"
  }
});

export default () => {
  const classes = useStyles();

  const getGraphQLQuery = `
        query {
          getMultipleMeasurements(input: [{metricName: "tubingPressure"},{metricName:"flareTemp"},{metricName:"injValveOpen"},{metricName:"oilTemp"},{metricName: "casingPressure"},{metricName: "waterTemp"}]){
            measurements{
              metric
              unit
              value
              at
            }
          }
        }
      `;

  const result = useQuery({
    query: getGraphQLQuery
  });

  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (result[0].fetching === false) {
      const data = result[0].data.getMultipleMeasurements[0].measurements;
      // console.log(data);
      const newResult = data.map(d => {
        d.at = new Date(d.at).toLocaleString();
        return d;
      });
      console.log(newResult);
      setNewData(newResult);
    }
  }, [newData]);

  return (
    <Provider value={createClient}>
      <Card className={classes.card}>
        <LineChart
          width={600}
          height={300}
          data={newData}
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
    </Provider>
  );
};
