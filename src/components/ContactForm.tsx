"use client";

import { useActionState } from "react";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact";
import { useEffect, useRef } from "react";

const initialState: ContactFormState = {};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on successful submission
  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state?.success]);

  return (
    <div className="">
      {/* Success Message */}
      {state?.success && (
        <div className="mb-6 rounded-sm border border-green-300 bg-green-100 p-4 text-green-800">
          <p className="font-HelveticaNow font-medium">
            ✅ Votre message a été envoyé avec succès !
          </p>
          <p className="font-HelveticaNow mt-1 text-sm">
            Nous vous recontacterons dans les plus brefs délais.
          </p>
        </div>
      )}

      {/* Error Message */}
      {state?.error && (
        <div className="mb-6 rounded-sm border border-red-300 bg-red-100 p-4 text-red-800">
          <p className="font-HelveticaNow font-medium">❌ {state?.error}</p>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="bg-secondary focus:border-primary/40 border-primary/20 w-full border-0 border-b px-0 py-3 transition-colors focus:border-b-2 focus:outline-none"
              placeholder="Votre prénom"
              disabled={isPending}
            />
            {state?.fieldErrors?.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {state?.fieldErrors?.firstName?.[0]}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="bg-secondary focus:border-primary/40 border-primary/20 w-full border-0 border-b px-0 py-3 transition-colors focus:border-b-2 focus:outline-none"
              placeholder="Votre nom"
              disabled={isPending}
            />
            {state?.fieldErrors?.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {state?.fieldErrors?.lastName?.[0]}
              </p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="bg-secondary focus:border-primary/40 border-primary/20 w-full border-0 border-b px-0 py-3 transition-colors focus:border-b-2 focus:outline-none"
            placeholder="votre@email.com"
            disabled={isPending}
          />
          {state?.fieldErrors?.email && (
            <p className="mt-1 text-sm text-red-600">
              {state?.fieldErrors?.email?.[0]}
            </p>
          )}
        </div>

        <div>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="bg-secondary focus:border-primary/40 border-primary/20 w-full border-0 border-b px-0 py-3 transition-colors focus:border-b-2 focus:outline-none"
            placeholder="+32 123 45 67 89 (optionnel)"
            disabled={isPending}
          />
          {state?.fieldErrors?.phone && (
            <p className="mt-1 text-sm text-red-600">
              {state?.fieldErrors?.phone?.[0]}
            </p>
          )}
        </div>

        <div>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="bg-secondary focus:border-primary/40 border-primary/20 w-full resize-none border-0 border-b px-0 py-3 transition-colors focus:border-b-2 focus:outline-none"
            placeholder="Décrivez votre projet en détail : dimensions, style souhaité, contraintes particulières, délais..."
            disabled={isPending}
          ></textarea>
          {state?.fieldErrors?.message && (
            <p className="mt-1 text-sm text-red-600">
              {state?.fieldErrors?.message?.[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="border-primary text-primary font-HelveticaNow hover:bg-primary hover:text-secondary cursor-pointer border px-8 py-2 font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Envoi en cours..." : "Envoyer ma demande"}
        </button>

        <p className="font-HelveticaNow text-primary/60 text-left text-sm">
          En soumettant ce formulaire, vous acceptez d'être contacté par notre
          équipe concernant votre projet.
        </p>
      </form>
    </div>
  );
}
