import {
  useEffect,
  useState
} from "react";

import API from "../api/axios";

const QuestionList = () => {

  const [questions,
    setQuestions] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const fetchQuestions =
      async () => {

        try {

          const res =
            await API.get(
              "/questions"
            );

          setQuestions(
            res.data
          );

        }

        catch (error) {

          console.log(
            error
          );

        }

        setLoading(false);

      };

    fetchQuestions();

  }, []);

  if (loading)
    return <p>Loading...</p>;

  return (

    <div>

      <h2>
        Questions
      </h2>

      {questions.map(
        q => (

          <div
            key={q._id}
          >

            <p>
              {q.questionText}
            </p>

            {q.image && (

              <img
                src={
                  q.image
                }
                width="200"
              />

            )}

          </div>

        )
      )}

    </div>

  );

};

export default QuestionList;