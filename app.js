/* GO-FAR Learning Portal — vanilla JS, no build step. Progress is stored in this browser only (localStorage). */
(function () {
  'use strict';
  const COURSES = window.COURSES, LIBRARY = window.LIBRARY;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const view = $('#view');

  /* ---------- state ---------- */
  const KEY = 'gofar.v1';
  let S = { name: '', seen: {}, scores: {}, last: null, days: [], theme: '', log: [], cgoals: [], targets: {}, start: '', events: {}, program: '12', cdone: {}, cnum: {}, copen: {}, creq: false, sstep: {}, level: null, exam: null };
  try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  if (!S.v2) { /* one-time migration: seven courses became three */
    const mc = (c, m) => c === 'anat' ? (m === 'orbit' ? 'orbit' : 'eyelid') : ({ ptosis: 'eyelid', malpos: 'eyelid', aesth: 'eyelid', onc: 'eyelid', orb: 'orbit', lac: 'lacrimal' }[c] || c);
    const mk = o => { const n = {}; for (const k in o) { const [c, m, i] = k.split('/'); n[`${mc(c, m)}/${m}/${i}`] = o[k]; } return n; };
    S.seen = mk(S.seen || {}); S.scores = mk(S.scores || {}); if (S.last) S.last.c = mc(S.last.c, S.last.m);
    if (S.exam && S.exam.byTopic) { const bt = {}; for (const [k, v] of Object.entries(S.exam.byTopic)) { const nk = mc(k, ''); bt[nk] = bt[nk] || [0, 0]; bt[nk][0] += v[0]; bt[nk][1] += v[1]; } S.exam.byTopic = bt; }
    S.v2 = 1; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const ymd = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const today = () => ymd(new Date());
  if (!S.days.includes(today())) { S.days.push(today()); save(); }

  const sk = (c, m, i) => `${c}/${m}/${i}`;
  const course = id => COURSES.find(c => c.id === id);
  const modProgress = (c, m) => { const n = m.steps.length; const d = m.steps.filter((_, i) => S.seen[sk(c.id, m.id, i)]).length; return { d, n, pct: Math.round(100 * d / n), done: d === n }; };
  const courseProgress = c => { let d = 0, n = 0; c.modules.forEach(m => { const p = modProgress(c, m); d += p.d; n += p.n; }); return { d, n, pct: n ? Math.round(100 * d / n) : 0 }; };
  const allModules = () => COURSES.flatMap(c => c.modules.map(m => ({ c, m })));
  const overall = () => { let d = 0, n = 0; COURSES.forEach(c => { const p = courseProgress(c); d += p.d; n += p.n; }); return n ? Math.round(100 * d / n) : 0; };
  const quizAvg = () => { const v = Object.values(S.scores); if (!v.length) return null; return Math.round(100 * v.reduce((a, s) => a + s.score / s.total, 0) / v.length); };
  const streak = () => { let n = 0; const d = new Date(); while (S.days.includes(ymd(d))) { n++; d.setDate(d.getDate() - 1); } return n; };
  const nextUp = () => {
    if (S.last) { const c = course(S.last.c), m = c && c.modules.find(x => x.id === S.last.m); if (m && !modProgress(c, m).done) return { c, m, i: S.last.i }; }
    const f = allModules().find(({ c, m }) => !modProgress(c, m).done);
    if (!f) return null;
    const i = f.m.steps.findIndex((_, i) => !S.seen[sk(f.c.id, f.m.id, i)]);
    return { c: f.c, m: f.m, i: Math.max(0, i) };
  };
  const mark = (c, m, i) => { S.seen[sk(c, m, i)] = 1; save(); };
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  /* ---------- theme / shell ---------- */
  function applyTheme() {
    const t = S.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = t;
  }
  applyTheme();
  $('#themeBtn').onclick = () => { S.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; save(); applyTheme(); };
  $('#menuBtn').onclick = () => $('#rail').classList.toggle('open');

  const NAV = [['#/', '🏠', 'Home'], ['#/year', '🗓', 'Fellowship at a glance'], ['#/board', '✅', 'Task board'], ['#/library', '🔖', 'Resources'], ['#/courses', '📚', 'Learning modules'], ['#/exam', '📝', 'Knowledge Checkpoint'], ['#/practice', '🧠', 'Question bank'], ['#/tools', '🧮', 'Clinical tools'], ['#/dashboard', '📊', 'My learning dashboard'], ['#/progress', '📈', 'My progress']];
  function renderShell(path) {
    $('#nav').innerHTML = NAV.map(([h, ic, l]) => `<a href="${h}" class="${(h === '#/' ? path === '/' : path.startsWith(h.slice(1))) || (h === '#/courses' && /^\/(course|learn)/.test(path)) || (h === '#/board' && /^\/(log|clinical|surgical|didactic)/.test(path)) ? 'on' : ''}"><span class="ic">${ic}</span>${l}</a>`).join('');
    const nm = S.name || 'Joon';
    $('#userBtn').innerHTML = `<span class="avatar">${esc(nm[0].toUpperCase())}</span><span>${esc(nm)}</span>`;
    $('#rail').classList.remove('open');
  }
  $('#userBtn').onclick = () => {
    const d = document.createElement('div'); d.className = 'modal';
    d.innerHTML = `<div class="card" role="dialog" aria-label="Profile"><h2>Your profile</h2><p class="sample">Stored only in this browser.</p><label for="nm">Display name</label><input id="nm" value="${esc(S.name)}" placeholder="e.g. Dr. Amina"><div style="display:flex;gap:8px;justify-content:space-between"><button class="btn alt" id="reset">Reset progress</button><span><button class="btn alt" id="cx">Cancel</button> <button class="btn" id="ok">Save</button></span></div></div>`;
    document.body.appendChild(d); $('#nm', d).focus();
    $('#cx', d).onclick = () => d.remove();
    d.onclick = e => { if (e.target === d) d.remove(); };
    $('#ok', d).onclick = () => { S.name = $('#nm', d).value.trim(); save(); d.remove(); route(); };
    $('#reset', d).onclick = () => { if (confirm('Reset all progress on this device?')) { S.seen = {}; S.scores = {}; S.last = null; save(); d.remove(); route(); } };
  };

  /* ---------- search ---------- */
  const si = $('#searchInput'), sr = $('#searchResults');
  $('#searchForm').onsubmit = e => e.preventDefault();
  si.oninput = () => {
    const q = si.value.trim().toLowerCase(); if (q.length < 2) { sr.hidden = true; return; }
    const hits = [];
    COURSES.forEach(c => {
      if ((c.title + c.tagline + c.code).toLowerCase().includes(q)) hits.push([`#/course/${c.id}`, c.title, 'Course · ' + c.code]);
      c.modules.forEach(m => m.steps.forEach((s, i) => {
        const txt = (s.title + ' ' + (s.html || '') + ' ' + (s.intro || '') + JSON.stringify(s.spots || s.cards || '')).replace(/<[^>]+>/g, ' ').toLowerCase();
        if (txt.includes(q) && hits.length < 40) hits.push([`#/learn/${c.id}/${m.id}/${i}`, s.title, `${c.title} › ${m.title}`]);
      }));
    });
    LIBRARY.forEach(r => { if ((r.title + r.desc).toLowerCase().includes(q)) hits.push(['#/library', r.title, 'Library · ' + r.type]); });
    sr.innerHTML = hits.slice(0, 10).map(([h, t, s]) => `<a href="${h}">${esc(t)}<small>${esc(s)}</small></a>`).join('') || '<a>No results</a>';
    sr.hidden = false;
  };
  document.addEventListener('click', e => { if (!e.target.closest('.search')) sr.hidden = true; else if (e.target.closest('.results a')) { sr.hidden = true; si.value = ''; } });

  /* ---------- pages ---------- */
  const bar = p => `<div class="bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>`;
  const LVN = ['Foundation', 'Core', 'Advanced'];
  const LVX = { Foundation: 0, Core: 1, Advanced: 2 };
  const weakTopics = () => S.exam ? Object.entries(S.exam.byTopic).filter(([, v]) => v[1] >= 2 && v[0] / v[1] < .5).map(([k]) => k) : [];
  const lvRange = c => { const l = c.modules.map(m => LVX[m.level]); const lo = Math.min(...l), hi = Math.max(...l); return lo === hi ? LVN[lo] : `${LVN[lo]}–${LVN[hi]}`; };
  const mBadge = m => { if (S.level == null) return ''; const d = LVX[m.level] - S.level; const b = d === 0 ? ['Recommended', 'rec'] : d === 1 ? ['Next step', 'nxt'] : d < 0 ? ['Review', 'rev'] : ['Challenge', 'chl']; return `<span class="lvb ${b[1]}">${b[0]}</span>`; };
  const cBadge = c => { if (S.level == null) return ''; const n = c.modules.filter(m => LVX[m.level] === S.level).length, w = weakTopics().includes(c.id);
    return `${n ? `<span class="lvb rec">${n} at your level</span>` : (c.modules.every(m => LVX[m.level] < S.level) ? '<span class="lvb rev">Review</span>' : '<span class="lvb nxt">Next step</span>')}${w ? '<span class="lvb weak">Weak area</span>' : ''}`; };
  const courseCard = c => { const p = courseProgress(c); return `<a class="card course" href="#/course/${c.id}"><div class="band" style="background:${c.color}"></div><div class="body"><span class="code">${c.code} · ${lvRange(c).toUpperCase()}</span><h3>${c.icon} ${esc(c.title)}</h3><p>${esc(c.tagline)}</p><div class="meta"><span class="pill">${c.modules.length} module${c.modules.length > 1 ? 's' : ''}</span><span class="pill">${c.modules.reduce((a, m) => a + m.minutes, 0)} min</span>${cBadge(c)}</div><div style="margin-top:auto">${bar(p.pct)}<div class="meta" style="margin-top:4px">${p.pct}% complete</div></div></div></a>`; };

  const BADGES = [
    ['First steps', 'Complete a module', () => allModules().some(({ c, m }) => modProgress(c, m).done)],
    ['Sharp mind', 'Score 90%+ on a quiz', () => Object.values(S.scores).some(s => s.score / s.total >= .9)],
    ['Eyelid expert', 'Finish the Eyelid course', () => courseProgress(course('eyelid')).pct === 100],
    ['On a roll', '3-day learning streak', () => streak() >= 3],
    ['Fellow', 'Complete every course', () => overall() === 100]
  ];

  function dashboard() {
    const nu = nextUp(), done = allModules().filter(({ c, m }) => modProgress(c, m).done).length, qa = quizAvg();
    const nm = S.name ? ', ' + esc(S.name) : '';
    view.innerHTML = `
      <section class="hero"><div><h1>Welcome${nm}</h1><p>Global Oculoplastics – Fellowship and Research · ${nu ? 'Pick up where you left off.' : 'You have completed every module. Excellent.'}</p></div>
        ${nu ? `<a class="btn" href="#/learn/${nu.c.id}/${nu.m.id}/${nu.i}">Continue: ${esc(nu.m.title)} →</a>` : ''}</section>
      <div class="grid g4" style="margin-top:18px">
        <div class="card stat"><b>${overall()}%</b><span>Overall progress</span></div>
        <div class="card stat"><b>${done}<small style="font-size:1rem;color:var(--muted)"> / ${allModules().length}</small></b><span>Modules completed</span></div>
        <div class="card stat"><b>${qa === null ? '—' : qa + '%'}</b><span>Average quiz score</span></div>
        <div class="card stat"><b>${streak()}</b><span>Day learning streak</span></div>
      </div>
      <div class="sec"><h2>My courses</h2><a href="#/courses">View all</a></div>
      <div class="grid g3">${COURSES.slice(0, 6).map(courseCard).join('')}</div>
      <div class="grid g2" style="margin-top:28px">
        <div class="card"><h2>Announcements</h2><p class="sample">Sample content — replace with programme announcements.</p>
          <ul class="list">
            <li><span class="dot"></span><div><b>Welcome to the GO-FAR portal</b><br><span class="sample">Modules combine reading, interactive anatomy, flashcards, cases and quizzes.</span></div></li>
            <li><span class="dot" style="background:var(--gold)"></span><div><b>Module review in progress</b><br><span class="sample">All draft content is awaiting faculty review.</span></div></li>
          </ul></div>
        <div class="card"><h2>Achievements</h2><div class="badges" style="margin-top:10px">${BADGES.map(([t, d, f]) => `<div class="badge ${f() ? 'on' : ''}" title="${d}">${f() ? '🏅' : '🔒'} <span>${t}</span></div>`).join('')}</div></div>
      </div>`;
  }

  function courses() {
    const LVEX = ['What is the most common cause of acquired ptosis in older adults?', 'Which operation for MRD1 1 mm, levator function 12 mm and a high lid crease?', 'Which adverse effects to monitor with teprotumumab, or the order of rehabilitative surgery in thyroid eye disease?'];
    view.innerHTML = `<h1>Learning modules</h1>
      <div class="card" style="padding:0;overflow-x:auto"><table class="tbl lvtbl" style="margin:0"><thead><tr><th>Level</th><th>What it means</th><th>Example question</th><th>Modules</th></tr></thead><tbody>${LVN.map((n, i) => `<tr class="${S.level === i ? 'me' : ''}"><td><b class="lv${i}">${n}</b>${S.level === i ? ' <span class="lvb rec">You</span>' : ''}</td><td>${LVD[i]}</td><td>${LVEX[i]}</td><td>${COURSES.flatMap(c => c.modules.filter(m => LVX[m.level] === i).map(m => `<a href="#/learn/${c.id}/${m.id}/0">${esc(m.title)}</a>`)).join(', ')}</td></tr>`).join('')}</tbody></table></div>
      <div class="grid g3" style="margin-top:14px">${COURSES.map(courseCard).join('')}</div>`;
  }

  function coursePage(id) {
    const c = course(id); if (!c) return notFound();
    const p = courseProgress(c);
    view.innerHTML = `<div class="crumbs"><a href="#/courses">Courses</a> › ${esc(c.title)}</div>
      <div class="card" style="border-top:6px solid ${c.color}"><span class="code">${c.code} · ${lvRange(c).toUpperCase()}</span><h1>${c.icon} ${esc(c.title)}</h1><p>${esc(c.tagline)}</p>${bar(p.pct)}<div class="meta" style="margin-top:6px">${p.pct}% complete</div></div>
      <div class="sec"><h2>Modules</h2></div>
      ${c.modules.map(m => { const q = modProgress(c, m); const first = Math.max(0, m.steps.findIndex((_, i) => !S.seen[sk(c.id, m.id, i)]));
        return `<a class="mod-row" href="#/learn/${c.id}/${m.id}/${q.done ? 0 : first}"><span class="check ${q.done ? 'done' : q.d ? 'part' : ''}">${q.done ? '✓' : ''}</span><div style="flex:1"><b>${esc(m.title)}</b> <span class="lvb lvp">${m.level}</span>${mBadge(m)}<div class="meta">${m.steps.length} activities · ${m.minutes} min · ${[...new Set(m.steps.map(s => ({ read: 'Reading', hotspot: 'Interactive diagram', cards: 'Flashcards', quiz: 'Quiz', case: 'Case', tool: 'Tool' }[s.type])))].join(' · ')}</div></div><span class="pill">${q.pct}%</span></a>`; }).join('')}`;
  }

  function library() {
    const types = [...new Set(LIBRARY.map(r => r.type))];
    view.innerHTML = `<h1>Resource library</h1><p class="sample">Links open the organisation's home page. Add direct links to curated papers, videos and guidelines as the programme grows.</p>
      <div class="grid g3" style="margin-top:14px">${LIBRARY.map(r => `<div class="card"><span class="pill">${r.type}</span><h3 style="margin-top:10px">${esc(r.title)}</h3><p>${esc(r.desc)}</p>${r.url ? `<a href="${r.url}" target="_blank" rel="noopener noreferrer">Open ↗</a>` : '<span class="sample">Physical/library resource</span>'}</div>`).join('')}</div>`;
  }

  function progress() {
    const rows = Object.entries(S.scores).map(([k, v]) => { const [c, m, i] = k.split('/'); const cc = course(c), mm = cc && cc.modules.find(x => x.id === m); return cc && mm ? { cc, mm, i, v } : null; }).filter(Boolean);
    view.innerHTML = `<h1>My progress</h1>
      <div class="grid g3" style="margin:14px 0">${COURSES.map(c => { const p = courseProgress(c); return `<div class="card"><b>${c.icon} ${esc(c.title)}</b>${bar(p.pct)}<div class="meta">${p.pct}% · ${p.d}/${p.n} activities</div></div>`; }).join('')}</div>
      <div class="card"><h2>Quiz and case results</h2>${rows.length ? `<table class="tbl"><thead><tr><th>Course</th><th>Module</th><th>Activity</th><th>Score</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r.cc.title)}</td><td>${esc(r.mm.title)}</td><td>${esc(r.mm.steps[r.i].title)}</td><td><b>${r.v.score}/${r.v.total}</b></td></tr>`).join('')}</tbody></table>` : '<p class="sample">No quizzes taken yet.</p>'}</div>
      <p class="sample" style="margin-top:12px">Progress is saved on this device only. Connect a server/LMS (e.g. via SCORM/xAPI or a database) to track fellows across sites.</p>`;
  }

  function notFound() { view.innerHTML = '<h1>Page not found</h1><a href="#/">Back to dashboard</a>'; }

  /* ---------- learning view ---------- */
  function learn(cid, mid, idx) {
    const c = course(cid), m = c && c.modules.find(x => x.id === mid); if (!m) return notFound();
    const i = Math.min(Math.max(+idx || 0, 0), m.steps.length - 1), st = m.steps[i];
    S.last = { c: cid, m: mid, i }; save();
    const needsAction = st.type === 'quiz' || st.type === 'case';
    if (!needsAction) mark(cid, mid, i);
    const prev = i > 0 ? `#/learn/${cid}/${mid}/${i - 1}` : `#/course/${cid}`;
    view.innerHTML = `<div class="crumbs"><a href="#/courses">Courses</a> › <a href="#/course/${cid}">${esc(c.title)}</a> › ${esc(m.title)}</div>
      <div class="learn">
        <aside class="card outline" aria-label="Module outline">${c.modules.map(mm => `<h4>${esc(mm.title)}</h4>${mm.steps.map((s, k) => `<a href="#/learn/${cid}/${mm.id}/${k}" class="${mm.id === mid && k === i ? 'on' : ''}"><span class="mini ${S.seen[sk(cid, mm.id, k)] ? 'done' : ''}"></span>${esc(s.title)}</a>`).join('')}`).join('')}</aside>
        <section class="card stage"><div class="kicker">${esc(m.title)} · Step ${i + 1} of ${m.steps.length}</div><h1>${esc(st.title)}</h1><div id="step"></div>
          <div class="pager"><a class="btn alt" href="${prev}">← ${i > 0 ? 'Back' : 'Course'}</a><span id="nextSlot"></span></div></section>
      </div>`;
    const box = $('#step'); const slot = $('#nextSlot');
    const last = i === m.steps.length - 1;
    const setNext = () => {
      const ok = S.seen[sk(cid, mid, i)];
      slot.innerHTML = last ? `<a class="btn gold ${ok ? '' : 'dis'}" ${ok ? `href="#/course/${cid}"` : 'aria-disabled="true"'} style="${ok ? '' : 'opacity:.4;pointer-events:none'}">Finish module ✓</a>` : `<a class="btn" ${ok ? `href="#/learn/${cid}/${mid}/${i + 1}"` : 'aria-disabled="true"'} style="${ok ? '' : 'opacity:.4;pointer-events:none'}">Next →</a>`;
      $$('.outline a', view).forEach((a, k) => 0); // outline updates on navigation
    };
    const done = () => { mark(cid, mid, i); setNext(); };
    ({ read: () => { box.innerHTML = st.html; }, hotspot: () => hotspot(box, st, done), cards: () => flash(box, st, done), quiz: () => quiz(box, st, `${cid}/${mid}/${i}`, done), case: () => caseStep(box, st, `${cid}/${mid}/${i}`, done), tool: () => TOOLS[st.tool].render(box) }[st.type])();
    setNext();
    if (st.type === 'cards' || st.type === 'hotspot') { /* completion is signalled via done() */ if (S.seen[sk(cid, mid, i)]) setNext(); }
    scrollTo(0, 0);
  }

  /* ---------- diagrams ---------- */
  /* ----- realism helpers: textured, lit, shadowed tissue via SVG filters ----- */
  const fxF = (id, bf, oct, sc, col, seed) => `<filter id="fx${id}" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="${bf}" numOctaves="${oct}" seed="${seed || 3}" result="n"/><feDiffuseLighting in="n" surfaceScale="${sc}" diffuseConstant="1.1" lighting-color="${col}" result="l"><feDistantLight azimuth="235" elevation="58"/></feDiffuseLighting><feComposite in="l" in2="SourceAlpha" operator="in" result="lc"/><feBlend in="SourceGraphic" in2="lc" mode="multiply" result="tx"/><feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="b"/><feOffset in="b" dx="1.5" dy="2.8" result="o"/><feComponentTransfer in="o" result="sh"><feFuncA type="linear" slope=".34"/></feComponentTransfer><feMerge><feMergeNode in="sh"/><feMergeNode in="tx"/></feMerge></filter>`;
  const FX = fxF('bone', '.03 .05', 4, 2.6, '#fffaf0') + fxF('muscle', '.004 .32', 3, 2.4, '#ffffff', 5) + fxF('dots', '.09', 2, 2, '#ffffff', 7) + fxF('fat', '.07', 2, 3.2, '#fffbe8', 9) + fxF('skin', '.7', 2, .9, '#ffffff', 4) + fxF('tough', '.02 .13', 3, 1.5, '#ffffff', 6) + fxF('gland', '.11', 2, 3, '#fff4f4', 11) + fxF('mucosa', '.05 .09', 3, 2.2, '#fff0ee', 13)
    + `<filter id="fxsoft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="b"/><feOffset in="b" dx="1.2" dy="2.2" result="o"/><feComponentTransfer in="o" result="sh"><feFuncA type="linear" slope=".3"/></feComponentTransfer><feMerge><feMergeNode in="sh"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  const cub = (P, t) => { const u = 1 - t; return [u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0], u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1]]; };
  const cubT = (P, t) => { const u = 1 - t; return [3 * u * u * (P[1][0] - P[0][0]) + 6 * u * t * (P[2][0] - P[1][0]) + 3 * t * t * (P[3][0] - P[2][0]), 3 * u * u * (P[1][1] - P[0][1]) + 6 * u * t * (P[2][1] - P[1][1]) + 3 * t * t * (P[3][1] - P[2][1])]; };
  const lashes = (P, t0, t1, n, len) => { let d = ''; for (let i = 0; i < n; i++) { const t = t0 + (t1 - t0) * i / (n - 1), [x, y] = cub(P, t), [tx, ty] = cubT(P, t), m = Math.hypot(tx, ty) || 1, nx = ty / m, ny = -tx / m, L = len * (.75 + .5 * Math.sin(i * 2.3) ** 2), sweep = (P[0][0] < P[3][0] ? -1 : 1) * 0; d += `M${x.toFixed(1)} ${y.toFixed(1)} Q${(x + nx * L * .55 - tx / m * L * .25).toFixed(1)} ${(y + ny * L * .55 - ty / m * L * .25).toFixed(1)} ${(x + nx * L - tx / m * L * .55).toFixed(1)} ${(y + ny * L - ty / m * L * .55).toFixed(1)}`; } return `<path d="${d}" fill="none" stroke="#2c211c" stroke-width="2.3" stroke-linecap="round"/>`; };
  const tube = (d, w) => `<path d="${d}" fill="none" stroke="#25609b" stroke-width="${w + 3}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#7fb8ea" stroke-width="${w - 1}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#d9eeff" stroke-width="${Math.max(1.5, w - 5)}" stroke-linecap="round" stroke-linejoin="round" opacity=".75"/>`;
  const UP = [[70, 200], [150, 110], [280, 110], [360, 210]], LO = [[360, 210], [290, 290], [140, 290], [70, 200]];
  const DEFS = `<defs>
      <linearGradient id="gOrb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e48b80"/><stop offset=".6" stop-color="#c4685d"/><stop offset="1" stop-color="#a64d45"/></linearGradient>
      <linearGradient id="gTars" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7ebbe"/><stop offset="1" stop-color="#d4b968"/></linearGradient>
      <linearGradient id="gLev" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a73b4f"/><stop offset=".5" stop-color="#cc6275"/><stop offset="1" stop-color="#e6929e"/></linearGradient>
      <linearGradient id="gLevV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
      <linearGradient id="gMull" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a6db8"/><stop offset="1" stop-color="#9bb0e6"/></linearGradient>
      <radialGradient id="gFat" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fff2b0"/><stop offset="1" stop-color="#e8bd48"/></radialGradient>
      <radialGradient id="gSclera" cx=".3" cy=".3" r=".95"><stop offset="0" stop-color="#fffdf9"/><stop offset=".7" stop-color="#efe9df"/><stop offset="1" stop-color="#d6cdbf"/></radialGradient>
      <radialGradient id="gVit" cx=".35" cy=".4" r=".9"><stop offset="0" stop-color="#f8fcff"/><stop offset="1" stop-color="#d9e8f5"/></radialGradient>
      <linearGradient id="gBone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6ecd5"/><stop offset="1" stop-color="#d6c4a0"/></linearGradient>
      <linearGradient id="gSkin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dfa47c"/><stop offset="1" stop-color="#f1c6a3"/></linearGradient>
      <radialGradient id="gCornea" cx=".7" cy=".3" r=".9"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset="1" stop-color="#bcdcf2" stop-opacity=".75"/></radialGradient>
      <radialGradient id="gHole" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#05080f"/><stop offset="1" stop-color="#1c2639"/></radialGradient>
      <radialGradient id="gIris" cx=".5" cy=".5" r=".6"><stop offset=".25" stop-color="#14213d"/><stop offset=".3" stop-color="#9ec0e0"/><stop offset=".75" stop-color="#4f7aa6"/><stop offset="1" stop-color="#2a4a70"/></radialGradient>
      <linearGradient id="gLidShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a1f12" stop-opacity=".55"/><stop offset=".45" stop-color="#3a1f12" stop-opacity="0"/></linearGradient>
      <radialGradient id="gSac" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#d4ecff"/><stop offset="1" stop-color="#6aa8dd"/></radialGradient>
      <linearGradient id="gMuc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f9d9cb"/><stop offset="1" stop-color="#eaa99d"/></linearGradient>
      <clipPath id="almond"><path d="M70 200 C150 110 280 110 360 210 C290 290 140 290 70 200 Z"/></clipPath>
      ${FX}
    </defs>`;
  const SVG = {
    eyelid: `<svg viewBox="0 0 760 470" role="img" aria-label="Sagittal section of the upper eyelid">${DEFS}
      <rect x="300" y="104" width="456" height="362" rx="30" fill="#f7e49a" data-fx="fat"/>
      <path d="M130 0 H760 V36 H300 C262 36 222 46 196 56 L150 50 Z" fill="url(#gBone)" stroke="#a8987a" stroke-width="2" data-fx="bone"/>
      <g data-fx="soft">
        <ellipse cx="520" cy="330" rx="230" ry="190" fill="url(#gSclera)" stroke="#8a7a6c" stroke-width="2.5"/>
        <ellipse cx="520" cy="330" rx="223" ry="183" fill="none" stroke="#5b3a2a" stroke-width="5" opacity=".75"/>
        <ellipse cx="520" cy="330" rx="216" ry="176" fill="url(#gVit)" stroke="#d98a86" stroke-width="4"/>
        <path d="M300 270 C262 298 262 362 300 390 L314 380 C286 358 286 302 314 282 Z" fill="url(#gCornea)" stroke="#8aa8c0" stroke-width="2"/>
        <path d="M316 288 Q336 270 358 258 L358 266 Q338 280 322 296 Z M316 372 Q336 390 358 402 L358 394 Q338 380 322 364 Z" fill="#7a5532" stroke="#4a331f"/>
        <ellipse cx="362" cy="330" rx="15" ry="42" fill="#fff3cf" fill-opacity=".75" stroke="#d6c27a" stroke-width="1.5"/>
        <path d="M290 296 C276 312 276 340 290 358" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/>
      </g>
      <g data-sh="fat" data-fx="fat"><path d="M252 112 C252 88 280 80 304 84 C332 88 344 104 338 122 C330 140 300 142 276 138 C258 134 252 124 252 112 Z" fill="url(#gFat)" stroke="#c9a02c" stroke-width="2"/><path d="M270 104 C282 96 296 98 306 104 M276 122 C290 128 310 124 322 114" fill="none" stroke="#c9a02c" stroke-width="1.5" opacity=".5"/></g>
      <g data-sh="lev" data-fx="muscle"><path d="M392 70 L760 52 L760 112 L396 118 Z" fill="url(#gLev)" stroke="#7c2e3e" stroke-width="2"/><path d="M392 70 L760 52 L760 112 L396 118 Z" fill="url(#gLevV)"/></g>
      <g data-sh="orb" data-fx="dots"><path d="M184 50 L214 56 C218 130 220 188 228 200 L228 316 L188 316 C180 232 180 120 184 50 Z" fill="url(#gOrb)" stroke="#8f3d3d" stroke-width="2"/></g>
      <g data-sh="skin" data-fx="skin"><path d="M168 38 C160 120 160 232 172 318 L186 318 C176 232 176 120 184 46 Z" fill="url(#gSkin)" stroke="#a87a54" stroke-width="2"/></g>
      <g data-sh="tars" data-fx="tough"><rect x="230" y="190" width="36" height="126" rx="11" fill="url(#gTars)" stroke="#a58b2c" stroke-width="2"/><path d="M248 204 L248 314" stroke="#b79a3c" stroke-width="2" opacity=".6"/><g fill="#e8d08a" stroke="#b59a3a" stroke-width="1"><ellipse cx="240" cy="228" rx="4" ry="7"/><ellipse cx="256" cy="236" rx="4" ry="7"/><ellipse cx="240" cy="254" rx="4" ry="8"/><ellipse cx="256" cy="264" rx="4" ry="8"/><ellipse cx="240" cy="282" rx="4" ry="8"/><ellipse cx="256" cy="292" rx="4" ry="7"/></g></g>
      <g data-sh="sept" data-fx="soft"><path d="M200 50 C210 100 230 140 248 172" fill="none" stroke="#3d9a54" stroke-width="5.5" stroke-linecap="round"/><path d="M200 50 C210 100 230 140 248 172" fill="none" stroke="#b9e6c3" stroke-width="2" stroke-linecap="round"/></g>
      <g data-sh="apon" data-fx="tough"><path d="M382 84 L394 96 L252 186 L248 252 L238 252 L242 176 Z" fill="#e0a0aa" stroke="#8f3d4b" stroke-width="2"/></g>
      <g data-sh="mull" data-fx="tough"><path d="M390 106 L402 120 L264 202 L252 190 Z" fill="url(#gMull)" stroke="#4f5fa6" stroke-width="2"/></g>
      <g data-sh="whit" data-fx="soft"><ellipse cx="388" cy="94" rx="9" ry="19" fill="#fffdf6" stroke="#8f7d6a" stroke-width="2.5"/><ellipse cx="385" cy="88" rx="2.5" ry="7" fill="#fff"/></g>
      <path d="M244 214 L176 214" stroke="#d98a96" stroke-width="2" stroke-dasharray="4 3" opacity=".8"/>
      <g data-sh="conj" data-fx="soft"><path d="M268 316 L268 206 L398 128 Q430 118 432 142 C410 150 396 162 376 172 S336 198 322 216 S300 252 294 276" fill="none" stroke="#c9486f" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M268 316 L268 206 L398 128 Q430 118 432 142 C410 150 396 162 376 172 S336 198 322 216 S300 252 294 276" fill="none" stroke="#f4a3bd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>
      <g data-sh="marg" data-fx="skin"><path d="M226 314 Q249 306 272 314 L272 326 Q249 336 226 326 Z" fill="#e3b9a0" stroke="#8a6a55" stroke-width="2"/><path d="M232 320 L268 320" stroke="#8a7a70" stroke-width="2"/><circle cx="262" cy="320" r="2" fill="#d9b24a"/><path d="M194 318 Q184 330 180 342 M205 318 Q198 332 195 346 M216 318 Q212 332 211 346 M227 320 Q226 332 227 344" fill="none" stroke="#2c211c" stroke-width="2.6" stroke-linecap="round"/></g>
      <text x="40" y="28" class="lab">Anterior</text><text x="690" y="28" class="lab">Posterior</text><text x="470" y="404" class="lab" text-anchor="middle">Globe</text><text x="640" y="170" class="lab">Orbital fat</text>
    </svg>`,
    orbit: `<svg viewBox="-12 0 520 500" role="img" aria-label="Frontal view of the left bony orbit">${DEFS}
      <defs><clipPath id="cp"><rect x="58" y="58" width="364" height="364" rx="105"/></clipPath>
      <linearGradient id="gRoof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d3dcee"/><stop offset="1" stop-color="#a3b0d0"/></linearGradient>
      <linearGradient id="gLat" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#efd9ad"/><stop offset="1" stop-color="#c9ab72"/></linearGradient>
      <linearGradient id="gFlr" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f8efd6"/><stop offset="1" stop-color="#d8c293"/></linearGradient>
      <linearGradient id="gMed" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ece3cd"/><stop offset="1" stop-color="#c3b494"/></linearGradient>
      <radialGradient id="gDepth" cx="190" cy="222" r="270" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#000" stop-opacity=".62"/><stop offset=".5" stop-color="#000" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <radialGradient id="gFossa" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#8f7f5c"/><stop offset="1" stop-color="#cdbd98"/></radialGradient></defs>
      <g data-fx="bone"><path d="M150 444 Q240 508 330 444 Z" fill="url(#gBone)" stroke="#a8987a" stroke-width="3"/><rect x="30" y="30" width="420" height="420" rx="130" fill="url(#gBone)" stroke="#a8987a" stroke-width="3"/></g>
      <rect x="58" y="58" width="364" height="364" rx="105" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3"/>
      <g clip-path="url(#cp)">
        <g data-sh="roof" data-fx="bone"><polygon points="58,58 422,58 225,190 150,190" fill="url(#gRoof)" stroke="#8f9bb8" stroke-width="2"/></g>
        <g data-sh="lat" data-fx="bone"><polygon points="422,58 422,422 225,255 225,190" fill="url(#gLat)" stroke="#a88f58" stroke-width="2"/></g>
        <g data-sh="floor" data-fx="bone"><polygon points="422,422 58,422 150,255 225,255" fill="url(#gFlr)" stroke="#b8a572" stroke-width="2"/></g>
        <g data-sh="med" data-fx="bone"><polygon points="58,422 58,58 150,190 150,255" fill="url(#gMed)" stroke="#9c8f6f" stroke-width="2"/></g>
        <rect x="150" y="190" width="75" height="65" fill="#2b354a"/>
        <g fill="none" stroke="#5a4a2a" stroke-opacity=".28" stroke-width="2" stroke-dasharray="4 2" pointer-events="none"><path d="M392 80 q10 24 4 46"/><path d="M330 396 q-12 -22 -4 -46"/><path d="M72 128 q22 8 36 2"/><path d="M110 330 q22 -4 38 -22"/></g>
        <polygon points="58,58 422,58 422,422 58,422" fill="url(#gDepth)" pointer-events="none"/>
      </g>
      <g data-sh="fossa" data-fx="soft"><ellipse cx="96" cy="248" rx="10" ry="26" fill="url(#gFossa)" stroke="#8c7d5a" stroke-width="2"/></g>
      <g data-sh="iof" data-fx="soft"><ellipse cx="290" cy="312" rx="62" ry="7" transform="rotate(40.3 290 312)" fill="url(#gHole)" stroke="#fff" stroke-opacity=".7" stroke-width="1.5"/></g>
      <g data-sh="optic" data-fx="soft"><circle cx="172" cy="206" r="12" fill="url(#gHole)" stroke="#fff" stroke-opacity=".8" stroke-width="2"/><circle cx="172" cy="206" r="6" fill="#f0dc84" stroke="#9b8a3c"/></g>
      <g data-sh="sof" data-fx="soft"><ellipse cx="206" cy="232" rx="22" ry="9" transform="rotate(22 206 232)" fill="url(#gHole)" stroke="#fff" stroke-opacity=".8" stroke-width="2"/><g fill="#f0dc84"><circle cx="198" cy="229" r="2.4"/><circle cx="206" cy="232" r="2.4"/><circle cx="214" cy="235" r="2.4"/></g></g>
      <g data-sh="notch" data-fx="soft"><circle cx="158" cy="44" r="7" fill="url(#gHole)" stroke="#fff" stroke-opacity=".8" stroke-width="1.5"/></g>
      <g data-sh="infra" data-fx="soft"><circle cx="240" cy="462" r="7" fill="url(#gHole)" stroke="#fff" stroke-opacity=".8" stroke-width="1.5"/></g>
      <text x="240" y="20" class="lab" text-anchor="middle">Superior</text><text x="240" y="494" class="lab" text-anchor="middle">Inferior</text><text x="-8" y="250" class="lab">Medial</text><text x="454" y="250" class="lab">Lateral</text>
    </svg>`,
    lacrimal: `<svg viewBox="0 0 540 560" role="img" aria-label="Lacrimal drainage system, right eye">${DEFS}
      <path d="M44 50 C140 14 280 20 392 64" fill="none" stroke="#5e4330" stroke-width="13" stroke-linecap="round" opacity=".95"/>
      <path d="M44 50 C140 14 280 20 392 64" fill="none" stroke="#3a281b" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 3" opacity=".8"/>
      <rect x="22" y="92" width="400" height="244" rx="48" fill="url(#gSkin)" data-fx="skin"/>
      <path d="M60 188 C150 92 290 96 372 190" fill="none" stroke="#a46a46" stroke-width="3" opacity=".55"/><path d="M80 262 C170 318 290 318 366 238" fill="none" stroke="#b9805b" stroke-width="3" opacity=".4"/>
      <g data-sh="gl" data-fx="gland"><ellipse cx="120" cy="82" rx="58" ry="22" fill="#f1b2c0" stroke="#b9566f" stroke-width="2.5"/><g fill="#f7c9d3" stroke="#c9667f" stroke-width="1"><circle cx="90" cy="80" r="9"/><circle cx="108" cy="72" r="9"/><circle cx="128" cy="76" r="9"/><circle cx="146" cy="82" r="9"/><circle cx="104" cy="90" r="8"/><circle cx="126" cy="92" r="8"/></g><path d="M96 98 l-6 22 M120 102 l-2 22 M144 98 l6 22" stroke="#b9566f" stroke-width="2" stroke-dasharray="3 3"/></g>
      <path d="M70 200 C150 110 280 110 360 210 C290 290 140 290 70 200 Z" fill="url(#gSclera)" stroke="#6a4630" stroke-width="3.5"/>
      <g clip-path="url(#almond)"><path d="M90 205 C130 200 160 215 190 238 M300 150 C320 170 330 185 340 200 M120 160 C140 180 150 190 160 205 M270 250 C300 240 320 230 340 222" fill="none" stroke="#d9605c" stroke-width="1" opacity=".5"/>
        <circle cx="205" cy="200" r="58" fill="url(#gIris)"/><circle cx="205" cy="200" r="45" fill="none" stroke="#2f5278" stroke-width="22" stroke-dasharray="1.2 2.6" opacity=".4"/><circle cx="205" cy="200" r="58" fill="none" stroke="#14213d" stroke-width="3"/><circle cx="205" cy="200" r="22" fill="#05080f"/><ellipse cx="190" cy="186" rx="10" ry="6" fill="#fff" opacity=".85" transform="rotate(-30 190 186)"/>
        <rect x="60" y="100" width="320" height="110" fill="url(#gLidShade)"/></g>
      <ellipse cx="352" cy="209" rx="12" ry="10" fill="#e07a88" stroke="#b9566f"/><path d="M346 214 C340 220 340 226 346 230" stroke="#d9605c" stroke-width="2" fill="none" opacity=".7"/>
      <path d="M72 204 C150 114 280 114 358 210" fill="none" stroke="#6a4630" stroke-width="3.5"/>
      <path d="M358 214 C290 288 140 288 72 204" fill="none" stroke="#b8dff5" stroke-width="3" opacity=".9"/>
      ${lashes(UP, .05, .76, 22, 17)}${lashes(LO, .26, .94, 14, 11)}
      <rect x="396" y="236" width="68" height="118" rx="26" fill="#eadfc7" stroke="#a8987a" data-fx="bone"/>
      <g data-fx="mucosa"><path d="M392 372 Q392 358 420 358 L524 358 L524 544 L392 544 Z" fill="url(#gMuc)" stroke="#b98660" stroke-width="2.5"/><ellipse cx="462" cy="402" rx="40" ry="14" fill="#f0b1b6" stroke="#c97a85" stroke-width="2"/><ellipse cx="458" cy="452" rx="52" ry="17" fill="#e6918f" stroke="#b9525e" stroke-width="2"/><path d="M416 448 q42 -8 86 0 M418 456 q40 -6 82 0" fill="none" stroke="#b9525e" stroke-width="1.5" opacity=".55"/></g>
      <g data-sh="nld" data-fx="soft">${tube('M432 337 C436 380 436 420 440 486', 10)}</g>
      <g data-sh="sac" data-fx="soft"><ellipse cx="432" cy="285" rx="26" ry="52" fill="url(#gSac)" stroke="#25609b" stroke-width="3"/><ellipse cx="424" cy="268" rx="6" ry="20" fill="#fff" opacity=".6"/></g>
      <g data-sh="cc" data-fx="soft">${tube('M402 205 Q404 228 420 250', 7)}<path d="M404 222 l14 -2 l-4 12" fill="none" stroke="#f2b705" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>
      <g data-sh="ca" data-fx="soft">${tube('M335 183 L338 172 Q375 168 402 204', 7)}${tube('M337 232 L340 243 Q378 246 402 206', 7)}</g>
      <g data-sh="pu" data-fx="soft"><circle cx="335" cy="183" r="6" fill="#0a1020" stroke="#fff" stroke-width="2"/><circle cx="337" cy="232" r="6" fill="#0a1020" stroke="#fff" stroke-width="2"/><circle cx="336" cy="207" r="22" fill="transparent"/></g>
      <g data-sh="has" data-fx="soft"><ellipse cx="440" cy="488" rx="26" ry="11" fill="url(#gSac)" stroke="#25609b" stroke-width="2.5"/></g>
      <text x="12" y="150" class="lab">Lateral</text><text x="470" y="170" class="lab">Medial</text><text x="410" y="530" class="lab">Nasal cavity</text>
    </svg>`
  };

  function hotspot(box, st, done) {
    const N = st.spots.length, seen = new Set(); let sel = -1, hov = -1, mode = 'learn', showAll = false, showNum = true, auto = true, qz = null;
    box.innerHTML = `<p>${esc(st.intro)}</p>
      <div class="dia-bar"><button type="button" data-a="num" class="on">Numbers</button><button type="button" data-a="lab">All labels</button><button type="button" data-a="zoom" class="on">Auto-zoom</button><button type="button" data-a="in" aria-label="Zoom in">＋</button><button type="button" data-a="out" aria-label="Zoom out">－</button><button type="button" data-a="reset">Reset view</button><span class="sp"></span><button type="button" data-a="quiz" class="qz">🎯 Quiz me</button></div>
      <div class="hs-wrap"><div class="dia" id="dia"></div><div><div class="card hs-panel" id="panel"></div><div class="hs-list" id="hl"></div></div></div>`;
    const dia = $('#dia', box); dia.innerHTML = SVG[st.diagram]; const svg = $('svg', dia), NS = 'http://www.w3.org/2000/svg';
    $$('[data-fx]', svg).forEach(el => { const g = document.createElementNS(NS, 'g'); g.setAttribute('filter', `url(#fx${el.dataset.fx})`); while (el.firstChild) g.appendChild(el.firstChild); el.appendChild(g); });
    const vb = svg.viewBox.baseVal, base = { x: vb.x, y: vb.y, w: vb.width, h: vb.height }, cur = { ...base };
    const setVB = (x, y, w, h) => { cur.x = x; cur.y = y; cur.w = w; cur.h = h; svg.setAttribute('viewBox', `${x} ${y} ${w} ${h}`); svg.style.setProperty('--mr', (10 * Math.max(.5, w / base.w)).toFixed(2) + 'px'); };
    let raf = 0; const tween = (x, y, w, h) => { cancelAnimationFrame(raf); const f = { ...cur }, t0 = performance.now(); const step = t => { const k = Math.min(1, (t - t0) / 280), e = k * (2 - k); setVB(f.x + (x - f.x) * e, f.y + (y - f.y) * e, f.w + (w - f.w) * e, f.h + (h - f.h) * e); if (k < 1) raf = requestAnimationFrame(step); }; raf = requestAnimationFrame(step); };
    const clampView = (x, y, w, h) => { w = Math.min(w, base.w); h = Math.min(h, base.h); return [Math.max(base.x, Math.min(x, base.x + base.w - w)), Math.max(base.y, Math.min(y, base.y + base.h - h)), w, h]; };
    const els = st.spots.map(s => (s.sh || []).map(id => svg.querySelector(`[data-sh="${id}"]`)).filter(Boolean));
    const lb = document.createElementNS(NS, 'g'), mk = document.createElementNS(NS, 'g');
    const flash = (k, cls) => els[k].forEach(e => { e.classList.add(cls); setTimeout(() => e.classList.remove(cls), 700); });
    els.forEach((arr, k) => arr.forEach(e => {
      e.classList.add('shp'); e.setAttribute('tabindex', '0'); e.setAttribute('role', 'button'); e.setAttribute('aria-label', mode === 'quiz' ? 'structure' : st.spots[k].t);
      e.addEventListener('click', () => act(k)); e.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); act(k); } });
      e.addEventListener('mouseenter', () => { if (mode === 'learn') { hov = k; labels(); } }); e.addEventListener('mouseleave', () => { hov = -1; labels(); });
    }));
    st.spots.forEach((s, k) => { const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'hs'); g.setAttribute('data-k', k); g.innerHTML = `<circle cx="${s.x}" cy="${s.y}" r="10"/><text x="${s.x}" y="${s.y}">${k + 1}</text>`; g.addEventListener('click', () => act(k)); g.addEventListener('mouseenter', () => { if (mode === 'learn') { hov = k; labels(); } }); g.addEventListener('mouseleave', () => { hov = -1; labels(); }); mk.appendChild(g); });
    svg.appendChild(mk); svg.appendChild(lb);
    function labels() {
      lb.innerHTML = ''; if (mode !== 'learn') return;
      const idx = showAll ? st.spots.map((_, i) => i) : [...new Set([sel, hov].filter(i => i >= 0))];
      idx.forEach(k => { const s = st.spots[k], g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'pill'); const r = document.createElementNS(NS, 'rect'), t = document.createElementNS(NS, 'text'); t.textContent = s.t.length > 34 ? s.t.slice(0, 32) + '…' : s.t; g.appendChild(r); g.appendChild(t); lb.appendChild(g); const bb = t.getBBox ? (t.setAttribute('x', 0), t.setAttribute('y', 0), t.getBBox()) : { width: 100, height: 14 }; const w = bb.width + 14, h = 22; let x = s.x - w / 2; x = Math.max(base.x + 4, Math.min(x, base.x + base.w - w - 4)); let y = s.y - 16 - h; if (y < base.y + 4) y = s.y + 16; r.setAttribute('x', x); r.setAttribute('y', y); r.setAttribute('width', w); r.setAttribute('height', h); r.setAttribute('rx', 11); t.setAttribute('x', x + w / 2); t.setAttribute('y', y + h / 2 + 1); });
    }
    function zoomTo(k) {
      if (!els[k].length) return; let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      els[k].forEach(e => { const b = e.getBBox(); x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y); x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height); });
      const asp = base.w / base.h; let w = Math.max((x1 - x0) * 2.4, base.w * .42), h = w / asp; if (h < (y1 - y0) * 1.8) { h = (y1 - y0) * 1.8; w = h * asp; }
      tween(...clampView((x0 + x1) / 2 - w / 2, (y0 + y1) / 2 - h / 2, w, h));
    }
    const resetView = () => tween(base.x, base.y, base.w, base.h);
    function mark() {
      dia.classList.toggle('has-sel', sel >= 0 && mode === 'learn');
      els.forEach((arr, j) => arr.forEach(e => { e.classList.toggle('sel', j === sel && mode === 'learn'); e.classList.toggle('seenshp', seen.has(j) && mode === 'learn'); }));
      $$('.hs', box).forEach((g, j) => { g.classList.toggle('on', j === sel); g.classList.toggle('seen', seen.has(j)); });
      $$('#hl button', box).forEach((b, j) => { b.classList.toggle('on', j === sel); b.classList.toggle('seen', seen.has(j)); });
    }
    function learnPanel() {
      const p = $('#panel', box);
      if (sel < 0) { p.innerHTML = `<p class="sample">Click a structure on the diagram, a number or a name below.</p><p class="sample">${N} structures · ${seen.size} explored</p>`; return; }
      const s = st.spots[sel]; p.innerHTML = `<h3 style="margin-top:0"><span class="n">${sel + 1}</span>${esc(s.t)}</h3><p>${esc(s.d)}</p><p class="sample">${seen.size} of ${N} explored</p>`;
    }
    function pick(k) { sel = k; seen.add(k); learnPanel(); labels(); mark(); if (auto) zoomTo(k); if (seen.size >= Math.ceil(N * .8)) done(); }
    function act(k) { if (mode === 'quiz') answer(k); else pick(k); }
    $('#hl', box).innerHTML = st.spots.map((s, k) => `<button type="button" data-k="${k}">${k + 1}. ${esc(s.t)}</button>`).join('');
    $$('#hl button', box).forEach(b => b.onclick = () => { if (mode === 'learn') pick(+b.dataset.k); });
    /* quiz */
    function startQuiz() { mode = 'quiz'; qz = { order: shuffle(st.spots.map((_, i) => i)), i: 0, score: 0, first: true, wrong: 0 }; sel = -1; hov = -1; mk.style.display = 'none'; lb.innerHTML = ''; $('#hl', box).style.display = 'none'; resetView(); mark(); quizPanel(); $$('.dia-bar button', box).forEach(b => b.disabled = !['quiz', 'reset', 'in', 'out'].includes(b.dataset.a)); $('[data-a=quiz]', box).textContent = '✕ Exit quiz'; }
    function endQuiz() { mode = 'learn'; qz = null; mk.style.display = showNum ? '' : 'none'; $('#hl', box).style.display = ''; $$('.dia-bar button', box).forEach(b => b.disabled = false); $('[data-a=quiz]', box).textContent = '🎯 Quiz me'; learnPanel(); labels(); mark(); }
    function quizPanel() {
      const p = $('#panel', box);
      if (qz.i >= qz.order.length) { p.innerHTML = `<h3 style="margin-top:0">Quiz complete</h3><div class="bigc">${qz.score}<small> / ${N} on the first try</small></div>${bar(Math.round(100 * qz.score / N))}<p class="sample">Exit the quiz to review any structure you missed.</p><button class="btn" type="button" id="qa">Try again</button>`; $('#qa', box).onclick = startQuiz; done(); return; }
      const s = st.spots[qz.order[qz.i]]; p.innerHTML = `<div class="kicker">Question ${qz.i + 1} of ${N} · score ${qz.score}</div><h3 style="margin:6px 0 10px">Click: <span class="qname">${esc(s.t)}</span></h3><p class="sample" id="qf">${qz.wrong ? 'Not that one — try again.' : 'Select the structure on the diagram.'}</p><button class="btn alt sm" type="button" id="qs">Skip</button> ${qz.wrong >= 2 ? '<button class="btn alt sm" type="button" id="qh">Show me</button>' : ''}`;
      $('#qs', box).onclick = () => { qz.i++; qz.first = true; qz.wrong = 0; quizPanel(); }; const h = $('#qh', box); if (h) h.onclick = () => flash(qz.order[qz.i], 'flash-ok');
    }
    function answer(k) { if (!qz || qz.i >= qz.order.length) return; const t = qz.order[qz.i]; if (k === t) { flash(k, 'flash-ok'); if (qz.first) qz.score++; qz.i++; qz.first = true; qz.wrong = 0; setTimeout(quizPanel, 350); } else { flash(k, 'flash-no'); qz.first = false; qz.wrong++; quizPanel(); } }
    /* controls */
    $$('.dia-bar button', box).forEach(b => b.onclick = () => {
      const a = b.dataset.a;
      if (a === 'num') { showNum = !showNum; b.classList.toggle('on', showNum); mk.style.display = showNum ? '' : 'none'; }
      else if (a === 'lab') { showAll = !showAll; b.classList.toggle('on', showAll); labels(); }
      else if (a === 'zoom') { auto = !auto; b.classList.toggle('on', auto); }
      else if (a === 'in' || a === 'out') { const f = a === 'in' ? .7 : 1 / .7, w = Math.min(base.w, cur.w * f), h = w * base.h / base.w; tween(...clampView(cur.x + cur.w / 2 - w / 2, cur.y + cur.h / 2 - h / 2, w, h)); }
      else if (a === 'reset') resetView();
      else if (a === 'quiz') { mode === 'quiz' ? endQuiz() : startQuiz(); }
    });
    learnPanel(); mark();
  }

  function flash(box, st, done) {
    let k = 0, back = false, seenAll = new Set();
    box.innerHTML = `<div class="flip"><div class="face" id="face" tabindex="0" role="button" aria-live="polite"></div></div><div class="pager" style="max-width:560px;margin:0 auto"><button class="btn alt" id="pv" type="button">←</button><span id="ct" class="sample" style="align-self:center"></span><button class="btn alt" id="nx" type="button">→</button></div>`;
    const f = $('#face', box);
    const draw = () => { const [q, a] = st.cards[k]; f.className = 'face' + (back ? ' back' : ''); f.innerHTML = back ? `${esc(a)}<small>Click to flip back</small>` : `${esc(q)}<small>Click to reveal the answer</small>`; $('#ct', box).textContent = `Card ${k + 1} / ${st.cards.length}`; if (back) seenAll.add(k); if (seenAll.size === st.cards.length) done(); };
    f.onclick = () => { back = !back; draw(); }; f.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f.click(); } };
    $('#pv', box).onclick = () => { k = (k - 1 + st.cards.length) % st.cards.length; back = false; draw(); };
    $('#nx', box).onclick = () => { k = (k + 1) % st.cards.length; back = false; draw(); };
    draw();
  }

  function quiz(box, st, key, done) {
    const prev = S.scores[key];
    box.innerHTML = `${st.questions.map((q, qi) => `<div class="q" data-q="${qi}"><b>${qi + 1}. ${esc(q.q)}</b>${q.o.map((o, oi) => `<label class="opt"><input type="radio" name="q${qi}" value="${oi}"><span>${esc(o)}</span></label>`).join('')}<div class="why" hidden></div></div>`).join('')}
      <button class="btn" id="chk" type="button">Check answers</button> <span class="score" id="sc"></span>${prev ? `<p class="sample">Previous best: ${prev.score}/${prev.total}</p>` : ''}`;
    $('#chk', box).onclick = () => {
      let score = 0;
      st.questions.forEach((q, qi) => {
        const sel = $(`input[name=q${qi}]:checked`, box); const opts = $$(`.q[data-q="${qi}"] .opt`, box);
        opts.forEach((o, oi) => { o.classList.remove('ok', 'no'); if (oi === q.a) o.classList.add('ok'); else if (sel && +sel.value === oi) o.classList.add('no'); });
        if (sel && +sel.value === q.a) score++;
        const w = $(`.q[data-q="${qi}"] .why`, box); w.hidden = false; w.textContent = (sel ? (+sel.value === q.a ? '✓ Correct. ' : '✗ Not quite. ') : 'No answer selected. ') + q.why;
      });
      $('#sc', box).textContent = `Score: ${score} / ${st.questions.length}`;
      if (!S.scores[key] || score > S.scores[key].score) S.scores[key] = { score, total: st.questions.length };
      save(); done();
    };
  }

  function caseStep(box, st, key, done) {
    let k = 0, first = 0, tried = false;
    const draw = () => {
      if (k >= st.stages.length) { S.scores[key] = { score: first, total: st.stages.length }; save(); done(); box.innerHTML = `<div class="out"><div class="big">${first} / ${st.stages.length}</div><p>decisions correct on the first attempt.</p></div>`; return; }
      const s = st.stages[k]; tried = false;
      box.innerHTML = `${k === 0 ? `<p class="sample">${esc(st.intro)}</p>` : ''}<div class="callout"><p>${s.prompt}</p></div><div id="opts">${s.o.map((o, oi) => `<button type="button" class="case-opt" data-o="${oi}">${esc(o.t)}</button>`).join('')}</div><div id="fb"></div><p class="sample">Decision ${k + 1} of ${st.stages.length}</p>`;
      $$('.case-opt', box).forEach(b => b.onclick = () => {
        const o = s.o[+b.dataset.o]; b.classList.add(o.ok ? 'ok' : 'no');
        $('#fb', box).innerHTML = `<div class="fb ${o.ok ? 'ok' : 'no'}">${o.ok ? '✓ ' : '✗ '}${esc(o.fb)}${o.ok ? `<div style="margin-top:10px"><button class="btn" id="cn" type="button">${k + 1 < st.stages.length ? 'Continue →' : 'See result'}</button></div>` : ''}</div>`;
        if (o.ok) { if (!tried) first++; $$('.case-opt', box).forEach(x => x.disabled = true); $('#cn', box).onclick = () => { k++; draw(); }; } else tried = true;
      });
    };
    draw();
  }

  /* ---------- tools ---------- */
  const TOOLS = {
    ptosis: {
      title: 'Ptosis surgical planning assistant', blurb: 'Enter exam findings to see severity, levator-function class and commonly used procedures. Educational aid only.',
      render(box) {
        box.innerHTML = `<p class="sample">Educational aid — not a substitute for clinical judgment.</p><div class="form">
          <label>MRD1 (mm)<input type="number" id="mrd" step="0.5" min="-4" max="6" value="1"></label>
          <label>Levator function (mm)<input type="number" id="lf" step="1" min="0" max="20" value="12"></label>
          <label>Phenylephrine 2.5% test<select id="ph"><option value="pos">Positive (≥ 2 mm lift)</option><option value="neg">Negative / minimal</option><option value="na">Not performed</option></select></label>
          <label>Bell phenomenon<select id="bell"><option value="good">Good</option><option value="poor">Poor / absent</option></select></label>
          <label>Ocular surface<select id="dry"><option value="none">Normal</option><option value="dry">Dry eye / reduced tear film</option></select></label>
          <label>Onset / suspected cause<select id="et"><option value="apo">Acquired — aponeurotic</option><option value="cong">Congenital</option><option value="neuro">Neurogenic / mechanical / myasthenic</option></select></label></div>
          <div id="po" class="out"></div>`;
        const run = () => {
          const g = id => $('#' + id, box).value; const mrd = +g('mrd'), lf = +g('lf'), ph = g('ph'), bell = g('bell'), dry = g('dry'), et = g('et');
          const amt = Math.max(0, 4.5 - mrd); const sev = amt <= 2 ? 'Mild' : amt <= 3 ? 'Moderate' : 'Severe';
          const lfc = lf >= 12 ? 'Excellent' : lf >= 8 ? 'Good' : lf >= 5 ? 'Fair' : 'Poor';
          const o = [], w = [];
          if (et === 'neuro') w.push('Evaluate and treat the underlying neurogenic, myasthenic or mechanical cause before any ptosis surgery. Consider neuro-ophthalmic work-up.');
          if (lfc === 'Poor') { o.push('Frontalis suspension (autogenous fascia lata is the most durable; silicone or other materials for temporising/young children).'); if (et === 'cong') w.push('In a child: assess for amblyopia, astigmatism and a chin-up head posture; time surgery accordingly.'); }
          else if (lfc === 'Fair') o.push('Levator resection (larger resection), with attention to lagophthalmos; consider adjustable techniques.');
          else {
            if (amt <= 2.5 && ph === 'pos') o.push('Müller muscle–conjunctival resection (internal approach).');
            if (et === 'apo' || et === 'cong') o.push('External levator advancement / resection.');
            if (!o.length) o.push('External levator advancement/resection; Müller-based surgery is less predictable without a positive phenylephrine response.');
          }
          if (bell === 'poor') w.push('Poor Bell phenomenon: risk of exposure keratopathy — under-correct and counsel; lubrication and close follow-up.');
          if (dry === 'dry') w.push('Treat the ocular surface first and accept a more conservative lid height.');
          if (mrd <= 0) w.push('Visual axis likely obstructed — consider timing, especially in children.');
          $('#po', box).innerHTML = `<b>Severity:</b> ${sev} ptosis (≈ ${amt.toFixed(1)} mm below a 4.5 mm reference) · <b>Levator function:</b> ${lfc} (${lf} mm)<h4 style="margin-top:12px">Commonly considered procedures</h4><ul>${o.map(x => `<li>${x}</li>`).join('')}</ul>${w.length ? `<h4>Cautions</h4><ul>${w.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}`;
        };
        $$('input,select', box).forEach(el => el.oninput = run); run();
      }
    },
    cas: {
      title: 'Thyroid eye disease — Clinical Activity Score', blurb: 'Seven-item CAS; 3 or more indicates active inflammatory disease.',
      render(box) {
        const items = ['Spontaneous orbital pain', 'Gaze-evoked orbital pain', 'Eyelid swelling (inflammatory)', 'Eyelid erythema', 'Conjunctival redness', 'Chemosis', 'Inflammation of caruncle or plica'];
        box.innerHTML = `<p class="sample">Tick each sign or symptom that is present. Educational aid only.</p>${items.map((t, i) => `<label class="chk"><input type="checkbox" data-i="${i}"> ${t}</label>`).join('')}<div id="co" class="out"></div>`;
        const run = () => {
          const n = $$('input:checked', box).length; const act = n >= 3;
          $('#co', box).innerHTML = `<div class="big">${n} / 7 <span class="tag ${act ? 'act' : 'ina'}">${act ? 'ACTIVE' : 'NOT ACTIVE'}</span></div><p>${act ? 'Active (inflammatory) disease: consider immunomodulatory therapy appropriate to severity; urgent action if there is sight threat (optic neuropathy, corneal breakdown).' : 'Inactive by CAS. If severity persists, rehabilitative surgery is considered once disease has been stable (order: decompression → strabismus → eyelids).'}</p>`;
        };
        $$('input', box).forEach(el => el.onchange = run); run();
      }
    }
  };

  function toolsPage() {
    view.innerHTML = `<h1>Clinical tools</h1><p class="sample">Interactive aids used within the modules. Educational use only.</p><div id="tt"></div>`;
    const tt = $('#tt');
    Object.values(TOOLS).forEach(t => { const d = document.createElement('div'); d.className = 'card'; d.style.marginTop = '18px'; d.innerHTML = `<h2>${t.title}</h2><p>${t.blurb}</p><div class="tb"></div>`; tt.appendChild(d); t.render($('.tb', d)); });
  }

  /* ---------- landing, fellowship at a glance, task board ---------- */
  const CATS = {
    'Eyelid': ['Ptosis – levator advancement/resection', 'Ptosis – Müller muscle–conjunctival resection', 'Ptosis – frontalis suspension', 'Upper blepharoplasty', 'Lower blepharoplasty', 'Ectropion repair', 'Entropion repair', 'Lateral canthoplasty / tarsal strip', 'Eyelid retraction repair', 'Eyelid laceration repair', 'Brow ptosis repair'],
    'Lacrimal': ['DCR – external', 'DCR – endonasal', 'Nasolacrimal probing / intubation', 'Canalicular laceration repair', 'Punctoplasty', 'Conjunctivodacryocystorhinostomy (Jones tube)'],
    'Orbit': ['Orbital fracture repair', 'Orbital decompression', 'Orbitotomy (mass / biopsy)', 'Lateral canthotomy / cantholysis'],
    'Oncology & reconstruction': ['Eyelid lesion biopsy', 'Eyelid tumour excision (margin-controlled)', 'Eyelid reconstruction – direct closure / flap', 'Eyelid reconstruction – graft', 'Eyelid reconstruction – Hughes / Cutler–Beard'],
    'Socket & globe': ['Enucleation', 'Evisceration', 'Exenteration', 'Socket reconstruction / implant revision'],
    'Facial & aesthetic': ['Botulinum toxin / filler', 'Facial nerve palsy (e.g. gold weight, canthoplasty)', 'Facelift / midface lift'],
    'Other': []
  };
  const OTHER = 'Other (type procedure)';
  const PROCS = Object.values(CATS).flat();
  const ROLES = ['Primary surgeon', 'Assistant', 'Teaching assistant', 'Observer'];
  const uid = () => Math.random().toString(36).slice(2, 9);

  function home() {
    const cases = S.log.length, cg = cgStats(), sg = sgStats(), dg = dgStats(), nu = nextUp(), pct = overall(), stk = streak();
    const hr = new Date().getHours(), hi = hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
    const nm = ', ' + esc(S.name || 'Joon');
    const ringHtml = `<div class="h-ring" role="img" aria-label="${pct}% of learning modules complete"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="rt"/><circle cx="60" cy="60" r="52" class="rf" style="stroke-dasharray:${(326.7 * pct / 100).toFixed(1)} 326.7"/></svg><div><b>${pct}%</b><span>complete</span></div></div>`;
    view.innerHTML = `<section class="home">
      <div class="h-hero">
        <div class="h-copy"><div class="h-top"><span class="h-eyebrow">Global Oculoplastics · Fellowship &amp; Research</span><div class="h-streak" title="Consecutive days you have opened the portal" role="img" aria-label="${stk} day streak"><span class="fl">🔥</span><b>${stk}</b><small>day streak</small></div></div>
          <div class="h-head"><h1>${hi}${nm}.<br>Let's GO-FAR today!</h1></div>
          <p>${nu ? 'Short, interactive lessons you can finish between cases. Pick up right where you left off.' : 'You have completed every module. Excellent work.'}</p>
          <div class="h-cta">${nu ? `<a class="btn gold" href="#/learn/${nu.c.id}/${nu.m.id}/${nu.i}">Continue learning →</a><span class="h-next">${esc(nu.m.title)}</span>${ringHtml}` : '<a class="btn gold" href="#/courses">Review modules</a>' + ringHtml}</div></div>
        
        <div class="h-boxes"><a class="h-glance" href="#/year"><span class="ic">🗓</span><b>Fellowship at a Glance</b><small>${yearSummary()}</small><i>Open schedule →</i></a><div class="h-glance h-board"><a class="hb-title" href="#/board"><span class="ic">✅</span><b>Task Board</b></a>
          <ul><li><a href="#/log"><span>📓 Surgical log</span><em>${cases} case${cases === 1 ? '' : 's'}</em></a></li>
          <li><a href="#/clinical"><span>🩺 Clinical goals</span><em>${cg.d}/${cg.t}</em></a></li>
          <li><a href="#/surgical"><span>🎯 Surgical goals</span><em>${sg.d}/${sg.t}</em></a></li>
          <li><a href="#/didactic"><span>🎓 Didactic &amp; scholarly</span><em>${dg.d}/${dg.t}</em></a></li></ul></div></div>
      </div>
      <h2 class="h-h2">Where to next?</h2>
      <div class="h-grid">
        <a class="h-card c-exam" href="#/exam"><span class="ic">📝</span><b>Knowledge Checkpoint</b><small>Find your starting point and see where to focus</small><i class="go">Open →</i></a>
        <a class="h-card c-learn" href="#/courses"><span class="ic">📚</span><b>Learning modules</b><small>${COURSES.length} courses · ${pct}% complete</small><i class="go">Open →</i></a>
        <a class="h-card c-res" href="#/library"><span class="ic">🔖</span><b>Resources</b><small>${LIBRARY.length} references, societies and guidelines</small><i class="go">Open →</i></a>
        <a class="h-card c-prac" href="#/practice"><span class="ic">🧠</span><b>Question bank</b><small>Practise and test yourself</small><i class="go">Open →</i></a>
        <a class="h-card c-tools" href="#/tools"><span class="ic">🧮</span><b>Clinical tools</b><small>Quick calculators and references</small><i class="go">Open →</i></a>
      </div></section>`;
  }
  function yearSummary() {
    if (!S.start) return 'Programme schedule · set your start month';
    const [y, m] = S.start.split('-').map(Number), now = new Date();
    const el = Math.max(0, Math.min(S.program === '6' ? 6 : 12, (now.getFullYear() - y) * 12 + now.getMonth() + 1 - m + 1));
    return `Month ${el} of ${S.program === '6' ? 6 : 12}`;
  }

  function monthsFrom(start) {
    const [y, m] = start.split('-').map(Number); const out = [];
    for (let i = 0; i < 12; i++) { const d = new Date(y, m - 1 + i, 1); out.push({ key: d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'), label: d.toLocaleString('en', { month: 'long', year: 'numeric' }) }); }
    return out;
  }
  const EV_TYPES = ['Rotation', 'Conference', 'Research', 'Exam / assessment', 'Leave', 'Other'];
  const KIND = { clinic: ['Clinic', '#2b8a8d'], train: ['Training', '#7a5af8'], learn: ['Online', '#1971c2'], obs: ['Observership', '#d9480f'], conf: ['Conference', '#c2255c'] };
  function curMonth() {
    if (!S.start) return 0; const [y, m] = S.start.split('-').map(Number), n = new Date();
    return (n.getFullYear() - y) * 12 + n.getMonth() + 1 - m + 1;
  }
  function yearPage() {
    const start = S.start || today().slice(0, 7), six = S.program === '6', N = six ? 6 : 12, prog = six ? window.YEAR6 : window.YEAR;
    const ms = monthsFrom(start).slice(0, N), nowKey = today().slice(0, 7), cm = curMonth();
    const cur = cm >= 1 && cm <= N ? prog.find(b => cm >= b.from && cm <= b.to) : null;
    view.innerHTML = `<h1>Fellowship at a Glance</h1><div class="tabs">${[['12', '12-month program'], ['6', '6-month program']].map(([k, l]) => `<button type="button" data-p="${k}" class="${S.program === k || (!S.program && k === '12') ? 'on' : ''}">${l}</button>`).join('')}</div><p class="sample">The ${N}-month fellowship in blocks of time. Set your start month to highlight where you are now.</p>
      <div class="card" style="display:flex;gap:14px;align-items:end;flex-wrap:wrap;margin:12px 0"><label class="form" style="display:block;margin:0"><label>Fellowship start month<input type="month" id="st" value="${start}"></label></label>
        <div class="legend">${Object.values(KIND).map(([l, c]) => `<span><i style="background:${c}"></i>${l}</span>`).join('')}</div></div>
      <ol class="blocks">${prog.map(b => `<li class="block ${b === cur ? 'now' : ''}"><div class="when"><b>${b.label}</b>${b === cur ? '<span class="pill">You are here</span>' : ''}</div>
        <div class="what"><div class="weekbar" aria-hidden="true">${[1, 2, 3, 4].map(w => { const wr = b.rows.filter(x => x.kind !== 'learn'); const r = w < 4 ? wr[0] : wr[1]; return `<i style="background:${KIND[r.kind][1]}"></i>`; }).join('')}</div>
        ${b.rows.map(r => `<div class="trow"><span class="wk">${r.weeks}</span><div><span class="tag" style="background:${KIND[r.kind][1]}">${KIND[r.kind][0]}</span> <b>${r.href ? `<a href="${r.href}">${esc(r.t)}</a>` : esc(r.t)}</b>${r.sub ? `<div class="sub">${esc(r.sub)}</div>` : ''}</div></div>`).join('')}</div></li>`).join('')}</ol>
      ${six ? '' : '<p class="sample">Note: the source schedule lists Month 10 in two blocks (8–10 and 10–12). Confirm with programme leadership.</p>'}
      <details class="card" style="margin-top:18px"><summary><b>My personal calendar</b> — add your own rotations, deadlines and exams by month</summary>
      <div class="grid g3" style="margin-top:14px">${ms.map(m => `<div class="card month ${m.key === nowKey ? 'now' : ''}"><h3 style="margin-top:0">${m.label}${m.key === nowKey ? ' <span class="pill">this month</span>' : ''}</h3>
        <ul class="list">${(S.events[m.key] || []).map(e => `<li><span class="dot"></span><div style="flex:1"><b>${esc(e.t)}</b><br><span class="sample">${esc(e.k)}</span></div><button class="x" data-m="${m.key}" data-id="${e.id}" aria-label="Remove" type="button">✕</button></li>`).join('') || '<li class="sample">No items yet</li>'}</ul>
        <form class="add" data-m="${m.key}"><input placeholder="Add item…" required><select>${EV_TYPES.map(t => `<option>${t}</option>`).join('')}</select><button class="btn" type="submit">Add</button></form></div>`).join('')}</div></details>`;
    if (S.events && Object.values(S.events).some(a => a.length)) $('details', view).open = true;
    $$('.tabs button', view).forEach(b => b.onclick = () => { S.program = b.dataset.p; save(); yearPage(); });
    $('#st', view).onchange = e => { S.start = e.target.value; save(); yearPage(); };
    $$('form.add', view).forEach(f => f.onsubmit = e => { e.preventDefault(); const k = f.dataset.m; (S.events[k] = S.events[k] || []).push({ id: uid(), t: f.querySelector('input').value.trim(), k: f.querySelector('select').value }); save(); yearPage(); });
    $$('.x', view).forEach(b => b.onclick = () => { S.events[b.dataset.m] = S.events[b.dataset.m].filter(e => e.id !== b.dataset.id); save(); yearPage(); });
  }

  function boardPage() {
    const key = (location.hash.split('/')[1] || '').split('?')[0];
    const t = { log: 'log', clinical: 'clin', surgical: 'surg', didactic: 'did' }[key];
    if (!t) {
      const set = Object.values(S.targets).filter(n => n > 0).length;
      view.innerHTML = `<h1>Task board</h1><p class="sample">Track your cases and fellowship goals.</p><div class="grid g3" style="margin-top:14px">
        <a class="card course" href="#/log"><div class="band" style="background:#0f8b8d"></div><div class="body"><h3>📓 Surgical log</h3><p>Record the surgeries you have performed, assisted or observed.</p><div class="meta"><span class="pill">${S.log.length} case${S.log.length === 1 ? '' : 's'} logged</span></div></div></a>
        <a class="card course" href="#/clinical"><div class="band" style="background:#7a5af8"></div><div class="body"><h3>🩺 Clinical goals</h3><p>Set and tick off your clinical objectives for the fellowship.</p><div class="meta"><span class="pill">${cgStats().d}/${cgStats().t} complete</span></div></div></a>
        <a class="card course" href="#/surgical"><div class="band" style="background:#d9480f"></div><div class="body"><h3>🎯 Surgical goals</h3><p>Key steps to complete during each procedure.</p><div class="meta"><span class="pill">${sgStats().d}/${sgStats().t} steps performed</span></div></div></a>
        <a class="card course" href="#/didactic"><div class="band" style="background:#1971c2"></div><div class="body"><h3>🎓 Didactic and scholarly activity</h3><p>Conferences, journal clubs, presentations and other scholarly goals.</p><div class="meta"><span class="pill">${dgStats().d}/${dgStats().t} complete</span></div></div></a></div>`;
      return;
    }
    const title = { log: 'Surgical log', clin: 'Clinical goals', surg: 'Surgical goals', did: 'Didactic and scholarly activity' }[t];
    view.innerHTML = `<div class="crumbs"><a href="#/board">Task board</a> › ${title}</div><h1>${title}</h1><div id="bd" class="card"></div>`;
    ({ log: logTab, clin: clinTab, surg: surgTab, did: didTab }[t])($('#bd', view));
  }
  const opts = a => a.map(x => `<option>${esc(x)}</option>`).join('');
  function logTab(el) {
    const rows = [...S.log].sort((a, b) => b.d.localeCompare(a.d));
    const catOf = r => r.cat || Object.keys(CATS).find(c => CATS[c].includes(r.p)) || 'Other';
    const cats = Object.keys(CATS);
    const sum = cats.map(c => { const l = rows.filter(r => catOf(r) === c); return [c, l.filter(r => r.r === 'Primary surgeon').length, l.filter(r => r.r === 'Assistant' || r.r === 'Teaching assistant').length, l.filter(r => r.r === 'Observer').length, l.length]; }).filter(x => x[4]);
    const sel = (n, a, l) => `<label>${l}<select name="${n}">${opts(a)}</select></label>`;
    el.innerHTML = `<div class="callout warn"><h4>Privacy</h4><p>Do not enter patient names, record numbers, birth dates or other identifiers. Data stays in this browser only.</p></div>
      <p class="sample">Template modelled on ACGME-style fellowship case logs (date, role, category, procedure, laterality, age group). Replace the categories and procedure lists with the official ASOPRS log requirements once confirmed by programme leadership.</p>
      <form id="lf" class="logform"><fieldset><legend>Case</legend><div class="form">
        <label>Date of surgery<input type="date" name="d" value="${today()}" required></label>
        ${sel('age', ['Adult (≥ 18)', 'Pediatric (< 18)'], 'Patient age group')}
        ${sel('side', ['Right', 'Left', 'Bilateral', 'Not applicable'], 'Laterality')}
        <label>Institution / site (optional)<input name="site" placeholder="e.g. hospital name"></label>
        <label>Supervising surgeon<input name="s" placeholder="optional"></label></div></fieldset>
      <fieldset><legend>Procedure</legend><div class="form">
        <label>Category<select name="cat">${opts(cats)}</select></label>
        <label>Procedure<select name="p"></select></label>
        <label id="po" hidden>Procedure (free text)<input name="pt" placeholder="Type the procedure"></label>
        <label>Fellow role<select name="r">${opts(ROLES)}</select></label>
        ${sel('an', ['Local', 'Local + sedation', 'General', 'Topical / none'], 'Anesthesia')}
        </div></fieldset>
      <fieldset><legend>Outcome</legend><div class="form">
        ${sel('comp', ['None', 'Intraoperative', 'Postoperative (early)', 'Postoperative (late)'], 'Complications')}
        <label style="grid-column:1/-1">Notes (non-identifying)<input name="n" placeholder="learning points, technique, complications detail"></label></div></fieldset>
      <button class="btn" type="submit">Add case to log</button></form>
      <h3>Summary by category</h3>
      ${sum.length ? `<table class="tbl"><thead><tr><th>Category</th><th>Primary surgeon</th><th>Assistant / teaching</th><th>Observer</th><th>Total</th></tr></thead><tbody>${sum.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><b>${r[4]}</b></td></tr>`).join('')}<tr><td><b>All</b></td><td><b>${sum.reduce((a, r) => a + r[1], 0)}</b></td><td><b>${sum.reduce((a, r) => a + r[2], 0)}</b></td><td><b>${sum.reduce((a, r) => a + r[3], 0)}</b></td><td><b>${rows.length}</b></td></tr></tbody></table>` : '<p class="sample">No cases logged yet.</p>'}
      <h3>Logged cases</h3>
      ${rows.length ? `<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Date</th><th>Category</th><th>Procedure</th><th>Side</th><th>Age</th><th>Role</th><th>Site / supervisor</th><th>Complications</th><th>Notes</th><th></th></tr></thead><tbody>${rows.map(r => `<tr><td>${r.d}</td><td>${esc(catOf(r))}</td><td>${esc(r.p)}</td><td>${esc(r.side || '')}</td><td>${esc((r.age || '').split(' ')[0])}</td><td>${r.r}</td><td>${esc([r.site, r.s].filter(Boolean).join(' / '))}</td><td>${esc(r.comp || '')}</td><td>${esc(r.n || '')}</td><td><button class="x" data-id="${r.id}" type="button" aria-label="Delete">✕</button></td></tr>`).join('')}</tbody></table></div><button class="btn alt" id="csv" type="button">Export CSV</button>` : '<p class="sample">Cases you add appear here.</p>'}`;
    const f = $('#lf', el), cs = f.elements.cat, ps = f.elements.p;
    const po = $('#po', f), pt = f.elements.pt;
    const toggle = () => { const o = ps.value === OTHER; po.hidden = !o; pt.required = o; if (!o) pt.value = ''; };
    const fill = () => { ps.innerHTML = opts([...CATS[cs.value], OTHER]); toggle(); };
    cs.onchange = fill; ps.onchange = toggle; fill();
    f.onsubmit = e => { e.preventDefault(); const g = n => f.elements[n].value.trim(); S.log.push({ id: uid(), d: g('d'), age: g('age'), side: g('side'), site: g('site'), s: g('s'), cat: g('cat'), p: ps.value === OTHER ? g('pt') : g('p'), r: g('r'), an: g('an'), comp: g('comp'), n: g('n') }); save(); boardPage(); };
    $$('.x', el).forEach(b => b.onclick = () => { S.log = S.log.filter(r => r.id !== b.dataset.id); save(); boardPage(); });
    const c = $('#csv', el); if (c) c.onclick = () => { const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; const H = ['Date', 'Category', 'Procedure', 'Laterality', 'Age group', 'Role', 'Institution', 'Supervisor', 'Anesthesia', 'Complications', 'Notes']; const t = [H.join(','), ...rows.map(r => [r.d, catOf(r), r.p, r.side, r.age, r.r, r.site, r.s, r.an, r.comp, r.n].map(q).join(','))].join('\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([t], { type: 'text/csv' })); a.download = 'gofar-surgical-log.csv'; a.click(); };
  }
  const LV = { M: ['Required', 'req'], S: ['Should have', 'sho'], A: ['Additional', 'add'], E: ['Expected', 'exp'] };
  const cgVal = it => it.auto === 'log' ? S.log.filter(r => r.r !== 'Observer').length : (+S.cnum[it.id] || 0);
  const cgDone = it => it.n ? cgVal(it) >= it.n : !!S.cdone[it.id];
  const cgStats = () => { const all = window.CGOALS.flatMap(c => c.items); const rq = all.filter(i => i.lvl === 'M'); return { d: all.filter(cgDone).length + S.cgoals.filter(g => g.done).length, t: all.length + S.cgoals.length, rd: rq.filter(cgDone).length, rt: rq.length }; };
  const cgRow = it => it.n
    ? `<div class="row num ${cgDone(it) ? 'done' : ''}" title="${esc(it.d || '')}"><i class="dot ${LV[it.lvl][1]}"></i><span class="rt">${esc(it.t)}<span class="mbar"><i style="width:${Math.min(100, Math.round(100 * cgVal(it) / it.n))}%"></i></span></span><span class="cnt">${cgVal(it)} / ${it.n}</span>${it.auto ? '<a class="btn alt sm" href="#/log">Log</a>' : `<input type="number" min="0" max="99999" data-n="${it.id}" value="${S.cnum[it.id] || ''}" placeholder="0" aria-label="${esc(it.t)}">`}</div>`
    : `<label class="row ${cgDone(it) ? 'done' : ''}" title="${esc(it.d || '')}"><input type="checkbox" data-id="${it.id}" ${S.cdone[it.id] ? 'checked' : ''}><i class="dot ${LV[it.lvl][1]}"></i><span class="rt">${esc(it.t)}</span></label>`;
  const cgSection = (sec, i) => {
    const items = S.creq ? sec.items.filter(x => x.lvl === 'M') : sec.items; if (!items.length) return '';
    const d = items.filter(cgDone).length, open = S.copen[sec.title] === undefined ? i === 0 : S.copen[sec.title];
    return `<details class="cgs" data-k="${esc(sec.title)}" ${open ? 'open' : ''}><summary><b>${sec.title}</b>${sec.note ? `<span class="sample">${sec.note}</span>` : ''}<span class="cgc ${d === items.length ? 'ok' : ''}">${d}/${items.length}</span></summary><div class="rows">${items.map(cgRow).join('')}</div></details>`;
  };
  const cgHead = (d, t, extra) => `<div class="cgtop"><div><span class="bigc">${d}<small> / ${t}</small></span> <span class="sample">goals complete${extra || ''}</span>${bar(t ? Math.round(100 * d / t) : 0)}</div>
    <div class="cgctl"><label class="sw"><input type="checkbox" id="rq" ${S.creq ? 'checked' : ''}> Required only</label><span class="leg"><i class="dot req"></i>Required <i class="dot sho"></i>Should <i class="dot exp"></i>Expected</span></div></div>`;
  function cgWire(el) {
    const redraw = () => { const y = scrollY; boardPage(); scrollTo(0, y); };
    $$('details.cgs', el).forEach(d => d.ontoggle = () => { S.copen[d.dataset.k] = d.open; save(); });
    $$('input[data-id]', el).forEach(c => c.onchange = () => { S.cdone[c.dataset.id] = c.checked; save(); redraw(); });
    $$('input[data-n]', el).forEach(n => n.onchange = () => { S.cnum[n.dataset.n] = Math.max(0, +n.value || 0); save(); redraw(); });
    const rq = $('#rq', el); if (rq) rq.onchange = () => { S.creq = rq.checked; save(); redraw(); };
    return redraw;
  }
  function clinTab(el) {
    const st = cgStats(); const mine = S.cgoals;
    el.innerHTML = `${cgHead(st.d, st.t, ` · ${st.rd}/${st.rt} required`)}
      ${window.CGOALS.map(cgSection).join('')}
      <details class="cgs" data-k="mine" ${S.copen.mine ? 'open' : ''}><summary><b>My own goals</b><span class="cgc">${mine.filter(g => g.done).length}/${mine.length}</span></summary><div class="rows">
        ${mine.map(g => `<label class="row ${g.done ? 'done' : ''}"><input type="checkbox" data-cg="${g.id}" ${g.done ? 'checked' : ''}><i class="dot exp"></i><span class="rt">${esc(g.t)}</span><button class="x" data-x="${g.id}" type="button" aria-label="Delete">✕</button></label>`).join('')}
        <form id="cf" class="addrow"><input id="cg" placeholder="Add your own goal…" required><button class="btn sm" type="submit">Add</button></form></div></details>
      <p class="sample" style="margin-top:12px">Based on the ICO Subspecialty Curriculum (2016). Hover a goal for the full wording.</p>`;
    const redraw = cgWire(el);
    $('#cf', el).onsubmit = e => { e.preventDefault(); S.cgoals.push({ id: uid(), t: $('#cg', el).value.trim(), done: false }); S.copen.mine = true; save(); redraw(); };
    $$('input[data-cg]', el).forEach(c => c.onchange = () => { S.cgoals.find(g => g.id === c.dataset.cg).done = c.checked; save(); redraw(); });
    $$('.x', el).forEach(b => b.onclick = e => { e.preventDefault(); S.cgoals = S.cgoals.filter(g => g.id !== b.dataset.x); save(); redraw(); });
  }
  const dgStats = () => { const all = window.DGOALS.flatMap(c => c.items); return { d: all.filter(cgDone).length, t: all.length }; };
  function didTab(el) {
    const st = dgStats();
    el.innerHTML = `${cgHead(st.d, st.t)}${window.DGOALS.map((s, i) => cgSection(s, 0)).join('')}<p class="sample" style="margin-top:12px">Based on the ICO Subspecialty Curriculum (2016). Hover a goal for the full wording.</p>`;
    cgWire(el);
  }
  const sgAll = () => window.SGOALS.flatMap(c => c.procs.flatMap(p => p.steps.map((t, i) => ({ id: p.id + '.' + i }))));
  const sgStats = () => { const a = sgAll(); return { d: a.filter(x => S.sstep[x.id] === 'done').length, t: a.length }; };
  function surgTab(el) {
    const st = sgStats(), isOpen = (k, def) => S.copen[k] === undefined ? def : S.copen[k];
    const cnt = p => p.steps.filter((_, i) => S.sstep[p.id + '.' + i] === 'done').length;
    el.innerHTML = `<div class="cgtop"><div><span class="bigc">${st.d}<small> / ${st.t}</small></span> <span class="sample">steps complete</span>${bar(Math.round(100 * st.d / st.t))}</div></div>
      ${window.SGOALS.map((c, ci) => `<details class="cgs" data-k="sg:${c.title}" ${isOpen('sg:' + c.title, ci === 0) ? 'open' : ''}><summary><b>${c.title}</b><span class="cgc">${c.procs.reduce((n, p) => n + cnt(p), 0)}/${c.procs.reduce((n, p) => n + p.steps.length, 0)}</span></summary><div class="rows">
        ${c.procs.map(p => `<details class="proc" data-k="sgp:${p.id}" ${isOpen('sgp:' + p.id, false) ? 'open' : ''}><summary><span>${esc(p.t)}</span><span class="cgc ${cnt(p) === p.steps.length ? 'ok' : ''}">${cnt(p)}/${p.steps.length}</span></summary>${p.steps.map((t, i) => { const id = p.id + '.' + i, d = S.sstep[id] === 'done'; return `<label class="row ${d ? 'done' : ''}"><input type="checkbox" data-s="${id}" ${d ? 'checked' : ''}><span class="rt">${i + 1}. ${esc(t)}</span></label>`; }).join('')}</details>`).join('')}</div></details>`).join('')}
      <p class="sample" style="margin-top:12px">Draft step lists for teaching. Faculty should review and adapt them to their own technique.</p>`;
    $$('details[data-k]', el).forEach(d => d.ontoggle = () => { S.copen[d.dataset.k] = d.open; save(); });
    $$('input[data-s]', el).forEach(c => c.onchange = () => { if (c.checked) S.sstep[c.dataset.s] = 'done'; else delete S.sstep[c.dataset.s]; save(); const y = scrollY; boardPage(); scrollTo(0, y); });
  }

  /* ---------- qualifying exam and question bank ---------- */
  const LVD = ['Recognises the key concepts and common presentations.', 'Makes sound clinical decisions in typical fellowship cases.', 'Manages complex cases, complications and controversies.'];
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const topicName = id => (course(id) || { title: id }).title;
  const EXAM_N = 15;
  let run = null;
  function pickQ() {
    const used = new Set(run.log.map(x => x.q.id)); let pool = window.QBANK.filter(q => q.lv === run.target && !used.has(q.id));
    for (const d of [1, -1, 2, -2]) { if (pool.length) break; const l = run.target + d; if (l >= 0 && l <= 2) pool = window.QBANK.filter(q => q.lv === l && !used.has(q.id)); }
    const tc = {}; run.log.forEach(x => tc[x.q.topic] = (tc[x.q.topic] || 0) + 1);
    const min = Math.min(...pool.map(q => tc[q.topic] || 0)); pool = pool.filter(q => (tc[q.topic] || 0) === min);
    return pool[Math.floor(Math.random() * pool.length)];
  }
  function nextQ() { run.cur = pickQ(); run.order = shuffle(run.cur.o.map((t, i) => i)); }
  function finishExam() {
    const tg = run.log.map(x => x.target), last = [...tg, run.target].slice(-8), est = last.reduce((a, b) => a + b, 0) / last.length;
    const level = est < .75 ? 0 : est < 1.65 ? 1 : 2;
    const byLevel = [[0, 0], [0, 0], [0, 0]], byTopic = {};
    run.log.forEach(x => { byLevel[x.q.lv][1]++; (byTopic[x.q.topic] = byTopic[x.q.topic] || [0, 0])[1]++; if (x.ok) { byLevel[x.q.lv][0]++; byTopic[x.q.topic][0]++; } });
    S.exam = { date: today(), level, est: Math.round(est * 100) / 100, correct: run.log.filter(x => x.ok).length, total: run.log.length, byLevel, byTopic, items: run.log.map(x => ({ id: x.q.id, pick: x.pick, ok: x.ok })) };
    S.level = level; save(); run = null;
  }
  function examPage() {
    if (run) {
      const q = run.cur, n = run.log.length;
      view.innerHTML = `<div class="crumbs"><a href="#/exam" id="quit">Quit exam</a></div><div class="card stage"><div class="kicker">Knowledge Checkpoint · Question ${n + 1} of ${EXAM_N}</div>${bar(Math.round(100 * n / EXAM_N))}<h2 style="margin-top:18px">${esc(q.q)}</h2><div id="eo">${run.order.map((oi, k) => `<button type="button" class="case-opt" data-o="${oi}">${String.fromCharCode(65 + k)}. ${esc(q.o[oi])}</button>`).join('')}</div><p class="sample">Answers and explanations are shown at the end. You cannot go back.</p></div>`;
      $('#quit', view).onclick = e => { e.preventDefault(); if (confirm('Quit the exam? Your answers will be lost.')) { run = null; examPage(); } };
      $$('#eo button', view).forEach(b => b.onclick = () => { const oi = +b.dataset.o; run.log.push({ q, target: run.target, pick: q.o[oi], ok: oi === q.a }); run.target = Math.max(0, Math.min(2, run.target + (oi === q.a ? 1 : -1))); if (run.log.length >= EXAM_N) { finishExam(); examPage(); } else { nextQ(); examPage(); scrollTo(0, 0); } });
      return;
    }
    if (!S.exam) {
      view.innerHTML = `<h1>Knowledge Checkpoint</h1><div class="card stage"><p>This exam estimates your starting knowledge level in oculoplastic surgery so the portal can recommend where to begin. Come back and repeat the checkpoint any time to track your progression.</p>
        <ul><li><b>${EXAM_N} questions</b>, about 15 minutes, across anatomy, ptosis, eyelid malposition, aesthetics, orbit, lacrimal and oncology.</li><li><b>Adaptive:</b> questions get harder when you answer correctly and easier when you do not.</li><li><b>Three levels:</b> Foundation, Core and Advanced.</li><li>No grade is recorded against you. You can retake it at any time.</li></ul>
        <p class="sample">Draft questions awaiting faculty review.</p><button class="btn" id="go" type="button">Start the exam</button></div>`;
      $('#go', view).onclick = () => { run = { target: 1, log: [] }; nextQ(); examPage(); };
      return;
    }
    const e = S.exam, lv = e.level;
    const rec = COURSES.flatMap(c => c.modules.filter(m => LVX[m.level] === lv || LVX[m.level] === lv + 1).map(m => ({ c, m }))), wk = weakTopics();
    view.innerHTML = `<h1>Your Knowledge Checkpoint result</h1>
      <div class="card stage"><div class="resbig"><div><span class="kicker">Your level</span><div class="lvname lv${lv}">${LVN[lv]}</div><p>${LVD[lv]}</p></div><div class="bigc">${e.correct}<small> / ${e.total} correct</small></div></div>
        <label class="adj">Not right? Set my level: <select id="adj">${LVN.map((n, i) => `<option value="${i}" ${i === S.level ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        <h3>By difficulty</h3>${e.byLevel.map((v, i) => `<div class="rb"><span>${LVN[i]}</span>${bar(v[1] ? Math.round(100 * v[0] / v[1]) : 0)}<em>${v[0]}/${v[1]}</em></div>`).join('')}
        <h3>By topic</h3>${Object.entries(e.byTopic).map(([k, v]) => `<div class="rb"><span>${esc(topicName(k))}</span>${bar(Math.round(100 * v[0] / v[1]))}<em>${v[0]}/${v[1]}</em></div>`).join('')}
        ${wk.length ? `<div class="callout warn"><h4>Review suggested</h4><p>${wk.map(k => `<a href="#/course/${k}">${esc(topicName(k))}</a>`).join(' · ')}</p></div>` : ''}
        <h3>Recommended modules</h3>${rec.map(({ c, m }) => `<a class="mod-row" href="#/learn/${c.id}/${m.id}/0"><div style="flex:1"><b>${esc(m.title)}</b> <span class="lvb lvp">${m.level}</span><div class="meta">${esc(c.title)} course · ${m.minutes} min</div></div></a>`).join('') || '<p class="sample">No modules at this level yet.</p>'}
        <details class="cgs" style="margin-top:18px"><summary><b>Review your answers</b></summary><div style="padding:0 16px 14px">${e.items.map((it, i) => { const q = window.QBANK.find(x => x.id === it.id); return q ? `<div class="q"><b>${i + 1}. ${esc(q.q)}</b> <span class="lvb ${['rev', 'rec', 'chl'][q.lv]}">${LVN[q.lv]}</span><p class="${it.ok ? 'okt' : 'bad'}">${it.ok ? '✓' : '✗'} Your answer: ${esc(it.pick)}</p>${it.ok ? '' : `<p>Correct: <b>${esc(q.o[q.a])}</b></p>`}<p class="why">${esc(q.why)}</p></div>` : ''; }).join('')}</div></details>
        <div style="margin-top:18px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="retake" type="button">Retake the exam</button><a class="btn alt" href="#/practice">Practice questions</a></div></div>`;
    $('#adj', view).onchange = ev => { S.level = +ev.target.value; save(); examPage(); };
    $('#retake', view).onclick = () => { run = { target: 1, log: [] }; nextQ(); examPage(); };
  }

  let pr = { lv: 'all', topic: 'all', pool: null, i: 0, score: 0, ans: false };
  function practicePage() {
    if (!pr.pool) {
      const lv0 = S.level == null ? 'all' : String(S.level);
      view.innerHTML = `<h1>Question bank</h1><p class="sample">Practice questions by difficulty and topic, with instant feedback.</p><div class="card stage"><div class="form">
        <label>Difficulty<select id="pl"><option value="all">All levels</option>${LVN.map((n, i) => `<option value="${i}" ${String(i) === (pr.lv === 'all' ? lv0 : pr.lv) ? 'selected' : ''}>${n} (${window.QBANK.filter(q => q.lv === i).length})</option>`).join('')}</select></label>
        <label>Topic<select id="pt"><option value="all">All topics</option>${COURSES.map(c => `<option value="${c.id}" ${pr.topic === c.id ? 'selected' : ''}>${esc(c.title)}</option>`).join('')}</select></label></div>
        <p class="sample" id="pc"></p><button class="btn" id="ps" type="button">Start</button></div>`;
      const upd = () => { const n = window.QBANK.filter(q => ($('#pl').value === 'all' || q.lv === +$('#pl').value) && ($('#pt').value === 'all' || q.topic === $('#pt').value)).length; $('#pc').textContent = n + ' question' + (n === 1 ? '' : 's') + ' match'; $('#ps').disabled = !n; };
      $('#pl').onchange = $('#pt').onchange = upd; upd();
      $('#ps').onclick = () => { pr.lv = $('#pl').value; pr.topic = $('#pt').value; pr.pool = shuffle(window.QBANK.filter(q => (pr.lv === 'all' || q.lv === +pr.lv) && (pr.topic === 'all' || q.topic === pr.topic))); pr.i = 0; pr.score = 0; pr.ans = false; practicePage(); };
      return;
    }
    if (pr.i >= pr.pool.length) {
      view.innerHTML = `<h1>Question bank</h1><div class="card stage"><div class="bigc">${pr.score}<small> / ${pr.pool.length} correct</small></div>${bar(Math.round(100 * pr.score / pr.pool.length))}<div style="margin-top:16px"><button class="btn" id="again" type="button">Choose another set</button></div></div>`;
      $('#again', view).onclick = () => { pr.pool = null; practicePage(); }; return;
    }
    const q = pr.pool[pr.i], ord = shuffle(q.o.map((t, i) => i));
    view.innerHTML = `<div class="crumbs"><a href="#/practice" id="stop">End practice</a></div><div class="card stage"><div class="kicker">Question ${pr.i + 1} of ${pr.pool.length} · ${LVN[q.lv]} · ${esc(topicName(q.topic))}</div><h2>${esc(q.q)}</h2><div id="po">${ord.map((oi, k) => `<button type="button" class="case-opt" data-o="${oi}">${String.fromCharCode(65 + k)}. ${esc(q.o[oi])}</button>`).join('')}</div><div id="pf"></div></div>`;
    $('#stop', view).onclick = e => { e.preventDefault(); pr.pool = null; practicePage(); };
    $$('#po button', view).forEach(b => b.onclick = () => {
      const oi = +b.dataset.o, ok = oi === q.a; if (ok) pr.score++;
      $$('#po button', view).forEach(x => { x.disabled = true; if (+x.dataset.o === q.a) x.classList.add('ok'); else if (x === b) x.classList.add('no'); });
      $('#pf', view).innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}">${ok ? '✓ Correct. ' : '✗ Not quite. '}${esc(q.why)}<div style="margin-top:10px"><button class="btn" id="pn" type="button">${pr.i + 1 < pr.pool.length ? 'Next question →' : 'See result'}</button></div></div>`;
      $('#pn', view).onclick = () => { pr.i++; practicePage(); scrollTo(0, 0); };
    });
  }

  /* ---------- router ---------- */
  function route() {
    const path = (location.hash || '#/').slice(1); const p = path.split('/').filter(Boolean);
    renderShell(path);
    ({ '': home, dashboard, year: yearPage, board: boardPage, exam: examPage, practice: practicePage, log: boardPage, clinical: boardPage, surgical: boardPage, didactic: boardPage, courses, tools: toolsPage, library, progress, course: () => coursePage(p[1]), learn: () => learn(p[1], p[2], p[3]) }[p[0] || ''] || notFound)();
    if (p[0] !== 'learn') scrollTo(0, 0);
    view.focus({ preventScroll: true });
  }
  addEventListener('hashchange', route);
  route();
})();
