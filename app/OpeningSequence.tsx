"use client";

import { useEffect, useState } from "react";
import styles from "./OpeningSequence.module.css";

export default function OpeningSequence() {
  const [visible, setVisible] = useState(true);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 9600);
    return () => window.clearTimeout(timer);
  }, [run]);

  const replay = () => {
    setVisible(false);
    window.requestAnimationFrame(() => {
      setRun((value) => value + 1);
      setVisible(true);
    });
  };

  if (!visible) {
    return (
      <button className={styles.replay} type="button" onClick={replay}>
        REPLAY INTRO
      </button>
    );
  }

  return (
    <section
      key={run}
      className={styles.overlay}
      aria-label="Animated Slice, Dice and Percy opening sequence"
    >
      <button className={styles.skip} type="button" onClick={() => setVisible(false)}>
        SKIP
      </button>

      <img
        className={styles.cover}
        src="/assets/reference/comic-cover.webp"
        alt=""
        aria-hidden="true"
      />
      <div className={styles.ink} />

      <div className={styles.ocean} aria-hidden="true">
        <img className={`${styles.dolphin} ${styles.d1}`} src="/assets/events/dolphin-swim.png" alt="" />
        <img className={`${styles.dolphin} ${styles.d2}`} src="/assets/events/dolphin-swim.png" alt="" />
        <img className={`${styles.dolphin} ${styles.d3}`} src="/assets/events/dolphin-rise.png" alt="" />
        <img className={`${styles.dolphin} ${styles.d4}`} src="/assets/events/dolphin-swim.png" alt="" />
        <img className={styles.jump} src="/assets/events/dolphin-jump.png" alt="" />
      </div>

      <div className={styles.flash} />
      <div className={styles.fullBody}>FULL BODY!</div>
      <div className={styles.thinkFast}>THINK FAST!</div>
      <div className={styles.title}>
        <small>The Adventures of</small>
        Slice and Dice
        <em>...and Percy!</em>
      </div>
    </section>
  );
}
