import React from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

export function ApiDescription() {
  const { t } = useTranslation('MonitorEnvelopeStatus');
  return (
    <div className="col-lg-6">
      <div className="accordion" id="accordionSeeMore">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              {t('ApiDecription.SeeMore')}
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionSeeMore"
          >
            <div className="accordion-body">
              <div className="card-body">
                {parse(t('ApiDecription.CodeFlow'))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
