import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, doc, updateDoc, getDocs, where, orderBy } from 'firebase/firestore';
import { Payment } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { createPortal } from 'react-dom';
import { CheckCircle2, Clock, Image as ImageIcon, Search, X, Download } from 'lucide-react';

export const CardMarkTab: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [filterType, setFilterType] = useState<'class' | 'book'>('class');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isRapidMode, setIsRapidMode] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Payment));
      setPayments(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredPayments = payments.filter(p => {
    const matchesSearch = (p.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.studentIndex || '').toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'book') {
      return matchesSearch && p.paymentType === 'book';
    } else {
      const matchesMonth = p.month === filterMonth;
      return matchesSearch && matchesMonth && p.paymentType !== 'book';
    }
  });

  const pendingPayments = filteredPayments.filter(p => p.status === 'pending');
  const approvedPayments = filteredPayments.filter(p => p.status === 'approved');

  
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
    
    autoTable(doc, {
      head: [['Book Name', 'Index', 'Student Name', 'Price', 'Address', 'Mobile']],
      body: tableData,
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 8 }
    });
    doc.save(`Book_Orders_${new Date().getTime()}.pdf`);
  };

  const handleDownloadClassPDF = () => {
    const doc = new jsPDF();
    doc.text(`Approved Class Payments`, 14, 15);
    doc.setFontSize(11);
    doc.text(`Month: ${filterMonth}`, 14, 22);
    const tableData = approvedPayments.filter(p => p.paymentType !== 'book').map(p => [
      p.studentIndex || '-',
      p.studentName || '-',
      p.class || '-',
      p.month || '-',
      p.amount || '-'
    ]);
    
    autoTable(doc, {
      head: [['Index', 'Student Name', 'Class', 'Month', 'Amount']],
      body: tableData,
      startY: 28,
      theme: 'grid',
      styles: { fontSize: 9 }
    });
    doc.save(`Class_Payments_${filterMonth}.pdf`);
  };

  const handleApprove = async (payment: Payment) => {
    if (!isRapidMode && !window.confirm(`Approve payment for ${payment.studentName || payment.studentIndex}?`)) return;
    try {
      // 1. Update payment status
      await updateDoc(doc(db, 'payments', payment.id), { status: 'approved' });
      
      // 2. Grant global access to the student
      const studentsRef = collection(db, 'students');
      const q = query(studentsRef, where('studentId', '==', payment.studentIndex)); // match by index
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        const studentDoc = snap.docs[0];
        const studentData = studentDoc.data();
        const paymentsObj = studentData.payments || {};
        paymentsObj[payment.month] = true;
        
        await updateDoc(studentDoc.ref, { payments: paymentsObj });
      } else {
        // Fallback matching by email if they lack studentIndex? 
        // We will just alert the admin that access wasn't granted if this fails.
        console.warn("Student record not found for auto-granting access.");
      }
      
      if (isRapidMode) {
        const currentIndex = pendingPayments.findIndex(p => p.id === payment.id);
        const nextPayment = pendingPayments[currentIndex + 1];
        if (nextPayment) {
          setSelectedPayment(nextPayment);
        } else {
          setSelectedPayment(null);
          setIsRapidMode(false);
          alert("All pending payments have been reviewed!");
        }
      } else {
        if (selectedPayment?.id === payment.id) {
          setSelectedPayment(null);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Error approving payment.');
    }
  };

  const getImageUrl = (url: string) => {
    if (url && url.includes('drive.google.com/uc')) {
      const match = url.match(/id=([^&]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`;
      }
    }
    return url;
  };

  const PaymentCard = ({ p, isPending }: { p: Payment, isPending: boolean }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-3xl border ${isPending ? 'border-amber-200 shadow-amber-100' : 'border-green-200 shadow-green-100'} p-5 shadow-sm flex flex-col md:flex-row gap-6 relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${isPending ? 'from-amber-100 to-transparent' : 'from-green-100 to-transparent'} rounded-bl-full -z-10 opacity-50`} />
      
      <div className="md:w-1/3 aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative group cursor-pointer" onClick={() => setSelectedPayment(p)}>
        <img src={getImageUrl(p.slipUrl)} alt="Receipt" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black uppercase tracking-widest gap-2 backdrop-blur-sm">
          <ImageIcon className="w-4 h-4" /> Review Slip
        </div>
      </div>

      <div className="md:w-2/3 flex flex-col justify-between z-10">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">{p.studentIndex || 'Unknown ID'}</p>
              <h4 className="font-bold text-lg text-slate-900 leading-tight">{p.studentName || 'Unknown Student'}</h4>
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isPending ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
              {isPending ? 'Pending' : 'Approved'}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{p.paymentType === 'book' ? 'Book Order' : 'Class & Year'}</p>
              <p className="text-sm font-bold text-slate-700">
                {p.paymentType === 'book' ? (p.bookTitle || 'Book Order') : `${p.class || 'N/A'} • ${p.yearId || 'N/A'}`}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Expected Amount</p>
              <p className="text-sm font-bold text-primary">Rs. {p.amount || 0}</p>
            </div>
          </div>
        </div>

        {isPending && (
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => handleApprove(p)}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-colors shadow-lg shadow-green-500/30"
            >
              <CheckCircle2 className="w-4 h-4" /> Approve & Grant Access
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-10">
      <div className="bg-white p-6 md:p-8 rounded-[40px] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Card Mark System</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Review and approve student payment receipts</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setFilterType('class')} 
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'class' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Class Payments
            </button>
            <button 
              onClick={() => setFilterType('book')} 
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'book' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Book Orders
            </button>
          </div>
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Index or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          {filterType === 'class' && (
            <input 
              type="month" 
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary"
            />
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">Pending Verification</h3>
                  <p className="text-xs font-bold text-slate-500">{pendingPayments.length} receipts awaiting approval</p>
                </div>
              </div>
              {pendingPayments.length > 0 && (
                <button 
                  onClick={() => { setIsRapidMode(true); setSelectedPayment(pendingPayments[0]); }}
                  className="px-4 py-2 bg-primary text-white rounded-xl font-bold uppercase tracking-wider text-[10px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  Start Rapid Review
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {pendingPayments.map(p => <PaymentCard key={p.id} p={p} isPending={true} />)}
              {pendingPayments.length === 0 && (
                <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl text-center text-slate-400 font-medium">
                  No pending payments found for this month.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
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
                 {filterType === 'class' && (
                   <button onClick={handleDownloadClassPDF} className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-primary hover:text-white text-slate-700 rounded-lg text-xs font-bold transition-colors shadow-sm">
                     <Download className="w-3 h-3" /> Download Classes PDF
                   </button>
                 )}
                 {filterType === 'book' && (
                   <button onClick={handleDownloadBooksPDF} className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-primary hover:text-white text-slate-700 rounded-lg text-xs font-bold transition-colors shadow-sm">
                     <Download className="w-3 h-3" /> Download Books PDF
                   </button>
                 )}
              </div>
            </div>
            
            <div className="space-y-4">
              {approvedPayments.map(p => <PaymentCard key={p.id} p={p} isPending={false} />)}
              {approvedPayments.length === 0 && (
                <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl text-center text-slate-400 font-medium">
                  No approved payments found for this month.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {createPortal(
        <AnimatePresence>
          {selectedPayment && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] overflow-hidden w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative"
            >
              <button 
                onClick={() => { setSelectedPayment(null); setIsRapidMode(false); }}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="md:w-2/3 bg-slate-900 p-4 flex items-center justify-center relative min-h-[40vh] md:min-h-0">
                <img 
                  src={getImageUrl(selectedPayment.slipUrl)} 
                  alt="Full Receipt" 
                  className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg" 
                />
              </div>

              <div className="md:w-1/3 p-8 md:p-10 flex flex-col bg-white overflow-y-auto">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 mb-6">Payment Review</h3>
                
                <div className="space-y-6 flex-grow">
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Student Index</p>
                    <p className="text-xl font-black text-slate-900">{selectedPayment.studentIndex || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Student Name</p>
                    <p className="text-lg font-bold text-slate-700">{selectedPayment.studentName || 'Unknown'}</p>
                  </div>
                  {selectedPayment.paymentType === 'book' ? (
                    <div className="mb-4">
                      <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                        <p className="text-[10px] uppercase font-black tracking-widest text-primary">Book Order</p>
                        <p className="text-lg font-black text-slate-900 mt-1">{selectedPayment.bookTitle || 'Unknown Book'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Delivery Address</p>
                          <p className="text-sm font-bold text-slate-700 mt-1">{selectedPayment.deliveryAddress || 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Contact Number</p>
                          <p className="text-sm font-bold text-slate-700 mt-1">{selectedPayment.contactNumber || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Year</p>
                          <p className="text-base font-bold text-slate-700">{selectedPayment.yearId || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Class</p>
                          <p className="text-base font-bold text-slate-700">{selectedPayment.class || 'N/A'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Paid For Month</p>
                        <p className="text-base font-bold text-slate-700">{selectedPayment.month}</p>
                      </div>
                    </>
                  )}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Expected Total Fee</p>
                    <p className="text-3xl font-black text-primary">Rs. {selectedPayment.amount || 0}</p>
                  </div>
                </div>

                {selectedPayment.status === 'pending' ? (
                  <div className="mt-8 space-y-3">
                    <button 
                      onClick={() => handleApprove(selectedPayment)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-colors shadow-lg shadow-green-500/30"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Approve & Grant Access
                    </button>
                    <button 
                      onClick={() => { setSelectedPayment(null); setIsRapidMode(false); }}
                      className="w-full px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="mt-8 p-4 bg-green-50 rounded-2xl border border-green-200 text-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-bold text-green-700">Payment Approved</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
