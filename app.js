// Samir Dev Academy — app
(function () {
  const params = new URLSearchParams(location.search);
  const page = params.get('page');
  const main = document.getElementById('main');

  const paths = [
    { title: 'Programming Foundations', level: 'Beginner', desc: 'Core concepts, logic and your first programs — the base for everything.' },
    { title: 'Front-End Development', level: 'Beginner', desc: 'HTML, CSS and JavaScript for the web, picking up from zero.' },
    { title: 'JavaScript Deep Dive', level: 'Intermediate', desc: 'Async, modules and practical patterns you use every day.' },
    { title: 'React Essentials', level: 'Intermediate', desc: 'Components, state and building real interfaces.' },
    { title: 'Back-End Basics', level: 'Beginner', desc: 'APIs, servers and storing data on the web.' },
    { title: 'Full-Stack Projects', level: 'Intermediate', desc: 'Connect front-end and back-end into complete applications.' },
  ];

  const courses = [
    { title: 'First Lines of Code', topic: 'Foundations', level: 'Beginner', desc: 'Get comfortable with a code editor and your first script.', lessons: ['Set up your editor', 'Write your first script', 'Run and see the output'] },
    { title: 'HTML & CSS Essentials', topic: 'HTML & CSS', level: 'Beginner', desc: 'Structure and style your first web page.', lessons: ['HTML structure', 'Tags and attributes', 'CSS basics', 'Styling your page'] },
    { title: 'JavaScript Fundamentals', topic: 'JavaScript', level: 'Beginner', desc: 'Variables, loops and functions made simple.', lessons: ['Variables and types', 'Loops and conditions', 'Functions', 'First small project'] },
    { title: 'Build a Landing Page', topic: 'HTML & CSS', level: 'Beginner', desc: 'A complete responsive page from scratch.', lessons: ['Layout with CSS Grid', 'Responsive media queries', 'Adding images and links', 'Publish it locally'] },
    { title: 'React Components 101', topic: 'React', level: 'Intermediate', desc: 'Think in components and state.', lessons: ['JSX basics', 'Props and composition', 'State with useState', 'Building a component'] },
    { title: 'First API Call', topic: 'Back-end', level: 'Beginner', desc: 'Fetch data and display it on the page.', lessons: ['What is an API', 'Fetch and JSON', 'Rendering data', 'Error handling'] },
    { title: 'Async & Promises', topic: 'JavaScript', level: 'Intermediate', desc: 'Handle time and external data correctly.', lessons: ['Callbacks to Promises', 'async/await', 'Error catching', 'Real fetch flow'] },
    { title: 'Full-Stack Contact App', topic: 'Back-end', level: 'Intermediate', desc: 'Store and show messages end to end.', lessons: ['Form UI', 'Send to a server', 'Store the message', 'Display messages'] },
  ];

  courses.forEach((course, id) => course.lessons.push(...AcademyLearning.extraTitles(id)));

  const pathCourses = [[0, 2], [1, 2, 3], [2, 6], [2, 4], [2, 5], [1, 2, 5, 7]];
  let selectedPath = null;

  const projects = [
    { title: 'Personal Portfolio', desc: 'A simple, fast site to showcase your work and tell your story.' },
    { title: 'Task Tracker', desc: 'Add, complete and remove tasks — a great first JS app.' },
    { title: 'Weather Widget', desc: 'Pull live weather data from an open API onto the page.' },
    { title: 'Notes App', desc: 'Saved notes that stay in your browser, built step by step.' },
  ];

  function card(title, desc, extra = '', lessons = []) {
    const el = document.createElement('article');
    el.className = 'course-card';
    el.innerHTML = `<div class="course-content"><h3>${title}</h3><p>${desc}</p>${extra}<ul class="lessons" style="display:none;color:#93a6c6;margin:10px 0 0;padding-left:18px" >${lessons.map(l=>`<li>${l}</li>`).join('')}</ul></div>`;
    return el;
  }

  function fillLists() {
    const pathGrid = document.getElementById('path-grid');
    renderPaths();

    const projectGrid = document.getElementById('project-grid');
    projects.forEach((p) => {
      const el = document.createElement('article');
      el.className = 'project-card';
      el.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
      projectGrid.appendChild(el);
    });

    renderCourses();
  }

  function pathStats(index) {
    const ids = pathCourses[index];
    return { done: ids.reduce((sum, id) => sum + AcademyLearning.count(id), 0), total: ids.reduce((sum, id) => sum + AcademyLearning.total(id), 0) };
  }
  function renderPaths() {
    const grid = document.getElementById('path-grid');
    if (!grid) return;
    grid.innerHTML = '';
    paths.forEach((path, index) => {
      const stats = pathStats(index);
      const el = document.createElement('article');
      el.className = 'path-card';
      el.dataset.path = index;
      el.innerHTML = '<h3>' + path.title + '</h3><p>' + path.desc + '</p><span>' + path.level + '</span><div class="path-progress"><p>' + pathCourses[index].length + ' courses · ' + stats.done + ' / ' + stats.total + ' lessons completed</p><progress max="' + stats.total + '" value="' + stats.done + '" aria-label="Path progress"></progress><button class="button small" aria-controls="path-details" aria-expanded="' + (selectedPath === index) + '">Explore path →</button></div>';
      el.querySelector('button').onclick = event => { event.stopPropagation(); openPath(index); };
      grid.appendChild(el);
    });
  }
  function renderPathDetails() {
    let panel = document.getElementById('path-details');
    if (selectedPath === null) { if (panel) panel.remove(); return; }
    if (!panel) {
      panel = document.createElement('section');
      panel.id = 'path-details';
      panel.className = 'path-details';
      panel.setAttribute('aria-labelledby', 'path-title');
      document.getElementById('path-grid').after(panel);
    }
    const ids = pathCourses[selectedPath];
    const path = paths[selectedPath];
    const stats = pathStats(selectedPath);
    panel.innerHTML = '<div class="path-details-head"><div><span class="eyebrow">YOUR COURSE ROADMAP</span><h3 id="path-title" tabindex="-1">' + path.title + '</h3><p>' + path.desc + '</p><p>' + stats.done + ' / ' + stats.total + ' lessons completed. Progress is shared with the course catalog.</p></div><button class="button secondary small" data-close-path>Close path ×</button></div><ol class="path-course-list"></ol><button class="button" data-start-path>' + (stats.done === stats.total ? 'Review path' : stats.done ? 'Continue path →' : 'Start path →') + '</button>';
    ids.forEach(id => {
      const course = courses[id];
      const done = AcademyLearning.count(id);
      const total = AcademyLearning.total(id);
      const item = document.createElement('li');
      item.innerHTML = '<div><h4>' + course.title + '</h4><p>' + course.desc + '</p><small>' + done + ' / ' + total + ' lessons completed</small></div><button class="button secondary small">' + (done === total ? 'Review course' : done ? 'Continue course' : 'Open course') + '</button>';
      item.querySelector('button').onclick = () => AcademyLearning.open(course, id, refreshLearning);
      panel.querySelector('ol').appendChild(item);
    });
    panel.querySelector('[data-start-path]').onclick = () => {
      const id = ids.find(id => AcademyLearning.count(id) < AcademyLearning.total(id)) ?? ids[0];
      AcademyLearning.open(courses[id], id, refreshLearning);
    };
    panel.querySelector('[data-close-path]').onclick = () => {
      const index = selectedPath;
      selectedPath = null; renderPaths(); renderPathDetails();
      document.querySelector('[data-path="' + index + '"] button').focus();
    };
  }
  function openPath(index) {
    selectedPath = index; renderPaths(); renderPathDetails();
    document.getElementById('path-title').focus({ preventScroll: true });
    document.getElementById('path-details').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }
  function refreshLearning() { renderCourses(); renderPaths(); renderPathDetails(); }

  function renderCourses() {
    const grid = document.getElementById('course-grid');
    grid.innerHTML = '';
    const q = document.getElementById('course-search').value.trim().toLowerCase();
    const topic = document.getElementById('topic-filter').value;
    const level = document.getElementById('level-filter').value;

    const filtered = courses.filter((c) => {
      const matchQ = !q || c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || AcademyLocale.t(c.title).toLowerCase().includes(q) || AcademyLocale.t(c.desc).toLowerCase().includes(q);
      const matchT = topic === 'all' || c.topic === topic;
      const matchL = level === 'all' || c.level === level;
      return matchQ && matchT && matchL;
    });

    filtered.forEach(c => {
      const id = courses.indexOf(c);
      const done = AcademyLearning.count(id);
      const total = AcademyLearning.total(id);
      const el = card(c.title, c.desc, "<small>" + c.topic + " · " + c.level + "</small>");
      const progress = document.createElement("div");
      progress.className = "course-learning";
      progress.innerHTML = `<p>${done} / ${total} lessons completed</p><progress max="${total}" value="${done}" aria-label="Course progress"></progress><button class="button small">${done === total ? "Review course" : done ? "Continue learning" : "Start course"}</button>`;
      progress.querySelector("button").onclick = event => { event.stopPropagation(); AcademyLearning.open(c, id, refreshLearning); };
      el.querySelector(".course-content").appendChild(progress);
      grid.appendChild(el);
    });
    document.getElementById('results').textContent = `${filtered.length} course(s)`;
    const empty = document.getElementById('empty');
    empty.hidden = filtered.length > 0;
  }

  function renderContact() {
    main.innerHTML = `<section class="section wrap"><div class="section-head"><div><div class="eyebrow">LET'S CONNECT</div><h2>Contact</h2></div><p>Questions, feedback or a collaboration idea?<br>We'd love to hear from you.</p></div><p>Email: hello@samir-dev-academy.example</p><p>Follow the journey on GitHub and YouTube. Every resource here is free to explore.</p></section>`;
  }
  function renderPrivacy() {
    main.innerHTML = `<section class="section wrap"><div class="section-head"><div><div class="eyebrow">YOUR PRIVACY</div><h2>Privacy</h2></div><p>Lessons, assessment results, last-visited lessons, editor drafts and your language preference are saved in local storage on this browser.<br>No account is required and progress is not sent to a server.</p></div><p>Progress is specific to this browser and device. Clearing site data removes it. External fonts may be loaded from Google Fonts. No accounts or payments are implemented.</p></section>`;
  }

  if (page === 'contact') renderContact();
  else if (page === 'privacy') renderPrivacy();
  else fillLists();

  // Modal preview shown when clicking any course/path/project card
  function showModal(title, body) {
    let m = document.getElementById('app-modal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'app-modal';
      m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.65);display:none;align-items:center;justify-content:center;z-index:99';
      m.innerHTML = `<div style="background:#111627;border:1px solid #262d43;border-radius:16px;padding:28px;max-width:560px;margin:20px;color:#f4f5fc;text-align:center"><h3 id="m-t" style="margin:0 0 12px"></h3><p id="m-b" style="color:#acb3c9;margin:0 0 18px;white-space:pre-line"></p><button id="m-x" style="padding:10px 22px;border-radius:9px;background:#7956e9;border:0;color:#fff;cursor:pointer">Close</button></div>`;
      document.body.appendChild(m);
      m.onclick = (ev) => { if (ev.target === m) m.style.display = 'none'; };
      m.querySelector('#m-x').onclick = () => { m.style.display = 'none'; };
    }
    m.querySelector('#m-t').textContent = title;
    m.querySelector('#m-b').textContent = body || 'A practical lesson from this path is ready. Thank you for your interest!';
    m.style.display = 'flex';
  }
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.course-card,.path-card,.project-card');
    if (!card) return;
    if (card.classList.contains('path-card')) { openPath(Number(card.dataset.path)); return; }
    const h3 = card.querySelector('h3')?.textContent || 'Lesson';
    if (card.classList.contains('course-card')) {
      const ul = card.querySelector('.lessons');
      if (ul) {
        ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
        return;
      }
    }
    const p = (card.querySelector('p')?.textContent || '').trim();
    showModal(h3, p);
  });

  const search = document.getElementById('course-search');
  if (search) {
    search.addEventListener('input', renderCourses);
    document.getElementById('topic-filter').addEventListener('change', renderCourses);
    document.getElementById('level-filter').addEventListener('change', renderCourses);
    document.getElementById('reset-filters').addEventListener('click', () => {
      search.value = '';
      document.getElementById('topic-filter').value = 'all';
      document.getElementById('level-filter').value = 'all';
      renderCourses();
    });
  }

  const toggle = document.querySelector('.menu-toggle');
  if (toggle) toggle.addEventListener('click', () => {
    const nav = document.getElementById('navigation');
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
  window.AcademyCourses = { courses, refresh: refreshLearning };
})();






