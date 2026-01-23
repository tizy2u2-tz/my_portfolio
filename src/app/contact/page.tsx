'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import MagneticWrapper from '@/components/MagneticWrapper';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission - replace with actual form handling
    // You can integrate with Formspree, Netlify Forms, or your own backend
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="pt-28 pb-16 container-main min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left column - Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue font-medium tracking-widest uppercase mb-4">Get in Touch</p>
          <h1 className="heading-lg mb-8">
            Let&apos;s create something together.
          </h1>
          <p className="body-lg mb-12">
            Have a project in mind? Looking for a design partner? Or just want to say hi? 
            I&apos;d love to hear from you.
          </p>

          {/* Contact info */}
          <div className="space-y-6 mb-12">
            <div>
              <h3 className="text-xs font-medium tracking-widest uppercase text-cream/40 mb-2">Email</h3>
              <a 
                href="mailto:hello@tonyazenin.com" 
                className="text-lg hover:text-blue transition-colors link-underline-blue"
              >
                hello@tonyazenin.com
              </a>
            </div>
            <div>
              <h3 className="text-xs font-medium tracking-widest uppercase text-cream/40 mb-2">Location</h3>
              <p className="text-lg">San Francisco Bay Area</p>
            </div>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-xs font-medium tracking-widest uppercase text-cream/40 mb-4">Connect</h3>
            <div className="flex gap-4">
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com/in/tonyazenin' },
                { name: 'Dribbble', url: 'https://dribbble.com/tonyazenin' },
                { name: 'Instagram', url: 'https://instagram.com/tonyazenin' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm border border-cream/20 hover:border-blue hover:text-blue transition-colors duration-300"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-12 border border-cream/10"
            >
              <div className="w-16 h-16 rounded-full bg-lime/20 flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-lime">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="heading-md mb-4">Message Sent!</h3>
              <p className="text-cream/60">
                Thanks for reaching out. I&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-medium tracking-widest uppercase text-cream/40 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-cream/20 text-cream focus:border-blue focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium tracking-widest uppercase text-cream/40 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-cream/20 text-cream focus:border-blue focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium tracking-widest uppercase text-cream/40 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-cream/20 text-cream focus:border-blue focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <MagneticWrapper className="w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </MagneticWrapper>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
