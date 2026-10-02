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
    { title: 'First Lines of Code', topic: 'Foundations', level: 'Beginner', desc: 'Get comfortable with a code editor and your first script.' },
    { title: 'HTML & CSS Essentials', topic: 'HTML & CSS', level: 'Beginner', desc: 'Structure and style your first web page.' },
    { title: 'JavaScript Fundamentals', topic: 'JavaScript', level: 'Beginner', desc: 'Variables, loops and functions made simple.' },
    { title: 'Build a Landing Page', topic: 'HTML & CSS', level: 'Beginner', desc: 'A complete responsive page from scratch.' },
    { title: 'React Components 101', topic: 'React', level: 'Intermediate', desc: 'Think in components and state.' },
    { title: 'First API Call', topic: 'Back-end', level: 'Beginner', desc: 'Fetch data and display it on the page.' },
    { title: 'Async & Promises', topic: 'JavaScript', level: 'Intermediate', desc: 'Handle time and external data correctly.' },
    { title: 'Full-Stack Contact App', topic: 'Back-end', level: 'Intermediate', desc: 'Store and show messages end to end.' },
  ];

  const projects = [
    { title: 'Personal Portfolio', desc: 'A simple, fast site to showcase your work and tell your story.' },
    { title: 'Task Tracker', desc: 'Add, complete and remove tasks — a great first JS app.' },
    { title: 'Weather Widget', desc: 'Pull live weather data from an open API onto the page.' },
    { title: 'Notes App', desc: 'Saved notes that stay in your browser, built step by step.' },
  ];

  function card(title, desc, extra = '') {
    const el = document.createElement('article');
    el.className = 'course-card';
    el.innerHTML = `<div class="course-content"><h3>${title}</h3><p>${desc}</p>${extra}</div>`;
    return el;
  }

  function fillLists() {
    const pathGrid = document.getElementById('path-grid');
    paths.forEach((p) => {
      const el = document.createElement('article');
      el.className = 'path-card';
      el.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><span>${p.level}</span>`;
      pathGrid.appendChild(el);
    });

    const projectGrid = document.getElementById('project-grid');
    projects.forEach((p) => {
      const el = document.createElement('article');
      el.className = 'project-card';
      el.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
      projectGrid.appendChild(el);
    });

    renderCourses();
  }

  const courseMap = new Map();
  function renderCourses() {
    const grid = document.getElementById('course-grid');
    grid.innerHTML = '';
    const q = document.getElementById('course-search').value.trim().toLowerCase();
    const topic = document.getElementById('topic-filter').value;
    const level = document.getElementById('level-filter').value;

    const filtered = courses.filter((c) => {
      const matchQ = !q || c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
      const matchT = topic === 'all' || c.topic === topic;
      const matchL = level === 'all' || c.level === level;
      return matchQ && matchT && matchL;
    });

    filtered.forEach((c) => grid.appendChild(card(c.title, c.desc, `<small>${c.topic} · ${c.level}</small>`)));
    document.getElementById('results').textContent = `${filtered.length} course(s)`;
    const empty = document.getElementById('empty');
    empty.hidden = filtered.length > 0;
  }

  function renderContact() {
    main.innerHTML = `<section class="section wrap"><div class="section-head"><div><div class="eyebrow">LET'S CONNECT</div><h2>Contact</h2></div><p>Questions, feedback or a collaboration idea?<br>We'd love to hear from you.</p></div><p>Email: hello@samir-dev-academy.example</p><p>Follow the journey on GitHub and YouTube. Every resource here is free to explore.</p></section>`;
  }
  function renderPrivacy() {
    main.innerHTML = `<section class="section wrap"><div class="section-head"><div><div class="eyebrow">YOUR PRIVACY</div><h2>Privacy</h2></div><p>We only collect what you type into the demo forms.<br>Nothing you enter is stored or shared with anyone.</p></div><p>The site uses no personal tracking beyond basic, privacy-friendly usage stats. No accounts, no passwords, no shopping — just learning.</p></section>`;
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
      m.innerHTML = `<div style="background:#111627;border:1px solid #262d43;border-radius:16px;padding:28px;max-width:560px;margin:20px;color:#f4f5fc;text-align:center"><h3 id="m-t" style="margin:0 0 12px"></h3><p id="m-b" style="color:#acb3c9;margin:0 0 18px"></p><button id="m-x" style="padding:10px 22px;border-radius:9px;background:#7956e9;border:0;color:#fff;cursor:pointer">Close</button></div>`;
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
    const h3 = card.querySelector('h3')?.textContent || 'Lesson';
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
})();
