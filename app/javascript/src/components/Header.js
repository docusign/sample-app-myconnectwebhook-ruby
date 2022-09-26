import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation("Common");
  return (
    <header className="header" role="banner">
      <div className="container-lg">
        <nav className="navbar navbar-expand-lg navbar-light p-0 align-items-lg-end">
          <Link
            className="navbar-brand d-inline-flex align-items-center"
            to="/"
          >
            <span className="navbar-brand-image d-inline-block">
              <img src="/images/logo.png" alt="logo" />
            </span>
            {t("ApplicationName")}
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-md-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://github.com/docusign/sample-app-myconnectwebhook-ruby"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("GitHubLink")}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
