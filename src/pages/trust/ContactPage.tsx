import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { Mail, MessageSquare, Clock, MapPin, CheckCircle2, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { navigate } = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#17231C]/60 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-[#21965A] transition-colors cursor-pointer">
          Fincelio
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-[#17231C] font-medium">Contact Us</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17231C]">
          Contact Fincelio
        </h1>
        <p className="mt-3 text-base text-[#17231C]/75 leading-relaxed">
          Have a question about a calculation formula, spotted a bug, or want to suggest a new financial tool? Our quantitative engineering team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Information Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 bg-[#F4F8F5] border border-[#E3EBE5] rounded-2xl space-y-5">
            <h2 className="text-base font-bold text-[#17231C]">
              Direct Inquiries
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#17231C]/80">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E3EBE5] flex items-center justify-center text-[#21965A] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#17231C]">Editorial & Support</div>
                  <a href="mailto:support@fincelio.com" className="text-[#21965A] hover:underline">
                    support@fincelio.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E3EBE5] flex items-center justify-center text-[#21965A] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#17231C]">Response SLA</div>
                  <div className="text-[#17231C]/70">Within 24 to 48 business hours (Mon – Fri)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E3EBE5] flex items-center justify-center text-[#21965A] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#17231C]">Fincelio Global</div>
                  <div className="text-[#17231C]/70">Digital Financial Tools Platform · Worldwide</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white border border-[#E3EBE5] rounded-xl text-xs text-[#17231C]/70 leading-relaxed">
            <strong>Calculation Inquiries:</strong> If you are inquiring about a specific formula result, please include your input figures and the specific calculator URL to help us verify mathematical edge cases.
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="md:col-span-7 bg-white border border-[#E3EBE5] rounded-2xl p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-full bg-[#E5F5EB] text-[#21965A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#17231C]">
                Thank you for reaching out!
              </h2>
              <p className="text-xs sm:text-sm text-[#17231C]/70 max-w-sm mx-auto leading-relaxed">
                Your message has been received by the Fincelio team. We will review your inquiry and follow up at <strong>{email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-[#21965A] bg-[#E5F5EB] hover:bg-[#21965A] hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-[#17231C]">
                Send Us a Message
              </h2>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#17231C]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E3EBE5] focus:border-[#21965A] focus:outline-none focus:ring-2 focus:ring-[#21965A]/15"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#17231C]">
                  Business Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@yourbrand.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E3EBE5] focus:border-[#21965A] focus:outline-none focus:ring-2 focus:ring-[#21965A]/15"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#17231C]">
                  Inquiry Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E3EBE5] bg-white focus:border-[#21965A] focus:outline-none focus:ring-2 focus:ring-[#21965A]/15"
                >
                  <option value="general">General Feedback</option>
                  <option value="formula">Formula Verification or Bug Report</option>
                  <option value="calculator_request">Request a New Calculator</option>
                  <option value="partnership">Partnership or Editorial Inquiry</option>
                  <option value="press">Press & Media</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#17231C]">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide context on your question or suggestion..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E3EBE5] focus:border-[#21965A] focus:outline-none focus:ring-2 focus:ring-[#21965A]/15"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#21965A] hover:bg-[#1A7A48] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
