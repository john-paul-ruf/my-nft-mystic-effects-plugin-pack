/**
 * Mystic Symbols Engine
 *
 * Renders chakra/elemental symbols on Sephiroth nodes with rich animation:
 * - Per-phase opacity, scale, and rotation
 * - Harmonic color shifts based on node energy
 * - Symbol glow and aura effects
 * - Layered symbol rendering with depth
 *
 * Symbol Mapping (Chakra/Elemental Model):
 * 1. Kether (Crown) → Void/Ether (white, all-encompassing)
 * 2. Chokmah (Wisdom) → Air (yellow, intellectual, expansive)
 * 3. Binah (Understanding) → Water (blue, receptive, flowing)
 * 4. Chesed (Mercy) → Jupiter/Air (light blue, benevolent)
 * 5. Gevurah (Severity) → Mars/Fire (red, passionate, transformative)
 * 6. Tifereth (Beauty) → Sun/Fire (gold, radiant, central)
 * 7. Netzach (Victory) → Venus/Water (green, harmonious, flowing)
 * 8. Hod (Splendor) → Mercury/Air (orange, communicative, quick)
 * 9. Yesod (Foundation) → Moon/Water (silver, reflective, dreamy)
 * 10. Malkuth (Kingdom) → Earth (brown/red, grounded, manifest)
 */

export class MysticSymbolsEngine {
  constructor(config = {}) {
    this.config = config;
    this.symbols = this.#initializeSymbols();
  }

