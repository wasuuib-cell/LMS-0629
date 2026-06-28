const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// 1. Move Year and Batch to the top of the modal
const oldModalContent = `
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Paste Zoom Invitation Message</label>
                <textarea
                  value={zoomMessage}
                  onChange={(e) => setZoomMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-medium focus:outline-none focus:border-primary/30 transition-all min-h-[200px]"
                  placeholder="Topic: Class\\nTime: Jan 1, 2026 10:00 AM\\n\\nJoin Zoom Meeting\\nhttps://zoom.us/j/123456789..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Target Batches (Years)</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {academicYears.map(y => (
                      <button
                        key={y.id}
                        type="button"
                        onClick={() => {
                          const current = zoomYearIds || [];
                          let updated;
                          if (current.includes(y.id)) updated = current.filter(id => id !== y.id);
                          else updated = [...current, y.id];
                          setZoomYearIds(updated);
                          localStorage.setItem('defaultYearIds', JSON.stringify(updated));
                        }}
                        className={\`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all \${zoomYearIds.includes(y.id) ? 'bg-primary text-white border-primary shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'}\`}
                      >
                        {y.year}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Target Class Types</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {classTypes.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          const current = zoomClassTypes || [];
                          let updated;
                          if (current.includes(c.name)) updated = current.filter(name => name !== c.name);
                          else updated = [...current, c.name];
                          setZoomClassTypes(updated);
                          localStorage.setItem('defaultClassTypes', JSON.stringify(updated));
                        }}
                        className={\`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all \${zoomClassTypes.includes(c.name) ? 'bg-primary text-white border-primary shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'}\`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
`;

const newModalContent = `
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Target Batches (Years)</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {academicYears.map(y => (
                      <button
                        key={y.id}
                        type="button"
                        onClick={() => {
                          const current = zoomYearIds || [];
                          let updated;
                          if (current.includes(y.id)) updated = current.filter(id => id !== y.id);
                          else updated = [...current, y.id];
                          setZoomYearIds(updated);
                          localStorage.setItem('defaultYearIds', JSON.stringify(updated));
                        }}
                        className={\`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all \${zoomYearIds.includes(y.id) ? 'bg-primary text-white border-primary shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'}\`}
                      >
                        {y.year}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Target Class Types</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {classTypes.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          const current = zoomClassTypes || [];
                          let updated;
                          if (current.includes(c.name)) updated = current.filter(name => name !== c.name);
                          else updated = [...current, c.name];
                          setZoomClassTypes(updated);
                          localStorage.setItem('defaultClassTypes', JSON.stringify(updated));
                        }}
                        className={\`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all \${zoomClassTypes.includes(c.name) ? 'bg-primary text-white border-primary shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'}\`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Paste Zoom Invitation Message</label>
                <textarea
                  value={zoomMessage}
                  onChange={(e) => setZoomMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-900 text-xs font-medium focus:outline-none focus:border-primary/30 transition-all min-h-[200px]"
                  placeholder="Topic: Class\\nTime: Jan 1, 2026 10:00 AM\\n\\nJoin Zoom Meeting\\nhttps://zoom.us/j/123456789..."
                />
              </div>
            </div>
`;

code = code.replace(oldModalContent.trim(), newModalContent.trim());

// 2. Add Zoom Sync button to Overview tab
// Search for "renderOverview" and inject it inside the first grid block
const gridRegex = /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">/;
const insertBtn = `
          <button
            onClick={() => setShowZoomSync(true)}
            className="col-span-full md:col-span-2 lg:col-span-1 bg-blue-500 hover:bg-blue-600 text-white rounded-3xl p-6 flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
          >
            <div className="p-4 bg-white/20 rounded-2xl">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-black uppercase tracking-wider">Sync Zoom</h3>
              <p className="text-xs text-blue-100 mt-1">Create live session</p>
            </div>
          </button>
`;
code = code.replace(gridRegex, `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">\n${insertBtn}`);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log('Fixed Zoom Sync modal and overview!');
