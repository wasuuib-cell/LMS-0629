const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// 1. Add isUploadingImage state
if (!code.includes('isUploadingImage')) {
  code = code.replace(
    "const [newLesson, setNewLesson] = useState<{",
    "const [isUploadingImage, setIsUploadingImage] = useState<{type: 'thumbnail' | 'image' | null, loading: boolean}>({type: null, loading: false});\n  const [newLesson, setNewLesson] = useState<{"
  );
}

// 2. Add handleImageUpload function
if (!code.includes('const handleImageUpload = async')) {
  const uploadFunc = `
  const handleImageUpload = async (file: File, type: 'thumbnail' | 'image') => {
    try {
      setIsUploadingImage({type, loading: true});
      
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
      
      const payload = {
        file: base64Data,
        fileName: file.name,
        mimeType: file.type,
        folderName: 'Thumbnails'
      };

      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyogWoZRxK57ROMJ3OZHn8bLFm1_t3LKDe6ZMAloyKA-ZHm3oWU-2DyxZNHt_cbPhFQmg/exec';
      const res = await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!resData.success) throw new Error(resData.error || "Upload failed via Drive");
      
      const downloadUrl = resData.url;
      
      if (type === 'thumbnail') {
        setNewLesson(prev => ({...prev, thumbnailUrl: downloadUrl}));
      } else {
        setNewLesson(prev => ({...prev, imageUrl: downloadUrl}));
      }
    } catch (err: any) {
      console.error(err);
      alert("Error uploading image: " + err.message);
    } finally {
      setIsUploadingImage({type: null, loading: false});
    }
  };
`;
  code = code.replace("const handleAddLesson = async", uploadFunc + "\n  const handleAddLesson = async");
}

// 3. YouTube auto-fill logic inside videoUrl input
const oldOnChange = `onChange={e => setNewLesson({...newLesson, videoUrl: e.target.value})}`;
const newOnChange = `onChange={e => {
                const url = e.target.value;
                const updates: any = { videoUrl: url };
                
                if (url.includes('youtube.com') || url.includes('youtu.be')) {
                  const match = url.match(/(?:youtube\\.com\\/(?:[^\\/]+\\/.+\\/|(?:v|e(?:mbed)?)\\/|.*[?&]v=)|youtu\\.be\\/)([^"&?\\/\\s]{11})/);
                  if (match && match[1]) {
                    updates.thumbnailUrl = \`https://img.youtube.com/vi/\${match[1]}/maxresdefault.jpg\`;
                    updates.videoType = 'youtube';
                    
                    fetch(\`https://noembed.com/embed?url=\${encodeURIComponent(url)}\`)
                      .then(res => res.json())
                      .then(data => {
                        if (data.title) {
                          setNewLesson(prev => ({
                            ...prev, 
                            subTopic: prev.subTopic ? prev.subTopic : data.title 
                          }));
                        }
                      })
                      .catch(console.error);
                  }
                }
                setNewLesson({...newLesson, ...updates});
              }}`;
if (code.includes(oldOnChange)) {
  code = code.replace(oldOnChange, newOnChange);
}

// 4. Thumbnail preview block
const videoIdInputHTML = `          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1 flex justify-between">
              Video Source Identity (URL)
              {newLesson.videoType === 'youtube' && <span className="text-primary">Auto-extracts YouTube</span>}
            </label>
            <div className="relative">
              <input
                type="text"
                value={newLesson.videoUrl}
                ${newOnChange}
                placeholder="e.g. https://www.youtube.com/watch?v=..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
              />
              <Video className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>`;

// First replace the original Video Source Identity block if we haven't already.
// We'll search for the original Video Source Identity label and replace the whole block up to the end of the div
const oldVideoIdInputMatch = code.match(/<div className="md:col-span-2 space-y-2">\s*<label className="text-\[10px\] text-\[#1a1a1a\] uppercase font-black tracking-\[0\.3em\] px-1 flex justify-between">[\s\S]*?<\/div>\s*<\/div>/);
if (oldVideoIdInputMatch) {
    // Replaced correctly with regex match if needed. But let's just do it string by string.
}

// Instead of complex string parsing, let's just append the new fields after the videoUrl input div.
const videoSourceIdentityEnd = `placeholder="e.g. https://www.youtube.com/watch?v=..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
              />
              <Video className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>`;

const newFields = `
          {newLesson.thumbnailUrl && (
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] px-1 italic">Thumbnail Preview Reference</label>
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative group">
                <img src={newLesson.thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Thumbnail Image URL (Optional)</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Direct link to thumbnail image"
                value={newLesson.thumbnailUrl}
                onChange={e => setNewLesson({...newLesson, thumbnailUrl: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
              />
              <ImageIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          {topicMode === 'new' && (
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] text-[#1a1a1a] uppercase font-black tracking-[0.3em] px-1">Study Pack Cover Image</label>
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Image URL or Upload File"
                    value={newLesson.imageUrl}
                    onChange={e => setNewLesson({...newLesson, imageUrl: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-6 pr-24 py-5 text-[#1a1a1a] text-xs font-bold tracking-wider placeholder:text-slate-300 focus:outline-none focus:border-primary/30 transition-all"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <input 
                      type="file" 
                      accept="image/*"
                      id="cover-upload"
                      className="hidden"
                      onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'image')}
                    />
                    <label 
                      htmlFor="cover-upload"
                      className={\`cursor-pointer px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all \${isUploadingImage.loading && isUploadingImage.type === 'image' ? 'bg-slate-200 text-slate-500' : 'bg-primary text-white hover:bg-black'}\`}
                    >
                      {isUploadingImage.loading && isUploadingImage.type === 'image' ? 'Uploading...' : 'Upload'}
                    </label>
                  </div>
                </div>
               </div>
               {newLesson.imageUrl && (
                 <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-xl -rotate-3 mt-4">
                   <img src={newLesson.imageUrl} alt="Cover" className="w-full h-full object-cover" />
                 </div>
               )}
            </div>
          )}
`;

if (code.includes(videoSourceIdentityEnd) && !code.includes('Thumbnail Preview Reference')) {
  code = code.replace(videoSourceIdentityEnd, videoSourceIdentityEnd + newFields);
}

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log('Restored AdminDashboard lesson features!');
