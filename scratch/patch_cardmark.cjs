const fs = require('fs');

let content = fs.readFileSync('src/components/CardMarkTab.tsx', 'utf8');

// 1. Add filterType state
content = content.replace(
  "const [filterMonth, setFilterMonth] = useState<string>(new Date().toISOString().slice(0, 7));",
  "const [filterMonth, setFilterMonth] = useState<string>(new Date().toISOString().slice(0, 7));\n  const [filterType, setFilterType] = useState<'class' | 'book'>('class');"
);

// 2. Update filteredPayments logic
content = content.replace(
  /const filteredPayments = payments\.filter\(p => \{[\s\S]*?return matchesSearch && matchesMonth;\n  \}\);/,
  `const filteredPayments = payments.filter(p => {
    const matchesSearch = (p.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.studentIndex || '').toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'book') {
      return matchesSearch && p.paymentType === 'book';
    } else {
      const matchesMonth = p.month === filterMonth;
      return matchesSearch && matchesMonth && p.paymentType !== 'book';
    }
  });`
);

// 3. Update the UI to include the toggle and conditionally hide the month input
content = content.replace(
  /<div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">\s*<div className="relative flex-grow md:w-64">/,
  `<div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setFilterType('class')} 
              className={\`px-4 py-2 rounded-lg text-xs font-bold transition-all \${filterType === 'class' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}\`}
            >
              Class Payments
            </button>
            <button 
              onClick={() => setFilterType('book')} 
              className={\`px-4 py-2 rounded-lg text-xs font-bold transition-all \${filterType === 'book' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}\`}
            >
              Book Orders
            </button>
          </div>
          <div className="relative flex-grow md:w-64">`
);

content = content.replace(
  /<input \s*type="month" \s*value=\{filterMonth\}\s*onChange=\{\(e\) => setFilterMonth\(e\.target\.value\)\}\s*className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary"\s*\/>/,
  `{filterType === 'class' && (
            <input 
              type="month" 
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary"
            />
          )}`
);

fs.writeFileSync('src/components/CardMarkTab.tsx', content);
console.log('CardMarkTab.tsx patched successfully');
