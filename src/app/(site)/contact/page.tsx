import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";
import { Reveal } from "@/components/ui";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Millennium Technologies Ltd for quotations, service bookings, support and general enquiries. Nairobi, Kenya.",
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-28 pb-4 text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Contact Us
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
          Let&apos;s discuss your project
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Have a question, want a quotation, or need support? Reach out directly and our team will
          respond promptly.
        </p>
      </div>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">Send us a message</h2>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-6">
              <h2 className="mb-6 text-2xl font-bold text-white">Get in touch</h2>

              <div className="card">
                <h3 className="text-base font-semibold text-white">Phone</h3>
                <a
                  href={`tel:${SITE.phone.replace(/\D/g, "")}`}
                  className="mt-2 block text-sm text-gray-400 hover:text-green-400"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>

              <div className="card">
                <h3 className="text-base font-semibold text-white">Email</h3>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 block break-all text-sm text-gray-400 hover:text-green-400"
                >
                  {SITE.email}
                </a>
              </div>

              <div className="card">
                <h3 className="text-base font-semibold text-white">WhatsApp</h3>
                <a
                  href={whatsappLink(SITE.whatsapp, "Hello Millennium Technologies, I have an enquiry.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-sm text-gray-400 hover:text-green-400"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="card">
                <h3 className="text-base font-semibold text-white">Location</h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-gray-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {SITE.location}
                </p>
              </div>

              <div className="card">
                <h3 className="text-base font-semibold text-white">Hours</h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                  <li>Monday – Saturday: 8:00am – 6:00pm</li>
                  <li>Sunday &amp; Holidays: By appointment</li>
                  <li className="text-green-400">Emergency support: 24/7</li>
                </ul>
              </div>

              <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className="btn-primary w-full">
                <Phone className="h-4 w-4" />
                Call Now: {SITE.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}