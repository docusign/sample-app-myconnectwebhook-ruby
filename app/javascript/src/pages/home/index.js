import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import AppContext from "../../appContext";
import { FeatureCard } from "./components/FeatureCard";
import { ResoursesSection } from "./components/ResoursesSection";
import { CTASection } from "./components/CTASection";
import { FeaturesSection } from "./components/FeaturesSection";
import { TitleSection } from "./components/TitleSection";

export function Home() {
  const { t } = useTranslation("Home");
  const navigate = useNavigate();
  const { handleLogIn } = useContext(AppContext);

  const handleClick = async (event, redirectUrl) => {
    event.preventDefault();
    await handleLogIn(redirectUrl);
    navigate(redirectUrl);
  };

  const resourceList = [
    {
      name: t("Resources.DocuSignDeveloperCenter"),
      href: "https://developers.docusign.com/",
    },
    {
      name: t("Resources.DocuSignConnect"),
      href: "https://developers.docusign.com/platform/webhooks/connect/",
    },
    {
      name: t("Resources.RubySignatureSdk"),
      href: "https://developers.docusign.com/docs/esign-rest-api/sdk-tools/ruby/",
    },
    {
      name: t("Resources.RubyClickSdk"),
      href: "https://github.com/docusign/docusign-click-ruby-client",
    },
  ];

  return (
    <div className="home-page">
      <TitleSection title={t("Header1")} subTitle={parse(t("Header2"))} />
      <FeaturesSection>
        <FeatureCard
          imgSrc="/images/ic-bulk-send.png"
          title={parse(t("Card1.Title"))}
          description={parse(t("Card1.Description"))}
          featuresDescription={parse(t("Card1.Features"))}
          buttonTitle={t("Card1.Button")}
          onClick={(event) => handleClick(event, "/monitorEnvelopStatus")}
        />
        <FeatureCard
          imgSrc="/images/ik-click-confirm.png"
          title={parse(t("Card2.Title"))}
          description={parse(t("Card2.Description"))}
          featuresDescription={parse(t("Card2.Features"))}
          buttonTitle={t("Card2.Button")}
          onClick={(event) => handleClick(event, "/automatedWorkflow")}
        />
      </FeaturesSection>
      <CTASection
        title={t("Footer1")}
        description={parse(t("Footer2"))}
        primaryLink={{
          name: t("SandBoxButton"),
          href: "https://go.docusign.com/sandbox/productshot?elq=16799",
        }}
        secondaryLink={{
          name: t("LearnMoreButton"),
          href: "https://developers.docusign.com/",
        }}
      />
      <ResoursesSection
        title={t("Resources.Title")}
        resourceList={resourceList}
      />
    </div>
  );
}
