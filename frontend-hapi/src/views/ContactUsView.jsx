// src/views/ContactUsView.jsx
import React from 'react';

export default function ContactUsView({
  name,
  email,
  message,
  status,
  onNameChange,
  onEmailChange,
  onMessageChange,
  onSubmit
}) {
  return (
    <section className="section contact reveal-from-bottom" id="contact">
      <div className="container">
        <div className="contact__content reveal-from-bottom">
          <h2 className="section__title">Contact Us</h2>
          <p className="contact__subtitle">
            Have a question or want to collaborate? Drop us a line!
          </p>

          <form className="contact__form" onSubmit={onSubmit}>
            {/* Name */}
            <div className="contact__group reveal-from-bottom">
              <label htmlFor="name">Name</label>
              <input
                className="contact__input"
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                required
                value={name}
                onChange={onNameChange}
              />
            </div>

            {/* Email */}
            <div className="contact__group reveal-from-bottom">
              <label htmlFor="email">Your Email</label>
              <input
                className="contact__input"
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={onEmailChange}
              />
            </div>

            {/* Message */}
            <div className="contact__group reveal-from-bottom">
              <label htmlFor="message">Message</label>
              <textarea
                className="contact__textarea"
                id="message"
                name="message"
                placeholder="Type your message here…"
                required
                value={message}
                onChange={onMessageChange}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="button contact__button reveal-from-bottom"
            >
              Send Message
            </button>

            {/* Status */}
            {status && (
              <p className="contact__status reveal-from-bottom">{status}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}