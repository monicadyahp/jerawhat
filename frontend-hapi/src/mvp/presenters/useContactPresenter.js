import { useState } from 'react';
import ContactModel from '../models/ContactModel';

export function useContactPresenter() {
  const model = new ContactModel('fc254d5x0436@student.devacademy.id');

  const [name, setName]         = useState('');
  const [message, setMessage]   = useState('');
  const [status, setStatus]     = useState('');

  const onNameChange = e => setName(e.target.value);
  const onMessageChange = e => setMessage(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    // bangun mailto link dan buka email client
    const mailto = model.buildMailtoLink(name, message);
    window.location.href = mailto;
    setStatus('Opening your email client…');
  };

  return {
    name,
    message,
    status,
    onNameChange,
    onMessageChange,
    onSubmit
  };
}