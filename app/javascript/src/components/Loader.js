import React from 'react';
import { Spinner } from 'react-bootstrap';

export function Loader() {
  return (
    <div className="spinner">
      <Spinner animation="border" role="status" />
    </div>
  );
}
