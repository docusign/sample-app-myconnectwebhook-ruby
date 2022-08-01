import React from "react";
import PropTypes from "prop-types";

export function ResoursesSection({ title, resourceList }) {
  return (
    <section className="resources-section text-center">
      <div className="container">
        <h2 className="h2 cta-title">{title}</h2>
        <ul className="resources-list">
          {resourceList.map(({ name, href }) => (
            <li key={name} className="resources-list-item">
              <a
                className="resources-list-link"
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                {name}
                <img
                  className="img-link"
                  src="/images/chevron-right.png"
                  alt=""
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

ResoursesSection.propTypes = {
  title: PropTypes.string.isRequired,
  resourceList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};
