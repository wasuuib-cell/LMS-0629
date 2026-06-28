const fs = require('fs');

let content = fs.readFileSync('src/pages/StudentDashboard.tsx', 'utf8');

// 1. Add state for myPayments
content = content.replace(
  "const [paymentForm, setPaymentForm] = useState({ month: '', courseId: '', file: null as File | null, deliveryAddress: '', contactNumber: '' });",
  "const [paymentForm, setPaymentForm] = useState({ month: '', courseId: '', file: null as File | null, deliveryAddress: '', contactNumber: '' });\n  const [myPayments, setMyPayments] = useState<any[]>([]);"
);

// 2. Add unsubPayments in the main useEffect
content = content.replace(
  "const unsubLessons = onSnapshot(collection(db, 'lessons'), (snap) => {",
  `const unsubPayments = onSnapshot(query(collection(db, 'payments'), where('studentId', '==', profile.uid || auth.currentUser?.uid || '')), (snap) => {
      setMyPayments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    
    const unsubLessons = onSnapshot(collection(db, 'lessons'), (snap) => {`
);

// Add to cleanup
content = content.replace(
  "unsubLessons();",
  "unsubLessons();\n      unsubPayments();"
);

// 3. Update renderPayments to include the History Sections
const renderPaymentsStart = content.indexOf('const renderPayments = () => {');
const returnIndex = content.indexOf('return (', renderPaymentsStart);
const insertHistoryHtml = `
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-64 overflow-y-auto">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4 sticky top-0 bg-white pb-2 flex items-center justify-between border-b border-slate-100">
              Class Payments History
              <Calendar className="w-4 h-4 text-primary" />
            </h4>
            <div className="space-y-3">
              {myPayments.filter(p => p.paymentType !== 'book').length === 0 && (
                <p className="text-xs text-slate-400 font-medium italic text-center mt-8">No class payments found.</p>
              )}
              {myPayments.filter(p => p.paymentType !== 'book').sort((a,b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()).map(p => (
                <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-slate-700">{p.month}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Rs. {p.amount}</p>
                  </div>
                  <span className={\`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest \${p.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}\`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-64 overflow-y-auto">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4 sticky top-0 bg-white pb-2 flex items-center justify-between border-b border-slate-100">
              Book Orders History
              <BookOpen className="w-4 h-4 text-primary" />
            </h4>
            <div className="space-y-3">
              {myPayments.filter(p => p.paymentType === 'book').length === 0 && (
                <p className="text-xs text-slate-400 font-medium italic text-center mt-8">No book orders found.</p>
              )}
              {myPayments.filter(p => p.paymentType === 'book').sort((a,b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()).map(p => (
                <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div className="max-w-[150px]">
                    <p className="text-xs font-bold text-slate-700 truncate" title={p.bookTitle}>{p.bookTitle}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Rs. {p.amount}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={\`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest \${p.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}\`}>
                      {p.status}
                    </span>
                    {p.status === 'approved' && (
                       <span className="text-[9px] text-green-600 font-bold uppercase italic">Will be delivered soon</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
`;

content = content.replace(
  /<div className="space-y-12">\s*\{selectedBookToBuy \? \(/,
  insertHistoryHtml + "\n        {selectedBookToBuy ? ("
);

fs.writeFileSync('src/pages/StudentDashboard.tsx', content);
console.log('StudentDashboard.tsx patched successfully');
