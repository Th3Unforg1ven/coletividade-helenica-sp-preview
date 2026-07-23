import { useEffect, useRef, useState } from 'react'
import { assetUrl } from './paths.js'

const vertexShader = /* glsl */`
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * .5 + .5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */`
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform vec2 uSeal;
  uniform float uIntro;
  uniform float uExit;
  varying vec2 vUv;

  const vec3 IVORY = vec3(.966, .954, .925);
  const vec3 WARM_STONE = vec3(.900, .884, .846);
  const vec3 VEIN_GREY = vec3(.345, .405, .480);
  const vec3 VEIN_BLUE = vec3(.205, .365, .535);
  const vec3 CARVED_BLUE = vec3(.430, .570, .700);

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = .5;
    mat2 rotation = mat2(.80, -.60, .60, .80);
    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(p);
      p = rotation * p * 2.03 + 7.13;
      amplitude *= .5;
    }
    return value;
  }

  float sdBox(vec2 p, vec2 bounds) {
    vec2 distance = abs(p) - bounds;
    return length(max(distance, vec2(0.0))) + min(max(distance.x, distance.y), 0.0);
  }

  float meander(vec2 p) {
    p.x = fract(p.x);
    float d = 100.0;
    d = min(d, sdBox(p - vec2(.50, .16), vec2(.42, .012)));
    d = min(d, sdBox(p - vec2(.92, .49), vec2(.012, .34)));
    d = min(d, sdBox(p - vec2(.64, .83), vec2(.28, .012)));
    d = min(d, sdBox(p - vec2(.36, .64), vec2(.012, .19)));
    d = min(d, sdBox(p - vec2(.52, .45), vec2(.16, .012)));
    return d - .022;
  }

  float relief(vec2 uv, float aspect) {
    vec2 point = vec2(uv.x * aspect, uv.y);
    float height = 0.0;
    float bandCenter = .107;
    float bandHeight = .052;
    float localY = (uv.y - bandCenter) / bandHeight + .5;
    if (localY > -.2 && localY < 1.2) {
      vec2 keyPoint = vec2(point.x / bandHeight * .58 + .2, clamp(localY, 0.0, 1.0));
      float key = meander(keyPoint);
      float bandMask = smoothstep(.58, .48, abs(localY - .5));
      height -= smoothstep(.030, 0.0, key) * .23 * bandMask;
      height -= smoothstep(.0024, 0.0, abs(uv.y - (bandCenter + bandHeight * .66))) * .08;
      height -= smoothstep(.0024, 0.0, abs(uv.y - (bandCenter - bandHeight * .66))) * .08;
    }
    return height * smoothstep(.18, .88, uIntro);
  }

  vec3 marble(vec2 uv, float aspect) {
    vec2 point = vec2(uv.x * aspect, uv.y) * 2.65;
    float slowTime = uTime * .040;
    vec2 warp = vec2(
      fbm(point * .78 + vec2(2.1, slowTime)),
      fbm(point * .86 + vec2(8.7, -slowTime * .65))
    );

    float cloud = fbm(point * .68 + warp * .28);
    vec3 color = mix(IVORY, WARM_STONE, cloud * .31);

    float fieldA = (point.x * .48 + point.y * 1.08) + warp.x * 2.65 + fbm(point * 1.72) * .48;
    float ridgeA = pow(max(0.0, 1.0 - abs(sin(fieldA * 2.35))), 18.0);
    float maskA = smoothstep(.42, .72, fbm(point * .42 + 5.4));
    color = mix(color, VEIN_GREY, ridgeA * maskA * .48);

    float fieldB = (point.y * .82 - point.x * .36) + warp.y * 2.1 + fbm(point * 2.3 + 9.0) * .36;
    float ridgeB = pow(max(0.0, 1.0 - abs(sin(fieldB * 3.1))), 32.0);
    float maskB = smoothstep(.53, .78, fbm(point * .49 + 12.3));
    color = mix(color, VEIN_BLUE, ridgeB * maskB * .34);

    float hairline = pow(max(0.0, 1.0 - abs(sin(fieldA * 4.72 + warp.y))), 46.0);
    color = mix(color, VEIN_GREY, hairline * maskA * .16);

    float rightMask = smoothstep(.48, .82, uv.x);
    float rightTime = uTime * .050;
    vec2 rightPoint = point + vec2(-rightTime * .34, rightTime);
    float rightWarp = fbm(rightPoint * 1.08 + vec2(13.4, 4.2));
    float rightField = rightPoint.y * 1.14 - rightPoint.x * .32 + rightWarp * 3.1;
    float rightVein = pow(max(0.0, 1.0 - abs(sin(rightField * 2.75))), 17.0);
    float rightVeinMask = smoothstep(.38, .70, fbm(rightPoint * .52 + 17.8));
    color = mix(color, VEIN_GREY, rightVein * rightVeinMask * rightMask * .44);

    vec2 branchPoint = point + vec2(rightTime * .18, -rightTime * .48);
    float branchWarp = fbm(branchPoint * 1.74 + vec2(4.8, 19.1));
    float branchField = branchPoint.y * .72 + branchPoint.x * .56 + branchWarp * 2.65;
    float branchVein = pow(max(0.0, 1.0 - abs(sin(branchField * 4.15))), 30.0);
    float branchMask = smoothstep(.50, .76, fbm(branchPoint * .67 + 2.6));
    color = mix(color, VEIN_BLUE, branchVein * branchMask * rightMask * .27);

    color += (noise(point * 72.0) - .5) * .008;
    float mineralBreath = .5 + .5 * sin(uTime * .24 + fbm(point * 1.35) * 6.2831);
    color *= .992 + mineralBreath * .016;
    return mix(IVORY, color, smoothstep(0.0, .72, uIntro));
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 uv = vUv;
    float pixel = 1.55 / uResolution.y;
    float h = relief(uv, aspect);
    float hx = relief(uv + vec2(pixel, 0.0), aspect) - h;
    float hy = relief(uv + vec2(0.0, pixel), aspect) - h;
    vec3 normal = normalize(vec3(-hx * 8.4, -hy * 8.4, 1.0));

    float angle = uTime * .07;
    vec2 movingLight = vec2(cos(angle) * .30, .34 + sin(angle * .71) * .16) + uPointer * .055;
    vec3 lightDirection = normalize(vec3(movingLight, .82));
    vec3 color = marble(uv, aspect);
    color = mix(color, CARVED_BLUE, clamp(-h, 0.0, 1.0) * .28);

    float diffuse = clamp(dot(normal, lightDirection), 0.0, 1.0);
    color *= mix(.945, 1.055, diffuse);
    vec3 halfVector = normalize(lightDirection + vec3(0.0, 0.0, 1.0));
    float specular = pow(clamp(dot(normal, halfVector), 0.0, 1.0), 58.0);
    color += specular * (.035 + .025 * noise(uv * uResolution / 5.0));

    vec2 adjusted = vec2(uv.x * aspect, uv.y);
    vec2 polishCenter = vec2((.5 + sin(uTime * .31) * .24) * aspect, .53 + cos(uTime * .23) * .17);
    float polish = exp(-dot(adjusted - polishCenter, adjusted - polishCenter) * 15.0);
    color += vec3(.018, .023, .030) * polish;

    vec2 flareCenter = vec2(uSeal.x * aspect, uSeal.y);
    float flare = exp(-dot(adjusted - flareCenter, adjusted - flareCenter) * 3.4);
    color = mix(color, vec3(1.0), flare * uExit * .72);
    float vignette = smoothstep(.25, .72, length((uv - .5) * vec2(.78, 1.0)));
    color = mix(color, vec3(.947, .935, .907), vignette * .10);
    gl_FragColor = vec4(color, 1.0);
  }
