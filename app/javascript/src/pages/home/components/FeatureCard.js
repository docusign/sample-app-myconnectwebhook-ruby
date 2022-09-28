import React from "react";
import PropTypes from "prop-types";

export function FeatureCard({
  imgSrc,
  title,
  description,
  featuresDescription,
  buttonTitle,
  onClick,
}) {
  return (
    <div className="d-flex col-4">
      <div className="card-info">
        <div className="card-info-image-holder">
          <img src={imgSrc} alt="" />
        </div>
        <h3 className="card-info-title">{title}</h3>
        <span className="card-info-description">{description}</span>
        <div className="card-info-button-holder">
          <button type="button" className="btn btn-warning" onClick={onClick}>
            {buttonTitle}
            <img src="/images/arrow_alt_lright.png" alt="" />
          </button>
        </div>
        <div className="card-info-list">{featuresDescription}</div>
      </div>
    </div>
  );
}
FeatureCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  featuresDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  buttonTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
