window.AcademyExperience = (() => {
  const tr=(en,ar)=>AcademyLocale.t(en,ar);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read=(key,fallback)=>{try{const value=JSON.parse(localStorage.getItem(key));return value??fallback;}catch{return fallback;}};
  const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}};
  let activity=read('samir-learning-activity-v1',{});if(!activity||Array.isArray(activity)||typeof activity!=='object')activity={};
  let exams=read('samir-learning-exams-v1',{});if(!exams||Array.isArray(exams)||typeof exams!=='object')exams={};
  let storageAvailable=true; let clearedExam=null;
  function remember(id,index){activity[id]={index,at:Date.now()};storageAvailable=write('samir-learning-activity-v1',activity)&&storageAvailable;renderDashboard();}
  function title(course){return tr(course.title);}
  function launch(id,index){AcademyLearning.open(AcademyCourses.courses[id],id,AcademyCourses.refresh,index);}
  function renderDashboard(){
    const panel=document.querySelector('#my-learning');if(!panel||!window.AcademyCourses)return;
    const courses=AcademyCourses.courses;
    const active=courses.map((course,id)=>({course,id,count:AcademyLearning.count(id),record:activity[id]})).filter(item=>item.count>0||item.record).sort((a,b)=>(Number(b.record?.at)||0)-(Number(a.record?.at)||0));
    const done=courses.reduce((sum,_,id)=>sum+AcademyLearning.count(id),0);
    panel.innerHTML=`<div class="section-head"><div><span class="eyebrow">${tr('YOUR PERSONAL LEARNING HUB','مساحتك الشخصية للتعلم')}</span><h2 tabindex="-1">${tr('My Learning','تعلّمي')}</h2></div><p>${tr('Your progress lives on this browser and device.','تقدمك محفوظ في هذا المتصفح وعلى هذا الجهاز.')}${storageAvailable?'':tr(' Storage is unavailable; changes last for this session.',' التخزين غير متاح؛ التغييرات لهذه الجلسة فقط.')}</p></div><div class="learning-stats"><span><bdi dir="ltr">${done} / ${courses.reduce((sum,_,id)=>sum+AcademyLearning.total(id),0)}</bdi> ${tr('lessons completed','دروس مكتملة')}</span><span>${active.length} ${tr('courses started','دورات بدأتَها')}</span></div><div class="dashboard-courses"></div>`;
    const grid=panel.querySelector('.dashboard-courses');
    if(clearedExam){const undo=document.createElement('button');undo.className='button secondary small';undo.textContent=tr('Undo assessment reset','تراجع عن مسح النتيجة');undo.onclick=()=>{exams[clearedExam.id]=clearedExam.value;write('samir-learning-exams-v1',exams);clearedExam=null;renderDashboard();};panel.appendChild(undo);}
    if(!active.length){grid.innerHTML=`<p>${tr('Start a course to see it here. No account needed.','ابدأ أي دورة لتظهر هنا، دون الحاجة إلى حساب.')}</p><a class="button" href="#courses">${tr('Browse Courses','تصفح الدورات')}</a>`;return;}
    active.forEach(({course,id,count,record},position)=>{
      const card=document.createElement('article');card.className='dashboard-card';
      const validIndex=Number.isInteger(record?.index)&&record.index>=0&&record.index<course.lessons.length?record.index:undefined;
      card.innerHTML=`${position===0?'<span class="eyebrow">'+tr('LAST VISITED','آخر زيارة')+'</span>':''}<h3>${esc(title(course))}</h3><p><bdi dir="ltr">${count} / ${AcademyLearning.total(id)}</bdi> ${tr('lessons completed','دروس مكتملة')}</p><progress max="${AcademyLearning.total(id)}" value="${count}" aria-label="${tr('Course progress','تقدم الدورة')}"></progress><p>${validIndex===undefined?'':esc(tr('Last lesson: ','آخر درس: ')+tr(course.lessons[validIndex]))}</p><button class="button small" data-resume>${tr('Resume last lesson','تابع آخر درس')}</button><button class="button secondary small" data-assessment>${tr('Course assessment','اختبار نهاية الدورة')}</button><small>${exams[id]?tr('Best assessment: ','أفضل نتيجة: ')+Number(exams[id].best||0)+'%':tr('Assessment not attempted yet','لم تُجرِ الاختبار بعد')}</small>`;
      card.querySelector('[data-resume]').onclick=()=>launch(id,validIndex);
      card.querySelector('[data-assessment]').onclick=()=>exam(course,id);
      if(exams[id]){const reset=document.createElement('button');reset.className='assessment-reset';reset.textContent=tr('Reset assessment result','مسح نتيجة الاختبار');reset.onclick=()=>{clearedExam={id,value:exams[id]};delete exams[id];write('samir-learning-exams-v1',exams);renderDashboard();};card.appendChild(reset);}
      grid.appendChild(card);
    });
  }
  function renderSearch(){
    const section=document.querySelector('#lesson-discovery');if(!section)return;
    section.innerHTML=`<h2>${tr('Find a lesson','ابحث عن درس')}</h2><label for="lesson-search">${tr('Search titles, explanations and practical exercises','ابحث في العناوين والشرح والتمارين العملية')}</label><input id="lesson-search" type="search" placeholder="${tr('Try events, errors, forms…','جرّب: أحداث، أخطاء، نماذج…')}"><p role="status" class="lesson-search-count"></p><div class="lesson-search-results"></div>`;
    const input=section.querySelector('input');
    const normalize=value=>String(value).toLowerCase().normalize('NFKD').replace(/[\u064b-\u065f\u0300-\u036f]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي');
    function search(){
      const query=normalize(input.value.trim());const results=section.querySelector('.lesson-search-results');results.replaceChildren();
      if(!query){section.querySelector('.lesson-search-count').textContent=tr('Search across all 47 lessons.','ابحث في الدروس الـ47.');return;}
      let count=0;
      AcademyCourses.courses.forEach((course,id)=>AcademyLearning.lessons(id).forEach((lesson,index)=>{
        const exercise=AcademyStudy.exercises[id][index];
        const en=[course.title,course.lessons[index],lesson[0],...exercise].join(' ');
        const ar=[tr(course.title),tr(course.lessons[index]),tr(lesson[0]),...exercise.map(value=>tr(value))].join(' ');
        if(!normalize(en+' '+ar).includes(query))return;count++;
        const button=document.createElement('button');button.className='lesson-result';button.innerHTML=`<strong>${esc(tr(course.lessons[index]))}</strong><span>${esc(tr(course.title))}</span><small>${esc(tr(lesson[0]).slice(0,160))}…</small>`;button.onclick=()=>launch(id,index);results.appendChild(button);
      }));
      section.querySelector('.lesson-search-count').textContent=count+' '+tr('matching lessons','دروس مطابقة');
      if(!count)results.innerHTML='<p>'+tr('No lesson matches. Try a broader term.','لا توجد نتائج. جرّب كلمة أعم.')+'</p>';
    }
    input.oninput=search;search();
  }
  function playground(host,id,index,sample){
    const key='samir-playground-'+id+'-'+index;
    const initial={html:'<article class="card">\n  <h1>My learning journey</h1>\n  <p>Change this text and see the result.</p>\n  <button type="button">Keep learning</button>\n</article>',css:'.card { padding: 24px; font-family: sans-serif; color: #253052; }\nbutton { background: #7956e9; color: white; padding: 12px; border: 0; border-radius: 8px; }'};
    let draft=read(key,initial);if(typeof draft?.html!=='string'||typeof draft?.css!=='string')draft=initial;
    host.innerHTML=`<details class="code-playground"><summary>${tr('HTML/CSS lab · live preview','مختبر HTML/CSS · معاينة مباشرة')}</summary><p>${tr('Edit HTML and CSS below. JavaScript and external resources are disabled in this preview. Drafts are saved in this browser when storage is available.','عدّل HTML وCSS بالأسفل. JavaScript والموارد الخارجية معطّلة في المعاينة. تُحفظ المسودات في هذا المتصفح عند توفر التخزين.')}</p><label>HTML<textarea data-html spellcheck="false" dir="ltr" maxlength="30000"></textarea></label><label>CSS<textarea data-css spellcheck="false" dir="ltr" maxlength="30000"></textarea></label><div class="lab-actions"><button class="button small" data-run>${tr('Update preview','حدّث المعاينة')}</button><button class="button secondary small" data-reset>${tr('Reset example','استعد المثال')}</button></div><p class="lab-status" role="status"></p><iframe title="${tr('HTML and CSS preview','معاينة HTML وCSS')}" sandbox="" referrerpolicy="no-referrer"></iframe></details>`;
    const html=host.querySelector('[data-html]'),css=host.querySelector('[data-css]');html.value=draft.html;css.value=draft.css;
    function update(){
      const parsed=new DOMParser().parseFromString(html.value,'text/html');
      parsed.querySelectorAll('script,iframe,object,embed,base,meta,link').forEach(node=>node.remove());
      parsed.querySelectorAll('*').forEach(node=>Array.from(node.attributes).forEach(attr=>{if(/^on/i.test(attr.name)||['srcdoc','action','formaction','ping'].includes(attr.name)||(['href','src','poster','srcset','xlink:href'].includes(attr.name)&&!attr.value.startsWith('#')&&!attr.value.startsWith('data:')))node.removeAttribute(attr.name);}));
      host.querySelector('iframe').srcdoc='<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src &#39;none&#39;; style-src &#39;unsafe-inline&#39;; img-src data:; form-action &#39;none&#39;; base-uri &#39;none&#39;"><style>'+css.value+'</style></head><body>'+parsed.body.innerHTML+'</body></html>';
      host.querySelector('.lab-status').textContent=write(key,{html:html.value,css:css.value})?tr('Preview updated · draft saved.','تم تحديث المعاينة وحفظ المسودة.'):tr('Preview updated · draft kept for this session only.','تم تحديث المعاينة؛ تعذر حفظ المسودة.');
    }
    let timer;[html,css].forEach(input=>input.oninput=()=>{clearTimeout(timer);timer=setTimeout(update,400);});
    host.querySelector('[data-run]').onclick=update;
    host.querySelector('[data-reset]').onclick=()=>{html.value=initial.html;css.value=initial.css;update();};update();
  }
  const banks = [
    [
      ['You changed a file but its output stayed the same. What should you check?','عدّلت الملف لكن الناتج لم يتغير. ماذا تتحقق منه؟',['The saved file and terminal folder','Only the font','Only the mouse'],['حفظ الملف ومجلد الطرفية','الخط فقط','الفأرة فقط'],0,'The command must run the file you actually edited.','يجب أن يشغّل الأمر الملف الذي عدّلته فعلًا.'],
      ['True or false: a ReferenceError can come from a misspelled variable.','صح أم خطأ: قد ينتج ReferenceError عن خطأ في اسم المتغير.',['True','False'],['صح','خطأ'],0,'Names must match exactly, including capitalization.','يجب أن تتطابق الأسماء وحالة الأحرف تمامًا.'],
      ['Choose a good order for solving a small programming problem.','اختر ترتيبًا مناسبًا لحل مسألة برمجية صغيرة.',['Write random code, then guess','Define inputs and outputs, implement, test','Skip testing'],['اكتب عشوائيًا ثم خمّن','حدد المدخلات والمخرجات ثم نفّذ واختبر','تجاوز الاختبار'],1,'Known examples make your calculations verifiable.','تجعل الأمثلة المعروفة حساباتك قابلة للتحقق.']
    ],
    [
      ['Which control best supports an action with keyboard behavior?','أي عنصر أنسب لتنفيذ إجراء مع دعم لوحة المفاتيح؟',['div','button','span'],['div','button','span'],1,'Native buttons provide keyboard semantics and behavior.','الزر الأصلي يوفر دلالة وسلوكًا بلوحة المفاتيح.'],
      ['True or false: margin is space inside the border.','صح أم خطأ: margin مساحة داخل الحد.',['True','False'],['صح','خطأ'],1,'Padding is inside; margin separates the element from its surroundings.','padding داخل العنصر وmargin يفصله عن محيطه.'],
      ['A toolbar overflows on a phone. Which is a useful first change?','شريط أدوات يخرج عن عرض الهاتف. ما التعديل الأول المفيد؟',['Use flex-wrap and remove fixed widths','Hide all text','Remove labels'],['استخدم flex-wrap وأزل العرض الثابت','أخفِ النص كله','احذف التسميات'],0,'Wrapping adapts the layout without removing information.','الالتفاف يكيّف التخطيط دون حذف المعلومات.']
    ],
    [
      ['What does [1,2,3].filter(n => n > 1) return?','ما ناتج ‎[1,2,3].filter(n => n > 1)؟',['[1]','[2,3]','[3]'],['[1]','[2,3]','[3]'],1,'filter retains values for which the predicate is true.','filter يُبقي القيم التي تحقق الشرط.'],
      ['True or false: printing a value and returning it are the same.','صح أم خطأ: طباعة القيمة وإرجاعها شيء واحد.',['True','False'],['صح','خطأ'],1,'return lets the caller reuse a value; console.log only displays it.','return يتيح إعادة استخدام القيمة؛ console.log يعرضها.'],
      ['Where should you attach a click listener in a repeatedly rendered UI?','أين تربط مستمع النقر في واجهة يعاد عرضها؟',['Every redraw without cleanup','Once on a stable control, or carefully on new controls','Inside every loop regardless of element'],['في كل رسم دون تنظيف','مرة على عنصر ثابت أو بعناية على العناصر الجديدة','داخل كل حلقة دون تمييز'],1,'Repeated attachment can execute a handler more than once.','الربط المتكرر قد يشغّل المعالج أكثر من مرة.']
    ],
    [
      ['At a min-width:800px breakpoint, when does the rule apply?','متى تطبق قاعدة min-width:800px؟',['Below 800px','At 800px and above','Only at exactly 800px'],['أقل من 800px','من 800px فما فوق','عند 800px فقط'],1,'min-width includes the boundary value.','min-width يشمل القيمة الحدية.'],
      ['True or false: removing all focus outlines improves keyboard usability.','صح أم خطأ: إزالة كل مؤشرات التركيز تحسن استخدام لوحة المفاتيح.',['True','False'],['صح','خطأ'],1,'Keyboard users need a visible indication of their focused control.','يحتاج مستخدم لوحة المفاتيح إلى مؤشر واضح للعنصر المحدد.'],
      ['Which image should usually load promptly rather than lazily?','أي صورة يفترض عادة تحميلها مبكرًا بدل التحميل الكسول؟',['The primary hero image','A distant project image','Every hidden image'],['صورة المقدمة الأساسية','صورة مشروع بعيدة','كل الصور المخفية'],0,'The hero is already in the initial view; lazy loading can delay it.','صورة المقدمة في العرض الأول وتأخيرها قد يبطئ ظهوره.']
    ],
    [
      ['Which key is suitable for a task row?','أي مفتاح مناسب لسطر مهمة؟',['A new random value each render','A stable task ID','The same key for all rows'],['قيمة عشوائية في كل رسم','معرّف مهمة ثابت','مفتاح واحد لكل الأسطر'],1,'Stable IDs let React preserve the identity of each item.','المعرّفات الثابتة تحفظ هوية العناصر في React.'],
      ['True or false: push mutates the original state array.','صح أم خطأ: push يغيّر مصفوفة الحالة الأصلية.',['True','False'],['صح','خطأ'],0,'Create a new array, for example [...previous, item].','أنشئ مصفوفة جديدة مثل ‎[...previous, item].'],
      ['What is missing from a controlled input with value={name}?','ما الذي ينقص حقلًا متحكمًا فيه له value={name}؟',['An onChange handler updating state','A random key every render','A database'],['معالج onChange يحدّث الحالة','مفتاح عشوائي في كل رسم','قاعدة بيانات'],0,'A controlled input needs a state update to reflect typing.','يحتاج الحقل المتحكم فيه إلى تحديث الحالة ليعكس الكتابة.']
    ],
    [
      ['A fetch returns HTTP 500. What should your loader do?','أعاد fetch الحالة HTTP 500. ماذا يفعل محمّل البيانات؟',['Assume success','Check response.ok and handle failure','Render the raw response as HTML'],['يفترض النجاح','يتحقق من response.ok ويعالج الفشل','يعرض الرد كـHTML'],1,'HTTP failure statuses do not automatically reject fetch.','حالات فشل HTTP لا تجعل fetch يرفض تلقائيًا.'],
      ['True or false: a valid JSON response always has your expected shape.','صح أم خطأ: JSON صالح له دائمًا البنية المتوقعة.',['True','False'],['صح','خطأ'],1,'Parsing and schema validation are different steps.','تحليل JSON والتحقق من البنية خطوتان مختلفتان.'],
      ['Where can you safely render an external plain-text title?','أين تعرض عنوانًا نصيًا خارجيًا بأمان؟',['textContent','innerHTML without checks','An onclick string'],['textContent','innerHTML دون تحقق','نص onclick'],0,'textContent displays data without interpreting markup.','textContent يعرض البيانات دون تفسيرها كوسوم.']
    ],
    [
      ['Which tool fits independent requests needed as a complete set?','أي أداة مناسبة لطلبات مستقلة نحتاج نتائجها كمجموعة كاملة؟',['Promise.all','A synchronous while loop','A CSS transition'],['Promise.all','حلقة while متزامنة','انتقال CSS'],0,'Promise.all combines independent results in input order.','Promise.all يجمع النتائج المستقلة بترتيب المدخلات.'],
      ['True or false: Promise.all cancels other requests when one fails.','صح أم خطأ: Promise.all يلغي بقية الطلبات إذا فشل أحدها.',['True','False'],['صح','خطأ'],1,'It rejects early but does not automatically cancel the other operations.','يرفض مبكرًا لكنه لا يلغي العمليات الأخرى تلقائيًا.'],
      ['Where should loading be cleared for success and failure?','أين تنهي التحميل في النجاح والفشل؟',['Only before the request','In finally','Only in the success branch'],['قبل الطلب فقط','في finally','في فرع النجاح فقط'],1,'finally runs after try/catch whether the operation succeeds or fails.','finally ينفذ بعد try/catch سواء نجحت العملية أم فشلت.']
    ],
    [
      ['Where must private inbox access be authorized?','أين تتحقق من صلاحية الوصول إلى صندوق الرسائل الخاص؟',['On the server for each request','Only in CSS','Only by hiding the link'],['في الخادم لكل طلب','في CSS فقط','بإخفاء الرابط فقط'],0,'Client UI is not a security boundary.','واجهة العميل ليست حاجزًا أمنيًا.'],
      ['True or false: browser required attributes replace server validation.','صح أم خطأ: required في المتصفح يغني عن تحقق الخادم.',['True','False'],['صح','خطأ'],1,'Direct requests can bypass the browser form completely.','يمكن للطلبات المباشرة تجاوز نموذج المتصفح بالكامل.'],
      ['How should SQL values be passed to the database?','كيف تمرر قيم SQL إلى قاعدة البيانات؟',['Concatenate user strings','Use driver-supported parameters','Store credentials in the browser'],['ادمج نص المستخدم في الاستعلام','استخدم معاملات يدعمها المشغّل','ضع بيانات الاتصال في المتصفح'],1,'Parameters keep values separate from query structure.','المعاملات تفصل القيم عن بنية الاستعلام.']
    ]
  ];
  function exam(course,id){
    const origin=document.activeElement;const dialog=document.createElement('dialog');dialog.className='assessment-dialog';dialog.setAttribute('aria-label',tr('Course assessment','اختبار نهاية الدورة'));
    const last=AcademyLearning.lessons(id).at(-1);const questions=banks[id].map(q=>({question:tr(q[0],q[1]),answers:AcademyLocale.language==='ar'?q[3]:q[2],correct:q[4],explanation:tr(q[5],q[6])}));
    questions.push({question:tr(last[2]),answers:last[3].map(answer=>tr(answer)),correct:last[4],explanation:tr(last[0])});
    dialog.innerHTML=`<button class="button secondary small" data-close>${tr('Close ×','إغلاق ×')}</button><h2>${esc(tr(course.title))}</h2><h3>${tr('Course assessment','اختبار نهاية الدورة')}</h3><p>${tr('Four questions. Pass at 75%. This checks knowledge, not project code. You can retry; your best result is saved.','أربعة أسئلة. النجاح من 75٪. يقيس الاختبار المعرفة ولا يقيّم كود المشروع. يمكنك الإعادة وتُحفظ أفضل نتيجة.')}</p><form>${questions.map((q,i)=>`<fieldset><legend>${i+1}. ${esc(q.question)}</legend>${q.answers.map((answer,j)=>`<label><input type="radio" name="q${i}" value="${j}" required> ${esc(answer)}</label>`).join('')}<div data-feedback="${i}"></div></fieldset>`).join('')}<button class="button">${tr('Submit assessment','صحّح الاختبار')}</button><p class="exam-result" role="status" tabindex="-1"></p></form>`;
    dialog.querySelector('[data-close]').onclick=()=>dialog.close();dialog.onclose=()=>{dialog.remove();renderDashboard();if(origin?.isConnected)origin.focus();};
    dialog.querySelector('form').onsubmit=event=>{
      event.preventDefault();let points=0;questions.forEach((q,i)=>{const correct=Number(dialog.querySelector(`input[name="q${i}"]:checked`).value)===q.correct;if(correct)points++;dialog.querySelector(`[data-feedback="${i}"]`).textContent=(correct?tr('Correct. ','صحيح. '):tr('Review: ','راجع: '))+q.explanation+(correct?'':tr(' Correct answer: ',' الإجابة الصحيحة: ')+q.answers[q.correct]);});
      const score=points/questions.length*100;const stored=write('samir-learning-exams-v1',{...exams,[id]:{best:Math.max(Number(exams[id]?.best)||0,score),last:score}});exams[id]={best:Math.max(Number(exams[id]?.best)||0,score),last:score};
      const result=dialog.querySelector('.exam-result');result.textContent=`${points}/4 · ${score}% · ${score>=75?tr('Passed','ناجح'):tr('Review the explanations and try again','راجع الشرح وحاول مجددًا')}${stored?'':tr(' · Result available this session only',' · النتيجة لهذه الجلسة فقط')}`;result.focus();renderDashboard();
    };
    document.body.appendChild(dialog);dialog.showModal();dialog.querySelector('[data-close]').focus();
  }
  function start(){
    if(!document.querySelector('#course-grid'))return;
    const dashboard=document.createElement('section');dashboard.id='my-learning';dashboard.className='section wrap';document.querySelector('#paths').before(dashboard);
    const search=document.createElement('section');search.id='lesson-discovery';search.className='section wrap';document.querySelector('#courses').after(search);
    const link=document.createElement('a');link.href='#my-learning';link.textContent=tr('My Learning','تعلّمي');document.querySelector('#navigation').appendChild(link);
    document.querySelector('#navigation').addEventListener('click', event => { if(event.target.closest('a')) { document.querySelector('#navigation').classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false'); } });
    document.addEventListener('academy-progress',renderDashboard);document.addEventListener('academy-language',()=>{AcademyCourses.refresh();renderDashboard();renderSearch();});renderDashboard();renderSearch();
  }
  return {start,remember,renderDashboard,playground,exam};
})();