`

export default function IntroCover() {
  const hasSectionTarget = Boolean(window.location.hash || new URLSearchParams(window.location.search).get('section'))
  const hasSeenIntro = (() => {
    try { return window.sessionStorage.getItem('chsp-intro-seen') === '1' }
    catch { return false }
  })()
  const [visible, setVisible] = useState(!hasSectionTarget && !hasSeenIntro)
  const [exiting, setExiting] = useState(false)
  const coverRef = useRef(null)
  const marbleRef = useRef(null)
  const sealRef = useRef(null)
  const openRef = useRef(() => {})

  useEffect(() => {
    if (!visible) return undefined
    document.body.classList.add('intro-active')
    return () => document.body.classList.remove('intro-active')
  }, [visible])

  useEffect(() => {
    if (!visible) return undefined
    const container = marbleRef.current
    const seal = sealRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData
    const canvas = document.createElement('canvas')
    canvas.setAttribute('aria-hidden', 'true')
    container.appendChild(canvas)
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    })
    let animationFrame
    let exitStartedAt = 0
    let pointerX = 0
    let pointerY = 0
    let smoothPointerX = 0
    let smoothPointerY = 0
    let sealX = .5
    let sealY = .58
    let renderWidth = 1
    let renderHeight = 1
    const startingTime = performance.now()

    if (!gl) {
      container.classList.add('intro-cover__marble--fallback')
      return () => container.replaceChildren()
    }

    const compileShader = (type, source) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const reason = gl.getShaderInfoLog(shader)
        gl.deleteShader(shader)
        throw new Error(reason || 'Não foi possível compilar o mármore.')
      }
      return shader
    }

    let program
    let positionBuffer
    let vertex
    let fragment
    try {
      vertex = compileShader(gl.VERTEX_SHADER, vertexShader)
      fragment = compileShader(gl.FRAGMENT_SHADER, fragmentShader)
      program = gl.createProgram()
      gl.attachShader(program, vertex)
      gl.attachShader(program, fragment)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'Não foi possível iniciar o mármore.')
      positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      gl.useProgram(program)
      const position = gl.getAttribLocation(program, 'aPosition')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    } catch (error) {
      container.classList.add('intro-cover__marble--fallback')
      console.warn('A animação de mármore foi substituída pelo fundo estático.', error)
      return () => {
        if (positionBuffer) gl.deleteBuffer(positionBuffer)
        if (program) gl.deleteProgram(program)
        if (vertex) gl.deleteShader(vertex)
        if (fragment) gl.deleteShader(fragment)
        container.replaceChildren()
      }
    }

    const locations = Object.fromEntries(
      ['uTime', 'uResolution', 'uPointer', 'uSeal', 'uIntro', 'uExit']
        .map(name => [name, gl.getUniformLocation(program, name)]),
    )

    const alignSeal = () => {
      const containerRect = container.getBoundingClientRect()
      const sealRect = seal.getBoundingClientRect()
      if (!containerRect.width || !containerRect.height || !sealRect.width) return
      sealX = (sealRect.left + sealRect.width / 2 - containerRect.left) / containerRect.width
      sealY = 1 - (sealRect.top + sealRect.height / 2 - containerRect.top) / containerRect.height
    }

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const pixelRatioLimit = window.innerWidth < 600 ? 1.2 : 1.5
      const pixelRatio = Math.min(window.devicePixelRatio || 1, pixelRatioLimit)
      const width = Math.max(1, Math.round(rect.width))
      const height = Math.max(1, Math.round(rect.height))
      renderWidth = Math.round(width * pixelRatio)
      renderHeight = Math.round(height * pixelRatio)
      canvas.width = renderWidth
      canvas.height = renderHeight
      gl.viewport(0, 0, renderWidth, renderHeight)
      alignSeal()
    }

    const draw = (time = performance.now()) => {
      const elapsed = (time - startingTime) / 1000
      smoothPointerX += (pointerX - smoothPointerX) * .035
      smoothPointerY += (pointerY - smoothPointerY) * .035
      gl.useProgram(program)
      gl.uniform1f(locations.uTime, reduceMotion ? 24 : elapsed)
      gl.uniform2f(locations.uResolution, renderWidth, renderHeight)
      gl.uniform2f(locations.uPointer, smoothPointerX, smoothPointerY)
      gl.uniform2f(locations.uSeal, sealX, sealY)
      gl.uniform1f(locations.uIntro, reduceMotion ? 1 : Math.min(1, elapsed / 2.35))
      gl.uniform1f(locations.uExit, exitStartedAt ? Math.min(1, (time - exitStartedAt) / 650) : 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!reduceMotion) animationFrame = requestAnimationFrame(draw)
    }

    resize()
    animationFrame = requestAnimationFrame(draw)

    const pointerMove = event => {
      pointerX = (event.clientX / window.innerWidth - .5) * 2
      pointerY = -(event.clientY / window.innerHeight - .5) * 2
    }
    const startExit = () => { exitStartedAt ||= performance.now() }
    openRef.current = startExit
    window.addEventListener('pointermove', pointerMove, { passive: true })
    window.addEventListener('resize', resize, { passive: true })
    seal.addEventListener('load', alignSeal)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('pointermove', pointerMove)
      window.removeEventListener('resize', resize)
      seal.removeEventListener('load', alignSeal)
      gl.deleteBuffer(positionBuffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
      container.replaceChildren()
    }
  }, [visible])

  useEffect(() => {
    if (!visible) return undefined
    let wheelIntent = 0
    let wheelResetTimer
    let touchStartY = null

    const open = () => {
      if (exiting) return
      setExiting(true)
      openRef.current()
      try { window.sessionStorage.setItem('chsp-intro-seen', '1') }
      catch { /* A abertura continua funcionando mesmo sem armazenamento disponível. */ }
      window.setTimeout(() => {
        document.body.classList.remove('intro-active')
        setVisible(false)
      }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 80 : 1500)
    }
    const wheel = event => {
      if (event.deltaY <= 0) return
      wheelIntent += Math.min(event.deltaY, 45)
      clearTimeout(wheelResetTimer)
      wheelResetTimer = window.setTimeout(() => { wheelIntent = 0 }, 420)
      if (wheelIntent >= 72) open()
    }
    const touchStart = event => { touchStartY = event.touches[0]?.clientY ?? null }
    const touchMove = event => {
      const currentY = event.touches[0]?.clientY
      if (touchStartY !== null && typeof currentY === 'number' && touchStartY - currentY >= 56) open()
    }
    const touchEnd = () => { touchStartY = null }
    const keyDown = event => {
      if (event.repeat) return
      if (['Enter', ' ', 'ArrowDown', 'PageDown'].includes(event.key)) {
        event.preventDefault()
        open()
      }
    }
    const button = coverRef.current.querySelector('.intro-cover__action')
    button.addEventListener('click', open)
    window.addEventListener('wheel', wheel, { passive: true })
    window.addEventListener('keydown', keyDown)
    coverRef.current.addEventListener('touchstart', touchStart, { passive: true })
    coverRef.current.addEventListener('touchmove', touchMove, { passive: true })
    coverRef.current.addEventListener('touchend', touchEnd, { passive: true })
    return () => {
      clearTimeout(wheelResetTimer)
      button.removeEventListener('click', open)
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('keydown', keyDown)
      coverRef.current?.removeEventListener('touchstart', touchStart)
      coverRef.current?.removeEventListener('touchmove', touchMove)
      coverRef.current?.removeEventListener('touchend', touchEnd)
    }
  }, [visible, exiting])

  if (!visible) return null
  return <section ref={coverRef} className={`intro-cover${exiting ? ' is-exiting' : ''}`} aria-labelledby="intro-cover-title">
    <div ref={marbleRef} className="intro-cover__marble" aria-hidden="true" />
    <div className="intro-cover__content">
          <p className="intro-cover__welcome" lang="el">ΚΑΛΩΣ ΗΡΘΑΤΕ</p>
      <img ref={sealRef} className="intro-cover__seal" src={assetUrl('/images/chsp-logo-256.png')} alt="Brasão da Coletividade Helênica de São Paulo" width="142" height="142" />
      <h1 id="intro-cover-title">Coletividade Helênica de São Paulo</h1>
      <p className="intro-cover__tagline">Desde 1937, a casa da Grécia em São Paulo.</p>
      <button className="intro-cover__action" type="button">Entre e conheça</button>
    </div>
    <span className="intro-cover__scroll" aria-hidden="true"><span className="intro-cover__scroll-desktop">Role</span><span className="intro-cover__scroll-mobile">Arraste</span></span>
        <span className="intro-cover__inscription" lang="el" aria-hidden="true">ΜΝΗΜΗ · ΠΑΙΔΕΙΑ · ΦΙΛΙΑ</span>
  </section>
}