  /**
   * Initialize symbol definitions for each Sephiroth
   * @private
   */
  #initializeSymbols() {
    return {
      kether: {
        id: 1,
        name: 'Kether',
        element: 'Void/Ether',
        color: '#FFFFFF',
        glowColor: '#FFFFCC',
        paths: [
          // Star of David with center point
          { type: 'circle', radius: 0.5, cx: 0.5, cy: 0.5 },
          // 6-pointed star outline
          { type: 'path', points: this.#sixPointedStar(0.5, 0.5, 1.0) },
          // Inner sacred geometry
          { type: 'path', points: this.#sixPointedStar(0.5, 0.5, 0.6) },
          // Central cross
          { type: 'line', x1: 0.5, y1: 0.2, x2: 0.5, y2: 0.8 },
          { type: 'line', x1: 0.2, y1: 0.5, x2: 0.8, y2: 0.5 },
        ]
      },

      chokmah: {
        id: 2,
        name: 'Chokmah',
        element: 'Air',
        color: '#FFFF00',
        glowColor: '#FFFF99',
        paths: [
          // Triangle pointing up (Air element)
          { type: 'polygon', points: [[0.5, 0.15], [0.15, 0.85], [0.85, 0.85]] },
          // Inner air waves
          { type: 'arc', cx: 0.5, cy: 0.5, r: 0.4, startAngle: 0, endAngle: Math.PI * 2 },
          { type: 'arc', cx: 0.5, cy: 0.5, r: 0.25, startAngle: 0, endAngle: Math.PI * 2 },
          // Chevrons for movement
          { type: 'path', points: this.#chevronPattern(0.5, 0.5, 0.35, 3) },
        ]
      },

      binah: {
        id: 3,
        name: 'Binah',
        element: 'Water',
        color: '#0099FF',
        glowColor: '#66CCFF',
        paths: [
          // Triangle pointing down (Water element)
          { type: 'polygon', points: [[0.5, 0.85], [0.15, 0.15], [0.85, 0.15]] },
          // Wave patterns
          { type: 'path', points: this.#wavePattern(0.5, 0.5, 0.3, 3) },
          // Concentric circles (water ripples)
          { type: 'arc', cx: 0.5, cy: 0.5, r: 0.35, startAngle: 0, endAngle: Math.PI * 2 },
          { type: 'arc', cx: 0.5, cy: 0.5, r: 0.2, startAngle: 0, endAngle: Math.PI * 2 },
        ]
      },

      chesed: {
        id: 4,
        name: 'Chesed',
        element: 'Jupiter/Air',
        color: '#87CEEB',
        glowColor: '#B0E0E6',
        paths: [
          // Square (Jupiter/Expansion)
          { type: 'rect', x: 0.2, y: 0.2, width: 0.6, height: 0.6 },
          // Inner square rotated
          { type: 'rect', x: 0.35, y: 0.35, width: 0.3, height: 0.3, rotation: Math.PI / 4 },
          // Four rays outward
          { type: 'line', x1: 0.5, y1: 0.1, x2: 0.5, y2: 0.3 },
          { type: 'line', x1: 0.5, y1: 0.7, x2: 0.5, y2: 0.9 },
          { type: 'line', x1: 0.1, y1: 0.5, x2: 0.3, y2: 0.5 },
          { type: 'line', x1: 0.7, y1: 0.5, x2: 0.9, y2: 0.5 },
        ]
      },

      gevurah: {
        id: 5,
        name: 'Gevurah',
        element: 'Mars/Fire',
        color: '#FF0000',
        glowColor: '#FF6666',
        paths: [
          // Pentagon (Mars/Severity)
          { type: 'polygon', points: this.#regularPolygon(0.5, 0.5, 0.4, 5) },
          // Inner pentagon inverted
          { type: 'polygon', points: this.#regularPolygon(0.5, 0.5, 0.2, 5, Math.PI) },
          // Radiating spikes
          { type: 'path', points: this.#spikePattern(0.5, 0.5, 0.45, 8) },
          // Central flame shape
          { type: 'path', points: this.#flameShape(0.5, 0.5, 0.15) },
        ]
      },

      tifereth: {
        id: 6,
        name: 'Tifereth',
        element: 'Sun/Fire',
        color: '#FFD700',
        glowColor: '#FFED4E',
        paths: [
          // Large outer circle (sun)
          { type: 'circle', cx: 0.5, cy: 0.5, radius: 0.45 },
          // Middle ring
          { type: 'circle', cx: 0.5, cy: 0.5, radius: 0.3 },
          // Inner sun core
          { type: 'circle', cx: 0.5, cy: 0.5, radius: 0.15 },
          // 8 solar rays
          { type: 'path', points: this.#sunRays(0.5, 0.5, 0.45, 8) },
          // Cross in center
          { type: 'line', x1: 0.5, y1: 0.35, x2: 0.5, y2: 0.65 },
          { type: 'line', x1: 0.35, y1: 0.5, x2: 0.65, y2: 0.5 },
        ]
      },

      netzach: {
        id: 7,
        name: 'Netzach',
        element: 'Venus/Water',
        color: '#00DD00',
        glowColor: '#66FF66',
        paths: [
          // Hexagon (Venus/Harmony)
          { type: 'polygon', points: this.#regularPolygon(0.5, 0.5, 0.4, 6) },
          // Inner smaller hexagon
          { type: 'polygon', points: this.#regularPolygon(0.5, 0.5, 0.25, 6) },
          // Flower petal pattern
          { type: 'path', points: this.#flowerPetals(0.5, 0.5, 0.35, 6) },
          // Central harmonic circle
          { type: 'circle', cx: 0.5, cy: 0.5, radius: 0.1 },
        ]
      },

      hod: {
        id: 8,
        name: 'Hod',
        element: 'Mercury/Air',
        color: '#FF8800',
        glowColor: '#FFAA44',
        paths: [
          // Octagon (Mercury/Communication)
          { type: 'polygon', points: this.#regularPolygon(0.5, 0.5, 0.4, 8) },
          // Double octagon for complexity
          { type: 'polygon', points: this.#regularPolygon(0.5, 0.5, 0.25, 8, Math.PI / 8) },
          // Caduceus (Mercury staff) - intertwined snakes
          { type: 'path', points: this.#caduceus(0.5, 0.5, 0.3) },
          // Central circle with cross
          { type: 'circle', cx: 0.5, cy: 0.5, radius: 0.12 },
          { type: 'line', x1: 0.5, y1: 0.38, x2: 0.5, y2: 0.62 },
          { type: 'line', x1: 0.38, y1: 0.5, x2: 0.62, y2: 0.5 },
        ]
      },

      yesoid: {
        id: 9,
        name: 'Yesoid',
        element: 'Moon/Water',
        color: '#9999FF',
        glowColor: '#CCCCFF',
        paths: [
          // Crescent moon
          { type: 'path', points: this.#crescent(0.5, 0.5, 0.35) },
          // Lunar phases circle
          { type: 'circle', cx: 0.5, cy: 0.5, radius: 0.4 },
          // Inner spiral (dreams)
          { type: 'path', points: this.#logarithmicSpiral(0.5, 0.5, 0.3, 2) },
          // Three stars pattern
          { type: 'path', points: this.#starCluster(0.5, 0.5, 0.25) },
        ]
      },

      malkuth: {
        id: 10,
        name: 'Malkuth',
        element: 'Earth',
        color: '#8B4513',
        glowColor: '#CD853F',
        paths: [
          // Square (Earth foundation)
          { type: 'rect', x: 0.15, y: 0.15, width: 0.7, height: 0.7 },
          // Inner square
          { type: 'rect', x: 0.25, y: 0.25, width: 0.5, height: 0.5 },
          // Four corner stones
          { type: 'rect', x: 0.1, y: 0.1, width: 0.15, height: 0.15 },
          { type: 'rect', x: 0.75, y: 0.1, width: 0.15, height: 0.15 },
          { type: 'rect', x: 0.1, y: 0.75, width: 0.15, height: 0.15 },
          { type: 'rect', x: 0.75, y: 0.75, width: 0.15, height: 0.15 },
          // Earth symbol cross
          { type: 'line', x1: 0.5, y1: 0.35, x2: 0.5, y2: 0.65 },
          { type: 'line', x1: 0.35, y1: 0.5, x2: 0.65, y2: 0.5 },
        ]
      }
    };
  }

  /**
   * Get symbol configuration for a specific Sephiroth
   */
  getSymbol(nodeId) {
    const symbolMap = {
      1: 'kether', 2: 'chokmah', 3: 'binah', 4: 'chesed', 5: 'gevurah',
      6: 'tifereth', 7: 'netzach', 8: 'hod', 9: 'yesoid', 10: 'malkuth'
    };
    return this.symbols[symbolMap[nodeId]];
  }

  /**
   * Get per-phase animation for a symbol
   */
  getPhaseAnimation(phase, progress, nodeId) {
    const phaseProgress = progress; // 0-1 within the phase
    
    const animations = {
      awakening: {
        opacity: this.#easeInCubic(phaseProgress) * 0.7,
        scale: 0.5 + this.#easeInCubic(phaseProgress) * 0.5,
        rotation: 0,
        glowIntensity: this.#easeInCubic(phaseProgress) * 0.4
      },
      ascension: {
        opacity: 0.9,
        scale: 1.0 + Math.sin(phaseProgress * Math.PI * 4) * 0.15,
        rotation: phaseProgress * Math.PI * 4,
        glowIntensity: 0.6 + Math.sin(phaseProgress * Math.PI * 2) * 0.2
      },
      radiance: {
        opacity: 1.0,
        scale: 1.1 + Math.sin(phaseProgress * Math.PI * 3) * 0.1,
        rotation: phaseProgress * Math.PI * 6,
        glowIntensity: 0.9 + Math.sin(phaseProgress * Math.PI * 4) * 0.1
      },
      descent: {
        opacity: this.#easeOutQuart(1.0 - phaseProgress) * 0.7,
        scale: 0.5 + this.#easeOutQuart(1.0 - phaseProgress) * 0.5,
        rotation: (1.0 - phaseProgress) * Math.PI * 2,
        glowIntensity: this.#easeOutQuart(1.0 - phaseProgress) * 0.4
      }
    };

    return animations[phase] || animations.awakening;
  }

  /**
   * Get color shift based on node energy
   */
  getColorShift(phase, progress, nodeId) {
    const symbol = this.getSymbol(nodeId);
    
    // Harmonic color oscillation
    const hueShift = Math.sin(progress * Math.PI * 2 + nodeId * 0.5) * 15;
    const saturation = 0.7 + Math.sin(progress * Math.PI * 2) * 0.3;
    
    return {
      baseColor: symbol.color,
      glowColor: symbol.glowColor,
      hueShift,
      saturation,
      brightness: 0.8 + Math.sin(progress * Math.PI * 2) * 0.2
    };
  }

  // ===== GEOMETRIC SHAPE GENERATORS =====

  #sixPointedStar(cx, cy, size) {
    const points = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const r = (i % 2 === 0) ? size : size * 0.6;
      points.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
    }
    return points;
  }

  #chevronPattern(cx, cy, radius, count) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x1 = cx + Math.cos(angle) * radius * 0.8;
      const y1 = cy + Math.sin(angle) * radius * 0.8;
      const x2 = cx + Math.cos(angle) * radius;
      const y2 = cy + Math.sin(angle) * radius;
      points.push([x1, y1], [x2, y2]);
    }
    return points;
  }

  #wavePattern(cx, cy, amplitude, waves) {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * 0.8 - 0.4 + cx;
      const y = cy + Math.sin((i / 100) * Math.PI * waves * 2) * amplitude;
      points.push([x, y]);
    }
    return points;
  }

  #regularPolygon(cx, cy, radius, sides, rotation = 0) {
    const points = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 + rotation;
      points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
    }
    return points;
  }

  #spikePattern(cx, cy, radius, count) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      points.push([cx, cy]);
      points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
    }
    return points;
  }

  #flameShape(cx, cy, size) {
    // Stylized flame outline
    return [
      [cx, cy - size * 2],
      [cx + size, cy - size],
      [cx + size * 0.5, cy],
      [cx + size * 0.8, cy + size],
      [cx, cy + size * 0.8],
      [cx - size * 0.8, cy + size],
      [cx - size * 0.5, cy],
      [cx - size, cy - size],
    ];
  }

  #sunRays(cx, cy, radius, count) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      points.push([cx, cy]);
      points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
    }
    return points;
  }

  #flowerPetals(cx, cy, radius, petals) {
    const points = [];
    for (let p = 0; p < petals; p++) {
      const angle = (p / petals) * Math.PI * 2;
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const petalAngle = angle + (t - 0.5) * Math.PI * 0.8;
        const r = radius * Math.sin(t * Math.PI) * 0.8;
        points.push([cx + Math.cos(petalAngle) * r, cy + Math.sin(petalAngle) * r]);
      }
    }
    return points;
  }

  #caduceus(cx, cy, height) {
    // Intertwined snakes around central rod
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const y = cy - height * 0.5 + t * height;
      const x1 = cx + Math.sin(t * Math.PI * 4) * 0.1;
      const x2 = cx - Math.sin(t * Math.PI * 4) * 0.1;
      if (i % 2 === 0) points.push([x1, y]);
      else points.push([x2, y]);
    }
    return points;
  }

  #crescent(cx, cy, radius) {
    const points = [];
    for (let i = 0; i <= 180; i++) {
      const angle = (i / 180) * Math.PI;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      points.push([x, y]);
    }
    // Inner crescent line
    for (let i = 180; i >= 0; i--) {
      const angle = (i / 180) * Math.PI;
      const x = cx + Math.cos(angle + 0.3) * radius * 0.7;
      const y = cy + Math.sin(angle + 0.3) * radius * 0.7;
      points.push([x, y]);
    }
    return points;
  }

  #logarithmicSpiral(cx, cy, maxRadius, turns) {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const angle = t * Math.PI * 2 * turns;
      const radius = t * maxRadius;
      points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
    }
    return points;
  }

  #starCluster(cx, cy, radius) {
    const points = [];
    const starPositions = [
      [0, -1],
      [0.866, 0.5],
      [-0.866, 0.5]
    ];
    
    for (const pos of starPositions) {
      const x = cx + pos[0] * radius;
      const y = cy + pos[1] * radius;
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const r = radius * 0.15;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        points.push([px, py]);
      }
    }
    
    return points;
  }

  // ===== EASING FUNCTIONS =====

  #easeInCubic(t) {
    return t * t * t;
  }

  #easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }
}