import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function heroEntrance() {
  const heading = document.querySelector("#hero h1");
  if (!heading) return;

  const split = new SplitText(heading, { type: "words" });
  gsap.from(split.words, {
    opacity: 0,
    y: 24,
    duration: 0.8,
    stagger: 0.06,
    ease: "power2.out",
  });
}

// Sección "el problema": se ancla en pantalla y cada dolor aparece en
// secuencia a medida que se hace scroll (ver design.md, Decisión 2).
function problemSection(isMobile) {
  const section = document.querySelector("#problema");
  const cards = gsap.utils.toArray(".problem-card");
  if (!section || cards.length === 0) return;

  gsap.set(cards, { opacity: 0, y: 24 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: isMobile ? "+=60%" : "+=100%",
      scrub: 1,
      pin: true,
    },
  });

  cards.forEach((card, i) => {
    tl.to(card, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, i);
  });
}

// "El giro": la representación de la UI rígida se disuelve y da paso al chat.
function turnSection(isMobile) {
  const section = document.querySelector("#giro");
  const oldEl = section?.querySelector(".turn-old");
  const newEl = section?.querySelector(".turn-new");
  if (!section || !oldEl || !newEl) return;

  gsap.set(newEl, { opacity: 0, y: 16 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: isMobile ? "+=40%" : "+=60%",
        scrub: 1,
        pin: true,
      },
    })
    .to(oldEl, { opacity: 0, y: -16, duration: 0.5 })
    .to(newEl, { opacity: 1, y: 0, duration: 0.5 }, "<");
}

// Demo chat -> dato estructurado: la escena que más define la identidad.
function demoSection(isMobile) {
  const section = document.querySelector("#demo");
  const chat = section?.querySelector(".demo-chat");
  const arrows = section ? gsap.utils.toArray(".demo-arrow", section) : [];
  const card = section?.querySelector(".demo-card");
  const rows = card ? gsap.utils.toArray(".demo-row", card) : [];
  if (!section || !chat || !card) return;

  gsap.set([chat, ...arrows, card], { opacity: 0, y: 20 });
  gsap.set(rows, { opacity: 0 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: isMobile ? "+=90%" : "+=140%",
        scrub: 1,
        pin: true,
      },
    })
    .to(chat, { opacity: 1, y: 0, duration: 0.4 })
    .to(arrows, { opacity: 1, y: 0, duration: 0.3 })
    .to(card, { opacity: 1, y: 0, duration: 0.4 })
    .to(rows, { opacity: 1, stagger: 0.15, duration: 0.3 });
}

// Reveals simples (fade + translate) para las secciones informativas
// (capacidades, fuente de la verdad, roadmap) - sin pin, mismo
// vocabulario de easing/duración que el resto del sitio.
function simpleReveal(sectionSelector, itemSelector) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const items = gsap.utils.toArray(itemSelector, section);
  if (items.length === 0) return;

  gsap.from(items, {
    opacity: 0,
    y: 24,
    duration: 0.6,
    stagger: 0.12,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
    },
  });
}

function setupAnimations(isMobile) {
  heroEntrance();
  problemSection(isMobile);
  turnSection(isMobile);
  demoSection(isMobile);
  simpleReveal("#capacidades", ".capability-card");
  simpleReveal("#fuente-de-la-verdad", ".channel-card, .truth-card");
  simpleReveal("#roadmap", ".roadmap-item");
}

// prefers-reduced-motion desactiva todo pin/scrub (ver spec
// landing-plusnexo, Requirement: "Narrativa de storytelling en una sola
// página" - Scenario: "Reducción de movimiento respetada"). El contenido
// ya es completamente visible en el HTML estático sin JS; esta función
// solo se ejecuta cuando el visitante no pidió menos movimiento.
ScrollTrigger.matchMedia({
  "(prefers-reduced-motion: no-preference) and (min-width: 768px)": () =>
    setupAnimations(false),
  "(prefers-reduced-motion: no-preference) and (max-width: 767px)": () =>
    setupAnimations(true),
});
