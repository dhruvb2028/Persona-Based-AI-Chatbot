"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { personas, type PersonaId } from "../lib/personas";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_INPUT = 1200;

export default function HomePage() {
  const [personaId, setPersonaId] = useState<PersonaId>("anshuman");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const persona = useMemo(
    () => personas.find((item) => item.id === personaId) ?? personas[0],
    [personaId]
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handlePersonaSwitch = (id: PersonaId) => {
    setPersonaId(id);
    setMessages([]);
    setInput("");
    setError(null);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) {
      return;
    }

    setError(null);
    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personaId, messages: nextMessages })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Something went wrong.");
      }

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.message
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Request failed.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <main className="min-h-screen px-4 py-10 md:px-10 md:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-6 rounded-3xl border border-black/10 bg-white/70 p-6 shadow-soft backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-ink/60">
              Persona-Based AI Chatbot
            </p>
            <h1 className="text-4xl font-semibold text-ink md:text-5xl">
              Scaler Persona Studio
            </h1>
            <p className="max-w-xl text-sm text-ink/70 md:text-base">
              Switch between mentors, explore tailored prompts, and keep the
              conversation grounded in each persona tone.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white/80 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-ink/50">
              Active Persona
            </p>
            <p className="text-lg font-semibold text-ink">{persona.name}</p>
            <p className="text-sm text-ink/60">{persona.title}</p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-black/10 bg-white/80 p-4 shadow-soft">
              <h2 className="text-lg font-semibold text-ink">Personas</h2>
              <p className="text-sm text-ink/60">
                Switch personas and the chat resets automatically.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {personas.map((item) => {
                const isActive = item.id === personaId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePersonaSwitch(item.id)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-ink bg-ink text-white"
                        : "border-black/10 bg-white/80 text-ink hover:-translate-y-0.5 hover:shadow-soft"
                    }`}
                  >
                    <p className="text-sm uppercase tracking-[0.2em] opacity-70">
                      {item.name}
                    </p>
                    <p className="text-base font-semibold">{item.title}</p>
                    <p
                      className={`text-sm ${
                        isActive ? "text-white/80" : "text-ink/60"
                      }`}
                    >
                      {item.vibe}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-soft">
            <div className="flex h-[62vh] min-h-[420px] flex-col gap-5">
              <div className="flex-1 overflow-y-auto pr-2">
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <div className="max-w-sm space-y-3">
                      <h2 className="text-2xl font-semibold text-ink">
                        Start with a quick prompt
                      </h2>
                      <p className="text-sm text-ink/60">
                        Each persona has tailored starters. Click one to begin.
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {persona.suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => void sendMessage(suggestion)}
                          className="rounded-full border border-black/10 bg-paper px-4 py-2 text-sm text-ink transition hover:-translate-y-0.5 hover:border-ink"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={`${message.role}-${index}`}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:text-base ${
                            message.role === "user"
                              ? "bg-ink text-white"
                              : "border border-black/10 bg-paper text-ink"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading ? <TypingIndicator /> : null}
                    <div ref={endRef} />
                  </div>
                )}
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 md:flex-row md:items-end"
              >
                <div className="flex-1">
                  <label className="text-xs uppercase tracking-[0.2em] text-ink/50">
                    Your message
                  </label>
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void sendMessage(input);
                      }
                    }}
                    maxLength={MAX_INPUT}
                    rows={3}
                    className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-ink"
                    placeholder={`Ask ${persona.name} anything...`}
                  />
                  <div className="mt-2 text-xs text-ink/50">
                    {input.length}/{MAX_INPUT}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-2xl bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-ink/60">
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-coral"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-coral"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-coral"
        style={{ animationDelay: "300ms" }}
      />
      <span>Thinking...</span>
    </div>
  );
}
