Here's a detailed prompt designed to instruct an LLM to perform a comprehensive Cognitive Task Analysis on multiple transcripts of expert explainer videos for a common task, with a specific focus on generating a JSON-LD graph:

-----

**Prompt for LLM: Cognitive Task Analysis (CTA) of Expert Explainer Videos**

You are an expert cognitive scientist and AI assistant specializing in human-computer interaction and knowledge representation. Your task is to perform a comprehensive Cognitive Task Analysis (CTA) on a set of provided transcripts from multiple expert explainer videos, all addressing a common task. The goal is to synthesize the expert knowledge and processes into a structured, actionable representation.

**Input:**

You will be provided with a series of transcripts, each labeled with an identifier (e.g., `Transcript_ExpertA`, `Transcript_ExpertB`). Each transcript represents an expert explaining or demonstrating a common task.

**Overall Goal:**

To generate a detailed Cognitive Task Analysis that captures the following aspects across all expert perspectives:

1.  **Goal Generation:** The overarching goals and a hierarchical breakdown of subgoals for the common task.
2.  **Decision Making:** Key decision points within the task, the criteria used for making those decisions, and the expected outcomes of different choices.
3.  **Judgments:** Implicit and explicit judgments experts make, the information they rely on for these judgments, and how these judgments influence the task flow.
4.  **Knowledge Audit:** The essential domain knowledge, conceptual understandings, and procedural knowledge required to perform the task effectively.
5.  **Cognitive Demands Table:** An analysis of the challenging cognitive elements, their sources of difficulty, common errors, and expert strategies for mitigation.
6.  **JSON-LD Task Graph:** A structured, machine-readable representation of the task flow, integrating goals, subtasks, decision logic, and contextual information.

**Specific Output Requirements:**

Your output should be structured into the following sections:

-----

**Section 1: Executive Summary of Common Task**

  * A concise description of the common task addressed across all videos.
  * Briefly highlight any significant variations or unique approaches observed among the experts.

-----

**Section 2: Synthesis of Goals and Subgoals**

  * Provide a hierarchical list of the main goal and all identified subgoals for completing the common task.
  * Clearly distinguish between primary goals and supporting subgoals.

-----

**Section 3: Consolidated Knowledge Audit**

  * List the essential **conceptual understandings** (e.g., principles, theories, mental models) required to perform the task well.
  * List the key **factual knowledge** (e.g., specific data, definitions, tool names) needed.
  * List the critical **procedural knowledge** (e.g., step-by-step instructions, sequences of actions) required.
  * Identify any **meta-knowledge** (knowledge about knowing, e.g., "always check the connection first").

-----

**Section 4: Cognitive Demands Table**

Create a Markdown table with the following columns. Synthesize insights from all experts.

| Difficult Cognitive Element | Why Difficult? (e.g., ambiguity, high working memory, time pressure, complex interaction) | Common Errors? (Observed or inferred) | Cues and Strategies Used (Expert approaches to manage difficulty) |
| :-------------------------- | :-------------------------------------------------------------------------------------- | :----------------------------------- | :-------------------------------------------------------------- |
|                             |                                                                         |                                      |                                                                 |
|                             |                                                                         |                                      |                                                                 |
|                             |                                                                         |                                      |                                                                 |

-----

**Section 5: JSON-LD Task Graph (Detailed Specification)**

Construct a single JSON-LD graph representing the consolidated task flow, decision logic, and contextual information.

**Schema Definition:**

The graph should use a custom schema defined within the JSON-LD context, suitable for representing cognitive tasks.

```json
{
  "@context": {
    "TaskGraph": "http://example.org/cognitive-task-graph#",
    "Task": "TaskGraph:Task",
    "Goal": "TaskGraph:Goal",
    "Subgoal": "TaskGraph:Subgoal",
    "DecisionPoint": "TaskGraph:DecisionPoint",
    "Condition": "TaskGraph:Condition",
    "Assumption": "TaskGraph:Assumption",
    "Tool": "TaskGraph:Tool",
    "InformationFlow": "TaskGraph:InformationFlow",
    "Metacognition": "TaskGraph:Metacognition",
    "description": "TaskGraph:description",
    "dependsOn": "TaskGraph:dependsOn",
    "leadsTo": "TaskGraph:leadsTo",
    "truePath": "TaskGraph:truePath",
    "falsePath": "TaskGraph:falsePath",
    "input": "TaskGraph:input",
    "output": "TaskGraph:output",
    "requiredFor": "TaskGraph:requiredFor",
    "appliesTo": "TaskGraph:appliesTo",
    "context": "TaskGraph:context"
  },
  "@graph": [
    // Nodes representing Tasks, Goals, Subgoals, DecisionPoints
    // Edges representing dependencies, logic flow, information flow, tool requirements
  ]
}
```

