import { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";
function ChickenRoadLayout({ component }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <div className="h-full overflow-auto  ">
        {loading ? <LoadingPage /> : component}
        {/* {component} */}
      </div>
    </>
  );
}

export default ChickenRoadLayout;
