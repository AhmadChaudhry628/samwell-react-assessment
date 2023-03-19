// Import necessary modules from antd library and react
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { updateComment } from "../Utils/helpers";
import { updateApplications } from "../Utils/api-services";
import Editor from "./Editor";
import { notification } from "antd";

function Question({
  setCandidates,
  applicationId,
  candidateId,
  url,
  itemIndex,
  videos,
  question,
  questionId,
  comments,
  playerRef,
  playing,
  candidates,
}) {
  // Define function to open notifications with appropriate icons
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  // Define state variables for form submission
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState(comments);

  // Define variables for handling video data
  let _video = { ...videos[itemIndex] };
  const handleChange = (e) => {
    setValue(e.target.value);
    _video["answer"].comments = e.target.value;
  };

  // Define function to handle form submission
  const handleSubmit = async () => {
    try {
      // Set the submitting state to true
      setSubmitting(true);

      // Create a copy of the video array with the updated video object
      let _videos = [...videos];
      _videos[itemIndex] = _video;

      // Create a new array of video objects with only the necessary data fields
      const updatedVideos = _videos.map((item, index) => ({
        questionId: item?.id,
        src: item?.answer?.src,
        comments: item?.answer?.comments,
      }));

      // Update the candidate's comment value with the new comment
      const newCandidates = updateComment(
        candidates,
        candidateId,
        questionId,
        value
      );

      // Send the updated video data to the server for processing
      let resp = await updateApplications(applicationId, updatedVideos);

      // Display a success notification and update the candidates array with the new comment value
      if (resp.status === 200) {
        openNotificationWithIcon(
          "success",
          "Successfully Saved",
          `Comment against question: ${question} has been saved successfully.`
        );
        setCandidates([...newCandidates]);
      }

      // Display an error notification if the server response is not successful
      else {
        openNotificationWithIcon(
          "error",
          "Oops",
          `Something went wrong, please try again later.`
        );
      }

      // Set the submitting state to false
      setSubmitting(false);
    } catch (error) {
      // Catch any errors that occur during form submission and display an error notification
      setSubmitting(false);
      console.error({ error });
      openNotificationWithIcon(
        "error",
        "Oops",
        `Something went wrong, please try again later.`
      );
    }
  };
  return (
    <div>
      {/* Display notification context holder */}
      {contextHolder}

      {/* Display question text */}
      <p>Question: {question}</p>

      {/* Display the ReactPlayer component */}
      <ReactPlayer
        ref={playerRef}
        controls={true}
        playing={playing}
        width="100%"
        height="100%"
        url={url}
      />

      {/* Display the Editor component for submitting comments */}
      <Editor
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitting={submitting}
        value={value}
      />
    </div>
  );
}

export default Question;
