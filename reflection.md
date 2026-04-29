# Reflection

Building this chatbot forced me to treat prompt engineering like product design instead of a quick text tweak. What worked best was treating each persona as a mini brand: define their values, their tone, and the kind of outcomes they care about. I wrote the prompt with structure first (persona description, examples, constraints), then refined for clarity and rhythm. The suggestion chips and persona switcher made the UI feel purposeful because they guide the user into the right voice quickly.

The GIGO principle showed up every time I tried to be vague. When the persona description was generic, the outputs felt generic even if the model was strong. Once I added tighter constraints and specific examples, the persona voice became consistent and more believable. The few-shot examples mattered more than I expected because they set the cadence and length of the response. I also learned that output instructions are not optional if you want reliable formatting; the model will drift without explicit guardrails.

If I had more time, I would deepen the research and add real references in the prompts. That includes specific phrases, favorite frameworks, and topics each mentor repeats in their talks. I would also add a short persona "do and do not" list for each person based on real content. On the product side, I would add conversation export, persona memory toggles, and a simple evaluation mode to compare outputs across personas.

Overall, the project taught me that prompt engineering is part writing, part product thinking, and part quality control. The best prompts are not just descriptive; they are precise about context, examples, and constraints. That precision is what makes the chatbot feel human and aligned with a real person rather than a generic assistant.
