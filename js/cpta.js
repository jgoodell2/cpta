// Task analysis data storage
const taskAnalysisData = {
  description: "",
  context: "",
  preTaskThinking: "",
  firstSteps: [],
  observations: [],
  errors: [],
  domainTerms: [],
  contextSpecificTerms: []
};

// Define prompts and workflow steps
const steps = [
  {
    id: "introduceTask",
    prompt: "Can you briefly describe the overall task and its purpose? Why is this task important in your field?",
    followUp: "You mentioned [TERM]. This term can have different meanings depending on the context. Could you define it as you’re using it here?",
    type: "text",
    field: "description",
    detectTerms: true,
    termField: "domainTerms"
  },
  {
    id: "setupContext",
    prompts: [
      "Set up the context. What is happening before you begin this task?",
      "What factors typically trigger the need to perform this task?",
      "Who else, if anyone, is involved in preparing for this task?"
    ],
    followUp: "You mentioned [TERM]. Could you define it as it applies here?",
    type: "multi",
    field: "context",
    detectTerms: true,
    termField: "contextSpecificTerms"
  },
  {
    id: "preTaskThinking",
    prompts: [
      "What are you thinking about before doing this task?",
      "Are there specific checks, resources, or preparations you rely on before starting?"
    ],
    followUp: "How do these resources help? Are there any risks if they are unavailable or incomplete?",
    type: "multi",
    field: "preTaskThinking"
  },
  {
    id: "firstSteps",
    prompts: [
      "What’s the first step you typically take to start this task?",
      "What are you thinking and observing when doing this step?",
      "Are there alternative first steps that you take depending on the circumstances?"
    ],
    followUp: "Could you explain what [TERM] means in this context? How might a novice misinterpret it?",
    type: "multi",
    field: "firstSteps",
    detectTerms: true
  },
  {
    id: "observations",
    prompts: [
      "While performing this step, what are you observing or paying close attention to?",
      "What signs or indicators suggest that you’re on the right track?",
      "What warning signs indicate something might be going wrong?"
    ],
    followUp: "How do you respond when you notice these warning signs?",
    type: "multi",
    field: "observations"
  },
  {
    id: "errors",
    prompts: [
      "What are some common mistakes novices make during this step?",
      "Why do you think these mistakes happen?",
      "What would you recommend to help someone avoid these mistakes?",
      "Are there situations where this step might not work as expected? If so, what do you do instead?"
    ],
    followUp: "Can you describe how you execute that alternative and what makes it effective?",
    type: "multi",
    field: "errors"
  }
];

// Current step index
let currentStepIndex = 0;

// Initialize the interview
function initInterview() {
  displayStep(steps[currentStepIndex]);
}

// Display the current step
function displayStep(step) {
  const stepContainer = document.getElementById("stepContainer");
  stepContainer.innerHTML = "";

  if (step.type === "text") {
    const question = document.createElement("p");
    question.className = "question";
    question.innerText = step.prompt;
    stepContainer.appendChild(question);

    const input = document.createElement("textarea");
    input.id = "stepInput";
    stepContainer.appendChild(input);
  } else if (step.type === "multi") {
    step.prompts.forEach((prompt, index) => {
      const question = document.createElement("p");
      question.className = "question";
      question.innerText = prompt;
      stepContainer.appendChild(question);

      const input = document.createElement("textarea");
      input.id = `stepInput${index}`;
      stepContainer.appendChild(input);
    });
  }
}

// Handle the next button click
document.getElementById("nextButton").addEventListener("click", () => {
  const step = steps[currentStepIndex];
  const stepContainer = document.getElementById("stepContainer");

  let response;

  if (step.type === "text") {
    response = document.getElementById("stepInput").value.trim();
    if (!response) {
      alert("Please provide a response before continuing.");
      return;
    }
    taskAnalysisData[step.field] = response;

    if (step.detectTerms) {
      detectTerms(response, step.termField);
    }
  } else if (step.type === "multi") {
    response = [];
    step.prompts.forEach((_, index) => {
      const input = document.getElementById(`stepInput${index}`).value.trim();
      if (input) {
        response.push(input);
        if (step.detectTerms) {
          detectTerms(input, step.termField);
        }
      }
    });
    if (response.length === 0) {
      alert("Please provide at least one response before continuing.");
      return;
    }
    taskAnalysisData[step.field] = response;
  }

  // Move to the next step
  currentStepIndex++;
  if (currentStepIndex < steps.length) {
    displayStep(steps[currentStepIndex]);
  } else {
    displayResults();
  }
});

// Detect terms in the response
function detectTerms(response, termField) {
  if (typeof response !== "string" || response.trim() === "") {
    console.error("Invalid input for term detection:", response);
    return;
  }

  const doc = nlp(response);

  if (!taskAnalysisData[termField]) {
    taskAnalysisData[termField] = [];
  }

  doc.nouns().forEach(noun => {
    const term = noun.text;

    // Ignore terms that are too long or have unusual characters
    if (term.length > 30 || /[^a-zA-Z0-9\s]/.test(term)) {
      console.warn("Skipping unusual term:", term);
      return;
    }

    taskAnalysisData[termField].push({ term, definition: "" });

    const output = document.getElementById("output");
    output.innerHTML += `<p>Detected term: <strong>${term}</strong>. Please define it:</p>`;
  });
}

// Display final results
function displayResults() {
  const output = document.getElementById("output");
  output.innerHTML = `<h3>Task Analysis Data:</h3><pre>${JSON.stringify(taskAnalysisData, null, 2)}</pre>`;
}

// Start the interview
initInterview();
