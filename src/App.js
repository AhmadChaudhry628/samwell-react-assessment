// Import necessary modules and files
import "./App.css";
import { useEffect, useState } from "react";
import {
  getAllApplications,
  getAllCandidates,
  getAllQuestions,
} from "./Utils/api-services";
import { combineData } from "./Utils/helpers";
import HomeLayout from "./Layout";
import CandidateList from "./Components/CandidateList";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
function App() {
  // Declare state variables using the useState hook
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all candidates, applications, and questions and combine them to update the state of candidates
  const fetchAllCandidates = async () => {
    try {
      setLoading(true);
      const candidates = await getAllCandidates();
      const applications = await getAllApplications();
      const questions = await getAllQuestions();
      let _candidates = combineData(
        candidates?.data,
        applications?.data,
        questions?.data
      );
      setCandidates(_candidates || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error({ error });
    }
  };

  // Call fetchAllCandidates when the component mounts
  useEffect(() => {
    fetchAllCandidates();
    return () => {};
  }, []);

  // Render the home layout and candidate list components with the candidates state and setCandidates function as props
  return (
    <HomeLayout>
      <Spin spinning={loading} indicator={antIcon}>
        <CandidateList setCandidates={setCandidates} candidates={candidates} />
      </Spin>
    </HomeLayout>
  );
}

// Export the App component
export default App;
