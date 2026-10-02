// Samir Dev Academy — app
(function () {
  const params = new URLSearchParams(location.search);
  const page = params.get('page');
  const main = document.getElementById('main');

  const paths = [
    { title: 'Programming Foundations', level: 'Beginner', desc: 'Core concepts, logic and your first programs.' },
    { title: 'Front-End Development', level: 'Beginner', desc: 'HTML, CSS and JavaScript for the web.' },
    { title: 'JavaScript Deep Dive', level: 'Intermediate', desc: 'Async, modules and practical patterns.' },
    { title: 'React Essentials', level: 'Intermediate', desc: 'Components, state and building apps.' },
    { title: 'Back-End Basics', level: 'Beginner', desc: 'APIs, servers and data on the web.' },
    { title: 'Full-Stack Projects', level: 'Intermediate', desc: 'Connect front-end and back-end together.' },
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
    { title: 'Personal Portfolio', desc: 'A simple site to showcase your work.' },
    { title: 'Task Tracker', desc: 'Add, complete and remove tasks.' },
    { title: 'Weather Widget', desc: 'Pull live weather data from an API.' },
    { title: 'Notes App', desc: 'Saved notes in the browser.' },
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
    main.innerHTML = `<section class="section wrap"><h2>Contact</h2><p>Questions about courses? Reach out anytime.</p><p>Email: hello@samir-dev-academy.example</p></section>`;
  }
  function renderPrivacy() {
    main.innerHTML = `<section class="section wrap"><h2>Privacy</h2><p>We only collect what you type into the demo. Nothing is stored or shared.</p></section>`;
  }

  if (page === 'contact') renderContact();
  else if (page === 'privacy') renderPrivacy();
  else fillLists();

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
