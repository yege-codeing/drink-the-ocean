const stage = document.querySelector('#player');
if (stage) {
  const launch = document.querySelector('#launch');
  const status = document.querySelector('#player-status');
  const slot = document.querySelector('#frame-slot');
  let timer;
  function start() {
    clearTimeout(timer);
    const frame = document.createElement('iframe');
    frame.src = stage.dataset.embed;
    frame.title = 'Drink the Ocean by Pinidi Studio — Playgama player';
    frame.allow = 'autoplay; fullscreen; gamepad';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    slot.replaceChildren(frame);
    stage.classList.add('playing');
    document.querySelector('#reload').disabled = false;
    status.textContent = 'Opening Playgama… Select Let’s Play in the player if prompted.';
    frame.addEventListener('load', () => {
      clearTimeout(timer);
      status.textContent = 'Player frame opened. If the game stays blank, try Reload or open Playgama.';
      frame.focus();
    });
    timer = setTimeout(() => {
      status.textContent = 'Still waiting? The game may need more time. Try Reload or open it on Playgama.';
    }, 25000);
  }
  launch.addEventListener('click', start);
  document.querySelector('#reload').addEventListener('click', () => {
    if (confirm('Reload the game? Unsaved progress may be lost.')) start();
  });
  document.querySelector('#theater').addEventListener('click', event => {
    const active = stage.classList.toggle('theater');
    event.currentTarget.setAttribute('aria-pressed', String(active));
    event.currentTarget.textContent = active ? 'Exit theater' : 'Theater mode';
    if (active) stage.scrollIntoView({behavior:'smooth', block:'start'});
  });
  document.querySelector('#fullscreen').addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (stage.requestFullscreen) await stage.requestFullscreen();
      else throw new Error('unavailable');
    } catch { status.textContent = 'Fullscreen is unavailable in this browser. Try theater mode or rotate your phone.'; }
  });
  document.addEventListener('keydown', event => {
    if(event.key === 'Escape') {
      stage.classList.remove('theater');
      document.querySelector('#theater').setAttribute('aria-pressed','false');
      document.querySelector('#theater').textContent='Theater mode';
    }
  });
}
