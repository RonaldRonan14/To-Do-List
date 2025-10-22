export function normalizePhoto(photoData: any, mime = 'image/png'): string | null {
  if (!photoData) return null;

  if (typeof photoData === 'string') {
    const s = photoData.trim();
    if (s.startsWith('data:')) return s;
    if (/^[A-Za-z0-9+/=]+$/.test(s)) return `data:${mime};base64,${s}`;
  }

  return null;
}

export function dataURLToFile(dataUrl: string, filename = `photo-${Date.now()}`): File {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}