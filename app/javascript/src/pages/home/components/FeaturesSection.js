import React from 'react';
import PropTypes from 'prop-types';

export function FeaturesSection({ children }) {
  return (
    <section className="features-section">
      <div className="container">
        <div
          className="row d-flex justify-content-center"
          style={{ gap: '40px' }}
        >
          {' '}
          {children}
        </div>
      </div>
    </section>
  );
}

FeaturesSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
