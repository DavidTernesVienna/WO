Lean9 Training App — README
📌 Overview

Lean9 is a lightweight interval training app built entirely in a single HTML file.
No installation, no accounts, no backend. Just open it in your browser and start training.

It is designed for structured home/gym workouts with cycles, weeks, and days fully preloaded.
The app is minimal, fast, and works offline (via Progressive Web App support).

✨ Features

Built-in Training Cycles
– Preloaded workouts (Cycle 1–4, multiple weeks/days).
– Each workout includes warm-up, 3 main exercises, and cooldown.

Smart Interval Timer
– Supports Work/Rest/Rounds (e.g., 40/20 × 3).
– Auto progression through exercises and rounds.
– Visual dot tracker + color-coded phases (Get Ready / Work / Rest).

Progress Tracking
– Automatically remembers completed workouts.
– Marks in-progress, done, and current sessions.

YouTube Music Integration
– Play preset tracks or insert your own link.
– Music automatically lowers during phase-change beeps.

Audio Feedback
– Countdown beep, “Work” gong, and “Rest” tones.
– Optional speech mode for accessibility.

Mobile Friendly
– Optimized layout for phones and tablets.
– Works as a Progressive Web App (PWA) → install it like a native app.
– Supports wake-lock to keep the screen on and vibration feedback.

🚀 How to Use

Open the App

Double-click lean9.html.

Or host it on any static web server.

Start Training

Click ▶ Start Next to begin your next scheduled workout.

The timer will guide you through warm-up, exercises, and cooldown.

Track Your Progress

The History section (under the timer) shows all cycles/weeks.

Colored squares indicate Done / In Progress / Current.

Add Music (Optional)

Click Music → choose a preset or paste your own YouTube link.

Music auto-plays in the background.

Install on Phone (PWA)

On Android: Chrome → “Add to Home Screen”.

On iOS: Safari → Share → “Add to Home Screen”.

🛠 Tech Notes

Pure HTML, CSS, and JavaScript.

All training cycles are embedded in builtInData (no external files needed).

Data persists via localStorage (progress & resume snapshots).

Runs completely offline once cached.

📖 License

Free to use, modify, and share.
Created for personal fitness and productivity.
