import test from 'node:test'
import assert from 'node:assert/strict'
import { isSafePreviewPath } from './preview-path.mjs'

test('preview accepts clean decoded route and asset paths', () => {
  for (const path of ['/', '/compare', '/compare/litellm', '/assets/site.js', '/docs/index.html']) {
    assert.equal(isSafePreviewPath(path), true, path)
  }
})

test('preview rejects control characters and ambiguous redirect paths before writing headers', () => {
  for (const path of [
    'relative/path',
    '//outside.example/',
    '/\\outside.example/',
    '/bad\u0000/',
    '/bad\r\n/',
    '/bad\u007f/',
    decodeURIComponent('/bad%0D%0A/'),
    decodeURIComponent('/%2Foutside.example/'),
    decodeURIComponent('/%5Coutside.example/'),
  ]) {
    assert.equal(isSafePreviewPath(path), false, JSON.stringify(path))
  }
})
