import PropTypes from "prop-types";

const LikeShape = PropTypes.shape({
  user: PropTypes.number,
  candidate: PropTypes.number,
  qualification: PropTypes.number,
  policy: PropTypes.number
});

export default LikeShape;
