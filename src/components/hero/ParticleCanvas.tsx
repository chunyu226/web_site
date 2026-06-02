import { useRef } from 'react'
import { useParticles } from '../../hooks/useParticles'

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useParticles(canvasRef, {
    particleCount: 80,
    connectionDistance: 150,
  })

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}

export default ParticleCanvas
