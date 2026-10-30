"use client";

import { useState, type CSSProperties } from "react";

/* ===========================================================================
 * EXERCICE : Animations JS avec React
 * ======================================================================== */

// ---------------------------------------------------------------------------
// méthode utilitaire vue dans le cours
// ---------------------------------------------------------------------------
const animer = async (
  elementId: string,
  keyframes: Keyframe[],
  durationMS: number,
  garderLesValeursFinales: boolean = false,
) => {
  const element = document.getElementById(elementId);

  const animation = await element?.animate(keyframes, {
    duration: durationMS,
    fill: garderLesValeursFinales ? "forwards" : "none",
  });
  await animation?.finished;
};

// ---------------------------------------------------------------------------
// durées des animations (en millisecondes)
// ---------------------------------------------------------------------------
const SPAWN_DURATION_MS = 500;
const DEATH_DURATION_MS = 500;

const PREATTACK_DURATION_MS = 500;
const ATTACK_DURATION_MS = 300;

const BOUNCE_DURATION_MS = 1000;
const SHAKE_DURATION_MS = 750;
const FLIP_DURATION_MS = 750;

const ROTATE_DURATION_MS = 800;

// ---------------------------------------------------------------------------
// keyframes complexes, pas besoin de les modifier!
// ---------------------------------------------------------------------------
const SHAKE_X: Keyframe[] = [
  { transform: "translateX(0)" },
  { transform: "translateX(-10px)", offset: 0.1 },
  { transform: "translateX(10px)", offset: 0.2 },
  { transform: "translateX(-10px)", offset: 0.3 },
  { transform: "translateX(10px)", offset: 0.4 },
  { transform: "translateX(-10px)", offset: 0.5 },
  { transform: "translateX(10px)", offset: 0.6 },
  { transform: "translateX(-10px)", offset: 0.7 },
  { transform: "translateX(10px)", offset: 0.8 },
  { transform: "translateX(-10px)", offset: 0.9 },
  { transform: "translateX(0)" },
];

const JELLO: Keyframe[] = [
  { transform: "none" },
  { transform: "none", offset: 0.111 },
  { transform: "skew(-12.5deg, -12.5deg)", offset: 0.222 },
  { transform: "skew(6.25deg, 6.25deg)", offset: 0.333 },
  { transform: "skew(-3.125deg, -3.125deg)", offset: 0.444 },
  { transform: "skew(1.5625deg, 1.5625deg)", offset: 0.555 },
  { transform: "skew(-0.78125deg, -0.78125deg)", offset: 0.666 },
  { transform: "skew(0.390625deg, 0.390625deg)", offset: 0.777 },
  { transform: "skew(-0.1953125deg, -0.1953125deg)", offset: 0.888 },
  { transform: "none" },
];

const BOUNCE: Keyframe[] = [
  { transform: "translateY(0)" },
  { transform: "translateY(0)", offset: 0.2 },
  { transform: "translateY(-30px)", offset: 0.4 },
  { transform: "translateY(0)", offset: 0.5 },
  { transform: "translateY(-15px)", offset: 0.6 },
  { transform: "translateY(0)", offset: 0.8 },
  { transform: "translateY(0)" },
];

const FLIP: Keyframe[] = [
  { transform: "rotateY(-360deg)" },
  { transform: "translateZ(150px) rotateY(-190deg)", offset: 0.4 },
  { transform: "translateZ(150px) rotateY(-170deg)", offset: 0.5 },
  { transform: "scale(0.95) rotateY(0deg)", offset: 0.8 },
  { transform: "scale(1) rotateY(0deg)" },
];

// ---------------------------------------------------------------------------
// keyframes simples à écrire
// ---------------------------------------------------------------------------

const FADE_IN: Keyframe[] = [
  { opacity: 0 },
  { opacity: 1 },
];

const FADE_OUT: Keyframe[] = [
  { opacity: 1 },
  ...SHAKE_X,
  { opacity: 0 },
];

const PULSE: Keyframe[] = [
  { scale: 1, offset: 0 },
  { scale: 4.5, offset: 0.1 },
  { scale: 1, offset: 1 },
];

