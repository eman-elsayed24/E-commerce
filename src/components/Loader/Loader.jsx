import { ClipLoader } from "react-spinners";
import "./loader.css";
const Loader = () => {
  return (
    <div className="loader">
      <ClipLoader
        color="#0f3460"
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
