import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

export function ConfirmationComplete({ orderData }) {
  const { t } = useTranslation("AutomatedWorkflow");

  return (
    <div className="request-form-card col-6">
      <div className="form-holder bg-white pt-5 pb-5">
        <h1 className="mb-4">{t("ConfirmationComplete.Title")}</h1>
        <div className="mb-4">{parse(t("ConfirmationComplete.SubTitle"))}</div>
        <div className="warning-wrapper">
          <img
            className="warning-img"
            src="/images/alert-circle-m.png"
            alt=""
          />
          <p className="warning-text">{t("ConfirmationComplete.Warning")}</p>
        </div>
        <div className="card">
          <div className="card-header">
            <h2>{t("ConfirmationComplete.OrderTitle")}</h2>
          </div>
          <div className="card-body">
            {orderData.items.map((item) => (
              <div key={item.id} className="order-item-wrapper">
                <div>{item.name}</div>
                <div>{item.price}</div>
              </div>
            ))}
          </div>
          <div className="card-footer">
            <div className="order-total-text">
              {t("ConfirmationComplete.OrderTotal")}
            </div>
            <div className="order-total-price">{orderData.total}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

ConfirmationComplete.propTypes = {
  orderData: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
      })
    ).isRequired,
    total: PropTypes.string.isRequired,
  }).isRequired,
};
