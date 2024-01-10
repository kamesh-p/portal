
import React, { useState } from "react";
import { useSelector } from "react-redux";

import clientPromise from "../../lib/mongodb";
import Link from "next/link";
import Teammembersproject from "../teammemberproject";
const Teammemberdashboard = ({ Users, forms, projects, survey }) => {
  console.log("question", survey);
  const user = useSelector((state) => state.user);
  const loggined = user.user.user._id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialog, setdialog] = useState(false);
  const [isreview, setreview] = useState(false);
  const loggedInUserDetails = Users.find(
    (member) => member.userId === loggined
  );
  console.log("loggedin user:", loggedInUserDetails);

  const handledialog = () => {
    setreview(true);
  };
  
  const handleclose = () => {
    setdialog(false);
  };

  const email = user?.user?.user?.email;
  const id = user?.user?.user?._id;
  console.log("is", id);
  const name = user?.user?.user?.name;
  const servey = user?.user?.user?.servey;
  const Lead = user?.user?.user?.mentor;

  let meetingScheduled = forms.filter((f) => {
    return f.assist === name;
  });

  let meetingcount = meetingScheduled.length;
  console.log("mee", meetingcount);
  let reviewdetails = Users.filter((review) => {
    return review.user.user.user.name === name;
  });
  let reviewcommand = reviewdetails[0].command;
  console.log("review", reviewcommand);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // State to manage the form data
  const [formData, setFormData] = useState({
    reactComponentDesign: 0,
    stateManagement: 0,
    javascriptFundamentals: 0,
    nextJsFramework: 0,
    htmlCssProficiency: 0,
    currentProject: "",
    previousProjects: "",
    additionalDetails: "",
    user: user,
    command: "",
  });

  
  const handleStarRatingChange = (questionId, rating) => {
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithUserId = {
        ...formData,
        userId: id,
      };

      console.log("formDataWithUserId:", formDataWithUserId.userId);

      const response = await fetch("/api/new-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithUserId),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Teammember Dashboard
      </h1>
      <div className="min-h-screen flex">
        <div className="w-1/5  ml-5 mt-5 ">
          {email && name && (
            <div className="bg-gray-200">
              <span className="font-bold text-black ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 inline-block mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                  />
                </svg>
              </span>
              <span className="text-gray-800">{name}</span> <br />
              <br />
              <span className="font-bold  text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 inline-block mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3l7 7L19 3"
                  />
                </svg>
              </span>
              <span className="text-gray-800">{email}</span> <br /> <br />
              <span className="font-bold  text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 inline-block mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21l-7-7M19 21l-7-7m7 7H5M6 3h14a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z"
                  />
                </svg>
              </span>
              <span className="text-gray-800">Team Member</span> <br />
            </div>
          )}
          <div className="h-full mt-10 bg-gray-200">
            <h2 className="text-gray-800 font-semibold text-xl px-10 pt-10">
              Team Member
            </h2>
            <br />
            <ul className="list-none px-6">
              <li className="text-base mb-5">Dashboard 📊</li>
              <li className="text-base mb-5">Review</li>

              <li className="text-base mb-5">
                Meeting{" "}
                <sup className="bg-red-700 text-white p-0.5 rounded-full">
                  {meetingcount}
                </sup>
              </li>

              <Link href="/leavecakender">
                <li className="text-base mb-5">Leave 🗓️</li>
              </Link>
              <li className="text-base mb-5">Messages 💬</li>
            </ul>
          </div>
        </div>

        <div className="flex-1 h-fit px-8">
          <div className="bg-white p-8 rounded shadow-md w-full">
            <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-between">
              <div className="text-lg">
                {servey ? (
                  <>
                    <p>You've already filled the survey. Thank you!</p>
                    <p className="text-blue-500 cursor-pointer underline">
                      Click to see the review
                    </p>
                    <button
                      className="absolute  right-20 top-56 bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={handledialog}
                    >
                      Review
                    </button>
                    {isreview && (
                      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gray-500 opacity-75 blur"></div>
                        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                          <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                              <p className="text-2xl font-bold">
                                {reviewcommand !== ""
                                  ? reviewcommand
                                  : "No command"}
                              </p>
                              <button
                                className="modal-close cursor-pointer relative -top-7 -right-6 z-50 text-white bg-red-500   hover:bg-red-700"
                                onClick={() => setreview(false)}
                              >
                                <span className="text-3xl">×</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p>
                      Haven't filled the survey yet? Let us know your thoughts!
                    </p>
                    <p className="text-blue-500 cursor-pointer underline">
                      Click Survey to fill
                    </p>
                  </>
                )}
              </div>

              {!servey && (
                <button
                  onClick={toggleModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Fill Survey
                </button>
              )}
            </div>
            {isDialog && (
              <>
                <div className="fixed top-0 right-0 left-0 z-50 overflow-y-auto overflow-x-hidden hidden md:flex md:items-center md:justify-center ml-64 w-full h-[calc(100%-1rem)] max-h-full">
                  <div className="fixed inset-0 backdrop-blur bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full bg-opacity-80 ml-56 mt-20 bg-white dark:bg-gray-700">
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Terms of Service
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="default-modal"
                          onClick={handleclose}
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>

                      <div>
                        
                        {survey.map((s) => {
                          <div>{s.text}</div>;
                        })}
                      </div>
                      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                          data-modal-hide="default-modal"
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          I accept
                        </button>
                        <button
                          data-modal-hide="default-modal"
                          type="button"
                          className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {isModalOpen && (
              <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"
              >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Trainee Details
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={toggleModal}
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                      <div>
                        <p className="mb-4">
                          Please complete the self-survey form:
                        </p>
                        <form onSubmit={handleSubmit}>
                          {/* <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                              React Component Design:
                            </label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <span
                                  key={rating}
                                  onClick={() =>
                                    handleStarRatingChange(
                                      "reactComponentDesign",
                                      rating
                                    )
                                  }
                                  className={`cursor-pointer ${
                                    rating > formData.reactComponentDesign
                                      ? "text-gray-300"
                                      : "text-yellow-500"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                              State Management (e.g., Redux):
                            </label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <span
                                  key={rating}
                                  onClick={() =>
                                    handleStarRatingChange(
                                      "stateManagement",
                                      rating
                                    )
                                  }
                                  className={`cursor-pointer ${
                                    rating > formData.stateManagement
                                      ? "text-gray-300"
                                      : "text-yellow-500"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                              JavaScript Fundamentals:
                            </label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <span
                                  key={rating}
                                  onClick={() =>
                                    handleStarRatingChange(
                                      "javascriptFundamentals",
                                      rating
                                    )
                                  }
                                  className={`cursor-pointer ${
                                    rating > formData.javascriptFundamentals
                                      ? "text-gray-300"
                                      : "text-yellow-500"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                              Next.js Framework:
                            </label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <span
                                  key={rating}
                                  onClick={() =>
                                    handleStarRatingChange(
                                      "nextJsFramework",
                                      rating
                                    )
                                  }
                                  className={`cursor-pointer ${
                                    rating > formData.nextJsFramework
                                      ? "text-gray-300"
                                      : "text-yellow-500"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                              HTML/CSS Proficiency:
                            </label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <span
                                  key={rating}
                                  onClick={() =>
                                    handleStarRatingChange(
                                      "htmlCssProficiency",
                                      rating
                                    )
                                  }
                                  className={`cursor-pointer ${
                                    rating > formData.htmlCssProficiency
                                      ? "text-gray-300"
                                      : "text-yellow-500"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                              Current Project:
                            </label>
                            <input
                              type="text"
                              name="currentProject"
                              value={formData.currentProject}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                              Previous Projects:
                            </label>
                            <textarea
                              name="previousProjects"
                              value={formData.previousProjects}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                              Additional Details:
                            </label>
                            <textarea
                              name="additionalDetails"
                              value={formData.additionalDetails}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                          </div> */}
                          {survey.map((q) => (
                            <div key={q._id}>
                              <p>{q.text}</p>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <span
                                    key={rating}
                                    onClick={() =>
                                      handleStarRatingChange(q.text, rating)
                                    } // Assuming q._id is unique for each question
                                    className={`cursor-pointer ${
                                      rating > formData[q.text]
                                        ? "text-gray-300"
                                        : "text-yellow-500"
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}

                          <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <h2>project</h2>
          <Teammembersproject projects={projects} username={name} />
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  try {
    const client = await clientPromise;

    const db = client.db("form");
    const dbs = client.db("Meetings");
    const projects = client.db("projects");
    const question = client.db("question");
    const product = await db.collection("members").find({}).limit(20).toArray();
    const products = await dbs
      .collection("events")
      .find({})
      .limit(20)
      .toArray();
    const projectsdetails = await projects
      .collection("details")
      .find({})
      .limit(20)
      .toArray();
    const survey = await question
      .collection("survey")
      .find({})
      .limit(20)
      .toArray();

    return {
      props: {
        Users: JSON.parse(JSON.stringify(product)),
        forms: JSON.parse(JSON.stringify(products)),
        projects: JSON.parse(JSON.stringify(projectsdetails)),
        survey: JSON.parse(JSON.stringify(survey)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { Users: [] },
    };
  }
}

export default Teammemberdashboard;