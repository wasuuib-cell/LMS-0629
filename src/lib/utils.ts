export function formatDate(date: any): string {
  if (!date) return '-';
  
  // If it's a Firebase Timestamp
  if (date.toDate && typeof date.toDate === 'function') {
    return date.toDate().toLocaleDateString();
  }
  
  // If it's a string or other Date compatible format
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleDateString();
  } catch {
    return '-';
  }
}

export function transformImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  let cleanUrl = url.trim();

  // If the user accidentally pasted an HTML embed code (common with ImgBB)
  if (cleanUrl.includes('<img src="')) {
    const match = cleanUrl.match(/<img src="([^"]+)"/);
    if (match) cleanUrl = match[1];
  } else if (cleanUrl.includes('<a href="')) {
    const match = cleanUrl.match(/src="([^"]+)"/); // Look for src if it's a wrapper
    if (match) cleanUrl = match[1];
  }

  // If it's already a direct high-quality link, return it
  if (cleanUrl.match(/\.(jpeg|jpg|gif|png|webp|svg|bmp)$/i) || cleanUrl.includes('i.ibb.co')) {
    return cleanUrl;
  }

  // Google Drive
  if (cleanUrl.includes('drive.google.com')) {
    const dMatch = cleanUrl.match(/\/d\/([^/?#]+)/);
    const idMatch = cleanUrl.match(/[?&]id=([^&]+)/);
    const openMatch = cleanUrl.match(/open\?id=([^&]+)/);
    
    const fileId = dMatch ? dMatch[1] : (idMatch ? idMatch[1] : (openMatch ? openMatch[1] : null));
    // Use the thumbnail API which reliably returns an image instead of an HTML page
    if (fileId) return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  // Dropbox
  if (cleanUrl.includes('dropbox.com')) {
    if (cleanUrl.includes('dl=0')) return cleanUrl.replace('dl=0', 'raw=1');
    if (cleanUrl.includes('dl=1')) return cleanUrl.replace('dl=1', 'raw=1');
    return cleanUrl.includes('?') ? (cleanUrl.includes('raw=1') ? cleanUrl : `${cleanUrl}&raw=1`) : `${cleanUrl}?raw=1`;
  }

  // If it's a generic link without an image extension and not a known direct host, 
  // we return undefined to allow fallbacks to work better in UI components
  const hasImageExtension = /\.(jpeg|jpg|gif|png|webp|svg|bmp)$/i.test(cleanUrl.split(/[?#]/)[0]);
  const isDirectHost = cleanUrl.includes('i.ibb.co') || cleanUrl.includes('drive.google.com') || cleanUrl.includes('dropbox.com');
  
  if (!hasImageExtension && !isDirectHost) {
    if (cleanUrl.includes('ibb.co')) return undefined; // Non-direct ImgBB
    if (cleanUrl.startsWith('http') && !cleanUrl.includes('picsum.photos')) {
       // If it looks like a web page rather than a direct image link
       return undefined; 
    }
  }

  return cleanUrl;
}
