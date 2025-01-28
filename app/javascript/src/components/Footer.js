import React from 'react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation('Common');
  return (
    <footer role="contentinfo" className="footer pt-2 pb-2">
      <div className="container">
      </div>
    </footer>
  );
}