**Node Types and Properties:**

  * **`Task` / `Goal` / `Subgoal`**:

      * `@id`: Unique identifier (e.g., `_Task_InitialSetup`, `_Goal_AchieveDesiredOutcome`).
      * `description`: Concise textual description of the task/goal.
      * `dependsOn`: (Optional array of `@id`) Link to other tasks/goals that must be completed before this one.
      * `leadsTo`: (Optional array of `@id`) Link to the next task/goal in a linear sequence.
      * `informationFlow`: (Optional array of objects) Describes information input/output.
          * `input`: (string) What information is needed.
          * `output`: (string) What information is produced.
          * `appliesTo`: (optional @id) What node this information flow applies to (default is current node).
      * `requiredFor`: (Optional array of `@id`) Link to `Tool` nodes required for this task.

  * **`DecisionPoint`**:

      * `@id`: Unique identifier (e.g., `_Decision_CheckConnectionStatus`).
      * `description`: The question or condition being evaluated at this point.
      * `truePath`: (`@id`) The task/goal/decision point to proceed to if the condition is true.
      * `falsePath`: (`@id`) The task/goal/decision point to proceed to if the condition is false (or other paths if multi-way decision).
      * `metacognition`: (Optional string) Inferred expert thought process or strategy at this decision point (e.g., "Expert is thinking about efficiency here," "This is where expert anticipates common user error").

  * **`Condition` / `Assumption`**:

      * `@id`: Unique identifier (e.g., `_Condition_PowerOn`, `_Assumption_InternetAccess`).
      * `description`: The specific condition or assumption.
      * `context`: (Optional array of `@id`) Link to the `Task`, `Goal`, or `DecisionPoint` node(s) where this condition/assumption is relevant.

  * **`Tool`**:

      * `@id`: Unique identifier (e.g., `_Tool_Multimeter`, `_Tool_SoftwareXYZ`).
      * `description`: Name or description of the tool.
      * `type`: (Optional string) e.g., "Hardware", "Software", "Information Resource".

**JSON-LD Graph Construction Guidelines:**

1.  **Iterative Analysis:** You may need multiple passes through the transcripts to build a comprehensive graph. Start by identifying the main goals, then break them down into subgoals, and finally, integrate decision logic, information flow, tools, and metacognition.
2.  **Consolidation:** Combine similar steps or concepts from different experts into single nodes where appropriate. Note variations in the `description` or within the `metacognition` field if an expert's approach significantly differs while achieving the same outcome.
3.  **Logical Flow:** Ensure that `dependsOn`, `leadsTo`, `truePath`, and `falsePath` properties accurately reflect the logical sequence and branching of the task.
4.  **Clarity:** Node descriptions should be clear and concise.
5.  **Completeness:** Aim to capture all significant cognitive elements discussed by the experts.
6.  **Inferred Metacognition:** Where an expert explicitly states their reasoning or strategy (e.g., "I always check this first because...", "The key here is to avoid..."), capture this in the `metacognition` field of the relevant `DecisionPoint` or `Task` node. If not explicitly stated but strongly implied by their actions or explanations, make a reasoned inference and note it as such.

**Example Snippet for JSON-LD (Illustrative):**

```json
{
  "@context": {
    // ... (as defined above)
  },
  "@graph": [
    {
      "@id": "_Goal_ConnectDevice",
      "@type": "Goal",
      "description": "Successfully connect the device to the network."
    },
    {
      "@id": "_Task_InitialPowerCheck",
      "@type": "Task",
      "description": "Verify the device has power and is turned on.",
      "dependsOn": ["_Goal_ConnectDevice"], // This task is part of achieving the connection goal
      "leadsTo": "_Decision_IsPoweredOn"
    },
    {
      "@id": "_Decision_IsPoweredOn",
      "@type": "DecisionPoint",
      "description": "Is the device powered on?",
      "truePath": "_Task_CheckNetworkCable",
      "falsePath": "_Task_TroubleshootPower",
      "metacognition": "Expert thinks: 'This is the most common initial fault, always check power first.'"
    },
    {
      "@id": "_Task_TroubleshootPower",
      "@type": "Task",
      "description": "Diagnose and resolve power issues.",
      "leadsTo": "_Decision_IsPoweredOn", // Loop back after troubleshooting
      "requiredFor": ["_Tool_Multimeter"]
    },
    {
      "@id": "_Tool_Multimeter",
      "@type": "Tool",
      "description": "Digital multimeter for voltage testing.",
      "type": "Hardware"
    }
    // ... more nodes
  ]
}
```

-----

**Provide the transcripts, and I will begin the analysis.**
