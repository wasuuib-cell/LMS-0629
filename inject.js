const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

const injection =                   <div className=" grid grid-cols-1 md:grid-cols-2 gap-6\>\n <div className=\space-y-2\>\n <label className=\text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1\>Target Batches (Years)</label>\n <div className=\flex flex-wrap gap-2 mt-2\>\n {academicYears.map(y => (\n <button\n key={y.id}\n type=\button\\n onClick={() => {\n const current = zoomYearIds || [];\n let updated;\n if (current.includes(y.id)) {\n updated = current.filter(id => id !== y.id);\n } else {\n updated = [...current, y.id];\n }\n setZoomYearIds(updated);\n localStorage.setItem('defaultYearIds', JSON.stringify(updated));\n setNewLesson({...newLesson, yearIds: updated});\n }}\n className={\px-3 py-1.5 rounded-lg text-xs font-bold border transition-all \\}\n >\n {y.year}\n </button>\n ))}\n </div>\n </div>\n <div className=\space-y-2\>\n <label className=\text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1\>Target Class Types</label>\n <div className=\flex flex-wrap gap-2 mt-2\>\n {classTypes.map(c => (\n <button\n key={c.id}\n type=\button\\n onClick={() => {\n const current = zoomClassTypes || [];\n let updated;\n if (current.includes(c.name)) {\n updated = current.filter(name => name !== c.name);\n } else {\n updated = [...current, c.name];\n }\n setZoomClassTypes(updated);\n localStorage.setItem('defaultClassTypes', JSON.stringify(updated));\n setNewLesson({...newLesson, classTypes: updated});\n }}\n className={\px-3 py-1.5 rounded-lg text-xs font-bold border transition-all \\}\n >\n {c.name}\n </button>\n ))}\n </div>\n </div>\n </div>\n;

code = code.replace(
 ' <div className=\space-y-6 overflow-y-auto custom-scrollbar flex-1 pr-2\>\\n <div>\\n <label className=\text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic\>Paste Zoom Invitation Message</label>',
 ' <div className=\space-y-6 overflow-y-auto custom-scrollbar flex-1 pr-2\>\\n' + injection + ' <div>\\n <label className=\text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic\>Paste Zoom Invitation Message</label>'
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log('UI injected');
