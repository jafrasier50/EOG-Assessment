import React, { useEffect, useState } from "react";
import {
  useQuery,
  createClient,
  Provider,
  Subscription,
  subscriptionExchange,
  defaultExchanges,
  useSubscription
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
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

const subscriptionClient = new SubscriptionClient(
  "wss://react.eogresources.com/graphql",
  { reconnect: true }
);

const useStyles = makeStyles({
  card: {
    margin: "5% 25%"
  }
});

export default () => {
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
    // if (result[0].fetching === false) {
    //   const data = result[0].data.getMultipleMeasurements[0].measurements;
    //   // console.log(data);
    //   const newResult = data.map(d => {
    //     d.at = new Date(d.at).toLocaleString();
    //     return d;
    //   });
    //   console.log(newResult);
    //   setNewData(newResult);
    // }
  });

  // const [res] = useSubscription({ query: TestQuery }, handleSubscription);
  // //console.log(res);
  // if (res.error !== undefined) {
  //   console.log(res.error);
  // }

  // if (res.data === undefined) {
  //   console.log(res.data);
  // }

  return (
    <Provider
      value={createClient({
        url: "https://react.eogresources.com/graphql",
        exchanges: [
          ...defaultExchanges,
          subscriptionExchange({
            forwardSubscription: operation =>
              subscriptionClient.request(operation)
          })
        ]
      })}
    >
      {/* <Subscription query={TestQuery}>
        {({ data }) => {
          //console.log(data);
          return null;
        }}
      </Subscription> */}
      <SubTest />
    </Provider>
  );
};

const SubTest = () => {
  const classes = useStyles();
  const [newData, setNewData] = useState([]);

  const subscriptionTestLol = useSubscription({ query: TestQuery });

  useEffect(() => {
    // if (result[0].fetching === false) {
    //   const data = result[0].data.getMultipleMeasurements[0].measurements;
    //   // console.log(data);
    //   const newResult = data.map(d => {
    //     d.at = new Date(d.at).toLocaleString();
    //     return d;
    //   });
    //   console.log(newResult);
    //   setNewData(newResult);
    // }
    if (
      !subscriptionTestLol[0] ||
      !subscriptionTestLol[0].data ||
      !subscriptionTestLol[0].data.newMeasurement
    )
      return;
    console.log(subscriptionTestLol[0].data.newMeasurement);
  }, [subscriptionTestLol]);

  return (
    <Card className={classes.card}>
      <LineChart
        width={600}
        height={300}
        data={null} // new data goes here, i put null as placeholder
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

const TestQuery = `
  subscription Test {
    newMeasurement {
      metric
      unit
      value
      at
    }
  }
`;
