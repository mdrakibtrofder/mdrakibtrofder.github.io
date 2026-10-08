import { useParams } from "react-router-dom";
import { SECTION_IDS } from "@/config/site";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";

/** Lets /teaching, /projects etc. open the home page scrolled to that section. */
const SectionRoute = () => {
  const { section = "" } = useParams();
  return SECTION_IDS.includes(section) ? <HomePage /> : <NotFoundPage />;
};

export default SectionRoute;
