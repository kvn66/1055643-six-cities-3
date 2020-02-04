import React from "react";
import Main from "../main/main.jsx";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {placesCount} = props;

  return (
    <Main places={placesCount} />
  );
};


export default App;
