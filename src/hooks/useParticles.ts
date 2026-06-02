import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
}

interface UseParticlesOptions {
  particleCount: number
  connectionDistance: number
}

function generateParticles(
  count: number,
  width: number,
  height: number,
): Particle[] {
  const particles: Particle[] = []
  const padding = 40
  for (let i = 0; i < count; i++) {
    particles.push({
      x: padding + Math.random() * (width - padding * 2),
      y: padding + Math.random() * (height - padding * 2),
      radius: 0.8 + Math.random() * 2.2,
    })
  }
  return particles
}

function draw(
  canvas: HTMLCanvasElement,
  particles: Particle[],
  connectionDistance: number,
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const width = canvas.clientWidth
  const height = canvas.clientHeight

  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.scale(dpr, dpr)

  ctx.clearRect(0, 0, width, height)

  const styles = getComputedStyle(document.documentElement)
  const nodeColor = styles.getPropertyValue('--particle-node-color').trim()
  const lineColor = styles.getPropertyValue('--particle-line-color').trim()

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < connectionDistance) {
        const opacity = 1 - dist / connectionDistance
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = lineColor.replace(
          /rgba?\(([^)]+)\)/,
          (_, values) => {
            const parts = values.split(',').map((s: string) => s.trim())
            if (parts.length >= 3) {
              return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${(parseFloat(parts[3] || '1') * opacity).toFixed(2)})`
            }
            return `rgba(0,0,0,${opacity.toFixed(2)})`
          },
        )
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }

  // Draw nodes
  for (const p of particles) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = nodeColor
    ctx.fill()
  }
}

export function useParticles(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: UseParticlesOptions,
): void {
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    let timeoutId: ReturnType<typeof setTimeout>

    function regenerateAndDraw() {
      const width = parent!.clientWidth
      const height = parent!.clientHeight
      particlesRef.current = generateParticles(
        options.particleCount,
        width,
        height,
      )
      draw(canvas!, particlesRef.current, options.connectionDistance)
    }

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(regenerateAndDraw, 150)
    })
    resizeObserver.observe(parent)

    const mutationObserver = new MutationObserver(() => {
      draw(canvas!, particlesRef.current, options.connectionDistance)
    })
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    regenerateAndDraw()

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      clearTimeout(timeoutId)
    }
  }, [canvasRef, options.particleCount, options.connectionDistance])
}
