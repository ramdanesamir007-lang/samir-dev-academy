(() => {
  const examples = [
    { name: 'JavaScript', file: 'your-journey.js', code: "// Every developer starts somewhere.\nfunction createDeveloperJourney(learner) {\n  const skills = ['JavaScript', 'React', 'Node.js'];\n  return `Welcome ${learner.name}! Ready to build real apps.`;\n}\n\nconsole.log(createDeveloperJourney({ name: 'Future You' }));", output: 'Welcome Future You! Ready to build real apps.' },
    { name: 'React', file: 'CodingGoalTracker.jsx', code: "import { useState } from 'react';\n\nexport default function CodingGoalTracker() {\n  const [lessons, setLessons] = useState(0);\n  return (\n    <article>\n      <h3>Completed: {lessons} lessons</h3>\n      <button onClick={() => setLessons(n => n + 1)}>\n        Complete a lesson\n      </button>\n    </article>\n  );\n}", output: 'Preview: a counter starts at 0 and increases when its button is clicked. Use this component in a React project.' },
    { name: 'HTML/CSS', file: 'lesson-card.html', code: '<style>\n  .lesson-card { padding: 24px; border: 1px solid #aaa; border-radius: 12px; }\n</style>\n<article class="lesson-card">\n  <h2>Responsive Web Layouts</h2>\n  <p>Learn CSS Flexbox and Grid.</p>\n  <a href="#courses">Explore lessons</a>\n</article>', output: 'Preview: a lesson card with a heading, a description and a link.' }
  ];
  const editor = document.querySelector('.editor');
  if (editor) {
    const tabs = editor.querySelector('.editor-tab');
    tabs.className = 'snippet-tabs';
    tabs.setAttribute('role', 'group');
    tabs.setAttribute('aria-label', 'Code examples');
    tabs.innerHTML = examples.map((item, i) => `<button type="button" data-example="${i}" aria-pressed="${i === 0}">${item.name}</button>`).join('');
    const area = editor.querySelector('.code');
    area.className = 'snippet-code';
    area.innerHTML = '<pre><code></code></pre>';
    const tools = document.createElement('div');
    tools.className = 'snippet-tools';
    tools.innerHTML = '<span>Read the example. Try it in your project.</span><button class="button secondary small">Copy code</button>';
    area.after(tools);
    const terminal = editor.querySelector('.terminal p');
    terminal.setAttribute('role', 'status');
    let active = 0;
    function select(index) {
      active = index;
      area.querySelector('code').textContent = examples[index].code;
      editor.querySelector('.editor-top > span').textContent = examples[index].file;
      editor.querySelector('.editor-status').lastElementChild.textContent = examples[index].name + ' · UTF-8';
      terminal.textContent = examples[index].output;
      tabs.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', i === index));
      tools.querySelector('button').textContent = 'Copy code';
    }
    tabs.querySelectorAll('button').forEach(button => button.onclick = () => select(Number(button.dataset.example)));
    tools.querySelector('button').onclick = async () => {
      try { await navigator.clipboard.writeText(examples[active].code); tools.querySelector('button').textContent = 'Copied ✓'; }
      catch { tools.querySelector('button').textContent = 'Select code to copy'; }
    };
    select(0);
  }
  const blueprints = [
    { stack: 'HTML · CSS · JavaScript', features: ['Build About, Skills, Projects and Contact sections.', 'Use a responsive grid and meaningful headings.', 'Check contrast, keyboard focus and descriptive links.'] },
    { stack: 'JavaScript · DOM · State', features: ['Add a task using a labeled input.', 'Mark tasks as complete and filter the list.', 'Remove tasks and keep the remaining count accurate.'] },
    { stack: 'JavaScript · Fetch · JSON', features: ['Choose a weather API and read its documentation.', 'Show loading, success and error states.', 'Display the city, temperature and units clearly. Never embed a private API key.'] },
    { stack: 'JavaScript · LocalStorage', features: ['Create, edit and remove notes.', 'Save notes on this browser and recover them after reload.', 'Handle empty input and storage failures.'] }
  ];
  const grid = document.querySelector('#project-grid');
  if (!grid) return;
  grid.querySelectorAll('.project-card').forEach((card, index) => {
    const badge = document.createElement('small');
    badge.className = 'project-stack'; badge.textContent = blueprints[index].stack;
    const button = document.createElement('button');
    button.className = 'button secondary small'; button.textContent = index === 1 ? 'Try task demo →' : 'View blueprint →';
    card.append(badge, button);
    card.addEventListener('click', event => { event.stopPropagation(); showProject(card, index); });
  });
  function showProject(card, index) {
    const origin = card.querySelector('button');
    const dialog = document.createElement('dialog'); dialog.className = 'project-dialog';
    dialog.setAttribute('aria-labelledby', 'project-preview-title');
    dialog.innerHTML = '<div class="project-dialog-head"><span class="eyebrow">BUILD IT STEP BY STEP</span><button class="button secondary small" data-close aria-label="Close project">Close ×</button></div><h2 id="project-preview-title"></h2><p class="preview-desc"></p><p class="project-stack"></p><h3>What you will build</h3><ul class="project-objectives"></ul>';
    dialog.querySelector('h2').textContent = card.querySelector('h3').textContent;
    dialog.querySelector('.preview-desc').textContent = card.querySelector('p').textContent;
    dialog.querySelector('.project-stack').textContent = blueprints[index].stack;
    blueprints[index].features.forEach(text => { const item = document.createElement('li'); item.textContent = text; dialog.querySelector('ul').appendChild(item); });
    dialog.querySelector('[data-close]').onclick = () => dialog.close();
    dialog.addEventListener('close', () => { dialog.remove(); origin.focus(); }, {once:true});
    dialog.insertAdjacentHTML('beforeend', AcademyStudy.projectHTML(index));
    if (index === 1) setupTasks(dialog);
    document.body.appendChild(dialog); dialog.showModal();
  }
  function setupTasks(dialog) {
    const section = document.createElement('section'); section.className = 'task-demo';
    section.innerHTML = '<h3>Try the task tracker</h3><p>Practice here. Demo tasks last while this window is open.</p><form><label for="demo-task">New task</label><div class="task-input-row"><input id="demo-task" maxlength="120" required placeholder="What will you build?"><button class="button small">Add task</button></div></form><div class="task-filters" role="group" aria-label="Filter tasks"><button data-filter="all" aria-pressed="true">All</button><button data-filter="active" aria-pressed="false">Active</button><button data-filter="completed" aria-pressed="false">Completed</button></div><p class="task-count" role="status"></p><ul class="task-items"></ul>';
    dialog.appendChild(section);
    let tasks = [{id:1,text:'Explore a learning path',done:true},{id:2,text:'Complete a JavaScript lesson',done:false}];
    let filter = 'all'; let nextId = 3;
    function render() {
      const list = section.querySelector('.task-items'); list.replaceChildren();
      section.querySelector('.task-count').textContent = tasks.filter(task => !task.done).length + ' tasks remaining';
      const visible = tasks.filter(task => filter === 'all' || (filter === 'completed' ? task.done : !task.done));
      if (!visible.length) { const item = document.createElement('li'); item.textContent = 'No tasks in this category.'; list.appendChild(item); }
      visible.forEach(task => {
        const item = document.createElement('li');
        const label = document.createElement('label'); const input = document.createElement('input'); input.type = 'checkbox'; input.checked = task.done;
        const text = document.createElement('span'); text.textContent = task.text; text.className = task.done ? 'task-done' : '';
        input.onchange = () => { task.done = input.checked; render(); const checkbox = list.querySelector(`[data-task="${task.id}"] input`); if (checkbox) checkbox.focus(); else section.querySelector('[data-filter="' + filter + '"]').focus(); };
        label.append(input,text); const remove = document.createElement('button'); remove.className = 'task-remove'; remove.textContent = 'Remove'; remove.setAttribute('aria-label','Remove task: ' + task.text);
        remove.onclick = () => { tasks = tasks.filter(value => value.id !== task.id); render(); section.querySelector('#demo-task').focus(); };
        item.dataset.task = task.id; item.append(label,remove); list.appendChild(item);
      });
    }
    section.querySelector('form').onsubmit = event => { event.preventDefault(); const input = section.querySelector('#demo-task'); const text = input.value.trim(); if (!text) { input.setCustomValidity('Enter a task.'); input.reportValidity(); return; } tasks.push({id:nextId++,text,done:false}); input.value = ''; render(); input.focus(); };
    section.querySelector('#demo-task').oninput = event => event.target.setCustomValidity('');
    section.querySelectorAll('[data-filter]').forEach(button => button.onclick = () => { filter = button.dataset.filter; section.querySelectorAll('[data-filter]').forEach(btn => btn.setAttribute('aria-pressed',btn === button)); render(); });
    render();
  }
  const nav = document.querySelector('#navigation');
  const toggle = document.querySelector('.menu-toggle');
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); }));
})();

