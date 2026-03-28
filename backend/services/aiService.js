const groq = require("../config/groqai");

const analyzeConfusion = async (
    questionText,
    correctAnswer,
    studentAnswer,
    steps
    ) => {

    try {

        const prompt = `
    You are an educational diagnostic AI.

    Return JSON only.

    {
    "confusionType": "",
    "reason": "",
    "feedback": ""
    }

    Question:
    ${questionText}

    Correct Answer:
    ${correctAnswer}

    Student Answer:
    ${studentAnswer}

    Steps:
    ${steps}
    `;

        const response =
        await groq.chat.completions.create({

            model: "llama-3.1-8b-instant",

            messages: [
            {
                role: "user",
                content: prompt
            }
            ]

        });

        const raw = response.choices[0].message.content;
        const cleaned = raw.replace(/```json|```/g, "").trim();
        return JSON.parse(cleaned);
    } catch (error) {

        console.error(
        "AI error:",
        error.message
        );

        return {
        confusionType: "Procedural",
        reason:
            "Unable to determine confusion.",
        feedback:
            "Review the steps carefully."
        };

    }

    };

module.exports = analyzeConfusion;