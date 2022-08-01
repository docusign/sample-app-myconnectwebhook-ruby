import React from "react";
import PropTypes from "prop-types";

export function CTASection({ title, description, primaryLink, secondaryLink }) {
  return (
    <section className="cta-section text-center">
      <div className="container">
        <h2 className="h2 cta-title">{title}</h2>
        <div className="cta-button-holder">
          <a href={primaryLink.href} target="_blank" rel="noopener noreferrer">
            <button type="button" className="btn btn-success">
              {primaryLink.name}
            </button>
          </a>
          <a
            href={secondaryLink.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button" className="btn btn-secondary">
              {secondaryLink.name}
            </button>
          </a>
        </div>
        <div className="cta-description">{description}</div>
      </div>
    </section>
  );
}

CTASection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  primaryLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  secondaryLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
};
