import React from "react";
import PropTypes from "prop-types";

export const loadClickwrapApi = (baseUrl) =>
  new Promise((resolve) => {
    const existingScript = document.getElementById("clickWrapScript");
    const scriptUrl = "/clickapi/sdk/latest/docusign-click.js";

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = baseUrl + scriptUrl;
      script.id = "clickWrapScript";
      document.body.prepend(script);

      script.onload = () => {
        resolve();
      };
    } else {
      resolve();
    }
  });

export class ClickWrap extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { clientUserId } = this.props;
    return clientUserId !== nextProps.clientUserId;
  }

  render() {
    const {
      baseUrl,
      accountId,
      clickwrapId,
      clientUserId,
      onAgreed,
      onDeclined,
      elementId,
    } = this.props;
    return (
      <div className="form-group">
        {window.docuSignClick.Clickwrap.render(
          {
            environment: baseUrl,
            accountId,
            clickwrapId,
            clientUserId,
            onAgreed,
            onDeclined,
          },
          `#${elementId}`
        )}
      </div>
    );
  }
}

ClickWrap.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  clickwrapId: PropTypes.string.isRequired,
  clientUserId: PropTypes.string.isRequired,
  onAgreed: PropTypes.func.isRequired,
  onDeclined: PropTypes.func.isRequired,
  elementId: PropTypes.string.isRequired,
};
