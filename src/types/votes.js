import PropTypes from "prop-types";

const VoteShape = PropTypes.shape({
  user: PropTypes.number,
  candidate: PropTypes.number,
  type: PropTypes.string
});

export default VoteShape;
