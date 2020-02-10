import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main.jsx";

const nameClickHandler = () => {};

const App = (props) => {
  const {fullData} = props;
  const {locations} = fullData;

  return (
    <Main
      location={locations[0]}
      onNameClick={nameClickHandler}
    />
  );
};

App.propTypes = {
  fullData: PropTypes.object.isRequired,
};


export default App;
