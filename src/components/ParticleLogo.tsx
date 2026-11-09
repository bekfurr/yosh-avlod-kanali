'use client';

import React, { useEffect, useRef, useState } from 'react';

const MAX_PARTICLES = 12000;
const SAMPLE_PIXEL_LIMIT = 900000;
const MAX_CANVAS_PIXELS = 8000000;

export interface ParticleLogoProps {
  imageSrc?: string;
  particleSize?: number;
  resolution?: number;
  scale?: number;
  speed?: number;
  background?: string;
  transparentBackground?: boolean;
  colorMode?: 'Image' | 'Custom';
  particleColor?: string;
  renderMode?: 'Particles' | 'Pixels';
  pointerMode?: 'Repel' | 'Attract' | 'Hide';
  pointerRadius?: number;
  pointerStrength?: number;
  drift?: number;
  maxDPR?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  palette: number;
  phase: number;
  visualScale: number;
  hoverScale: number;
  recovering: boolean;
  recoveryX: number;
  recoveryY: number;
  recoveryScale: number;
}

function quantizeColor(r: number, g: number, b: number, palette: string[], lookup: Map<string, number>, bits = 3): number {
  const shift = 8 - bits;
  const step = 1 << shift;
  const red = r >> shift;
  const green = g >> shift;
  const blue = b >> shift;
  const key = `${red},${green},${blue}`;
  let index = lookup.get(key);
  if (index === undefined) {
    index = palette.length;
    lookup.set(key, index);
    palette.push(`rgb(${red * step + step / 2},${green * step + step / 2},${blue * step + step / 2})`);
  }
  return index;
}

