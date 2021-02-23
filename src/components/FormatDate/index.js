import PropTypes from 'prop-types';

import dateFormat from "dateformat";

export const FormatDate = ({ date }) => {
  const newDate = new Date(date);
  return dateFormat(newDate, "dddd, m/d/yyyy, h:MM:ss TT");
}

FormatDate.propTypes = {
  date: PropTypes.string.isRequired
}