// TODO: ROTATE_CENTER : une rotation complète autour du centre
const ROTATE_CENTER: Keyframe[] = [
  { transform: "rotate(360deg)" }
];

// TODO: ROTATE_HOR : une rotation complète sur l'axe horizontal
const ROTATE_HOR: Keyframe[] = [
  { transform: "rotateX(0deg)" }, 
  { transform: "rotateX(360deg)" }
];

// FIN keyframes

export default function Home() {
  const [slimeIsPresent, setSlimeIsPresent] = useState(false);

  const spawn = () => {
    setSlimeIsPresent(true);
    animer("slimeyId", FADE_IN, SPAWN_DURATION_MS, true);
  };

  const death = () => {
    setSlimeIsPresent(false);
    animer("slimeyId", FADE_OUT, SHAKE_DURATION_MS, true);
  };

  const attack = async () => {
    await animer("slimeyId", JELLO, PREATTACK_DURATION_MS, false);
    animer("slimeyId", PULSE, ATTACK_DURATION_MS, true);
  };

  const bounceShakeFlip = async () => {
    await animer("slimeyId", BOUNCE, BOUNCE_DURATION_MS, true);
    await animer("slimeyId", SHAKE_X, SHAKE_DURATION_MS, true);
    animer("slimeyId", FLIP, FLIP_DURATION_MS, true);
  };

  const infiniteTripleSpin = async () => {
    // Boucle infinie non bloquante grâce aux await
    while (true) {
      await animer("slimeyId", ROTATE_CENTER, ROTATE_DURATION_MS, false);
      await animer("slimeyId", ROTATE_CENTER, ROTATE_DURATION_MS, false);
      await animer("slimeyId", ROTATE_HOR, ROTATE_DURATION_MS, false);
    }
  };

  const infiniteTripleSpinBonus = async () => {
    // BONUS : Combinaison des 3 rotations en une seule animation bouclée nativement
    const TRIPLE_SPIN_BONUS: Keyframe[] = [
      { transform: "rotate(0deg) rotateX(0deg)", offset: 0 },
      { transform: "rotate(360deg) rotateX(0deg)", offset: 0.3333 },
      { transform: "rotate(720deg) rotateX(0deg)", offset: 0.6666 },
      { transform: "rotate(720deg) rotateX(360deg)", offset: 1 },
    ];

    const element = document.getElementById("slimeyId");
    element?.animate(TRIPLE_SPIN_BONUS, {
      duration: ROTATE_DURATION_MS * 3, // 3 fois la durée d'une rotation simple
      iterations: Infinity, // Option de boucle infinie native
    });
  };

  // -------------------------------------------------------------------------
  // Affichage, Il n'y a rien à modifier dans le reste du fichier!
  // -------------------------------------------------------------------------
  const buttonStyle: CSSProperties = {
    margin: "0 8px 8px 0",
    padding: "8px 16px",
    borderRadius: 4,
    border: "none",
    background: "#ff4081",
    color: "white",
    cursor: "pointer",
    fontWeight: 500,
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <img
          width={800}
          style={{ position: "relative", display: "block" }}
          src="/background.png"
          alt="Fond"
        />
        <div
          style={{
            width: "fit-content",
            position: "absolute",
            top: 250,
            left: 300,
          }}
        >
          <img
            id="slimeyId"
            width={200}
            src="/slimeyWithBorder.png"
            alt="Slimey"
            style={{ opacity: 0, display: "block" }}
          />
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {!slimeIsPresent && (
          <button style={buttonStyle} onClick={spawn}>
            Spawn
          </button>
        )}
        {slimeIsPresent && (
          <>
            <button style={buttonStyle} onClick={death}>
              Death
            </button>
            <button style={buttonStyle} onClick={attack}>
              Attack
            </button>
            <button style={buttonStyle} onClick={bounceShakeFlip}>
              Bounce/Shake/Flip
            </button>
            <button style={buttonStyle} onClick={infiniteTripleSpin}>
              Infinite Triple Spin
            </button>
            <button style={buttonStyle} onClick={infiniteTripleSpinBonus}>
              Infinite Triple Spin Bonus
            </button>
          </>
        )}
      </div>
    </div>
  );
}