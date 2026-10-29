# 💳 Payment Checkout Form

A modern, secure, and user-friendly payment checkout form built with React and TypeScript. 

This project demonstrates advanced form handling, input masking, real-time data visualization, and robust validation using modern frontend tools.


## 🛠️ Tech Stack

*   **Framework:** React 18
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Form Management:** React Hook Form
*   **Validation:** Zod
*   **Input Masking:** React IMask
*   **Styling:** Vanilla CSS (CSS Grid, Flexbox, Animations)
*   **API:** Mock API with simulated network delays and error handling

## ✨ Key Features

*   **Real-time Card Visualization:** A dynamic credit card preview that updates instantly as the user types.
*   **Input Masking:** Seamless formatting for card number (`0000 0000 0000 0000`), expiry date (`MM/YY`), and CVV.
*   **Strict Validation:** Form validation using `zod` with clear, user-friendly error messages (e.g., only Latin letters for the cardholder name).
*   **Asynchronous Payment Processing:** Simulated payment gateway with loading states and error handling.
*   **Duplicate Charge Prevention:** The submit button is disabled during the transaction to prevent multiple submissions.
*   **Success & Error Screens:** Dedicated UI states for successful and failed payments.
*   **Responsive Design:** Fully responsive UI that works on desktop and mobile devices.

## 📦 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/nyanlena/payment-checkout-form.git

2. Navigate to the project directory:
   ```bash
   cd payment-checkout-form

3. Install dependencies:
   ```bash
   npm install --legacy-peer-deps

4. Start the development server:
   ```bash
   npm run dev

5. Open your browser and navigate to:
   http://localhost:5173

