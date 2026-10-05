/* read-fit.js — load AFTER the inline script in read.html.
   - 16-line mode: every line stays on one line; ONE font size is chosen so the
     widest line fills the page, so the text is as large as the screen allows.
   - Large text mode (button "Aa"): bigger text that wraps, easiest on phones. */
(function () {
    var KEY = 'quranLargeText';
    var large = false;
    try { large = localStorage.getItem(KEY) === '1'; } catch (e) { }

    var lastW = 0;

    function fit() {
        if (typeof D === 'undefined' || !D) return;
        var root = document.getElementById('page');
        if (!root) return;
        root.classList.toggle('large', large);

        var lines = Array.prototype.slice.call(root.querySelectorAll('.ln:not(.s)'));
        if (large) {                       /* CSS handles the size; clear old inline sizes */
            lines.forEach(function (l) { l.style.cssText = ''; l.classList.remove('short'); });
            return;
        }

        var W = Math.min(root.clientWidth, document.documentElement.clientWidth);
        if (!W || !lines.length) return;
        lastW = W;

        /* measure every line at a known size */
        var M = 60;
        root.style.fontSize = M + 'px';
        lines.forEach(function (l) {
            l.style.cssText = 'display:inline-block;white-space:nowrap;height:auto;font-size:' + M + 'px';
        });
        var widths = lines.map(function (l) { return Math.max(1, l.getBoundingClientRect().width); });
        var fits = widths.map(function (w) { return M * W / w; });

        /* one size for all full lines: the widest line fills the width exactly */
        var pool = [];
        lines.forEach(function (l, i) { if (l.classList.contains('a')) pool.push(fits[i]); });
        if (!pool.length) pool = fits.slice();
        var size = Math.min.apply(null, pool) * 0.99;
        size = Math.min(size, 80);

        root.style.setProperty('--lh', (size * 2) + 'px');
        lines.forEach(function (l, i) {
            var s = size;
            l.style.cssText = '';
            if (!l.classList.contains('a')) s = Math.min(fits[i] * 0.985, size * 1.05);
            l.style.fontSize = s + 'px';
            if (l.classList.contains('a')) {
                l.classList.toggle('short', (widths[i] * s / M) / W < 0.8);  /* too short to stretch: centre */
            }
        });
        var h = root.querySelector('.ln.s');
        if (h) h.style.fontSize = '';
    }
    window.fit = fit;                    /* replaces the page's own fit() */

    /* re-fit when fonts finish loading or the screen changes */
    function refit() { fit(); }
    if (document.fonts) {
        document.fonts.ready.then(refit);
        document.fonts.addEventListener('loadingdone', refit);
    }
    setTimeout(refit, 300);
    setTimeout(refit, 1200);
    addEventListener('resize', refit);
    addEventListener('orientationchange', function () { setTimeout(refit, 200); });
    if (window.ResizeObserver) new ResizeObserver(function () {
        var w = document.getElementById('page').clientWidth;
        if (w && w !== lastW) fit();
    }).observe(document.getElementById('page'));

    /* "Aa" button: switch between 16-line mode and large text */
    var bar = document.querySelector('.bar'), sel = document.getElementById('surah');
    if (bar) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'ghost-button'; b.id = 'sizeBtn';
        function label() {
            b.textContent = large ? '16 lines' : 'Aa';
            b.title = large ? 'Show 16-line pages' : 'Larger text';
            b.setAttribute('aria-label', b.title);
        }
        label();
        b.onclick = function () {
            large = !large;
            try { localStorage.setItem(KEY, large ? '1' : '0'); } catch (e) { }
            label(); fit();
        };
        bar.insertBefore(b, sel);
    }
    refit();
})();