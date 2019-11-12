const torch = require('torch')

// check for memory leaks
function mb(bytes) {
  return bytes / 1024 / 1024
}
function getmem() {
  return mb(process.memoryUsage().rss)
}
function forceGC() {
  if (global.gc) {
    global.gc()
  } else {
    console.warn('No GC hook! Start your program as `node --expose-gc node_modules/.bin/_mocha`.')
  }
}

if (process.env.CHECK_FOR_MEMLEAKS === 'true') {
  beforeEach('check start mem', function() {
    forceGC()
    this.startMem = getmem()
  })
  afterEach('check end mem', function() {
    forceGC()
    const memdiff = getmem() - this.startMem
    if (memdiff > 0.2) torch.red('memdiff:', memdiff, 'MB')
  })
}
