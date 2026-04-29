import { NextResponse } from "next/server";
import { systemPrompts } from "../../../lib/personaPrompts";
import { personas, type PersonaId } from "../../../lib/personas";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const isPersonaId = (value: string): value is PersonaId =>
  personas.some((persona) => persona.id === value);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const personaId = body?.personaId;
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    if (!personaId || typeof personaId !== "string" || !isPersonaId(personaId)) {
      return NextResponse.json(
        { error: "Unknown persona. Please select a valid persona." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server missing GROQ_API_KEY." },
        { status: 500 }
      );
    }

    const trimmedMessages: ChatMessage[] = messages
      .filter(
        (message: ChatMessage) =>
          message &&
          typeof message.content === "string" &&
          (message.role === "user" || message.role === "assistant")
      )
      .slice(-12);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL ?? "llama-3.1-70b-versatile",
          messages: [
            { role: "system", content: systemPrompts[personaId] },
            ...trimmedMessages
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message ?? "LLM request failed." },
        { status: response.status }
      );
    }

    const message = data?.choices?.[0]?.message?.content;
    if (!message) {
      return NextResponse.json(
        { error: "LLM returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected server error. Please try again." },
      { status: 500 }
    );
  }
}
