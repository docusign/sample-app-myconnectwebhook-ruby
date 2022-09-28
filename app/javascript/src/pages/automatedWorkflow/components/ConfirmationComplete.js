import React from "react";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

export function ConfirmationComplete({ }) {
  const { t } = useTranslation("AutomatedWorkflow");

  return (
    <div className="request-form-card col-6">
      <div className="form-holder bg-white pt-5 pb-5">
        <h1 className="mb-4">{t("ConfirmationComplete.Title")}</h1>
        <div className="mb-4">{parse(t("ConfirmationComplete.SubTitle"))}</div>
      </div>
    </div>
  );
}
