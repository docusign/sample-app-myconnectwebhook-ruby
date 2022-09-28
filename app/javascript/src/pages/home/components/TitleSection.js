import React from 'react';
import PropTypes from 'prop-types';

export function TitleSection({ title, subTitle }) {
  return (
    <section className="title-section bg-prop">
      <div className="container">
        <div className="hero-text">
          <h1 className="h1">{title}</h1>
          <span className="sub-title d-flex">{subTitle}</span>
        </div>
      </div>
    </section>
  );
}

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};
