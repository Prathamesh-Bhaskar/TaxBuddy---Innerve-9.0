import PropTypes from "prop-types";
import EducationalVideos from "./EducationalVideos";
import TaxCalculator from "./TaxCalculator";
import Resources from "./Resources";

function TabContent({ activeTab }) {
  switch (activeTab) {
    case "calculator":
      return <TaxCalculator />;
    case "education":
      return <EducationalVideos />;
    case "resources":
      return <Resources />;
    default:
      return null;
  }
}

TabContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default TabContent;
