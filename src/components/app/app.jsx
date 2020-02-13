import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main.jsx";

const nameClickHandler = () => {
};

const App = (props) => {
  const {locations} = props;

  return (
    <Main
      location={locations[0]}
      onNameClick={nameClickHandler}
    />
  );
};

App.propTypes = {
  locations: PropTypes.array.isRequired,
};


export default App;
