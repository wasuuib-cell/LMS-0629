const fs = require('fs');

const content = fs.readFileSync('src/pages/StudentDashboard.tsx', 'utf8');
const start = content.indexOf('const renderPayments = () => {');
const end = content.indexOf('const renderStudyPacks = () => {');

const newRenderPayments = `const renderPayments = () => {
    let totalFee = 0;
    const selectedClassNames = studentData?.class ? studentData.class.toLowerCase().split(',').map((s: string) => s.trim()).filter(Boolean) : [];
    const enrolledIds = courses
      .filter(c => c.yearId === studentData?.yearId && selectedClassNames.includes(c.name.toLowerCase().trim()))
      .map(c => c.id);
      
    const availableCourses = courses.filter(c => c.yearId === studentData?.yearId && !selectedClassNames.includes(c.name.toLowerCase().trim()));
    
    let bestCombo: CourseCombo | null = null;
    let maxCovered = 0;

    courseCombos.filter(c => c.yearId === studentData?.yearId).forEach(combo => {
      const isCovered = combo.courseIds.every(id => enrolledIds.includes(id));
      if (isCovered && combo.courseIds.length > maxCovered) {
        maxCovered = combo.courseIds.length;
        bestCombo = combo;
      }
    });

    if (bestCombo) {
      totalFee += bestCombo.comboFee;
      enrolledIds.forEach(id => {
        if (!bestCombo!.courseIds.includes(id)) {
          const course = courses.find(c => c.id === id);
          if (course) totalFee += course.fee;
        }
      });
    } else {
      enrolledIds.forEach(id => {
        const course = courses.find(c => c.id === id);
        if (course) totalFee += course.fee;
      });
    }

    return (
      <div className="space-y-12">
        {selectedBookToBuy ? (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-primary/5 p-6 md:p-8 rounded-[32px] border border-primary/20 shadow-sm gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-2 transition-all" />
            <div className="pl-4">
              <h3 className="text-xl font-black uppercase tracking-widest text-primary flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                Book Order: {selectedBookToBuy.title}
              </h3>
              <p className="text-sm text-slate-600 font-medium mt-1">Price: Rs. {selectedBookToBuy.price}</p>
            </div>
            <button 
              onClick={() => setSelectedBookToBuy(null)} 
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-600 rounded-xl font-black uppercase tracking-widest text-xs transition-colors shadow-sm border border-slate-200"
            >
              Cancel Order
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 md:p-8 rounded-[32px] border border-slate-200 shadow-sm gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-2 transition-all" />
            <div className="pl-4">
              <h3 className="text-xl font-black uppercase tracking-widest text-slate-800 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary" />
                Select Payment Month
              </h3>
              <p className="text-sm text-slate-500 font-medium mt-1">Choose the month you are viewing or paying for</p>
            </div>
            <input 
              type="month" 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-6 py-4 border-2 border-slate-200 rounded-2xl font-black text-slate-700 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg w-full md:w-auto"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[40px] shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black mb-2 text-slate-900 flex items-center gap-4 uppercase italic tracking-tighter">
                <Database className="w-7 h-7 text-primary" />
                Payment Summary
              </h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">Your currently enrolled classes and monthly fee.</p>

              {!selectedBookToBuy && (
              <div className="space-y-4 mb-8">
                {enrolledIds.map(id => {
                  const course = courses.find(c => c.id === id);
                  const isPaidCourse = studentData?.coursePayments?.[id]?.[selectedMonth];
                  return course ? (
                    <div key={id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div>
                        <p className="font-bold text-slate-800">{course.name}</p>
                        <p className="text-xs font-medium text-slate-500">Rs. {course.fee}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={\`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest \${isPaidCourse ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}\`}>
                          {isPaidCourse ? 'Paid' : 'Pending'}
                        </div>
                        {!isPaidCourse && (
                          <button 
                            onClick={() => handleRemoveCourse(course.name)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            title="Remove Class"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null;
                })}
                {enrolledIds.length === 0 && (
                  <p className="text-sm text-slate-400 italic text-center py-4">No classes enrolled.</p>
                )}
              </div>
              )}

              {!selectedBookToBuy && availableCourses.length > 0 && (
                <div className="mt-8 border-t border-slate-200 pt-8 mb-8">
                  <h4 className="text-sm font-black mb-4 text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Available Classes
                  </h4>
                  <div className="space-y-3">
                    {availableCourses.map(course => (
                      <div key={course.id} className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-xl hover:border-primary/30 transition-colors">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{course.name}</p>
                          <p className="text-xs font-medium text-slate-500">Rs. {course.fee}</p>
                        </div>
                        <button 
                          onClick={() => handleAddCourse(course.name)}
                          disabled={isAddingCourse}
                          className="px-4 py-2 bg-slate-900 text-white hover:bg-primary hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                          Enroll Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-3xl">
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">
                {selectedBookToBuy ? 'Book Price' : 'Total Monthly Fee'}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-primary">Rs.</span>
                <span className="text-5xl font-black italic tracking-tighter">
                  {selectedBookToBuy ? selectedBookToBuy.price : totalFee}
                </span>
              </div>
              {!selectedBookToBuy && bestCombo && (
                <p className="text-xs font-bold text-accent mt-2 inline-block bg-accent/20 px-3 py-1 rounded-full">
                  Combo Applied: {bestCombo.name}
                </p>
              )}
            </div>
          </div>

          {isPaid && !selectedBookToBuy ? (
            <div className="bg-white border-2 border-green-100 p-8 md:p-12 rounded-[40px] shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[500px]">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-32 bg-green-100 rounded-[32px] rotate-3 flex items-center justify-center mb-10 shadow-lg shadow-green-100/50 relative z-10"
              >
                <CheckCircle2 className="w-16 h-16 text-green-600 -rotate-3" />
              </motion.div>
              
              <h3 className="text-4xl font-black mb-6 text-green-800 uppercase italic tracking-tighter relative z-10">
                Payment Successful!
              </h3>
              
              <p className="text-xl text-green-700 font-bold leading-relaxed max-w-md relative z-10">
                ඔබ <span className="text-2xl font-black bg-green-200/50 px-3 py-1 rounded-xl mx-2">{selectedMonth}</span> මාසය සඳහා මුදල් සාර්ථකව ගෙවා ඇත. 
        <br/><br/>
                <span className="text-base text-green-600/80">ඔබට දැන් පන්ති වලට සහභාගී විය හැක!</span>
              </p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[40px] shadow-sm">
               <h3 className="text-xl font-black mb-6 text-slate-900 uppercase italic tracking-tighter">Upload Bank Slip</h3>
               <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">
                 Please pay your monthly fee and upload the bank slip using the form below. The admin will verify and grant you access to the Study Packs.
               </p>
               <div className="w-full h-auto min-h-[600px] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center relative">
                {!isUploadingPayment ? (
                  <div className="w-full h-full flex flex-col p-8 bg-white space-y-6">
                    <div className="bg-slate-100 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        {selectedBookToBuy ? (
                           <div>
                             <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Order Details</p>
                             <p className="font-bold text-slate-900 text-sm mt-1">{selectedBookToBuy.title}</p>
                           </div>
                        ) : (
                           <div>
                             <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Payment Month</p>
                             <p className="font-bold text-slate-900 text-sm mt-1">{selectedMonth}</p>
                           </div>
                        )}
                       <div className="md:text-right">
                          <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Enrolled Classes</p>
                          <p className="font-bold text-slate-900 text-sm mt-1">
                             {enrolledIds.length > 0 ? enrolledIds.map(id => courses.find(c => c.id === id)?.name || id).join(', ') : 'No classes enrolled'}
                          </p>
                       </div>
                    </div>

                    <div className="space-y-2 flex-grow">
                      <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-widest px-1 italic">Bank Slip Image</label>
                      <div className="w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center relative bg-slate-50 overflow-hidden group">
                        {paymentForm.file ? (
                          <img src={URL.createObjectURL(paymentForm.file)} alt="Slip" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Database className="w-8 h-8 text-slate-300 mb-2 group-hover:text-primary transition-colors" />
                            <span className="text-xs text-slate-400 font-bold px-4 text-center">Click or Drag to Upload Slip</span>
                          </>
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              setPaymentForm({...paymentForm, file: e.target.files[0]});
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                      {selectedBookToBuy && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Delivery Address</label>
                            <input 
                              type="text" 
                              value={paymentForm.deliveryAddress}
                              onChange={(e) => setPaymentForm({...paymentForm, deliveryAddress: e.target.value})}
                              placeholder="Full delivery address"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Contact Number</label>
                            <input 
                              type="text" 
                              value={paymentForm.contactNumber}
                              onChange={(e) => setPaymentForm({...paymentForm, contactNumber: e.target.value})}
                              placeholder="Phone number"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors"
                            />
                          </div>
                        </div>
                      )}

                    <button 
                      onClick={async () => {
                        if (!paymentForm.file) {
                          alert("Please upload a slip.");
                          return;
                        }
                        if (!selectedBookToBuy && enrolledIds.length === 0) {
                          alert("You are not enrolled in any courses.");
                          return;
                        }
                        if (selectedBookToBuy && (!paymentForm.deliveryAddress || !paymentForm.contactNumber)) {
                          alert("Please provide both delivery address and contact number.");
                          return;
                        }
                        setIsUploadingPayment(true);
                        try {
                          const imageBitmap = await createImageBitmap(paymentForm.file);
                          const canvas = document.createElement('canvas');
                          let width = imageBitmap.width;
                          let height = imageBitmap.height;
                          const MAX_DIM = 800;
                          if (width > height && width > MAX_DIM) {
                            height *= MAX_DIM / width;
                            width = MAX_DIM;
                          } else if (height > MAX_DIM) {
                            width *= MAX_DIM / height;
                            height = MAX_DIM;
                          }
                          canvas.width = width;
                          canvas.height = height;
                          const ctx = canvas.getContext('2d');
                          ctx?.drawImage(imageBitmap, 0, 0, width, height);
                          
                          const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.6));
                          if (!blob) throw new Error("Compression failed");
                          
                          const reader = new FileReader();
                          reader.readAsDataURL(blob);
                          const base64data = await new Promise<string>((resolve) => {
                            reader.onloadend = () => resolve(reader.result as string);
                          });

                          const scriptUrl = 'https://script.google.com/macros/s/AKfycbyogWoZRxK57ROMJ3OZHn8bLFm1_t3LKDe6ZMAloyKA-ZHm3oWU-2DyxZNHt_cbPhFQmg/exec';
                          const res = await fetch(scriptUrl, {
                            method: 'POST',
                            body: JSON.stringify({
                              file: base64data,
                              mimeType: 'image/jpeg',
                              fileName: \`slip_\${auth.currentUser?.uid}_\${Date.now()}.jpg\`
                            }),
                            headers: {
                              'Content-Type': 'text/plain;charset=utf-8',
                            }
                          });
                          
                          const resData = await res.json();
                          if (!resData.success) throw new Error(resData.error || "Upload failed via Drive");
                          const downloadUrl = resData.url;
                          
                          const paymentData = {
                            studentId: auth.currentUser?.uid || profile?.uid || '',
                            studentName: profile?.name || studentData?.name || '',
                            studentIndex: studentData?.studentId || profile?.studentId || '',
                            yearId: studentData?.yearId || '',
                            class: studentData?.class || '',
                            amount: selectedBookToBuy ? selectedBookToBuy.price : (paymentForm.courseId ? (courses.find(c => c.id === paymentForm.courseId)?.fee || 0) : totalFee),
                            month: selectedBookToBuy ? 'Book Order' : selectedMonth,
                            courseId: selectedBookToBuy ? 'book' : (paymentForm.courseId || 'all'),
                            paymentType: selectedBookToBuy ? 'book' : 'class',
                            bookId: selectedBookToBuy ? selectedBookToBuy.id : '',
                            bookTitle: selectedBookToBuy ? selectedBookToBuy.title : '',
                            deliveryAddress: selectedBookToBuy ? paymentForm.deliveryAddress : '',
                            contactNumber: selectedBookToBuy ? paymentForm.contactNumber : '',
                            slipUrl: downloadUrl,
                            status: 'pending',
                            createdAt: serverTimestamp() as any
                          };
                          
                          await addDoc(collection(db, 'payments'), paymentData);
                          
                          alert("Payment slip submitted successfully! Admin will verify and approve it soon.");
                          setPaymentForm({ month: '', courseId: '', file: null, deliveryAddress: '', contactNumber: '' });
                          setSelectedBookToBuy(null);
                        } catch (err: any) {
                          console.error(err);
                          alert("Failed to submit payment. " + err.message);
                        } finally {
                          setIsUploadingPayment(false);
                        }
                      }}
                      className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl"
                    >
                      SUBMIT PAYMENT SLIP
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-8 text-center">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                    <p className="text-slate-800 font-bold mb-2">Uploading Payment Slip...</p>
                    <p className="text-xs text-slate-500">Please wait while your slip is securely uploaded.</p>
                  </div>
                )}
             </div>
            </div>
          )}
        </div>
      </div>
    );
  };
\n  `;

fs.writeFileSync('src/pages/StudentDashboard.tsx', content.substring(0, start) + newRenderPayments + content.substring(end));
console.log("Rewrite successful!");
