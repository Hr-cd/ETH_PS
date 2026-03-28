import {
  useState
} from "react";

import API from "../api/axios";

const CreateQuestion = () => {

  const [questionText,
    setQuestionText] =
    useState("");
  const [topic, setTopic] = useState();
  const [difficulty, setDifficulty] = useState();
  const [explanation, setExplanation] = useState();
  const [correctAnswer,
    setcorrectAnswer] =
    useState("");

  const [image,
    setImage] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const handleSubmit =
    async e => {

      e.preventDefault();

      setLoading(true);

      try {

        let imageUrl = "";

        if (image) {

          const formData =
            new FormData();

          formData.append(
            "questionImage",
            image
          );

          const uploadRes =
            await API.post(
              "/upload/question-image",
              formData,
              {
                headers: {
                  "Content-Type":
                    "multipart/form-data"
                }
              }
            );

          imageUrl =
            uploadRes.data.url;

        }

        await API.post("/questions", {
            questionText,
            correctAnswer,
            topic,
            difficulty,
            explanation,
            imageUrl
        });

        alert(
          "Question created"
        );

        setQuestionText("");
        setImage(null);

      }

      catch (error) {

        console.log(
          error
        );

        alert(
          "Error creating question"
        );

      }

      setLoading(false);

    };

  return (

    <div>

      <h2>
        Create Question
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <textarea
          placeholder="Enter question"
          value={
            questionText
          }
          onChange={e =>
            setQuestionText(
              e.target.value
            )
          }
        />
        <br/>
        <textarea
          placeholder="Correct Answer"
          value={
            correctAnswer
          }
          onChange={e =>
            setcorrectAnswer(
              e.target.value
            )
          }
        />

        <br />
        <textarea
          placeholder="Topic"
          value={
            topic
          }
          onChange={e =>
            setTopic(
              e.target.value
            )
          }
        />

        <br />
        <textarea
          placeholder="Diffiulty"
          value={
            difficulty
          }
          onChange={e =>
            setDifficulty(
              e.target.value
            )
          }
        />

        <br />
        <textarea
          placeholder="Explanation"
          value={
            explanation
          }
          onChange={e =>
            setExplanation(
              e.target.value
            )
          }
        />

        <br />

        <input
          type="file"
          onChange={e =>
            setImage(
              e.target.files[0]
            )
          }
        />

        <br />

        <button
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create"}
        </button>

      </form>

    </div>

  );

};

export default CreateQuestion;