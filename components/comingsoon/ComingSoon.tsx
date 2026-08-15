"use client";

import { useEffect, useState } from "react";
import Logo from "../logo/Logo";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Change this to your launch date
    const launchDate = new Date("2026-09-15T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="coming-soon">
      <div className="background-circle circle-one" />
      <div className="background-circle circle-two" />

      <section className="content">
        <div className="badge">WE ARE LAUNCHING SOON</div>

        <h4 className="text-brand">
          Something <span>Awesome</span>
          <br />
          Is Coming Soon
        </h4>

        <p className="description">
          We are working hard behind the scenes to bring you something amazing.
          Stay tuned for our exciting launch.
        </p>

        <div className="countdown">
          <CountdownItem value={timeLeft.days} label="Days" />
          <CountdownItem value={timeLeft.hours} label="Hours" />
          <CountdownItem value={timeLeft.minutes} label="Minutes" />
          <CountdownItem value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* <div className="notify">
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
          />
          <button type="button">Notify Me</button>
        </div> */}

        {/* <p className="footer-text">
          © {new Date().getFullYear()} Your Brand. All rights reserved.
        </p> */}
      </section>
    </main>
  );
}

function CountdownItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-item">
      <div className="countdown-value">{String(value).padStart(2, "0")}</div>
      <span>{label}</span>
    </div>
  );
}
