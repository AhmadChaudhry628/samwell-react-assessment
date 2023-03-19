import axios from "axios";

// Function to get all candidates
export const getAllCandidates = async () => {
  let response;
  try {
    const url = `/candidates`;
    response = await axios.get(url);
  } catch (error) {
    response = null;
    console.error(error);
  }
  return response;
};

// Function to get all applications
export const getAllApplications = async () => {
  let response;
  try {
    const url = `/applications`;
    response = await axios.get(url);
  } catch (error) {
    response = null;
    console.error(error);
  }
  return response;
};

// Function to get all questions
export const getAllQuestions = async () => {
  let response;
  try {
    const url = `/questions`;
    response = await axios.get(url);
  } catch (error) {
    response = null;
    console.error(error);
  }
  return response;
};

// Function to update applications inorder to save comments
export const updateApplications = async (applicationId, updatedVideos) => {
  let response;
  try {
    const url = `/applications/${applicationId}`;
    response = await axios.put(url, { videos: updatedVideos });
  } catch (error) {
    response = null;
    console.error(error);
  }
  return response;
};
