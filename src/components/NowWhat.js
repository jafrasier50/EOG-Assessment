import React, { useEffect } from "react";
import { useQuery, createClient, Provider } from "urql";

import Card from "@material-ui/core/Card";
import CardHeader from "./CardHeader";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "./Avatar";

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

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

  const getGraphQLQuery = `
        query {
          getMultipleMeasurements(input: [{metricName: "flareTemp"}]){
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
  useEffect(() => {
    console.log(result);
  });

  return (
    <Provider value={client}>
      <Card className={classes.card}>Poop</Card>
    </Provider>
  );
};
