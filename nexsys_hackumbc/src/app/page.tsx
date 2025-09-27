import Image from "next/image";
import GradientBackground from "./components/GradientBackground";
import Navbar from "./components/Navbar";
import AirtableForm from "./components/Airtable";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Navbar />
      <GradientBackground />
      <main className="flex flex-col gap-[32px] row-start-2 items-center text-center">
        <h1 className="text-3xl font-bold text-center">Join NexSys Labs — Enter to Win a $150 Microcenter Gift Card</h1>

        <p className="max-w-2xl text-center text-lg text-gray-700 dark:text-gray-300">
          Join our mailing list for NexSys Labs and you'll be entered into a raffle to win a $150
          Microcenter gift card. We send occasional updates about projects, events, and exclusive
          offers — no spam, unsubscribe anytime.
        </p>

        <div className="w-full max-w-md">
          <AirtableForm />
        </div>

        <p className="text-sm text-gray-500 max-w-2xl text-center sm:text-left">
          By joining you agree to receive emails from NexSys Labs. The raffle winner will be
          randomly selected and contacted via the email provided. Multiple entries will disqualify user from the raffle.
        </p>
      </main>
      <footer className="row-start-3 flex flex-col gap-2 items-center justify-center text-center text-sm text-gray-600 dark:text-gray-400">
        <p>NexSys Labs © {new Date().getFullYear()}</p>
        <p>Join our mailing list for a chance to win a $150 Microcenter gift card.</p>
      </footer>
    </div>
  );
}
