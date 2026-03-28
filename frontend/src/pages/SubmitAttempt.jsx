import {
  useState,
  useEffect
} from "react";

import API from "../api/axios";

const SubmitAttempt = () => {

  const [questionId,
    setQuestionId] =
    useState("");

  const [studentAnswer,
    setStudentAnswer] =
    useState("");

  const [steps,
    setSteps] =
    useState([""]);

  const [timeTaken,
    setTimeTaken] =
    useState(0);

  const [attemptId,
    setAttemptId] =
    useState(null);

  // TIMER
  useEffect(() => {

    const timer =
      setInterval(() => {

        setTimeTaken(
          prev => prev + 1
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  // ADD STEP
  const addStep = () => {

    setSteps(
      [...steps, ""]
    );

  };

  // UPDATE STEP
  const updateStep =
    (index, value) => {

      const newSteps =
        [...steps];

      newSteps[index] =
        value;

      setSteps(newSteps);

    };

  // SUBMIT
  const handleSubmit =
    async e => {

      e.preventDefault();

      try {

        const res =
          await API.post(
            "/attempts",
            {
              questionId,
              studentAnswer,
              steps,
              timeTaken
            }
          );

        setAttemptId(
          res.data._id
        );

        alert(
          "Attempt submitted"
        );

      }

      catch (error) {

        console.log(
          error
        );

        alert(
          "Submission failed"
        );

      }

    };

  return (

    <div>

      <h2>
        Submit Attempt
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          placeholder="Question ID"
          value={
            questionId
          }
          onChange={e =>
            setQuestionId(
              e.target.value
            )
          }
        />

        <br />

        <input
          placeholder="Final Answer"
          value={
            studentAnswer
          }
          onChange={e =>
            setStudentAnswer(
              e.target.value
            )
          }
        />

        <br />

        <h3>
          Steps
        </h3>

        {steps.map(
          (step, index) => (

            <div key={index}>

              <input
                placeholder={`Step ${index + 1}`}
                value={step}
                onChange={e =>
                  updateStep(
                    index,
                    e.target.value
                  )
                }
              />

            </div>

          )
        )}

        <button
          type="button"
          onClick={addStep}
        >
          Add Step
        </button>

        <br />

        <p>
          Time:
          {timeTaken} sec
        </p>

        <button>
          Submit Attempt
        </button>

      </form>

      {attemptId && (

        <p>

          Attempt ID:
          {attemptId}

        </p>

      )}

    </div>

  );

};

export default SubmitAttempt;