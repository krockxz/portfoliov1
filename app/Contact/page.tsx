"use client";

import { useState } from "react";
import Container from "@/components/containers";
import { Github, Linkedin } from "lucide-react";
import { SiX } from "react-icons/si";
import DisplacementText from "@/components/ui/displacement-text";


export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateForm = (formData: FormData) => {
    const newErrors: typeof errors = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!message?.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Add FormSubmit special fields
    formData.append("_subject", "New Contact Form Submission from Portfolio");

    // Use the email for _replyto so you can easily reply to the sender
    const email = formData.get("email") as string;
    if (email) {
      formData.append("_replyto", email);
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/kunt.rc7@gmail.com", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! Thank you for reaching out.",
        });
        form.reset();
        setErrors({});
      } else {
        setSubmitStatus({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="min-h-[200vh] px-8 pt-24 md:p-20 md:pb-10 mx-auto">
        {/* Background Pattern & Borders */}
        <div
          className="absolute right-0 top-0 h-full w-6 border-x border-x-[var(--pattern-fg)]
          bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
          bg-[length:10px_10px] bg-fixed opacity-80 dark:opacity-12"
        ></div>

        <div
          className="absolute left-0 top-0 h-full w-6 border-x border-x-[var(--pattern-fg)]
          bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
          bg-[length:10px_10px] bg-fixed opacity-80 dark:opacity-12"
        ></div>

        <h1 className="text-neutral-900 dark:text-neutral-50 font-custom font-semibold text-3xl tracking-tight">
          <span className="link--elara">Contact</span>
        </h1>
        <p className="tracking-tight font-custom2 text-neutral-600 dark:text-neutral-400 max-w-lg text-sm md:text-base mt-2 mb-12">
          Hi there — I’m currently open to meaningful work.
        </p>

        <div className="w-full max-w-2xl p-0 md:p-0 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 font-custom2">
                Full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                aria-required="true"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="Tyler Durden"
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 focus:border-transparent outline-none transition-all font-custom2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-red-500 mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 font-custom2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="tyler@projectmayhem.com"
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 focus:border-transparent outline-none transition-all font-custom2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-500 mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 font-custom2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                aria-required="true"
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                rows={5}
                placeholder="You're crazy good, never change."
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 focus:border-transparent outline-none transition-all font-custom2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 resize-none"
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-red-500 mt-1" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              aria-describedby={submitStatus.type ? "submit-status" : undefined}
              className="group relative overflow-hidden rounded-lg  w-full
                            bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900
                            border border-neutral-200 dark:border-neutral-800
                            text-neutral-800 dark:text-neutral-200 text-sm font-medium px-6 py-2.5
                            transition-all duration-300
                            hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-800 dark:hover:to-neutral-800
                            shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)]
                            dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]
                            disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </span>
            </button>

            {/* Status Message */}
            {submitStatus.type && (
              <div
                id="submit-status"
                role="status"
                aria-live="polite"
                className={`mt-4 p-3 rounded-lg text-sm font-custom2 ${
                  submitStatus.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </form>

          <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 font-custom2">
            <div className="flex items-center gap-2">
              <p>Kunal</p>
            </div>

            {/* Displacement Text - Visible and Hoverable */}

            <div className="flex items-center gap-4">
              <a href="https://x.com/kunalgoesbyken" target="_blank" rel="noopener noreferrer">
                <SiX size={14} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/kunal-roy-choudhury-7407211a7/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={14} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer transition-colors" />
              </a>
              <a href="https://github.com/krockxz" target="_blank" rel="noopener noreferrer">
                <Github size={14} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-60 relative overflow-hidden flex items-center justify-center">
          <DisplacementText
            text="KUNAL"
            fontSize={450}
            className="h-full w-full"
            lightColor="#171717"
            darkColor="#e5e5e5"
          />
        </div>


      </Container>
    </div>
  );
}
