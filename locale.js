window.AcademyLocale = (() => {
  let language = 'en';
  try { language = localStorage.getItem('samir-language') === 'ar' ? 'ar' : 'en'; } catch {}
  const pairs = new Map(); const originals = new WeakMap();
  const add = (en, ar) => pairs.set(en, ar);
  const t = (en, ar) => language === 'ar' ? (ar || pairs.get(en) || en) : en;
  const ui = [
    ['Change language','تغيير اللغة'],['Course progress','تقدم الدورة'],['Path progress','تقدم المسار'],['Course lessons','دروس الدورة'],['Main navigation','التنقل الرئيسي'],['Open navigation','افتح قائمة التنقل'],['Home','الرئيسية'],['Learning Paths','مسارات التعلم'],['Courses','الدورات'],['Projects','المشاريع'],['About','عن الأكاديمية'],['FAQ','الأسئلة الشائعة'],['Contact','تواصل'],['Start Learning','ابدأ التعلم'],['My Learning','تعلّمي'],['Explore path →','استكشف المسار ←'],['Start course','ابدأ الدورة'],['Continue learning','تابع التعلم'],['Review course','راجع الدورة'],['Open course','افتح الدورة'],['Continue course','تابع الدورة'],['Start path →','ابدأ المسار ←'],['Continue path →','تابع المسار ←'],['Review path','راجع المسار'],['Close path ×','أغلق المسار ×'],['Close ×','إغلاق ×'],['Close lessons','إغلاق الدروس'],['Topic','الموضوع'],['Level','المستوى'],['All topics','كل المواضيع'],['All levels','كل المستويات'],['Foundations','الأساسيات'],['Beginner','مبتدئ'],['Intermediate','متوسط'],['Back-end','الخادم'],['Search courses','ابحث في الدورات'],['Clear filters','مسح المرشحات'],['Check answer','تحقق من الإجابة'],['Complete lesson','أكمل الدرس'],['✓ Lesson completed','✓ اكتمل الدرس'],['Previous lesson','الدرس السابق'],['Next lesson →','الدرس التالي ←'],['Course assessment','اختبار نهاية الدورة'],['YOUR LEARNING SPACE','مساحة التعلم'],['YOUR COURSE ROADMAP','خريطة تعلمك'],['APPLY THIS LESSON','طبّق هذا الدرس'],['Your practical challenge','تمرينك العملي'],['How to verify your result','كيف تتحقق من النتيجة'],['Explanation and worked hint','شرح وتلميح للحل'],['Before you start · course goals and common mistakes','قبل البداية · الأهداف والأخطاء الشائعة'],['What you need','ما الذي تحتاجه'],['What you will be able to do','ما الذي ستتمكن من إنجازه'],['Common mistakes to avoid','أخطاء شائعة تجنبها'],['Build it in stages','نفّذه على مراحل'],['Review before calling it complete','راجعه قبل اعتباره مكتملًا'],['Course project','مشروع الدورة'],['Practice here. Demo tasks last while this window is open.','جرّب هنا. تبقى المهام ما دامت هذه النافذة مفتوحة.'],['New task','مهمة جديدة'],['Add task','أضف مهمة'],['All','الكل'],['Active','الجارية'],['Completed','المكتملة'],['Remove','إزالة'],['Try task demo →','جرّب متتبع المهام ←'],['View blueprint →','تفاصيل المشروع ←'],['What you will build','ما الذي ستبنيه'],['Project brief','فكرة المشروع'],['Implementation roadmap','خطوات التنفيذ'],['Acceptance checks','معايير القبول'],['Extend your project','طوّر مشروعك'],['Copy code','انسخ الكود'],['Copied ✓','تم النسخ ✓'],['Read the example. Try it in your project.','اقرأ المثال وجرّبه في مشروعك.'],['SMALL STEPS. REAL POSSIBILITIES.','خطوات صغيرة. إمكانيات واسعة.'],['Learn to Code.','تعلّم البرمجة.'],['Build Real','ابنِ مشاريع'],['Projects.','حقيقية.'],['Explore Learning Paths','استكشف مسارات التعلم'],['Browse Courses','تصفح الدورات'],['FIND YOUR DIRECTION','اختر وجهتك'],['A learning path for your next step.','مسار تعلم لخطوتك القادمة.'],['Start with the basics or build on what you know.','ابدأ بالأساسيات أو طوّر معرفتك الحالية.'],['We’ll help you connect the dots.','نساعدك على ربط المفاهيم ببعضها.'],['Small lessons. Meaningful skills.','دروس مركّزة. مهارات مفيدة.'],['Find your next skill.','اختر مهارتك القادمة.'],['Open lessons, practice, and save your progress.','افتح الدروس وطبّق واحفظ تقدمك.'],['Don’t just learn it. Build it.','تعلّمه ثم ابنِه.'],['Example learning projects to put your skills to work.','مشاريع تعليمية لتطبيق مهاراتك.'],['Your ideas make them yours.','أضف أفكارك لتجعلها مشاريعك.'],['Good questions.','أسئلة مهمة.'],['Clear answers.','إجابات واضحة.'],['Getting started shouldn’t be the hard part.','نجعل البداية أسهل.'],['Your Coding Journey Starts Here.','رحلتك مع البرمجة تبدأ هنا.'],['Start where you are. Build something that’s yours.','ابدأ من مستواك الحالي وابنِ شيئًا يخصك.'],['Find Your Learning Path','اختر مسار تعلمك'],['Progress saved on this browser','التقدم محفوظ في هذا المتصفح'],['Progress available for this session only','التقدم متاح لهذه الجلسة فقط'],['Course complete! Revisit any lesson to practice again.','اكتملت دروس الدورة! يمكنك مراجعتها والتطبيق مرة أخرى.'],['Answer the question correctly to complete this lesson.','أجب عن السؤال بشكل صحيح لإكمال الدرس.'],['Complete this exercise in your own project. The academy checks the knowledge question below; it does not automatically grade your project code.','نفّذ التمرين في مشروعك. الأكاديمية تتحقق من سؤال المعرفة ولا تقيّم كود مشروعك تلقائيًا.'],['Try again. Read the explanation and compare it with the example.','حاول مجددًا. راجع الشرح وقارنه بالمثال.']
  ];
  ui.forEach(([en,ar]) => add(en,ar));
  function translate(value) {
    if (pairs.has(value)) return t(value);
    if (language === 'ar') return value.split(' · ').map(part => pairs.get(part) || part).join(' · ').replace(/(\d+) \/ (\d+) lessons completed/g,'$1 / $2 دروس مكتملة').replace(/(\d+) courses/g,'$1 دورات').replace(/(\d+) course\(s\)/g,'$1 دورات').replace(/(\d+) tasks? remaining/g,'$1 مهام متبقية').replace('Progress is shared with the course catalog.','التقدم مشترك مع كتالوج الدورات.').replace(/\d+ \/ \d+/g, ratio => '\u2066' + ratio + '\u2069').replace(/LESSON (\d+) OF (\d+)/g,'الدرس $1 من $2').replace('Progress saved on this browser','التقدم محفوظ في هذا المتصفح').replace('Progress available for this session only','التقدم متاح لهذه الجلسة فقط');
    return value;
  }
  function apply(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement.closest('pre,code,textarea,script,style,[data-no-translate]')) continue;
      let record = originals.get(node);
      if (!record || (node.textContent !== record.last && node.textContent !== record.en)) record = {en:node.textContent,last:node.textContent};
      const trimmed = record.en.trim(); const value = record.en.replace(trimmed,translate(trimmed));
      if (node.textContent !== value) node.textContent = value;
      record.last = value; originals.set(node,record);
    }
    root.querySelectorAll('[placeholder],[aria-label]').forEach(el => ['placeholder','aria-label'].forEach(attr => { if (!el.hasAttribute(attr)) return; const key='data-original-'+attr; if(!el.hasAttribute(key)) el.setAttribute(key,el.getAttribute(attr)); el.setAttribute(attr,translate(el.getAttribute(key))); }));
  }
  function set(value) {
    language = value === 'ar' ? 'ar' : 'en';
    try { localStorage.setItem('samir-language',language); } catch {}
    document.documentElement.lang = language; document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    apply(); document.dispatchEvent(new CustomEvent('academy-language'));
  }
  function start() {
    const nav = document.querySelector('.nav');
    const button = document.createElement('button'); button.className='language-switch button secondary small'; button.setAttribute('aria-label','Change language');
    function update() { button.textContent=language==='ar'?'English':'العربية'; }
    button.onclick=()=>{set(language==='ar'?'en':'ar');update();}; nav.appendChild(button);update();set(language);
    const observer = new MutationObserver(records => { const roots=new Set(); records.forEach(record => { if(record.type==='childList') record.addedNodes.forEach(node=>{if(node.nodeType===1) roots.add(node); else if(node.nodeType===3 && node.parentElement) roots.add(node.parentElement);}); }); roots.forEach(root=>apply(root)); });
    observer.observe(document.body,{childList:true,subtree:true});
  }
  return {add,t,apply,set,start,get language(){return language;}};
})();




