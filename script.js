const boot = document.getElementById('boot');
const bootLines = document.getElementById('bootLines');
const bootProgress = document.getElementById('bootProgress');
const enterBtn = document.getElementById('enterBtn');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const bootSteps = [
  ['BOOT', 'INITIALIZING FIELD SECURITY NODE...'],
  ['LINK', 'ESTABLISHING LOCAL INTERFACE...'],
  ['DATA', 'LOADING OPERATOR FILE...'],
  ['OPS', 'INDEXING MISSION LOGS...'],
  ['CTF', 'MOUNTING COMPETITIVE ARCHIVE...'],
  ['CORE', 'SYSTEM READY.']
];

function finishBoot(){
  if (!boot) return;
  bootProgress.style.width = '100%';
  enterBtn.classList.remove('hidden');
}

if (boot && bootLines && bootProgress && enterBtn) {
  let i = 0;
  const tick = () => {
    if (i >= bootSteps.length) return finishBoot();
    const [tag, text] = bootSteps[i++];
    const line = document.createElement('div');
    line.innerHTML = `<span class="accent">${tag}</span> // ${text}`;
    bootLines.appendChild(line);
    bootProgress.style.width = `${Math.round(i / bootSteps.length * 100)}%`;
    if (prefersReduced) return tick();
    setTimeout(tick, 260);
  };
  tick();
  setTimeout(finishBoot, prefersReduced ? 80 : 2300);
  enterBtn.addEventListener('click', () => boot.classList.add('done'));
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && !boot.classList.contains('done')) {
      boot.classList.add('done');
    }
  });
}

// Small CRT glitch on section navigation; the effect is intentionally restrained.
document.querySelectorAll('nav.top a').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-glitch');
    void document.body.offsetWidth;
    document.body.classList.add('nav-glitch');
  });
});
