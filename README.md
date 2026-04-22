<div align="center">
  <h1>🧠 TheraSmart: AI-Powered Speech Therapy</h1>
  <p>An interactive, AI-driven web application designed to make speech therapy accessible, engaging, and highly effective.</p>
</div>

---

## 📖 About The Project

TheraSmart is a modern, full-stack React application built to assist users with speech therapy through interactive games, real-time AI pronunciation analysis, and virtual AI therapist consultations. 

By leveraging in-browser Machine Learning (Wasm/WebGPU), TheraSmart completely eliminates the need for expensive backend video/audio processing—making real-time speech analysis lightning fast and completely private.

### ✨ Key Features

*   **🎙️ In-Browser Speech Analysis:** Uses Hugging Face's `transformers.js` to run Whisper models locally on the user's device. Transcribing and grading pronunciation accuracy instantly without sending audio to the cloud.
*   **🎮 Interactive Practice Games:** Gamified learning modules to test enunciation and pacing.
*   **🤖 AI Therapist Personas:** Chat with specialized AI therapists (designed with unique prompts) using a rich conversational UI.
*   **🗓️ Session Booking:** A modern booking widget to schedule upcoming practice sessions with your preferred AI therapists.
*   **📊 Smart Dashboard:** Track progress, daily streaks, average speech scores, and earn achievements based on your consistency.

---

## 🚀 Tech Stack

*   **Frontend Framework:** React 18 with Vite
*   **Styling:** Tailwind CSS & `shadcn/ui` components
*   **Animations:** Framer Motion
*   **Local AI / ML:** `@huggingface/transformers` (Wasm & WebGPU fallbacks)
*   **Database & Auth:** Supabase
*   **State Management:** React Query (`@tanstack/react-query`)
*   **Routing:** React Router v6

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have Node.js installed (v18 or higher is recommended) to run the development server.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/therasmart.git
   cd therasmart/Therapist
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Supabase credentials.
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   Navigate to `localhost:8080`.

---

## 🧠 Technical Highlights

### Robust AI Fallback System
The application features a deeply optimized machine-learning pipeline. It initially attempts to load the Speech Recognition pipeline via **WebGPU** for maximum hardware acceleration. If the user's hardware does not support it, the app gracefully falls back to a **Wasm (WebAssembly)** quantified engine utilizing the CPU.

### Performance Tuning
* Built using specific Vite server headers (`Cross-Origin-Embedder-Policy: require-corp`) required by modern browsers to allocate high-performance memory chunks for the Wasm ML engine.
* Hand-rolled Levenshtein distance matrix algorithms analyze transcription arrays against target text, providing strict `accuracy (%)` metrics and identifying exactly which words were missed or mispronounced.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve TheraSmart, please fork the repository and create a pull request with your proposed changes.

## 📄 License

This project is open-source and available under the MIT License.
