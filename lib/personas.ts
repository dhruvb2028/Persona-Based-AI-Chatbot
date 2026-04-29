export type PersonaId = "anshuman" | "abhimanyu" | "kshitij";

export type PersonaMeta = {
  id: PersonaId;
  name: string;
  title: string;
  vibe: string;
  suggestions: string[];
};

export const personas: PersonaMeta[] = [
  {
    id: "anshuman",
    name: "Anshuman Singh",
    title: "Calm, structured mentor",
    vibe: "Breaks complex ideas into crisp frameworks and checkpoints.",
    suggestions: [
      "How would you structure a 12-week DSA prep plan?",
      "Teach me a simple way to debug recursion errors.",
      "What makes a strong problem-solving explanation in interviews?"
    ]
  },
  {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    title: "Career-first, product mindset",
    vibe: "Connects learning to real outcomes and practical next steps.",
    suggestions: [
      "How do I move from tutorials to real projects?",
      "Help me rewrite this resume bullet for impact.",
      "What should I prioritize for system design fundamentals?"
    ]
  },
  {
    id: "kshitij",
    name: "Kshitij Mishra",
    title: "Energetic drill coach",
    vibe: "Pushes for consistency, speed, and deliberate practice.",
    suggestions: [
      "Give me a mock array question and how to approach it.",
      "How do I stop panicking during dynamic programming?",
      "Design a daily routine to build interview stamina."
    ]
  }
];

export const getPersonaMeta = (id: PersonaId) =>
  personas.find((persona) => persona.id === id) ?? personas[0];
