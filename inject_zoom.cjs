const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// 1. Add createPortal
code = code.replace("import { DashboardLayout }", "import { createPortal } from 'react-dom';\nimport { DashboardLayout }");

// 2. Add State variables
const stateInsert = `
  const [showZoomSync, setShowZoomSync] = useState(false);
  const [zoomMessage, setZoomMessage] = useState('');
  const [zoomYearIds, setZoomYearIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('defaultYearIds') || '[]'); } catch { return []; }
  });
  const [zoomClassTypes, setZoomClassTypes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('defaultClassTypes') || '[]'); } catch { return []; }
  });

  const handleSaveZoomMessage = async () => {
    if (!zoomMessage.trim()) return;
    const linkMatch = zoomMessage.match(/(https:\\/\\/[^\\s]+)/);
    const link = linkMatch ? linkMatch[0] : '';
    let title = 'Zoom Meeting';
    const lines = zoomMessage.split('\\n');
    if(lines.length > 0) title = lines[0];

    try {
      await addDoc(collection(db, 'onlineClasses'), { 
         title: title, 
         link: link, 
         type: 'zoom', 
         startTime: serverTimestamp(),
         zoomMessage: zoomMessage,
         yearIds: zoomYearIds,
         classTypes: zoomClassTypes
      });
      setShowZoomSync(false);
      setZoomMessage('');
    } catch(err) {
      console.error(err);
    }
  };
`;
code = code.replace("const [newClass, setNewClass] = useState", stateInsert + "\n  const [newClass, setNewClass] = useState");

// 3. Add Sync Zoom button
const addClassBtnIdx = code.indexOf("onClick={handleAddClass}");
if (addClassBtnIdx !== -1) {
  const btnStart = code.lastIndexOf("<button", addClassBtnIdx);
  const insertBtn = `
  <button
    type="button"
    onClick={() => setShowZoomSync(true)}
    className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl px-6 py-5 text-xs font-black uppercase tracking-widest transition-all mb-4"
  >
    Sync Zoom Meeting
  </button>
  `;
  code = code.substring(0, btnStart) + insertBtn + code.substring(btnStart);
}

// 4. Add the Modal
const modalCode = `
      {showZoomSync && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-black text-slate-800 tracking-wider uppercase">Sync Zoom Meeting</h2>
              <button onClick={() => setShowZoomSync(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
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

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setShowZoomSync(false)} className="px-6 py-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveZoomMessage} className="px-6 py-3 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                Save & Broadcast
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
`;

code = code.replace("</DashboardLayout>", modalCode + "\n    </DashboardLayout>");

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log('Successfully injected Zoom Sync Modal!');
