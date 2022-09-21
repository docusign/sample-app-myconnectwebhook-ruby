import React from "react";
import PropTypes from "prop-types";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function TooltipOverlay({ text, children }) {
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip id="alert-tooltip">{text}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
}

TooltipOverlay.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
