// Function to combine candidate, application, and question data into a single array of objects

export const combineData = (candidates, applications, questions) => {
  let combinedData = [];
  try {
    combinedData = candidates.map((candidate) => {
      // Find the application that corresponds to the current candidate
      const application = applications.find(
        (app) => app.id === candidate.applicationId
      );
      // If an application is found, create a new array that includes each question along with its answer
      const questionsWithAnswers = application
        ? application.videos.map((video) => {
            const question = questions.find((q) => q.id === video.questionId);
            return {
              ...question,
              answer: {
                src: video.src,
                comments: video.comments,
              },
            };
          })
        : [];
      // Return the candidate object, including the array of questions and answers
      return {
        ...candidate,
        application: questionsWithAnswers,
      };
    });
  } catch (error) {
    combinedData = [];
    console.error({ error });
  }

  return combinedData;
};

// Function to update the comment associated with a particular question/answer
export const updateComment = (
  candidates,
  candidateId,
  questionId,
  newComment
) => {
  let updatedCandidates;
  try {
    updatedCandidates = candidates.map((candidate) => {
      if (candidate.id === candidateId) {
        // Find the application that corresponds to the current candidate
        const updatedApplication = candidate.application.map((question) => {
          if (question.id === questionId) {
            // Update the answer object with the new comment
            const updatedAnswer = {
              ...question.answer,
              comments: newComment,
            };
            // Return the question object, including the updated answer
            return {
              ...question,
              answer: updatedAnswer,
            };
          }
          // Return the question object as-is if it does not match the target question
          return question;
        });
        // Return the candidate object, including the updated application object
        return {
          ...candidate,
          application: updatedApplication,
        };
      }
      // Return the candidate object as-is if it does not match the target candidate
      return candidate;
    });
  } catch (error) {
    console.error({ error });
  }
  return updatedCandidates;
};

// Function to generate a menu item object
export const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};
