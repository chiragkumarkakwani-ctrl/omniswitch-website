export function isSafePreviewPath(path) {
  return path.startsWith('/') && !path.startsWith('//') && !/[\u0000-\u001f\u007f\\]/.test(path)
}
