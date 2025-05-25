// src/mvp/models/AIChatModel.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyCxxeS6dm20h5IU4YqdkUE5AdAvOfI7M9E";

export default class AIChatModel {
    constructor() {
        if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 30) {
            console.error("Kesalahan Konfigurasi API Key: Pastikan GEMINI_API_KEY sudah diisi dengan kunci yang valid.");
            throw new Error("Invalid Gemini API Key configuration.");
        }
        this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Jika ingin model lebih powerful
    }

    async sendMessage(messages) {
        const lastUserMessage = messages[messages.length - 1]; // Pesan terakhir (dari user)

        // --- PENTING: Perbaikan di sini untuk membersihkan conversation history ---
        // History untuk Gemini API harus selalu dimulai dengan 'user' dan bergantian 'user'/'model'.
        // Kita akan membuat history baru yang memenuhi kriteria ini.
        let cleanedHistory = [];
        let previousRole = null;

        for (let i = 0; i < messages.length - 1; i++) { // Iterasi semua pesan kecuali yang terakhir (pesan user saat ini)
            const msg = messages[i];

            // Abaikan pesan 'system' atau pesan pembuka 'assistant' yang pertama
            // Pesan pembuka 'assistant' di UI (`Halo! Ada yang bisa saya bantu hari ini?`) tidak boleh masuk history API
            // karena API harus dimulai dengan 'user'.
            if (msg.role === "system" || (msg.role === "assistant" && i === 0)) {
                continue;
            }

            // Map role 'assistant' ke 'model' untuk Gemini API
            const currentRole = msg.role === "user" ? "user" : "model";

            // Pastikan peran bergantian. Jika tidak, itu berarti ada masalah dalam urutan pesan UI
            // atau ada pesan user/assistant berturut-turut.
            if (currentRole === previousRole) {
                console.warn(`[Gemini Chat] Peringatan: Peran berturut-turut (${currentRole}). Riwayat mungkin tidak sesuai format Gemini.`);
                // Untuk menghindari error API, Anda bisa memilih untuk mengabaikan pesan yang melanggar urutan
                // atau coba gabungkan pesan dari peran yang sama (meskipun ini lebih kompleks).
                // Untuk saat ini, kita biarkan dan Gemini API yang akan menolak jika formatnya salah.
            }
            
            cleanedHistory.push({
                role: currentRole,
                parts: [{ text: msg.content }]
            });
            previousRole = currentRole;
        }

        // --- Debugging logs ---
        console.log("Original Messages (from UI):", messages);
        console.log("Cleaned Conversation History (for Gemini API):", cleanedHistory);
        console.log("Last User Message (to send):", lastUserMessage.content);
        // --- End Debugging logs ---

        try {
            const chat = this.model.startChat({
                history: cleanedHistory, // Gunakan history yang sudah dibersihkan
                generationConfig: {
                    maxOutputTokens: 1024,
                    temperature: 0.8,
                },
                // systemInstruction diterapkan secara global untuk chat, tidak sebagai bagian dari history
                // (Ini adalah penggunaan yang benar untuk Gemini API)
                systemInstruction: {
                    role: "system", // Role harus 'system' di sini
                    parts: [{ text: "Jawab semua pertanyaan user dengan bahasa Indonesia yang sopan dan mudah dimengerti." }]
                }
            });

            const result = await chat.sendMessage(lastUserMessage.content);
            const response = await result.response;
            const text = response.text();

            return text || "Maaf, saya tidak bisa menjawab saat ini.";

        } catch (error) {
            console.error("Error communicating with Gemini API:", error);
            if (error.message.includes("API key not valid") || error.message.includes("api_key_invalid")) {
                return "Error: Kunci API Gemini tidak valid atau tidak terisi. Silakan periksa kunci Anda.";
            }
            if (error.message.includes("blocked")) {
                return "Maaf, respons AI diblokir karena kebijakan keamanan.";
            }
            if (error.response && error.response.candidates && error.response.candidates.length > 0 && error.response.candidates[0].finishReason === 'SAFETY') {
                return "Maaf, respons AI diblokir karena alasan keamanan.";
            }
            // Tangkap error "First content should be with role 'user', got model"
            if (error.message.includes("First content should be with role 'user', got model") || error.message.includes("history must start with a user role")) {
                return "Terjadi masalah dengan riwayat percakapan. Coba mulai chat baru (pastikan riwayat dimulai dengan pertanyaan Anda).";
            }
            if (error.message.includes("404") && error.message.includes("not found for API version")) {
                return "Maaf, model AI tidak ditemukan atau tidak didukung di lokasi/versi API Anda. Coba ganti model.";
            }
            return "Maaf, server AI tidak tersedia atau terjadi kesalahan lain.";
        }
    }
}