/* ==========================================================================
   app.js — tanpa dependensi, tanpa build. Bisa dibuka langsung dari index.html.
   ========================================================================== */
(function () {
  'use strict';

  var S = window.SITE;
  var UI = window.UI_STRINGS;

  /* ---------- Util ---------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* abaikan */ } }
  };

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function icon(name, size) {
    size = size || 20;
    return '<svg class="i" width="' + size + '" height="' + size + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  /* ---------- State ---------- */
  var savedLang = store.get('lang');
  var state = {
    lang: (savedLang === 'id' || savedLang === 'en') ? savedLang :
          (String(navigator.language || 'id').toLowerCase().indexOf('id') === 0 ? 'id' : 'en'),
    page: 'about',
    pf: { cat: 'all', q: '' },
    bl: { cat: 'all', q: '' },
    counted: false
  };

  var PAGES = ['about', 'resume', 'portfolio', 'blog', 'contact'];
  var ACCENTS = ['iris', 'mint', 'amber', 'rose'];

  /* Ambil teks dua bahasa: { id, en } atau string biasa */
  function tr(v) {
    if (v && typeof v === 'object' && !Array.isArray(v)) return v[state.lang] != null ? v[state.lang] : v.id;
    return v;
  }
  /* Ambil teks UI dari kamus, contoh: ui('nav.about') */
  function ui(path) {
    function dig(lang) {
      return path.split('.').reduce(function (o, k) { return o && o[k] != null ? o[k] : null; }, UI[lang]);
    }
    var v = dig(state.lang);
    return v != null ? v : dig('id');
  }

  function locale() { return state.lang === 'id' ? 'id-ID' : 'en-US'; }
  function fmtDate(iso, opts) {
    var d = new Date(iso + 'T00:00:00');
    try { return new Intl.DateTimeFormat(locale(), opts).format(d); } catch (e) { return iso; }
  }

  /* ---------- Teks statis (data-i18n) ---------- */
  function applyStatic() {
    document.documentElement.lang = state.lang;
    $$('[data-i18n]').forEach(function (el) { el.textContent = ui(el.getAttribute('data-i18n')); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', ui(el.getAttribute('data-i18n-aria'))); });
    $$('[data-i18n-placeholder]').forEach(function (el) { el.setAttribute('placeholder', ui(el.getAttribute('data-i18n-placeholder'))); });

    document.title = tr(S.seo.title);
    var meta = $('meta[name="description"]');
    if (meta) meta.setAttribute('content', tr(S.seo.description));
    var og = $('meta[property="og:title"]');
    if (og) og.setAttribute('content', tr(S.seo.title));

    // Tombol sidebar mobile
    var sb = $('#sidebar');
    $('#sidebar-toggle-label').textContent = ui(sb.classList.contains('is-open') ? 'sidebar.hide' : 'sidebar.show');

    updateTools();
  }

  /* ---------- Sidebar ---------- */
  function renderSidebar() {
    var p = S.profile;
    $('#s-name').textContent = p.name;
    $('#s-avatar').src = p.avatar;
    $('#s-status').textContent = tr(p.status);
    $('#s-roles-sr').textContent = (p.roles[state.lang] || p.roles.id).join(', ');

    var items = [
      { ic: 'mail',     label: ui('sidebar.email'),    val: p.email, href: 'mailto:' + p.email },
      { ic: 'phone',    label: ui('sidebar.phone'),    val: p.phone, href: 'tel:' + p.phone.replace(/[^+\d]/g, '') },
      { ic: 'calendar', label: ui('sidebar.birthday'), val: fmtDate(p.birthday, { day: 'numeric', month: 'long', year: 'numeric' }) },
      { ic: 'map-pin',  label: ui('sidebar.location'), val: tr(p.location) }
    ];
    $('#s-contacts').innerHTML = items.map(function (it) {
      var v = it.href
        ? '<a class="contacts__value" href="' + esc(it.href) + '">' + esc(it.val) + '</a>'
        : '<span class="contacts__value">' + esc(it.val) + '</span>';
      return '<li><span class="contacts__icon">' + icon(it.ic, 18) + '</span>' +
             '<span class="contacts__text"><span class="contacts__label">' + esc(it.label) + '</span>' + v + '</span></li>';
    }).join('');

    $('#s-socials').innerHTML = p.social.map(function (s) {
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(s.label) + '" title="' + esc(s.label) + '">' + icon(s.icon, 18) + '</a></li>';
    }).join('');
  }

  /* Efek mengetik pada peran */
  var typer = { t: null };
  function startTyping() {
    clearTimeout(typer.t);
    var el = $('#typed');
    var roles = S.profile.roles[state.lang] || S.profile.roles.id;
    if (reduced) { el.textContent = roles[0]; return; }
    var ri = 0, ci = 0, del = false;
    (function tick() {
      var word = roles[ri];
      el.textContent = word.slice(0, ci);
      var delay = del ? 32 : 68;
      if (!del && ci === word.length) { del = true; delay = 1700; }
      else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; delay = 380; }
      ci += del ? -1 : 1;
      typer.t = setTimeout(tick, delay);
    })();
  }

  /* ---------- About ---------- */
  function renderAbout() {
    $('#about-text').innerHTML = S.about.paragraphs.map(function (p) { return '<p>' + esc(tr(p)) + '</p>'; }).join('');

    $('#about-stats').innerHTML = S.about.stats.map(function (s) {
      var shown = state.counted || reduced ? s.value : 0;
      return '<li><div class="stats__value"><span data-count="' + s.value + '">' + shown + '</span>' + esc(s.suffix) + '</div>' +
             '<div class="stats__label">' + esc(tr(s.label)) + '</div></li>';
    }).join('');

    $('#about-services').innerHTML = S.services.map(function (s) {
      return '<li><span class="services__icon">' + icon(s.icon, 22) + '</span><div><h4>' + esc(tr(s.title)) + '</h4><p>' + esc(tr(s.text)) + '</p></div></li>';
    }).join('');

    $('#about-testi').innerHTML = S.testimonials.map(function (t, i) {
      return '<li><button type="button" class="tcard" data-testi="' + i + '">' +
        '<span class="tcard__who"><span class="tcard__avatar" aria-hidden="true">' + esc(t.initials) + '</span>' +
        '<span><span class="tcard__name">' + esc(t.name) + '</span><span class="tcard__role">' + esc(tr(t.role)) + '</span></span></span>' +
        '<span class="tcard__text">' + esc(tr(t.text)) + '</span></button></li>';
    }).join('');

    $('#about-stack').innerHTML = S.stack.map(function (s) { return '<li class="chip">' + esc(s) + '</li>'; }).join('');
  }

  function runCounters() {
    if (state.counted) return;
    state.counted = true;
    $$('[data-count]').forEach(function (el) {
      var target = Number(el.getAttribute('data-count'));
      if (reduced) { el.textContent = target; return; }
      var start = null, dur = 1200;
      function frame(now) {
        if (start === null) start = now;
        var p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }

  /* ---------- Resume ---------- */
  function renderResume() {
    function tl(list) {
      return list.map(function (x) {
        return '<li><span class="timeline__period">' + esc(tr(x.period)) + '</span>' +
               '<h4>' + esc(tr(x.title)) + '</h4><p class="timeline__org">' + esc(tr(x.org)) + '</p>' +
               '<p class="timeline__text">' + esc(tr(x.text)) + '</p></li>';
      }).join('');
    }
    $('#r-exp').innerHTML = tl(S.experience);
    $('#r-edu').innerHTML = tl(S.education);
    $('#r-skills').innerHTML = S.skills.map(function (s) {
      return '<li><div class="skill__row"><span>' + esc(s.name) + '</span><span class="skill__pct">' + s.level + '%</span></div>' +
             '<div class="skill__track" role="progressbar" aria-label="' + esc(s.name) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + s.level + '">' +
             '<span class="skill__fill" style="--lvl:' + (s.level / 100) + '"></span></div></li>';
    }).join('');
  }

  /* ---------- Chip filter (dipakai Portofolio & Blog) ---------- */
  function renderChips(container, cats, labelPrefix, current, onPick) {
    container.innerHTML = cats.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c + '" aria-pressed="' + (c === current) + '">' + esc(ui(labelPrefix + '.' + c)) + '</button>';
    }).join('');
    $$('.chip', container).forEach(function (b) {
      b.addEventListener('click', function () { onPick(b.getAttribute('data-cat')); });
    });
  }

  /* ---------- Portofolio ---------- */
  var PCATS = ['all', 'web', 'mobile', 'design', 'api'];

  function renderPortfolioChips() {
    renderChips($('#p-chips'), PCATS, 'portfolio', state.pf.cat, function (c) {
      state.pf.cat = c; renderPortfolioChips(); renderPortfolioGrid();
    });
  }

  function renderPortfolioGrid() {
    var q = state.pf.q.trim().toLowerCase();
    var list = S.projects.filter(function (p) {
      if (state.pf.cat !== 'all' && p.category !== state.pf.cat) return false;
      if (!q) return true;
      var hay = [tr(p.title), tr(p.summary), ui('portfolio.' + p.category), p.tech.join(' ')].join(' ').toLowerCase();
      return hay.indexOf(q) > -1;
    });
    $('#p-grid').innerHTML = list.map(function (p) {
      return '<li><button type="button" class="pcard" data-project="' + esc(p.id) + '">' +
        '<span class="pcard__img"><img src="' + esc(p.cover) + '" alt="" loading="lazy" width="800" height="500"></span>' +
        '<span class="pcard__body"><span class="pcard__title">' + esc(tr(p.title)) + '</span>' +
        '<span class="pcard__meta"><span class="tag">' + esc(ui('portfolio.' + p.category)) + '</span><span>' + esc(tr(p.summary)) + '</span></span></span>' +
        '</button></li>';
    }).join('');
    var empty = $('#p-empty');
    empty.textContent = ui('portfolio.empty');
    empty.hidden = list.length > 0;
  }

  function openProject(id, trigger) {
    var p = S.projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var links = '';
    if (p.links && p.links.demo) links += '<a class="btn" href="' + esc(p.links.demo) + '" target="_blank" rel="noopener">' + icon('external', 18) + '<span>' + esc(ui('portfolio.demo')) + '</span></a>';
    if (p.links && p.links.repo) links += '<a class="btn btn--ghost" href="' + esc(p.links.repo) + '" target="_blank" rel="noopener">' + icon('github', 18) + '<span>' + esc(ui('portfolio.repo')) + '</span></a>';
    openModal(
      '<div class="mbody mbody--split">' +
        '<div class="mbody__img"><img src="' + esc(p.cover) + '" alt=""></div>' +
        '<div class="mbody__text">' +
          '<h2 id="m-title">' + esc(tr(p.title)) + '</h2>' +
          '<div class="mbody__meta"><span class="tag">' + esc(ui('portfolio.' + p.category)) + '</span><span>' + esc(ui('portfolio.year')) + ' ' + p.year + '</span></div>' +
          '<div class="prose"><p>' + esc(tr(p.description)) + '</p></div>' +
          '<h3>' + esc(ui('portfolio.tech')) + '</h3>' +
          '<ul class="chips chips--static">' + p.tech.map(function (t) { return '<li class="chip">' + esc(t) + '</li>'; }).join('') + '</ul>' +
          (links ? '<div class="mbody__actions">' + links + '</div>' : '') +
        '</div>' +
      '</div>', trigger);
  }

  /* ---------- Blog ---------- */
  var BCATS = ['all', 'frontend', 'backend', 'career'];

  function renderBlogChips() {
    renderChips($('#b-chips'), BCATS, 'blog', state.bl.cat, function (c) {
      state.bl.cat = c; renderBlogChips(); renderBlogList();
    });
  }

  function renderBlogList() {
    var q = state.bl.q.trim().toLowerCase();
    var posts = S.posts.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    var list = posts.filter(function (p) {
      if (state.bl.cat !== 'all' && p.category !== state.bl.cat) return false;
      if (!q) return true;
      return [tr(p.title), tr(p.excerpt), ui('blog.' + p.category)].join(' ').toLowerCase().indexOf(q) > -1;
    });
    $('#b-list').innerHTML = list.map(function (p) {
      return '<li><button type="button" class="post" data-post="' + esc(p.id) + '">' +
        '<span class="post__img"><img src="' + esc(p.cover) + '" alt="" loading="lazy" width="800" height="450"></span>' +
        '<span class="post__text">' +
          '<span class="post__meta"><span class="tag">' + esc(ui('blog.' + p.category)) + '</span>' +
          '<time datetime="' + esc(p.date) + '">' + esc(fmtDate(p.date, { day: 'numeric', month: 'long', year: 'numeric' })) + '</time>' +
          '<span>' + p.minutes + ' ' + esc(ui('blog.minutes')) + '</span></span>' +
          '<span class="post__title" style="display:block">' + esc(tr(p.title)) + '</span>' +
          '<span class="post__excerpt" style="display:block">' + esc(tr(p.excerpt)) + '</span>' +
        '</span></button></li>';
    }).join('');
    var empty = $('#b-empty');
    empty.textContent = ui('blog.empty');
    empty.hidden = list.length > 0;
  }

  function openPost(id, trigger) {
    var p = S.posts.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var paras = tr(p.content) || [];
    openModal(
      '<div class="mbody mbody--blog">' +
        '<div class="mbody__img"><img src="' + esc(p.cover) + '" alt=""></div>' +
        '<div class="mbody__text">' +
          '<h2 id="m-title">' + esc(tr(p.title)) + '</h2>' +
          '<div class="mbody__meta"><span class="tag">' + esc(ui('blog.' + p.category)) + '</span>' +
          '<time datetime="' + esc(p.date) + '">' + esc(fmtDate(p.date, { day: 'numeric', month: 'long', year: 'numeric' })) + '</time>' +
          '<span>' + p.minutes + ' ' + esc(ui('blog.minutes')) + '</span></div>' +
          '<div class="prose">' + paras.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
        '</div>' +
      '</div>', trigger);
  }

  function openTestimonial(i, trigger) {
    var t = S.testimonials[i];
    if (!t) return;
    openModal(
      '<div class="mbody mbody--quote"><div class="mbody__text">' +
        '<div class="tcard__who"><span class="tcard__avatar" aria-hidden="true">' + esc(t.initials) + '</span>' +
        '<span><h2 id="m-title" style="font-size:1.15rem;letter-spacing:0">' + esc(t.name) + '</h2><span class="tcard__role">' + esc(tr(t.role)) + '</span></span></div>' +
        '<p class="quote__text">' + esc(tr(t.text)) + '</p>' +
      '</div></div>', trigger);
  }

  /* ---------- Modal ---------- */
  var modal = $('#modal');
  var lastTrigger = null;

  function openModal(html, trigger) {
    lastTrigger = trigger || document.activeElement;
    $('#modal-body').innerHTML = html;
    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
    $('#modal-body').scrollTop = 0;
  }
  function closeModal() {
    if (modal.open) modal.close();
  }
  modal.addEventListener('close', function () {
    $('#modal-body').innerHTML = '';
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
  });
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  $('#modal-close').addEventListener('click', closeModal);

  /* ---------- Kontak ---------- */
  function renderContact() {
    var p = S.profile;
    var a = $('#c-email');
    a.textContent = p.email;
    a.href = 'mailto:' + p.email;
    $('#c-wa').href = 'https://wa.me/' + p.whatsapp + '?text=' + encodeURIComponent(ui('contact.waText'));
    $('#c-reply').textContent = tr(S.contact.replyTime);
  }

  var toastTimer = null;
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-on'); }, 3600);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  var form = $('#contact-form');
  var fields = {
    name:    { el: $('#f-name'),    err: $('#e-name'),    msg: 'contact.errName',    ok: function (v) { return v.trim().length > 0; } },
    email:   { el: $('#f-email'),   err: $('#e-email'),   msg: 'contact.errEmail',   ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); } },
    message: { el: $('#f-message'), err: $('#e-message'), msg: 'contact.errMessage', ok: function (v) { return v.trim().length >= 10; } }
  };

  function validateField(key) {
    var f = fields[key];
    var good = f.ok(f.el.value);
    f.el.setAttribute('aria-invalid', good ? 'false' : 'true');
    f.err.hidden = good;
    f.err.textContent = good ? '' : ui(f.msg);
    return good;
  }

  Object.keys(fields).forEach(function (k) {
    fields[k].el.addEventListener('blur', function () { if (fields[k].el.value) validateField(k); });
    fields[k].el.addEventListener('input', function () { if (fields[k].el.getAttribute('aria-invalid') === 'true') validateField(k); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    Object.keys(fields).forEach(function (k) {
      if (!validateField(k) && !firstBad) firstBad = fields[k].el;
    });
    if (firstBad) { firstBad.focus(); return; }

    var data = {
      name: fields.name.el.value.trim(),
      email: fields.email.el.value.trim(),
      subject: $('#f-subject').value.trim() || ui('contact.defaultSubject'),
      message: fields.message.el.value.trim()
    };

    function viaMailto() {
      var body = data.message + '\n\n— ' + data.name + ' (' + data.email + ')';
      window.location.href = 'mailto:' + S.profile.email + '?subject=' + encodeURIComponent(data.subject) + '&body=' + encodeURIComponent(body);
      toast(ui('contact.sentMail'));
      form.reset();
    }

    if (S.contact.endpoint) {
      var btn = $('#f-submit');
      var label = $('span', btn);
      var old = label.textContent;
      btn.disabled = true; label.textContent = ui('contact.sending');
      fetch(S.contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        toast(ui('contact.sent')); form.reset();
      }).catch(function () {
        toast(ui('contact.failed'));
      }).then(function () {
        btn.disabled = false; label.textContent = old;
      });
    } else {
      viaMailto();
    }
  });

  $('#c-copy').addEventListener('click', function () {
    copyText(S.profile.email).then(function () { toast(ui('contact.copied')); }, function () { toast(S.profile.email); });
  });

  /* ---------- Tema, bahasa, aksen ---------- */
  var root = document.documentElement;

  function updateTools() {
    var theme = root.getAttribute('data-theme');
    var accent = root.getAttribute('data-accent');
    var tbtn = $('#t-theme');
    tbtn.setAttribute('aria-label', ui(theme === 'dark' ? 'tools.toLight' : 'tools.toDark'));
    tbtn.setAttribute('title', tbtn.getAttribute('aria-label'));
    $('#t-theme-icon').setAttribute('href', theme === 'dark' ? '#i-sun' : '#i-moon');

    var lbtn = $('#t-lang');
    lbtn.setAttribute('aria-label', ui('tools.lang'));
    lbtn.setAttribute('title', ui('tools.lang'));
    $$('.seg', lbtn).forEach(function (s) { s.classList.toggle('is-on', s.getAttribute('data-lang') === state.lang); });

    var abtn = $('#t-accent');
    abtn.setAttribute('aria-label', ui('tools.accent'));
    abtn.setAttribute('title', ui('tools.accent'));
    $$('.swatch').forEach(function (s) {
      var a = s.getAttribute('data-accent');
      s.setAttribute('aria-label', ui('tools.' + a));
      s.setAttribute('title', ui('tools.' + a));
      s.setAttribute('aria-pressed', String(a === accent));
    });

    var themeColor = $('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#0d0f15' : '#e8ecf3');
  }

  $('#t-theme').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store.set('theme', next);
    updateTools();
  });

  $('#t-lang').addEventListener('click', function () {
    state.lang = state.lang === 'id' ? 'en' : 'id';
    store.set('lang', state.lang);
    closeModal();
    renderAll();
  });

  var swatches = $('#swatches');
  var accentBtn = $('#t-accent');
  function toggleSwatches(show) {
    swatches.hidden = !show;
    accentBtn.setAttribute('aria-expanded', String(show));
  }
  accentBtn.addEventListener('click', function () { toggleSwatches(swatches.hidden); });
  $$('.swatch').forEach(function (s) {
    s.addEventListener('click', function () {
      var a = s.getAttribute('data-accent');
      if (ACCENTS.indexOf(a) < 0) return;
      root.setAttribute('data-accent', a);
      store.set('accent', a);
      updateTools();
    });
  });
  document.addEventListener('click', function (e) {
    if (!swatches.hidden && !e.target.closest('.tool-wrap')) toggleSwatches(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !swatches.hidden) { toggleSwatches(false); accentBtn.focus(); }
  });

  /* ---------- Sidebar mobile ---------- */
  $('#sidebar-toggle').addEventListener('click', function () {
    var sb = $('#sidebar');
    var open = sb.classList.toggle('is-open');
    this.setAttribute('aria-expanded', String(open));
    $('#sidebar-toggle-label').textContent = ui(open ? 'sidebar.hide' : 'sidebar.show');
  });

  /* ---------- Routing berbasis hash ---------- */
  function showPage(id, moveFocus) {
    state.page = id;
    $$('.page').forEach(function (p) {
      var on = p.getAttribute('data-page') === id;
      p.hidden = !on;
      p.classList.remove('is-visible');
      if (on) {
        void p.offsetWidth;
        requestAnimationFrame(function () { p.classList.add('is-visible'); });
      }
    });
    $$('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (moveFocus) {
      if (window.innerWidth < 1024) {
        // Mobile: tutup sidebar lalu gulir ke awal konten, bukan ke paling atas
        var sb = $('#sidebar');
        if (sb.classList.contains('is-open')) {
          sb.classList.remove('is-open');
          $('#sidebar-toggle').setAttribute('aria-expanded', 'false');
          $('#sidebar-toggle-label').textContent = ui('sidebar.show');
        }
        var top = $('.main').getBoundingClientRect().top + window.pageYOffset - 60;
        window.scrollTo(0, Math.max(0, top));
      } else {
        window.scrollTo(0, 0);
      }
      var h = $('#h-' + id);
      if (h) h.focus({ preventScroll: true });
    }
    if (id === 'about') setTimeout(runCounters, 250);
  }

  function route(moveFocus) {
    var h = location.hash.replace('#', '');
    showPage(PAGES.indexOf(h) > -1 ? h : 'about', moveFocus);
  }
  window.addEventListener('hashchange', function () { route(true); });

  /* ---------- Delegasi klik untuk kartu ---------- */
  document.addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-project]'))) openProject(el.getAttribute('data-project'), el);
    else if ((el = e.target.closest('[data-post]'))) openPost(el.getAttribute('data-post'), el);
    else if ((el = e.target.closest('[data-testi]'))) openTestimonial(Number(el.getAttribute('data-testi')), el);
  });

  $('#btn-print').addEventListener('click', function () { window.print(); });

  var pTimer, bTimer;
  $('#p-search').addEventListener('input', function (e) {
    clearTimeout(pTimer);
    var v = e.target.value;
    pTimer = setTimeout(function () { state.pf.q = v; renderPortfolioGrid(); }, 120);
  });
  $('#b-search').addEventListener('input', function (e) {
    clearTimeout(bTimer);
    var v = e.target.value;
    bTimer = setTimeout(function () { state.bl.q = v; renderBlogList(); }, 120);
  });

  /* ---------- Render semua ---------- */
  function renderAll() {
    applyStatic();
    renderSidebar();
    renderAbout();
    renderResume();
    renderPortfolioChips();
    renderPortfolioGrid();
    renderBlogChips();
    renderBlogList();
    renderContact();
    // Validasi ulang pesan galat yang sedang tampil agar bahasanya ikut berubah
    Object.keys(fields).forEach(function (k) {
      if (fields[k].el.getAttribute('aria-invalid') === 'true') validateField(k);
    });
    startTyping();
  }

  renderAll();
  route(false);
})();
