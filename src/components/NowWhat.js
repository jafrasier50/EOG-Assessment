import React, { useEffect } from "react";
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
// import CardHeader from "./CardHeader";
// import Typography from "@material-ui/core/Typography";
// import CardContent from "@material-ui/core/CardContent";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { textAlign } from "@material-ui/system";
// import Avatar from "./Avatar";

// const getGraphQLQuery = `
// query {
//   getMultipleMeasurements(input: [{metricName: "flareTemp"}]){
//     measurements{
//       metric
//       unit
//       value
//       at
//     }
//   }
// }
// `;

// const result = useQuery({
//   query: getGraphQLQuery
// });
let data;
const useStyles = makeStyles({
  card: {
    margin: "5% 25%"
  }
});

// export default () => {
//   const classes = useStyles();

//     useEffect(() => {
//       const getGraphQLQuery = `
//         query {
//           getMultipleMeasurements(input: [{metricName: "flareTemp"}]){
//             measurements{
//               metric
//               unit
//               value
//               at
//             }
//           }
//         }
//       `;

//       const result = useQuery({
//         query: getGraphQLQuery
//       });
//       console.log(result);
//     });

//   return (
//     <Card className={classes.card}>
//       Poop
//     </Card>
//   );
// };

export default () => {
  const classes = useStyles();

  // const getGraphQLQuery = `
  //       query {
  //         getMultipleMeasurements(input: [{metricName: "tubingPressure"},{metricName:"flareTemp"},{metricName:"injValveOpen"},{metricName:"oilTemp"},{metricName: "casingPressure"},{metricName: "waterTemp"}]){
  //           measurements{
  //             metric
  //             unit
  //             value
  //             at
  //           }
  //         }
  //       }
  //     `;

  // const result = useQuery({
  //   query: getGraphQLQuery
  // });
  // useEffect(() => {
  //   console.log(result);
  // });

  const data = [
    {
      metric: "tubingPressure",
      unit: "PSI",
      value: 1450.67,
      at: 1572556907857
    },
    {
      metric: "tubingPressure",
      unit: "PSI",
      value: 1434.92,
      at: new Date(1572556909157).toLocaleString()
    },
    {
      metric: "tubingPressure",
      unit: "PSI",
      value: 1458.98,
      at: new Date(1572556910457).toLocaleString()
    },
    {
      metric: "tubingPressure",
      unit: "PSI",
      value: 1427.26,
      at: new Date(1572556911757).toLocaleString()
    },
    {
      metric: "tubingPressure",
      unit: "PSI",
      value: 1421.37,
      at: new Date(1572556913057).toLocaleString()
    },
    {
      metric: "tubingPressure",
      unit: "PSI",
      value: 1471.31,
      at: new Date(1572556914357).toLocaleString()
    },
    {
      metric: "tubingPressure",
      unit: "PSI",
      value: 1446.72,
      at: new Date(1572556915657).toLocaleString()
    },
    {
      metric: "tubingPressure",
      unit: "PSI",
      value: 1500.05,
      at: new Date(1572556916957).toLocaleString()
    },
    {
      metric: "tubingPressure",
      unit: "PSI",
      value: 1497.84,
      at: new Date(1572556918257).toLocaleString()
    },
    {
      metric: "tubingPressure",
      unit: "PSI",
      value: 1540.66,
      at: new Date(1572556919557).toLocaleString()
    },
    {
      metric: "tubingPressure",
      unit: "PSI",
      value: 1571.94,
      at: new Date(1572556920857).toLocaleString()
    }
  ];

  const newData = data.map(d => {
    d.at = new Date(d.at).toLocaleString();
    return d;
  });

  console.log(newData);

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
