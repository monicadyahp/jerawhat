// src/mvp/presenters/useAIChatPresenter.js
import { useState, useEffect } from "react";
import AIChatModel from "../models/AIChatModel";

export default function useAIChatPresenter() {
  const model = new AIChatModel();

  // messages akan menyimpan semua pesan yang ditampilkan di UI
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const [typingResponse, setTypingResponse] = useState("");

  // Efek untuk menambahkan pesan pembuka dari AI hanya untuk tampilan UI
  useEffect(() => {
    // Tambahkan pesan pembuka dari asisten hanya jika chat kosong
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: "Halo! Ceritakan keluhan masalah kulit wajahmu!" }]);
    }
  }, []); // Jalankan hanya sekali saat komponen pertama kali di-mount

  const handleInputChange = e => setInput(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMsg = { role: "user", content: input };
    setMessages(prev => [...prev, newUserMsg]); // Tambahkan pesan pengguna baru ke riwayat UI
    setLoading(true);
    setInput("");
    setJustSent(true);
    setTypingResponse("");

    try {
      // Saring pesan pembuka AI dari riwayat yang akan dikirim ke model Gemini
      // Hanya kirim pesan yang berpasangan (user/assistant)
      const messagesToSendToModel = messages.filter(msg => msg.role !== "assistant" || (msg.role === "assistant" && messages.indexOf(msg) !== 0));
      // Atau, cara lebih sederhana:
      // Kirim riwayat yang SAMA PERSIS seperti yang ditampilkan di UI (termasuk pesan awal AI)
      // TAPI, kita akan modifikasi `AIChatModel` untuk membersihkan history ini sebelum API call.
      const aiReply = await model.sendMessage([...messages, newUserMsg]);


      // Efek typing
      let i = 0;
      function typeChar() {
        setTypingResponse(aiReply.slice(0, i));
        if (i < aiReply.length) {
          i++;
          setTimeout(typeChar, 18);
        } else {
          setMessages(prev => [...prev, { role: "assistant", content: aiReply }]);
          setTypingResponse("");
          setLoading(false);
        }
      }
      typeChar();
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setMessages(prev => [...prev, { role: "assistant", content: "Maaf, gagal mendapatkan respons dari AI." }]);
      setLoading(false);
      setTypingResponse("");
    }
  };

  return {
    messages,
    input,
    loading,
    handleInputChange,
    handleSubmit,
    justSent,
    setJustSent,
    typingResponse
  };
}