export default function ParticleLogo({
  imageSrc = '/logo-particle.jpg',
  particleSize = 3,
  resolution = 6,
  scale = 0.65,
  speed = 1.1,
  background = '#000000',
  transparentBackground = true,
  colorMode = 'Image',
  particleColor = '#f59e0b',
  renderMode = 'Particles',
  pointerMode = 'Repel',
  pointerRadius = 140,
  pointerStrength = 1.2,
  drift = 0.28,
  maxDPR = 1.5,
  className = '',
}: ParticleLogoProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameSize, setFrameSize] = useState({ width: 340, height: 340 });

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas || !imageSrc) return;

    const context = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!context) return;

    let disposed = false;
    let animationFrame = 0;
    let pointerX = -10000;
    let pointerY = -10000;
    let pointerIsDown = false;
    let holdActivated = false;
    let holdStartedAt = -1000000;
    let recoveryStartedAt = -1000000;
    let suppressHover = false;
    let visible = true;
    let lastTime = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let palette: string[] = [];

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const loadedImage = new Image();
    loadedImage.crossOrigin = 'anonymous';

    const getRelativeCoords = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = event.clientX;
      const clientY = event.clientY;
      const scaleX = width > 0 && rect.width > 0 ? width / rect.width : 1;
      const scaleY = height > 0 && rect.height > 0 ? height / rect.height : 1;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      const { x, y } = getRelativeCoords(event);
      pointerX = x;
      pointerY = y;
      if (!pointerIsDown) suppressHover = false;
    };

    const onPointerEnter = (event: PointerEvent) => onPointerMove(event);

    const onPointerLeave = () => {
      if (!pointerIsDown) {
        pointerX = -10000;
        pointerY = -10000;
        suppressHover = false;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const { x, y } = getRelativeCoords(event);
      pointerX = x;
      pointerY = y;
      pointerIsDown = true;
      holdActivated = false;
      holdStartedAt = performance.now();
      recoveryStartedAt = -1000000;
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture fallback
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!pointerIsDown) return;
      const { x, y } = getRelativeCoords(event);
      pointerX = x;
      pointerY = y;
      const now = performance.now();
      const heldFor = now - holdStartedAt;

      if (heldFor >= 240) {
        holdActivated = true;
      }

      if (holdActivated) {
        const holdProgress = Math.min(1, Math.max(0, (heldFor - 240) / 300));
        const eased = 1 - Math.pow(1 - holdProgress, 3);
        const radius = Math.max(1, pointerRadius);

        for (const particle of particles) {
          const dx = particle.tx - pointerX;
          const dy = particle.ty - pointerY;
          const distance = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - distance / radius) * eased;
          const pull = influence * 0.35;
          particle.x = particle.tx + (pointerX - particle.tx) * pull;
          particle.y = particle.ty + (pointerY - particle.ty) * pull;
          particle.visualScale = 1 - influence;
          particle.recoveryX = particle.x;
          particle.recoveryY = particle.y;
          particle.recoveryScale = particle.visualScale;
          particle.recovering = influence > 0;
        }
        recoveryStartedAt = now;
        suppressHover = true;
      }
      pointerIsDown = false;
      holdActivated = false;
    };

    canvas.addEventListener('pointerenter', onPointerEnter, { passive: true });
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave, { passive: true });
    canvas.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });

    const intersectionObserver =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              visible = entries[0]?.isIntersecting ?? true;
            },
            { rootMargin: '120px' }
          )
        : undefined;

    intersectionObserver?.observe(host);

    const render = (time: number) => {
      if (disposed) return;
      animationFrame = requestAnimationFrame(render);
      if (!visible || !width || !height) return;

      const delta = lastTime ? Math.min(2, (time - lastTime) / 16.67) : 1;
      lastTime = time;

      context.globalAlpha = 1;
      context.clearRect(0, 0, width, height);

      if (!transparentBackground) {
        context.fillStyle = background;
        context.fillRect(0, 0, width, height);
      }

      const returnEase = Math.min(0.35, 0.085 * Math.max(0.15, speed));
      const damping = Math.pow(0.82, delta);
      const radius = Math.max(0, pointerRadius);
      const radiusSquared = radius * radius;
      const holdDuration = (time - holdStartedAt) / 1000;

      if (pointerIsDown && holdDuration >= 0.24) {
        holdActivated = true;
      }
      const holdingEffect = pointerIsDown && holdActivated;
      const recoveryProgress = Math.min(1, (time - recoveryStartedAt) / 260);
      const recoveringNow = !pointerIsDown && recoveryProgress >= 0 && recoveryProgress < 1;

      for (const particle of particles) {
        const dx = particle.x - pointerX;
        const dy = particle.y - pointerY;
        const distanceSquared = dx * dx + dy * dy;

        if (holdingEffect) {
          const targetDx = particle.tx - pointerX;
          const targetDy = particle.ty - pointerY;
          const distance = Math.hypot(targetDx, targetDy);
          const influence = Math.max(0, 1 - distance / Math.max(1, radius));
          const pressProgress = Math.min(1, Math.max(0, (holdDuration - 0.24) / 0.3));
          const eased = 1 - Math.pow(1 - pressProgress, 3);
          const pull = influence * eased * 0.35;
          particle.x = particle.tx + (pointerX - particle.tx) * pull;
          particle.y = particle.ty + (pointerY - particle.ty) * pull;
          particle.vx = 0;
          particle.vy = 0;
          particle.visualScale = 1 - influence * eased;
          particle.hoverScale = 1;
          continue;
        }

        if (recoveringNow && particle.recovering) {
          const eased = 1 - Math.pow(1 - recoveryProgress, 3);
          particle.x = particle.recoveryX + (particle.tx - particle.recoveryX) * eased;
          particle.y = particle.recoveryY + (particle.ty - particle.recoveryY) * eased;
          particle.visualScale = particle.recoveryScale + (1 - particle.recoveryScale) * eased;
          particle.hoverScale = 1;
          continue;
        }

        particle.recovering = false;
        particle.visualScale = 1;

        let targetX = particle.tx;
        let targetY = particle.ty;

        if (!pointerIsDown && pointerMode !== 'Hide' && distanceSquared < radiusSquared && radius > 0) {
          const distance = Math.max(0.001, Math.sqrt(distanceSquared));
          const falloff = 1 - distance / radius;
          const direction = pointerMode === 'Repel' ? 1 : -1;
          const force = falloff * falloff * pointerStrength * Math.min(95, radius * 0.65) * direction;
          targetX += (dx / distance) * force;
          targetY += (dy / distance) * force;
        }

        const wobble = reduceMotion ? 0 : drift;
        targetX += Math.sin(time * 0.0012 + particle.phase) * wobble;
        targetY += Math.cos(time * 0.001 + particle.phase) * wobble;

        particle.vx = (particle.vx + (targetX - particle.x) * returnEase * delta) * damping;
        particle.vy = (particle.vy + (targetY - particle.y) * returnEase * delta) * damping;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        const isUnderPointer =
          (particle.tx - pointerX) ** 2 + (particle.ty - pointerY) ** 2 < radiusSquared;
        const shouldHide =
          !pointerIsDown && !suppressHover && pointerMode === 'Hide' && radius > 0 && isUnderPointer;
        const hoverTarget = shouldHide ? 0 : 1;
        particle.hoverScale += (hoverTarget - particle.hoverScale) * Math.min(1, 0.9 * delta);
      }

      const radiusPx = Math.max(0.5, particleSize * 0.5);
      const tileSize = Math.max(1, resolution * 0.96);
      let particleIndex = 0;

      while (particleIndex < particles.length) {
        const colorIndex = particles[particleIndex].palette;
        context.beginPath();

        while (particleIndex < particles.length && particles[particleIndex].palette === colorIndex) {
          const p = particles[particleIndex];
          const drawRadius = radiusPx * p.visualScale * p.hoverScale;

          if (renderMode === 'Pixels') {
            const side = tileSize * p.visualScale * p.hoverScale;
            if (side > 0.05) context.rect(p.x - side / 2, p.y - side / 2, side, side);
          } else if (drawRadius > 0.05) {
            context.moveTo(p.x + drawRadius, p.y);
            context.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
          }
          particleIndex++;
        }

        context.fillStyle = palette[colorIndex] || '#f59e0b';
        context.fill();
      }

      context.globalAlpha = 1;
    };

    loadedImage.onload = () => {
      if (disposed) return;
      const naturalWidth = loadedImage.naturalWidth || 640;
      const naturalHeight = loadedImage.naturalHeight || 640;

      // Calculate container size
      width = Math.max(1, Math.round(naturalWidth * Math.max(0.1, scale)));
      height = Math.max(1, Math.round(naturalHeight * Math.max(0.1, scale)));
      setFrameSize({ width, height });

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        Math.max(1, maxDPR),
        Math.sqrt(MAX_CANVAS_PIXELS / Math.max(1, width * height))
      );

      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sampleScale = Math.min(1, Math.sqrt(SAMPLE_PIXEL_LIMIT / Math.max(1, width * height)));
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = Math.max(1, Math.ceil(width * sampleScale));
      sampleCanvas.height = Math.max(1, Math.ceil(height * sampleScale));
      const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });
      if (!sampleContext) return;

      sampleContext.clearRect(0, 0, sampleCanvas.width, sampleCanvas.height);
      sampleContext.drawImage(loadedImage, 0, 0, sampleCanvas.width, sampleCanvas.height);

      let pixels: Uint8ClampedArray;
      try {
        pixels = sampleContext.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;
      } catch {
        particles = [];
        palette = [];
        return;
      }

      let sampleStep = Math.max(1, Math.round(Math.max(2, resolution) * sampleScale));
      while (
        Math.ceil(sampleCanvas.width / sampleStep) * Math.ceil(sampleCanvas.height / sampleStep) >
        MAX_PARTICLES
      ) {
        sampleStep++;
      }

      const paletteLookup = new Map<string, number>();
      const useCustomColor = colorMode === 'Custom';
      if (useCustomColor) palette.push(particleColor);

      const nextParticles: Particle[] = [];

      for (let sy = 0; sy < sampleCanvas.height; sy += sampleStep) {
        for (let sx = 0; sx < sampleCanvas.width; sx += sampleStep) {
          const offset = (sy * sampleCanvas.width + sx) * 4;
          const r = pixels[offset];
          const g = pixels[offset + 1];
          const b = pixels[offset + 2];
          const alpha = pixels[offset + 3];

          // Filter out transparent and pure black background pixels
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          if (alpha < 24 || brightness < 22) continue;

          const colorIndex = useCustomColor
            ? 0
            : quantizeColor(r, g, b, palette, paletteLookup, renderMode === 'Pixels' ? 4 : 3);

          const tx = sx / sampleScale;
          const ty = sy / sampleScale;
          const angle = Math.random() * Math.PI * 2;
          const distance = reduceMotion ? 0 : Math.hypot(width, height) * (0.2 + Math.random() * 0.4);

          nextParticles.push({
            x: tx + Math.cos(angle) * distance,
            y: ty + Math.sin(angle) * distance,
            vx: 0,
            vy: 0,
            tx,
            ty,
            palette: colorIndex,
            phase: Math.random() * Math.PI * 2,
            visualScale: 1,
            hoverScale: 1,
            recovering: false,
            recoveryX: tx,
            recoveryY: ty,
            recoveryScale: 1,
          });
        }
      }

      nextParticles.sort((a, b) => a.palette - b.palette);
      particles = nextParticles;
    };

    loadedImage.onerror = () => {
      particles = [];
      palette = [];
    };

    loadedImage.src = imageSrc;
    animationFrame = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      intersectionObserver?.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerenter', onPointerEnter);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      loadedImage.onload = null;
      loadedImage.onerror = null;
    };
  }, [
    imageSrc,
    particleSize,
    resolution,
    scale,
    speed,
    background,
    transparentBackground,
    colorMode,
    particleColor,
    renderMode,
    pointerMode,
    pointerRadius,
    pointerStrength,
    drift,
    maxDPR,
  ]);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label="Interactive logo made of particles"
      className={`relative select-none touch-none cursor-grab active:cursor-grabbing flex items-center justify-center ${className}`}
      style={{
        width: frameSize.width,
        height: frameSize.height,
        maxWidth: '100%',
        touchAction: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: `${frameSize.width}px`,
          height: `${frameSize.height}px`,
          maxWidth: '100%',
          aspectRatio: `${frameSize.width} / ${frameSize.height}`,
        }}
      />
    </div>
  );
}
