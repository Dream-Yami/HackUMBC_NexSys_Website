'use client';

import React, { useState } from 'react';

export default function AirtableForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!name.trim() || !email.trim()) {
      setMessage({ type: 'error', text: 'Name and Email are required.' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/airtable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), comment: comment.trim() })
      });

      const data = await res.json();

      if (!res.ok) {
        // Prefer a clear message from the API if available
        const errMsg = data?.error?.message || data?.error || JSON.stringify(data);
        throw new Error(errMsg);
      }

      setMessage({ type: 'success', text: 'Thanks — your submission was recorded.' });
      setName('');
      setEmail('');
      setComment('');
    } catch (err) {
      setMessage({ type: 'error', text: String(err.message || err) });
    } finally {
      setLoading(false);
    }
  }

    return (
    <div className="max-w-md mx-auto p-6 bg-black/90 rounded-lg shadow-[0_20px_60px_rgba(0,119,255,0.35)] border border-white/5 text-white">
      <h2 className="text-lg font-semibold mb-3 text-white">Join our Mailing List</h2>

        {message && (
          <div
            className={`p-2 mb-3 rounded ${
              message.type === 'error' ? 'bg-red-800 text-white' : 'bg-blue-700 text-white'
            }`}
          >
            {message.text}
          </div>
        )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="text-sm">Name</span>
          <input
            aria-label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1 bg-transparent text-white border-white/20 placeholder:text-white/60"
            placeholder="John Computer Man"
          />
        </label>

        <label className="block">
          <span className="text-sm">Email</span>
          <input
            aria-label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1 bg-transparent text-white border-white/20 placeholder:text-white/60"
            placeholder="loremipsum@gmail.com"
          />
        </label>

        <label className="block">
          <span className="text-sm">Comment</span>
          <textarea
            aria-label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1 bg-transparent text-white border-white/20 placeholder:text-white/60"
            rows="3"
            placeholder="Tell us what kind of projects you're interested in! And what kind of technology interests you."
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
