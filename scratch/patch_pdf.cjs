const fs = require('fs');

let content = fs.readFileSync('src/components/CardMarkTab.tsx', 'utf8');

// Add imports
if (!content.includes("import jsPDF")) {
  content = content.replace(
    "import { motion, AnimatePresence } from 'framer-motion';",
    "import { motion, AnimatePresence } from 'framer-motion';\nimport jsPDF from 'jspdf';\nimport 'jspdf-autotable';"
  );
}
if (!content.includes("Download")) {
  content = content.replace(
    "import { CheckCircle2, Search, X, Loader2 } from 'lucide-react';",
    "import { CheckCircle2, Search, X, Loader2, Download } from 'lucide-react';"
  );
}

// Add functions
const functionsToInsert = `
  const handleDownloadBooksPDF = () => {
    const doc = new jsPDF();
    doc.text("Approved Book Orders", 14, 15);
    const tableData = approvedPayments.filter(p => p.paymentType === 'book').map(p => [
      p.bookTitle || '-',
      p.studentIndex || '-',
      p.studentName || '-',
      p.amount || '-',
      p.deliveryAddress || '-',
      p.contactNumber || '-'
    ]);
    
    (doc as any).autoTable({
      head: [['Book Name', 'Index', 'Student Name', 'Price', 'Address', 'Mobile']],
      body: tableData,
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 8 }
    });
    doc.save(\`Book_Orders_\${new Date().getTime()}.pdf\`);
  };

  const handleDownloadClassPDF = () => {
    const doc = new jsPDF();
    doc.text(\`Approved Class Payments (\${filterMonth})\`, 14, 15);
    const tableData = approvedPayments.filter(p => p.paymentType !== 'book').map(p => [
      p.studentIndex || '-',
      p.studentName || '-',
      p.class || '-',
      p.month || '-',
      p.amount || '-'
    ]);
    
    (doc as any).autoTable({
      head: [['Index', 'Student Name', 'Class', 'Month', 'Amount']],
      body: tableData,
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 9 }
    });
    doc.save(\`Class_Payments_\${filterMonth}.pdf\`);
  };
`;

content = content.replace(
  "const handleApprove = async (payment: Payment) => {",
  functionsToInsert + "\n  const handleApprove = async (payment: Payment) => {"
);

// Add UI
const uiToReplace = `<div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">Marked Payments</h3>
                <p className="text-xs font-bold text-slate-500">{approvedPayments.length} receipts approved</p>
              </div>
            </div>`;

const newUi = `<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">Marked Payments</h3>
                  <p className="text-xs font-bold text-slate-500">{approvedPayments.length} receipts approved</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                 <button onClick={handleDownloadClassPDF} className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-primary hover:text-white text-slate-700 rounded-lg text-xs font-bold transition-colors shadow-sm">
                   <Download className="w-3 h-3" /> Download Classes PDF
                 </button>
                 <button onClick={handleDownloadBooksPDF} className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-primary hover:text-white text-slate-700 rounded-lg text-xs font-bold transition-colors shadow-sm">
                   <Download className="w-3 h-3" /> Download Books PDF
                 </button>
              </div>
            </div>`;

content = content.replace(uiToReplace, newUi);

fs.writeFileSync('src/components/CardMarkTab.tsx', content);
console.log('CardMarkTab.tsx patched successfully for PDF downloads');
