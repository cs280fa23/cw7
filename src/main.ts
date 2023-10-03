import { MultipleChoicesQuestion, Quiz, TrueFalseQuestion } from "./models";
import "./style.css";

const sampleQuiz: Quiz = {
  title: "Sample Quiz",
  questions: [
    {
      id: 1,
      text: "TypeScript is a superset of JavaScript.",
      answer: true,
    } as TrueFalseQuestion,
    {
      id: 2,
      text: "Which one can be used to define an enumeration?",
      options: [
        "enum Keyword",
        "enumeration Type",
        "enum Type",
        "enumerable Keyword",
      ],
      answer: "enum Keyword",
    } as MultipleChoicesQuestion,
  ],
};

function renderQuiz(quiz: Quiz) {
  const quizDiv = document.getElementById("quiz-container");
  const quizTitle = document.getElementById("quiz-title");

  if (!quizDiv || !quizTitle) return;

  // Set the quiz title dynamically
  quizTitle.textContent = quiz.title;

  // Clear any existing questions
  while (quizDiv?.firstChild) {
    quizDiv.firstChild.remove();
  }

  // Create ordered list
  const ol = document.createElement("ol");
  ol.className = "pl-2 list-decimal list-inside";

  // Loop through questions
  quiz.questions.forEach((question, index) => {
    // Create list item for each question
    const li = document.createElement("li");
    li.className = "mb-4";

    // Create label for question text
    const label = document.createElement("label");
    label.className = "leading-loose";
    label.textContent = question.text;

    // Append label to list item
    li.appendChild(label);

    // Create container for question options
    const optionsContainer = document.createElement("div");
    optionsContainer.className = question.hasOwnProperty("options")
      ? "flex flex-col ml-5"
      : "flex gap-3 ml-5";

    if ("options" in question) {
      // Multiple Choice Questions
      question.options.forEach((option, i) => {
        const char = String.fromCharCode(97 + i); // 97 is ASCII for 'a'
        const input = createRadioInput(
          `q${question.id}${char}`,
          `q${question.id}`,
          option,
        );
        optionsContainer.appendChild(input);
      });
    } else {
      // True/False Questions
      ["True", "False"].forEach((option) => {
        const input = createRadioInput(
          `q${question.id}${option === "True" ? "t" : "f"}`,
          `q${question.id}`,
          option,
        );

        optionsContainer.appendChild(input);
      });
    }

    // Append optionsContainer to list item
    li.appendChild(optionsContainer);

    // Append list item to ordered list
    ol.appendChild(li);
  });

  // Append ordered list to quiz container
  quizDiv.appendChild(ol);
}

function createRadioInput(
  id: string,
  name: string,
  labelContent: string,
): HTMLDivElement {
  const div = document.createElement("div");
  div.className = "flex";

  const input = document.createElement("input");
  input.type = "radio";
  input.name = name;
  input.id = id;
  input.className = "mt-1";

  const label = document.createElement("label");
  label.htmlFor = id;
  label.className = "ml-1";
  label.textContent = labelContent;

  div.appendChild(input);
  div.appendChild(label);

  return div;
}

renderQuiz(sampleQuiz);
