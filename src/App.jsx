import { useState, useEffect } from "react";
import DiffViewer from "./DiffViewer"; // Import DiffViewer component

import { useParams } from "react-router";
export default function App() {
  let { owner, repo, commit } = useParams();
  const [fileDiffs, setFileDiffs] = useState([]);
  useEffect(() => {
    const fetchDiff = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/repositories/${owner}/${repo}/commits/${commit}/diff`,
        );

        const data = await response.json();
        console.log(data);

        setFileDiffs(data);
      } catch (error) {
        console.error("Error fetching diff:", error);
      }
    };

    fetchDiff();
  }, [commit, repo, owner]);

  return (
    <div>
      <DiffViewer
        commitHash={commit}
        repo={repo}
        owner={owner}
        fileDiffs={fileDiffs}
      />
    </div>
  );
}
