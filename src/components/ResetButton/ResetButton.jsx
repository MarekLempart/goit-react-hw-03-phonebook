// ResetButton.jsx
// import React from "react";

import PropTypes from 'prop-types';
import css from './ResetButton.module.css';

export const ResetButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.resetButton}>
      Reset Local Storage
    </button>
  );
};

ResetButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
