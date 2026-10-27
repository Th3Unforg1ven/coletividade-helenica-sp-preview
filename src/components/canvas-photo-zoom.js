// Firefox on Windows can render a slow CSS scale in visible steps even when its
// compositor samples regularly. Redrawing the photo avoided this in user tests.
export function needsCanvasPhotoZoom() {
  return /Windows NT/.test(navigator.userAgent) && /Firefox\//.test(navigator.userAgent)
}

// Match the subset of the native Animation interface used by HeroSlideshow.
// This keeps the slide deadline and pause/resume on the same animation clock.
export function createCanvasPhotoZoom(image, canvas, duration) {
  const context = canvas.getContext('2d')
  if (!context) return null

  const originalOpacity = image.style.opacity
  let state = 'paused'
  let elapsed = 0
  let startedAt = 0
  let frame
  let layout

  function currentTime() {
    return Math.min(duration, elapsed + (state === 'running' ? performance.now() - startedAt : 0))
  }

  function paint(time) {
    if (!layout || !image.naturalWidth || !image.naturalHeight) return
    const { width, height, density, fit, position } = layout
    const ratio = (fit === 'contain' ? Math.min : Math.max)(
      width / image.naturalWidth,
      height / image.naturalHeight,
    )
    const photoWidth = image.naturalWidth * ratio
    const photoHeight = image.naturalHeight * ratio
    const scale = 1 + 0.045 * (time / duration)

    context.setTransform(density, 0, 0, density, 0, 0)
    context.clearRect(0, 0, width, height)
    context.translate(width / 2, height / 2)
    context.scale(scale, scale)
    context.translate(-width / 2, -height / 2)
    context.drawImage(
      image,
      (width - photoWidth) * position[0],
      (height - photoHeight) * position[1],
      photoWidth,
      photoHeight,
    )
    // Keep the original image available for accessibility and the photo viewer.
    if (canvas.style.opacity !== '1') {
      canvas.style.opacity = '1'
      image.style.opacity = '0'
    }
  }

  function resize() {
    const { width, height } = canvas.getBoundingClientRect()
    if (!width || !height) return
    const density = Math.min(window.devicePixelRatio || 1, 2)
    const style = getComputedStyle(image)
    layout = {
      width,
      height,
      density,
      fit: style.objectFit,
      // Hero photos use percentage positions (including the default 50% 50%).
      position: style.objectPosition.split(' ').map((value) => parseFloat(value) / 100),
    }
    const pixelWidth = Math.round(width * density)
    const pixelHeight = Math.round(height * density)
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
    }
    paint(currentTime())
  }

  function tick() {
    const time = currentTime()
    paint(time)
    if (time >= duration) {
      elapsed = duration
      state = 'finished'
    } else {
      frame = requestAnimationFrame(tick)
    }
  }

  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  image.addEventListener('load', resize)
  resize()

  return {
    get currentTime() {
      return currentTime()
    },
    get playState() {
      return state
    },
    play() {
      if (state !== 'paused') return
      startedAt = performance.now()
      state = 'running'
      frame = requestAnimationFrame(tick)
    },
    pause() {
      if (state !== 'running') return
      elapsed = currentTime()
      state = 'paused'
      cancelAnimationFrame(frame)
      paint(elapsed)
    },
    cancel() {
      state = 'idle'
      cancelAnimationFrame(frame)
      observer.disconnect()
      image.removeEventListener('load', resize)
      canvas.style.opacity = '0'
      image.style.opacity = originalOpacity
      // Release the outgoing bitmap after the crossfade, rather than retain all slides.
      canvas.width = 0
      canvas.height = 0
    },
  }
}
