import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
const DiffViewer = () => {
  const [commitDetails, setCommitDetails] = useState(null);
  const [fileDiffs, setFileDiffs] = useState([]);
  const [expandedFiles, setExpandedFiles] = useState([]);
  let { owner, repo, commit } = useParams();
  useEffect(() => {
    // Fetch commit details
    const fetchCommitDetails = async () => {
      const commitResponse = await fetch(
        `${import.meta.env.VITE_BE_URL}/repositories/${owner}/${repo}/commits/${commit}/details`,
      );
      const commitData = await commitResponse.json();
      setCommitDetails(commitData);
    };

    // Fetch file diffs
    const fetchFileDiffs = async () => {
      const diffResponse = await fetch(
        `${import.meta.env.VITE_BE_URL}/repositories/${owner}/${repo}/commits/${commit}/diff`,
      );
      const diffData = await diffResponse.json();
      setFileDiffs(diffData);
    };

    fetchCommitDetails();
    fetchFileDiffs();
  }, [owner, repo, commit]);

  const handleFileSelect = (filePath) => {
    setExpandedFiles(
      (prevFiles) =>
        prevFiles.includes(filePath)
          ? prevFiles.filter((file) => file !== filePath) // Collapse if already open
          : [...prevFiles, filePath], // Expand if not open
    );
  };

  if (!commitDetails || !fileDiffs.length) {
    return <div className="flex h-screen items-center justify-center ">Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center   gap-4   p-6">
      {/* Commit Details Card */}
      <div className=" flex   w-full max-w-3xl items-center justify-between rounded-lg p-6">
        {/* Left Side: Author Info */}
        <div className="flex items-center space-x-4 space-y-4">
          <img
            src={commitDetails["Author Avatar"]}
            alt="Author Avatar"
            className="size-12 rounded-full"
          />
          <div>
            <p className=" flex flex-wrap items-center whitespace-nowrap text-left font-sans  text-[16px] font-bold leading-[24px] tracking-wider text-[#39496A]">
              {commitDetails["Message Subject"]}
            </p>
            <p className="text-[#6D727C] ">
              Authored by{" "}
              <span className="font-[700]">{commitDetails.Author}</span> on{" "}
              {commitDetails["Commit Date"]}
            </p>
            <p className=" text-left font-sans text-[14px] leading-[24px] tracking-wider  text-[#32405D]">
              {commitDetails["Message Body"]}
            </p>
          </div>
        </div>

        {/* Right Side: Commit Details */}
        <div className="flex flex-wrap items-center whitespace-nowrap pl-40 text-sm text-gray-600">
          <p className="text-gray-500">
            <span className="">Committed by</span>{" "}
            <span className="font-semibold">{commitDetails.Author}</span>{" "}
            <span>{commitDetails["Commit Date"]}</span>
          </p>
          <div className=" ">
            <p className="flex items-center text-gray-500">
              <span className="">Commit</span>
              <span className="ml-1 text-[13px] font-[600] text-[#39496A]">
                {commit}
              </span>
            </p>
            <p className="flex items-center text-gray-500">
              <span className="pr-2">Parent</span>
              <span className="ml-1 text-[13px] font-[600] text-[#1C7CD6]">
                {commitDetails["Parent Commit"]}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* File List and Diff Viewer */}
      <div className="w-full max-w-[63rem] rounded-lg pl-36 ">
        {fileDiffs.map((file, index) => (
          <div key={index} className="mt-2 border-none">
            <button
              className="w-full py-2 text-left"
              onClick={() => handleFileSelect(file.headFile.path)}
            >
              {expandedFiles.includes(file.headFile.path) ? (
                <svg
                  className="mb-[4px] inline"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2_255)">
                    <path
                      d="M6.175 9L10 12.825L13.825 9L15 10.1833L10 15.1833L5 10.1833L6.175 9Z"
                      fill="#6078A9"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2_255">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  className="mb-[4px] inline"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2_214)">
                    <path
                      d="M7 15.8167L10.8167 12L7 8.175L8.175 7L13.175 12L8.175 17L7 15.8167Z"
                      fill="#6078A9"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2_214">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
              <span className="text-[#1C7CD6]">{file.headFile.path}</span>
            </button>

            {expandedFiles.includes(file.headFile.path) && (
              <div className="mt-2 max-h-full  max-w-full  overflow-x-auto border border-gray-200 p-2">
                {file.hunks.map((hunk, hunkIndex) => (
                  <div key={hunkIndex} className="mb-2">
                    <pre className="rounded p-2 font-mono text-xs text-gray-600">
                      {hunk.header}
                    </pre>
                    {hunk.lines.map((line, lineIndex) => (
                      <div key={lineIndex} className="flex">
                        <pre
                          className={`py-1 font-mono text-sm  ${
                            line.content.startsWith("+")
                              ? "bg-[#D8FFCB] text-[#657B83]"
                              : line.content.startsWith("-")
                                ? "bg-[#FFE4E9] text-[#657B83]"
                                : ""
                          }`}
                        >
                          <table>
                            <tr>
                              {line.content.startsWith("+") ? (
                                <span className="  w-8 text-right">
                                  <td className="min-w-8 max-w-8">
                                    {" "}
                                    <span className="pr-2 "></span>{" "}
                                  </td>
                                  <td className="min-w-8 max-w-8">
                                    <span className="inline-block pr-2 text-gray-500">
                                      {" "}
                                      {parseInt(hunk.header.match(/\d+/g)[0]) +
                                        lineIndex +
                                        1}
                                    </span>
                                  </td>
                                </span>
                              ) : line.content.startsWith("-") ? (
                                <span className="  w-8 text-right">
                                  <td className="min-w-8 max-w-8">
                                    {" "}
                                    <span className="pr-2 "></span>{" "}
                                  </td>
                                  <td className="min-w-8 max-w-8">
                                    <span className=" inline-block  pr-2 text-gray-500">
                                      {" "}
                                      {parseInt(hunk.header.match(/\d+/g)[0]) +
                                        lineIndex +
                                        1}
                                    </span>
                                  </td>
                                </span>
                              ) : (
                                <span className="  w-8 text-right text-gray-500">
                                  <td className="min-w-8 max-w-8">
                                    <span className="pr-2 ">
                                      {parseInt(hunk.header.match(/\d+/g)[0]) +
                                        lineIndex}
                                    </span>{" "}
                                  </td>
                                  <td className="min-w-8 max-w-8 ">
                                    <span className=" bg-[#e2ecf8] p-[0.45rem]">
                                      {parseInt(hunk.header.match(/\d+/g)[0]) +
                                        lineIndex}
                                    </span>
                                  </td>
                                </span>
                              )}
                              <span className=" text-left font-mono text-[12px] font-bold leading-[20px]  text-[#657B83] ">
                                <td>{line.content}</td>
                              </span>
                            </tr>
                          </table>
                        </pre>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiffViewer;
