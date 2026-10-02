// Practical study notes and projects for the existing course catalog.
window.AcademyStudy = (() => {
  const guides = [
    {
      prerequisites: 'No coding experience needed. Use a computer, a text editor and a terminal. For the JavaScript file exercises, use Node.js installed on your computer.',
      outcome: 'Understand the edit–run–observe cycle, read basic errors and turn a small problem into clear steps.',
      mistakes: ['Saving a JavaScript file with an accidental .txt extension.', 'Running a command from a different folder than the file.', 'Changing several things at once without checking what caused the result.'],
      project: 'Build a command-line study planner',
      steps: ['List three learning goals and the minutes needed for each.', 'Print a readable summary from a JavaScript file.', 'Calculate the total minutes and convert them to hours.', 'Change one goal, rerun the file and verify the new total.'],
      checklist: ['The program runs without a syntax or reference error.', 'The summary has meaningful labels and correct units.', 'At least two input examples produce the expected totals.', 'A short README explains how to run the file.']
    },
    {
      prerequisites: 'Know how to create files and open an HTML page in a browser. Keep index.html and style.css in the same project folder.',
      outcome: 'Build a semantic, readable course card layout that works with keyboard navigation and narrow screens.',
      mistakes: ['Using a div as a clickable button without keyboard behavior.', 'Fixed widths that make the page overflow on phones.', 'Using color as the only indication of an important state.'],
      project: 'Build a three-course catalog page',
      steps: ['Write a main heading and three article elements with course titles and descriptions.', 'Connect an external stylesheet and define consistent spacing.', 'Use Flexbox for the toolbar and a responsive layout for the cards.', 'Add meaningful course links and a visible keyboard focus style.'],
      checklist: ['The HTML has one main landmark and a sensible heading hierarchy.', 'Every informative image has suitable alternative text.', 'At 360px width, the content remains readable without page overflow.', 'Every link is reachable with Tab and visibly focused.']
    },
    {
      prerequisites: 'Understand variables and basic HTML. For DOM exercises, load the JavaScript file with defer or place its script after the page elements.',
      outcome: 'Combine arrays, functions and events to build a small application with predictable state.',
      mistakes: ['Comparing values of different types without understanding coercion.', 'Mutating state in several places and losing track of the source of truth.', 'Putting user-provided text into innerHTML.'],
      project: 'Build a learning task tracker',
      steps: ['Represent each task with an ID, title and completed flag.', 'Write pure functions for adding, completing and counting tasks.', 'Render tasks using DOM elements and textContent.', 'Connect add and complete controls to events and redraw the list.', 'Add an empty state and reject blank task titles.'],
      checklist: ['Adding and completing a task updates both the list and the count.', 'Blank input does not create a task.', 'Text containing HTML-like characters is shown as text.', 'Adding two tasks with identical titles still gives each a unique ID.']
    },
    {
      prerequisites: 'Complete HTML & CSS Essentials. Prepare your own short introduction, a project description and a suitable image.',
      outcome: 'Create a responsive landing page with clear navigation, accessible controls and stable image layout.',
      mistakes: ['Designing only for a single desktop width.', 'Hiding keyboard focus to make the page look cleaner.', 'Lazy-loading the primary hero image unnecessarily.', 'Linking to section IDs that do not exist.'],
      project: 'Build a developer portfolio landing page',
      steps: ['Plan Hero, About, Projects and Contact sections before styling.', 'Build the page with semantic HTML and working section links.', 'Use a mobile-first layout, then add wider-screen grid columns.', 'Add appropriately sized images with dimensions and alternative text.', 'Review the page using a keyboard and at several viewport widths.'],
      checklist: ['All navigation links lead to real sections.', 'The page works at 360px, 768px and a wider desktop size.', 'Text remains readable when zoomed to 200%.', 'No button or link depends only on hover to reveal its purpose.', 'Image space is reserved before images finish loading.']
    },
    {
      prerequisites: 'Know JavaScript functions, arrays, objects and event handling. Use a working React project; JSX examples cannot run directly as plain browser JavaScript.',
      outcome: 'Build reusable components and manage a controlled form and list without mutating state.',
      mistakes: ['Calling an event handler during rendering instead of passing a function.', 'Using changing random keys for list items.', 'Mutating arrays or objects already held in state.', 'Leaving a controlled input without an onChange handler.'],
      project: 'Build a React learning goals dashboard',
      steps: ['Create GoalForm, GoalList and GoalCard components.', 'Keep the goals array in their nearest shared parent.', 'Pass data and callbacks through props.', 'Use a controlled input to add a goal with a stable ID.', 'Toggle and remove goals using immutable updater functions.'],
      checklist: ['Typing updates the controlled input immediately.', 'Adding a goal does not replace previous goals.', 'Completing one goal updates only that goal.', 'Each rendered item uses a stable unique key.', 'The empty list gives the learner a useful next action.']
    },
    {
      prerequisites: 'Understand functions, Promises and DOM rendering. Use a local mock API or your own server. Routes shown in the lessons are examples and are not supplied by this academy.',
      outcome: 'Read JSON data with explicit loading, empty, success and error states, and display only validated fields.',
      mistakes: ['Assuming fetch rejects automatically for every HTTP error.', 'Assuming every successful response contains valid JSON of the expected shape.', 'Sending secret API keys from public browser code.', 'Rendering remote text through innerHTML.'],
      project: 'Build a course explorer backed by a mock API',
      steps: ['Define an array of course objects with id, title and level fields.', 'Expose it through a mock JSON endpoint in your practice project.', 'Read it using fetch, check response.ok and parse JSON.', 'Validate the shape before creating course cards.', 'Add a topic filter encoded with URLSearchParams.', 'Test loading, empty data, invalid data and a failed request.'],
      checklist: ['Loading ends on both success and failure.', 'An empty array shows an empty state rather than an error.', 'A non-2xx response produces useful feedback.', 'Invalid course entries are handled deliberately.', 'No private credential appears in source code or a public URL.']
    },
    {
      prerequisites: 'Complete JavaScript Fundamentals and First API Call. Be able to explain what a Promise represents before combining several requests.',
      outcome: 'Choose sequential or concurrent work correctly and handle failures and cancellation without misleading the user.',
      mistakes: ['Using await outside an async function or a supported module context.', 'Forgetting to return a Promise in a chain.', 'Using Promise.all for tasks that depend on earlier results.', 'Showing a network error when a request was intentionally cancelled.'],
      project: 'Build an asynchronous learning dashboard',
      steps: ['Create separate functions to load courses and project ideas.', 'Load independent data concurrently with Promise.all.', 'Show a loading indicator and clear it in finally.', 'Add deliberate failure cases and readable retry feedback.', 'Cancel an obsolete request with AbortController.', 'If partial results are required, compare an all-or-nothing approach with Promise.allSettled.'],
      checklist: ['Concurrent results are assigned in the intended input order.', 'Rejected requests do not leave an unhandled rejection.', 'The loading state clears after success, failure and cancellation.', 'Intentional cancellation does not display a failure alert.', 'An older response cannot replace a newer selection unnoticed.']
    },
    {
      prerequisites: 'Understand HTML forms, JSON requests and basic server programming. You need a practice backend and database; the academy itself does not provide message submission or a private dashboard.',
      outcome: 'Plan a complete contact workflow with server validation, parameterized storage, authorized reads and honest submission feedback.',
      mistakes: ['Trusting client-side validation as the only validation.', 'Building SQL strings by concatenating user input.', 'Publishing a message-list endpoint without authorization.', 'Displaying success before the server confirms the save.', 'Putting database credentials in browser code.'],
      project: 'Build a full-stack contact inbox in a practice environment',
      steps: ['Define the message fields and validation rules before building the UI.', 'Create labeled form controls and a pending state.', 'Implement POST /api/messages with server validation and size limits.', 'Store validated data using parameterized queries and server-held credentials.', 'Protect inbox routes with authentication and authorization.', 'Render message text safely and test success and failure paths.', 'Decide retention and deletion behavior for private messages.'],
      checklist: ['Direct invalid requests are rejected by the server.', 'Valid data is saved before success is returned.', 'Unauthenticated users cannot read private messages.', 'Submission failure preserves the typed message.', 'Database errors do not reveal credentials or internal details.', 'The form is usable with keyboard navigation and labeled controls.']
    }
  ];
  // Each lesson has a concrete exercise, a success criterion and a worked hint.
  const exercises = [
    [
      ['Create a study-planner folder containing hello.js and README.md. Write the run command in the README.', 'The editor shows both files, and the terminal is opened in that same folder.', 'File names and paths matter: hello.js is different from hello.js.txt. Use the terminal folder listing to confirm the real file name.'],
      ['Print your name, your first learning goal and a weekly study time using three console.log statements.', 'Three readable lines appear in the same order as the statements.', "console.log('Learner: Samir');\nconsole.log('Goal: Build a portfolio');\nconsole.log('Weekly study: 120 minutes');"],
      ['Run hello.js, change the goal text, save the file and run it again.', 'The second run displays the new goal. It does not show the old unsaved version.', 'The edit–save–run cycle is essential. If output is unchanged, check that the file was saved and that the terminal command points to the intended file.'],
      ['Deliberately misspell a variable in console.log. Read the first relevant error line, then fix the spelling.', 'You can explain why the ReferenceError happened and show a successful run after the fix.', 'A variable must be declared before use, in a reachable scope, with exactly matching capitalization. Correct the name rather than hiding the error.'],
      ['Convert 20 and -10 Celsius to Fahrenheit using one reusable formula.', '20 Celsius gives 68 Fahrenheit; -10 Celsius gives 14 Fahrenheit.', 'Multiply by 9 / 5 before adding 32. Parentheses make the intended order clearer: (celsius * 9 / 5) + 32. Negative values are valid inputs.']
    ],
    [
      ['Write a complete HTML page with a title, one main heading and two course descriptions.', 'The browser tab has your title, and the page displays the heading and descriptions.', 'Metadata belongs in head; readable content belongs in body. The title element is not a visible page heading. Use h1 for the main page topic.'],
      ['Add a link to a courses section and an informative image with alternative text.', 'The link reaches an existing id="courses" element, and the image has a useful text description.', 'A fragment link such as #courses targets an ID on the current page. IDs must be unique. An image alt describes its information, not its file name.'],
      ['Create style.css, connect it in head and change the color of all course headings.', 'Changing the stylesheet changes every matching heading after reload.', 'Use a selector such as .course-card h2. Check the stylesheet path before increasing selector specificity. Browser developer tools can show whether a rule is applied or overridden.'],
      ['Compare a card with 24px padding and 16px margin against a card without either.', 'You can identify the internal and external space independently.', 'With border-box sizing, the declared width includes padding and border. Margin remains outside. Outline is useful when inspecting boxes because it does not change their layout size.'],
      ['Replace a clickable div with a native button and add nav and main landmarks to a page.', 'Tab reaches the button and Enter or Space activates it without custom keyboard code.', 'Native semantic elements carry default behavior. Use links for navigation and buttons for actions. ARIA labels clarify a purpose when visible text alone is insufficient; they do not replace normal HTML structure.'],
      ['Create a toolbar with three links and make it wrap on a narrow viewport.', 'Links stay readable and move to another row instead of extending beyond the container.', 'Set display:flex, gap:12px and flex-wrap:wrap. Avoid forcing a fixed toolbar width. Compare justify-content for main-axis alignment with align-items for cross-axis alignment.']
    ],
    [
      ['Track a lesson count starting at 0. Increment it twice and print a message using a template literal.', 'The message includes a count of 2, while the learner name remains unchanged.', "const name = 'Samir';\nlet completed = 0;\ncompleted += 1;\ncompleted += 1;\nconsole.log(`${name}: ${completed} lessons`);"],
      ['Loop through the numbers 1 to 5 and print only the even ones.', 'The output contains 2 and 4 exactly once each.', 'Use i <= 5 for the inclusive upper bound and i % 2 === 0 for an even-number test. A loop starting at zero would include an extra value unless your condition excludes it.'],
      ['Write minutesToHours(minutes) and call it with 30, 90 and 0.', 'The results are 0.5, 1.5 and 0. Return a value so callers can reuse it.', 'A pure conversion function can simply return minutes / 60. Printing inside the function is different from returning its result. Keep formatting outside the calculation.'],
      ['Extend total(values) to calculate the average of [10, 20, 30]. Decide how an empty array should be handled.', 'The average is 20. An empty array gives a documented result instead of accidental division by zero.', 'Calculate total(values) / values.length only after checking length. Returning null for no average is one explicit choice; document it and test it.'],
      ['Given courses with title and completed fields, create a list containing only completed course titles.', 'Incomplete courses are excluded and the original objects remain unchanged.', "const titles = courses\n  .filter(course => course.completed)\n  .map(course => course.title);\n// filter selects items; map transforms them."],
      ['Build a button that adds one to a displayed count, plus a reset button.', 'Each click updates the count once; reset returns the display to 0.', 'Keep the number in one variable, update it in the event handler and render with textContent. Attach listeners once rather than every time you redraw the UI.']
    ],
    [
      ['Create a three-card grid with a 24px gap and columns that share the available width.', 'All cards align and long text does not force the page to overflow.', 'repeat(3, minmax(0, 1fr)) permits tracks to shrink below the intrinsic width of their content. Long unbroken text may still need overflow-wrap:anywhere.'],
      ['Start with one card column and switch to three at a width of 800px.', 'At 799px there is one column; at 800px there are three.', 'Write the mobile layout first, then override grid-template-columns inside @media (min-width:800px). Test the breakpoint boundary, not just one phone and one desktop size.'],
      ['Add a project image and a link to its details section. Test with the image unavailable.', 'The project still has an understandable description and the link works.', 'Use an informative alt for an informative image. For purely decorative artwork, use alt="". Do not repeat a full adjacent description unnecessarily in alt text.'],
      ['Run the page locally and record three checks in README.md: links, keyboard use and narrow layout.', 'Another person can follow the README to open and review the page.', 'A local preview server and a published site are different. Relative asset paths must remain correct. Review console errors and missing image or stylesheet requests before sharing.'],
      ['Tab through the navigation and add a skip-to-content link at the start of the document.', 'Keyboard users can bypass repeated navigation and visibly reach the main content.', 'The skip link targets the main content ID and appears when focused. Use :focus-visible for clear outlines and do not remove the browser focus indicator without a replacement.'],
      ['Add width, height and lazy loading to a project image below the hero. Compare its layout before and after loading.', 'The browser reserves the image aspect ratio and surrounding text moves less during loading.', 'HTML dimensions describe intrinsic ratio; max-width:100% and height:auto let the image scale responsively. Use an image file sized reasonably for its rendered area.']
    ],
    [
      ['Create a Greeting component that uses a JavaScript value inside an h1.', 'The component renders the value rather than literal braces or a quoted expression.', 'Expressions go inside braces in JSX. Return one root element or a fragment. HTML class becomes className, and tag pairs must be balanced.'],
      ['Create a CourseBadge component that receives a level prop, and render two badges with different levels.', 'One component definition produces Beginner and Intermediate badges.', 'Pass level="Beginner" from the parent and read it with function CourseBadge({ level }). Props are inputs; do not change the prop object inside the child.'],
      ['Build a lesson counter with increment and reset controls using useState.', 'Increment changes the displayed value and reset sets it back to 0.', 'Pass an event handler function rather than calling it during rendering. Use setCount(previous => previous + 1) when the next value depends on the current one.'],
      ['Render three tasks with stable IDs and remove the middle task.', 'The remaining rows preserve their correct content and identity.', 'A key identifies an item among siblings. Use task.id rather than generating a key during render. Keys are not passed as a regular prop; pass id separately if a child needs it.'],
      ['Create a controlled goal-title input and show a preview of the trimmed title.', 'Typing updates both the input and preview; spaces-only input is rejected on submission.', 'Use value={title} and onChange={event => setTitle(event.target.value)}. Keep the raw input for typing and trim at validation time so normal editing remains comfortable.'],
      ['Add and complete goals in a state array without push or direct property mutation.', 'Each update returns a new array, and completing a goal preserves all other goals.', 'Add with [...previous, newGoal]. Toggle with previous.map(goal => goal.id === id ? {...goal, completed: !goal.completed} : goal). Use a stable ID for matching.']
    ],
    [
      ['Write down an API contract for GET /api/courses: response fields and examples for success and empty results.', 'The contract specifies an array, course id and title fields, and [] for an empty catalog.', 'A contract helps the frontend and server agree on shape before implementation. The method and route alone do not describe the body, status codes or error format.'],
      ['Implement a JSON loader for your mock route and test a valid response and a 404.', 'A valid response returns parsed data; a 404 leads to a handled error.', 'fetch first resolves to a Response. Check ok before parsing. response.json() is another asynchronous step and can fail if the body is not valid JSON.'],
      ['Display a mock course whose title is <strong>HTML</strong> as literal text.', 'The angle brackets appear as text and no strong element is created from the remote title.', 'Create elements with createElement and assign textContent. Data from a server should not become markup simply because it contains HTML characters.'],
      ['Simulate a server error, offline failure and empty result. Give each an appropriate visible state.', 'Empty data is different from failure, and loading clears in every case.', 'Separate the data state from the error state. Check HTTP status, catch network or parsing failures, and clear loading in finally. Avoid claiming a retry succeeded before its response arrives.'],
      ['Build a URL with topic="HTML & CSS" and level="Beginner" using URLSearchParams.', 'The ampersand within the topic is encoded instead of starting a new parameter.', 'Do not concatenate raw search input into the URL. URLSearchParams.toString() handles encoding. Encoding makes a URL valid; it does not conceal sensitive information.'],
      ['Validate [{title:"HTML"}, {title:42}, null]. Keep only entries with a string title.', 'The validated array contains exactly one course. A top-level object produces a deliberate error.', 'Check Array.isArray first, then test each entry before reading its fields. Schema requirements belong to your API contract; strengthen checks if IDs or level values are required.']
    ],
    [
      ['Create a Promise chain that doubles 3 and prints 6. Then simulate a rejection and handle it.', 'The success path prints 6; the rejected path is handled without an unhandled rejection.', 'Return the transformed value from then so it reaches the next then. Add catch at the boundary where you can handle or report failure usefully.'],
      ['Rewrite a then-based greeting as an async function and await its returned result.', 'The returned Promise resolves to the same greeting string.', 'An async function wraps its return value in a Promise. await belongs inside an async function unless the environment supports top-level await in modules.'],
      ['Throw an error inside an awaited operation and handle it with a readable message.', 'The catch block runs and the remaining app stays usable.', 'Catch handles synchronous throws in its try block and rejections of awaited Promises. An un-awaited Promise rejection will not be caught merely because it was created inside try.'],
      ['Add loading, success and error states to a request function with finally.', 'Loading is false after both a successful and rejected request.', 'Keep state changes explicit. Set loading before the operation and clear it in finally. Preserve useful previous data if your interface supports it rather than always blanking the screen.'],
      ['Run independent course and project loaders together. Then reject one to observe the combined result.', 'Successful results match input order. A single rejection reaches the combined error handler.', 'Promise.all fails fast but does not cancel the other operations. Use it when the result is useful as a complete set. Use Promise.allSettled if individual successful results should still be displayed.'],
      ['Start a mock request with an AbortController and cancel it before it completes.', 'Cancellation is handled without showing a misleading network-failure alert.', 'Pass controller.signal when starting fetch. abort() rejects the operation with an AbortError in the ordinary cancellation case. A timeout or external abort reason may need distinct handling.']
    ],
    [
      ['Build a labeled email and message form. Require at least 10 non-space message characters in your submission validation.', 'Keyboard users can reach each control and blank or too-short messages are rejected.', 'HTML constraints improve user feedback but do not secure the server. Trim for validation and preserve the user’s typed values if a request fails. Associate feedback with the relevant input.'],
      ['Send a JSON payload to your practice server and verify what arrives on the server.', 'The server receives email and message fields; the client checks response.ok.', 'JSON.stringify serializes the object and Content-Type tells the server how to parse it. POST is a convention for this route, not a guarantee of storage or authentication by itself.'],
      ['Write a parameterized insert for email and message, and test text containing an apostrophe.', 'The message is stored as data, without changing the query structure.', 'Placeholder syntax varies by database driver. The lesson uses ? as pseudocode; use the syntax supported by your chosen driver. Parameterization does not replace validation or authorization.'],
      ['Implement an authorized inbox route in your practice backend and try reading it without a session.', 'An unauthenticated request is rejected, and allowed users can read only permitted messages.', 'Hiding the inbox button is not access control. The server must verify identity and permission on every request, then return only necessary fields. Render the message body using safe text handling.'],
      ['Send valid and invalid requests directly to the server, bypassing the browser form.', 'Wrong types, oversized messages and missing fields are rejected before storage.', 'Define limits in the server contract and apply them consistently. Return a helpful validation response without echoing secrets or internal errors. Validation of email format still does not prove ownership of an email address.'],
      ['Test success, server failure and a slow request in your form submission flow.', 'The button is disabled while pending, success appears only after confirmation, and failures preserve the message.', 'A disabled button reduces accidental repeated clicks but cannot prevent all duplicate requests. If duplicate writes matter, design server-side idempotency with an explicit request identifier.']
    ]
  ];
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const list = values => '<ul>' + values.map(value => '<li>' + escape(value) + '</li>').join('') + '</ul>';
  function lessonHTML(id, index) {
    const guide = guides[id]; const exercise = exercises[id][index];
    return `<div class="study-content"><details class="study-overview"><summary>Before you start · course goals and common mistakes</summary><h4>What you need</h4><p>${escape(guide.prerequisites)}</p><h4>What you will be able to do</h4><p>${escape(guide.outcome)}</p><h4>Common mistakes to avoid</h4>${list(guide.mistakes)}</details><section class="practical-exercise"><span class="eyebrow">APPLY THIS LESSON</span><h4>Your practical challenge</h4><p>${escape(exercise[0])}</p><h4>How to verify your result</h4><p>${escape(exercise[1])}</p><details><summary>Explanation and worked hint</summary><pre class="worked-hint">${escape(window.AcademyLocale ? AcademyLocale.t(exercise[2]) : exercise[2])}</pre></details><p class="practice-disclosure">Complete this exercise in your own project. The academy checks the knowledge question below; it does not automatically grade your project code.</p></section><details class="course-project"><summary>Course project · ${escape(guide.project)}</summary><h4>Build it in stages</h4><ol>${guide.steps.map(step => '<li>' + escape(step) + '</li>').join('')}</ol><h4>Review before calling it complete</h4>${list(guide.checklist)}<p>Save your project files and a README explaining your decisions, test cases and any remaining limitations. Compare your result with each item above.</p></details></div>`;
  }
  const projectPlans = [
    {
      brief: 'Create a portfolio that explains who you are, what you can build and how to inspect your work. Begin with real content, then design the layout around it.',
      steps: ['Sketch Hero, About, Skills, Projects and Contact sections.', 'Write semantic HTML with working section links and project summaries.', 'Create a mobile-first stylesheet and add a responsive project grid.', 'Use real screenshots with reserved dimensions and meaningful alternative text.', 'Add a README with setup instructions and a short description of each design decision.'],
      checks: ['Tab reaches every link with visible focus.', 'The page remains readable at narrow widths and 200% zoom.', 'Every project link has a working destination.', 'The console has no unexpected errors and no assets are missing.'],
      extension: 'Add a light/dark theme with a labeled control and save the preference locally. Check text contrast in both themes.'
    },
    {
      brief: 'Build a task tracker where the task array is the source of truth. The list, filters and remaining count are views of that same state.',
      steps: ['Define a task as { id, title, completed } and keep stable unique IDs.', 'Validate trimmed input and add a new task without losing existing tasks.', 'Render text with textContent and connect a checkbox to completion.', 'Filter All, Active and Completed without deleting hidden tasks.', 'Add removal and an empty state; optionally persist the task array in localStorage.'],
      checks: ['Two tasks with the same title can still be changed independently.', 'Blank input does not add a row.', 'Completion changes the remaining count once.', 'Filtering changes the view but preserves the underlying tasks.', 'If persistence is added, corrupted saved data does not break the interface.'],
      extension: 'Add editing and an undo action for removal. If tasks are persisted, explain that clearing browser data removes them.'
    },
    {
      brief: 'Build a weather card that clearly identifies the selected city and measurement units. Use a mock response first, then integrate an API whose access rules you have reviewed.',
      steps: ['Define the fields you need: city, temperature, units and condition.', 'Render a local sample object to confirm the layout before networking.', 'Build a request function with response status and data-shape checks.', 'Add distinct loading, empty/not-found, success and error states.', 'Cancel or ignore stale requests when a newer city search starts.', 'Keep private keys on your server if the provider requires a secret.'],
      checks: ['The displayed temperature always includes its unit.', 'An invalid city has an understandable message.', 'A failed request clears loading and offers a retry.', 'A slow earlier response cannot replace the latest city.', 'Missing response fields do not render undefined values.'],
      extension: 'Add a Celsius/Fahrenheit toggle. Convert a known value such as 0°C to 32°F and document whether your source values are Celsius or Fahrenheit.'
    },
    {
      brief: 'Build browser-only notes with a clear storage boundary. Local storage is convenient for learning but does not provide account synchronization or a backup.',
      steps: ['Represent each note with a stable ID, title, body and update time.', 'Create labeled inputs for adding and editing a note.', 'Validate blank content and render note text safely.', 'Save a versioned JSON structure after changes and validate it when loading.', 'Handle unavailable storage and invalid JSON with a visible, helpful fallback.', 'Add deletion and a way to cancel or undo accidental changes.'],
      checks: ['Refreshing the page restores notes when storage is available.', 'Editing a note preserves its ID.', 'HTML-like text remains plain text.', 'Invalid saved data does not crash the page.', 'The UI tells the user when changes are only available for this session.'],
      extension: 'Add search and export/import for a documented JSON format. Validate imported fields and lengths before accepting them.'
    }
  ];
  function projectHTML(index) {
    const project = projectPlans[index];
    return '<section class="project-plan"><h3>Project brief</h3><p>' + escape(project.brief) + '</p><h3>Implementation roadmap</h3><ol>' + project.steps.map(step => '<li>' + escape(step) + '</li>').join('') + '</ol><h3>Acceptance checks</h3>' + list(project.checks) + '<h3>Extend your project</h3><p>' + escape(project.extension) + '</p><p class="practice-disclosure">This is a project specification for your own implementation. The Task Tracker card also includes a small working demo.</p></section>';
  }

  return { lessonHTML, projectHTML, guides, exercises, projectPlans };
})();


