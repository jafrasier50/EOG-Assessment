import * as actions from "../actions";

const initialState = {
  graphData: []
};

const graphDataRecived = (state, action) => {
  const { getMeasurements } = action;
  console.log(action);

  return {
    ...state,
    graphData: getMeasurements
  };
};

const handlers = {
  [actions.RECEIVED_MEASUREMENT]: graphDataRecived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
