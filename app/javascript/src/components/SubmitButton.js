import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';

export function SubmitButton({ children, loading }) {
  return (
    <Button
      className="btn btn-primary"
      name="button"
      type="submit"
      disabled={loading}
    >
      {loading && (
      <Spinner
        className="spinner-btn"
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      )}
      {children}
    </Button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  loading: PropTypes.bool.isRequired,
};
