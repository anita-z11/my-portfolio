/* ============================================================
   TAB SWITCHING
   ============================================================ */
function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      // Update buttons
      buttons.forEach(b => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');

      // Update panels
      panels.forEach(p => {
        if (p.id === target) {
          p.setAttribute('aria-hidden', 'false');
        } else {
          p.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });
}

/* ============================================================
   RANDOM GALLERY PHOTO
   ============================================================ */
async function loadGallery(jsonPath, imgId, captionId) {
  try {
    const res = await fetch(jsonPath);
    const photos = await res.json();
    const pick = photos[Math.floor(Math.random() * photos.length)];

    const imgEl = document.getElementById(imgId);
    const capEl = document.getElementById(captionId);

    imgEl.src = pick.src;
    imgEl.alt = pick.caption;
    capEl.textContent = pick.caption;

    // Fade in
    imgEl.style.opacity = '0';
    imgEl.onload = () => {
      imgEl.style.opacity = '1';
    };
  } catch (err) {
    console.error('Gallery load error:', err);
  }
}

/* ============================================================
   DARK MODE TOGGLE
   ============================================================ */
function initThemeToggle() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateToggleIcon(toggle, theme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      updateToggleIcon(toggle, theme);
    });
  }
}

function updateToggleIcon(toggle, theme) {
  if (!toggle) return;
  if (theme === 'dark') {
    toggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  } else {
    toggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initThemeToggle();
  loadGallery('./data/tab1-gallery.json', 'gallery-img-1', 'gallery-cap-1');
  loadGallery('./data/tab2-gallery.json', 'gallery-img-2', 'gallery-cap-2');
});
