/**
 * Cinematic Descent — scroll-driven domain-world engine.
 *
 * Desktop + motion-OK: pins a single viewport stage and cross-fades six
 * stacked layers as the user scrolls, scrubbing each world clip's
 * currentTime to the scroll position (the "locomotive" sequence pattern).
 *
 * No-GSAP: falls back to plain stacked sections with muted autoplay loops —
 * the narrative and CTA work fully without the scrub engine (progressive
 * enhancement, per spec section 7). Desktop and mobile both run the scrub.
 */
(function () {
    const descent = document.querySelector('.descent');
    if (!descent) return;

    const layers = Array.from(descent.querySelectorAll('.layer'));
    const videos = layers.map(l => l.querySelector('.layer-video'));
    const N = layers.length;
    const lobbyIdx = N - 1;

    const nav = document.querySelector('.nav');
    const rail = document.querySelector('.descent-rail');
    const railFill = rail && rail.querySelector('.rail-fill');
    const ticks = rail ? Array.from(rail.querySelectorAll('.rail-tick')) : [];

    const small = window.matchMedia('(max-width: 768px)').matches;
    const hasGSAP = !!(window.gsap && window.ScrollTrigger);
    // The scrub engine runs on every device that can run it — desktop and
    // mobile alike. The only thing that forces the static fallback is GSAP not
    // being present. (We intentionally do not gate on reduced-motion: the
    // fallback is autoplaying video either way, so it would not give a
    // motion-sensitive visitor a calmer page — just a different motion.)
    const cinematic = hasGSAP;

    // ---- nav dark/light helper (used by both modes) ----
    function setNavDark(on) {
        if (nav) nav.classList.toggle('nav--dark', !!on);
    }

    // ---- in-world case panels (work in both cinematic and fallback modes) ----
    // Opening a panel locks the scroll so the descent freezes on the current
    // floor's frame; the panel rises over it as a dark glass overlay. Close
    // restores scroll exactly where it was.
    (function casePanels() {
        let openPanel = null;

        function lock() {
            document.documentElement.classList.add('case-locked');
            document.body.style.overflow = 'hidden';
        }
        function unlock() {
            document.documentElement.classList.remove('case-locked');
            document.body.style.overflow = '';
        }
        function open(id) {
            const panel = document.getElementById('case-' + id);
            if (!panel || panel === openPanel) return;
            lock();
            panel.classList.add('is-open');
            openPanel = panel;
            const closeBtn = panel.querySelector('.case-close');
            if (closeBtn) closeBtn.focus();
        }
        function close() {
            if (!openPanel) return;
            openPanel.classList.remove('is-open');
            openPanel = null;
            unlock();
        }

        document.querySelectorAll('.case-open').forEach(btn =>
            btn.addEventListener('click', () => open(btn.dataset.case)));
        document.querySelectorAll('[data-case-close]').forEach(el =>
            el.addEventListener('click', close));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') close();
        });
    })();

    // ---------------------------------------------------------------
    // Fallback: stacked sections, autoplay loops, nav darkens over descent
    // ---------------------------------------------------------------
    if (!cinematic) {
        videos.forEach(v => {
            if (!v) return;
            v.muted = true;
            v.loop = true;
            v.setAttribute('playsinline', '');
            v.setAttribute('autoplay', '');
            const play = () => v.play().catch(() => {});
            if (v.readyState >= 2) play(); else v.addEventListener('canplay', play, { once: true });
        });

        const firstLight = layers[N - 2]; // the capstone (first light beat)
        function navCheck() {
            const navH = nav ? nav.offsetHeight : 64;
            const dr = descent.getBoundingClientRect();
            const lr = firstLight.getBoundingClientRect();
            // dark while the dark world beats sit under the nav, before the
            // light capstone/invitation reaches it
            setNavDark(dr.top <= navH && lr.top > navH);
        }
        window.addEventListener('scroll', navCheck, { passive: true });
        window.addEventListener('resize', navCheck);
        navCheck();
        return;
    }

    // ---------------------------------------------------------------
    // Cinematic engine
    // ---------------------------------------------------------------
    gsap.registerPlugin(ScrollTrigger);
    // On phones the URL bar shows/hides as you scroll, which changes the visual
    // viewport height and would otherwise fire a refresh mid-descent — snapping
    // the scrub to a recomputed position. ignoreMobileResize tells ScrollTrigger
    // to skip those address-bar resizes so the descent stays smooth.
    if (small) ScrollTrigger.config({ ignoreMobileResize: true });
    descent.classList.add('is-cinematic');
    document.body.classList.add('descent-active');

    // In cinematic mode the layers are absolutely positioned, so the descent
    // container has no intrinsic height. Give it scroll room per beat — that is
    // the distance the sticky stage scrubs each clip's camera move through.
    // Larger = slower, more deliberate descent.
    //
    // Per-beat WEIGHTS let some beats dwell longer. The REPOSITION capstone and
    // the final CTA get extra scroll so the reader has time to absorb them.
    const PER_BEAT_VH = 175;
    const WEIGHTS = layers.map((l, i) => {
        if (l.classList.contains('layer--capstone')) return 2.4;
        if (l.classList.contains('layer--lobby')) return 1.5;
        return 1;
    });
    const TOTAL_W = WEIGHTS.reduce((a, b) => a + b, 0);
    const CUM = []; // cumulative weight at the start of each beat
    WEIGHTS.reduce((acc, w, i) => { CUM[i] = acc; return acc + w; }, 0);
    descent.style.height = Math.round(TOTAL_W * PER_BEAT_VH) + 'vh';

    videos.forEach(v => {
        if (!v) return;
        v.muted = true;
        v.loop = false;
        v.autoplay = false;
        v.preload = 'auto';
        v.setAttribute('playsinline', '');
        // Prime the decoder: a paused video that has never played won't paint a
        // frame when we seek it. A brief muted play()/pause() activates it.
        v.addEventListener('loadeddata', () => {
            v.play().then(() => { v.pause(); v.currentTime = 0; }).catch(() => {});
            ScrollTrigger.refresh();
        }, { once: true });
        v.load();
    });

    // Map each active video's currentTime DIRECTLY to its scroll target. The
    // clips are all-intra (every frame seekable), so a direct seek lands an
    // exact frame — no easing needed, and the full clip duration spans the full
    // floor of scroll. A rAF loop applies the latest target once per frame so
    // rapid scroll events don't stack seeks. Threshold ~half a frame at 24fps.
    const targetT = new Map();
    function rafLoop() {
        targetT.forEach((t, v) => {
            if (v.readyState >= 1 && isFinite(v.duration) && v.duration > 0) {
                if (Math.abs(v.currentTime - t) > 1 / 48) v.currentTime = t;
            }
        });
        requestAnimationFrame(rafLoop);
    }
    requestAnimationFrame(rafLoop);

    const FADE = 0.82;     // each beat starts cross-fading to the next at 82%
    let activeIdx = -1;

    // The capstone beat carries the resolve clip: it dissolves to off-white
    // while this REPOSITION content fades in on top of it. (N-2 = capstone,
    // N-1 = the final invitation.)
    const capstoneIdx = N - 2;
    const capstoneInner = descent.querySelector('.layer--capstone .capstone-inner');
    function smooth(x, a, b) {
        const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
        return t * t * (3 - 2 * t);
    }

    function render(p) {
        // Map scroll progress through the weighted beats: find which beat the
        // weighted position lands in, and the local 0..1 fraction within it.
        const wp = Math.min(Math.max(p, 0), 1) * TOTAL_W;
        let idx = N - 1;
        for (let i = 0; i < N; i++) {
            if (wp < CUM[i] + WEIGHTS[i] || i === N - 1) { idx = i; break; }
        }
        const frac = Math.min((wp - CUM[idx]) / WEIGHTS[idx], 1 - 1e-4);

        for (let i = 0; i < N; i++) {
            let o = 0;
            if (i === idx) {
                o = (frac > FADE && idx < N - 1) ? 1 - (frac - FADE) / (1 - FADE) : 1;
            } else if (i === idx + 1 && frac > FADE) {
                o = (frac - FADE) / (1 - FADE);
            }
            layers[i].style.opacity = o.toFixed(3);
            // Only the visible layer(s) take clicks — otherwise the topmost
            // (last-in-DOM) transparent layer swallows the buttons beneath it.
            layers[i].style.pointerEvents = o > 0.02 ? 'auto' : 'none';
        }

        // scrub current clip (and the incoming one during a cross-fade)
        for (const i of [idx, idx + 1]) {
            const v = videos[i];
            if (!v || !isFinite(v.duration) || v.duration <= 0) continue;
            const lf = i === idx ? frac : 0;
            targetT.set(v, lf * v.duration);
        }

        // Fade the REPOSITION capstone in over the second half of its beat,
        // once the clip has resolved toward light. Hold it visible while it
        // cross-fades out into the invitation (idx past the capstone).
        if (capstoneInner) {
            // Fade in early (by ~halfway) so REPOSITION holds fully visible
            // through the long middle of the beat before the CTA cross-fade.
            const co = idx < capstoneIdx ? 0 : (idx === capstoneIdx ? smooth(frac, 0.18, 0.46) : 1);
            capstoneInner.style.opacity = co.toFixed(3);
        }

        if (railFill) railFill.style.transform = `scaleY(${Math.max(p, 0).toFixed(3)})`;
        if (idx !== activeIdx) {
            activeIdx = idx;
            ticks.forEach((t, i) => t.classList.toggle('is-active', i === idx));
        }

        // Dark/transparent nav over every dark beat (including the resolve clip's
        // dark first half); the default light nav bar once the capstone has
        // resolved to light, and through the invitation.
        setNavDark(!((idx === capstoneIdx && frac > 0.5) || idx === N - 1));
    }

    // Drive the descent through a GSAP scrub tween rather than seeking on raw
    // scroll. scrub adds time-based smoothing — the playhead eases toward the
    // scroll position over ~0.6s — which dissolves mouse-wheel granularity into
    // continuous camera motion while staying responsive.
    const driver = { p: 0 };
    gsap.to(driver, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: descent,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true
        },
        onUpdate: () => render(driver.p)
    });

    render(0);
})();
