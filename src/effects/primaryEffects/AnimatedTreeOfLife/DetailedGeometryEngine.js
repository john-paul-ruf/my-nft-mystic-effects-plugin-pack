/**
 * DetailedGeometryEngine.js
 * 
 * Renders enhanced geometric details for nodes and paths using:
 * - Multi-layered node structures with concentric elements
 * - Ribbon-like path effects with depth
 * - Fibonacci spiral decorations
 * - Harmonic subdivision patterns (golden ratio based)
 */

export class DetailedGeometryEngine {
  constructor(config = {}) {
    this.config = config;
    this.goldenRatio = 1.618033988749895;
  }

  /**
   * Get multi-layered node rendering instructions
   * Creates concentric rings and orbital decorations
   */
  getNodeLayers(nodeId, progress, phase) {
    const layers = [];
    
    // Calculate phase-specific intensity
    const phaseIntensity = {
      awakening: 0.3,
      ascension: 0.7,
      radiance: 1.0,
      descent: 0.4
    }[phase] || 0.5;

    // Layer 1: Outer crystalline structure (6 points like a snowflake)
    layers.push({
      type: 'crystalline',
      radius: 1.4,
      rotation: (progress * 360 * 0.5 + nodeId * 30) % 360,
      intensity: phaseIntensity * 0.3,
      color: 'glow',
      pattern: 'hexagonal'
    });

    // Layer 2: Fibonacci spiral decoration (golden ratio spiral)
    layers.push({
      type: 'fibonacci',
      radius: 1.2,
      rotation: (progress * 360 * 0.3 + nodeId * 45) % 360,
      intensity: phaseIntensity * 0.25,
      color: 'accent',
      spirals: 3,
      thickness: 0.3
    });

    // Layer 3: Harmonic rings (concentric circles at golden ratio intervals)
    layers.push({
      type: 'harmonic_rings',
      count: 4,
      baseRadius: 0.9,
      intensity: phaseIntensity * 0.2,
      color: 'glow'
    });

    // Layer 4: Orbital micro-elements (small rotating elements around main node)
    layers.push({
      type: 'orbital',
      count: nodeId % 3 + 3, // 3-5 orbitals depending on node
      radius: 1.6,
      rotation: progress * 360 * (0.4 + nodeId * 0.05),
      intensity: phaseIntensity * 0.15,
      color: 'accent'
    });

    // Layer 5: Inner mandala structure
    layers.push({
      type: 'mandala',
      petals: (nodeId % 7) + 4, // 4-10 petals depending on node
      radius: 0.6,
      rotation: (progress * 360 * 0.25 + nodeId * 60) % 360,
      intensity: phaseIntensity * 0.35,
      color: 'glow'
    });

    return layers;
  }

  /**
   * Get path enhancement details
   * Creates ribbon effects, thickness variation, and harmonic overlays
   */
  getPathEnhancements(pathId, fromPos, toPos, progress, phase, totalPaths) {
    const enhancements = {
      ribbonEffect: this.#getRibbonEffect(pathId, progress),
      harmonicSubdivisions: this.#getHarmonicSubdivisions(pathId, fromPos, toPos),
      thicknessVariation: this.#getThicknessVariation(pathId, progress),
      crosshatch: this.#getCrosshatchPattern(pathId, fromPos, toPos, progress),
      flowingPattern: this.#getFlowingPattern(pathId, fromPos, toPos, progress, totalPaths)
    };

    return enhancements;
  }

  /**
   * Ribbon effect - twisted/warped appearance for visual depth
   * @private
   */
  #getRibbonEffect(pathId, progress) {
    const waveAmount = Math.sin(progress * Math.PI * 2 + pathId * 0.5) * 0.3;
    const twistAmount = Math.cos(progress * Math.PI + pathId * 0.3) * 0.25;

    return {
      waveOffset: waveAmount,
      twist: twistAmount,
      subdivisions: 4, // Number of parallel offset lines
      intensity: 0.4
    };
  }

  /**
   * Harmonic subdivisions based on golden ratio
   * Creates subdivision points at Fibonacci intervals
   * @private
   */
  #getHarmonicSubdivisions(pathId, fromPos, toPos) {
    const divisions = [];
    
    // Generate Fibonacci-based division points
    const fibSequence = [1, 1, 2, 3, 5, 8, 13];
    const maxFib = fibSequence[fibSequence.length - 1];
    
    for (let i = 1; i < fibSequence.length - 1; i++) {
      const ratio = fibSequence[i] / maxFib;
      divisions.push({
        position: ratio,
        thickness: 0.5 - (i * 0.1),
        offset: Math.sin(i * Math.PI / 3) * 2,
        intensity: 0.3 * (1 - i / fibSequence.length)
      });
    }

    return divisions;
  }

  /**
   * Thickness variation along path
   * Creates thicker/thinner patterns suggesting harmonic resonance
   * @private
   */
  #getThicknessVariation(pathId, progress) {
    const variations = [];
    const pointCount = 8;

    for (let i = 0; i < pointCount; i++) {
      const position = i / pointCount;
      const harmonic = Math.sin(position * Math.PI * 3 + progress * Math.PI * 2) * 0.5 + 0.5;
      const golden = this.goldenRatio * position;
      const resonance = Math.sin(golden * Math.PI * 2) * 0.3 + 0.3;

      variations.push({
        position,
        thickness: (harmonic * resonance),
        intensity: 0.5
      });
    }

    return variations;
  }

  /**
   * Crosshatch pattern - perpendicular geometric overlay
   * Creates visual depth and complexity
   * @private
   */
  #getCrosshatchPattern(pathId, fromPos, toPos, progress) {
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const length = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    const hatches = [];
    const hatchCount = 5 + (pathId % 3);
    const spacing = 1.0 / (hatchCount + 1);

    for (let i = 1; i <= hatchCount; i++) {
      const position = spacing * i;
      const phase = (progress * 2 + i * 0.3) % 1;
      const intensity = Math.sin(phase * Math.PI) * 0.2;

      hatches.push({
        position,
        angle: angle + Math.PI / 2 + Math.sin(progress * Math.PI + i) * 0.3,
        length: length * 0.15,
        thickness: 0.3,
        intensity,
        offset: Math.cos(progress * Math.PI * 2 + i * 0.5) * 2
      });
    }

    return hatches;
  }

  /**
   * Flowing pattern - animated geometric shapes along path
   * Suggests energy flow and movement
   * @private
   */
  #getFlowingPattern(pathId, fromPos, toPos, progress, totalPaths) {
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const length = Math.hypot(dx, dy);

    const flowPoints = [];
    const pointCount = 6;
    const speed = 1.5 + (pathId % 3) * 0.3;

    for (let i = 0; i < pointCount; i++) {
      const basePosition = (i / pointCount + progress * speed) % 1;
      const wobble = Math.sin(basePosition * Math.PI * 4) * 0.1;
      const scale = Math.sin(basePosition * Math.PI) * 0.5 + 0.5;

      flowPoints.push({
        position: basePosition,
        wobble,
        scale,
        rotation: progress * 360 * 2 + i * 60,
        intensity: scale * 0.6,
        shape: ['diamond', 'triangle', 'hexagon'][i % 3]
      });
    }

    return flowPoints;
  }

  /**
   * Calculate node decoration complexity based on activation order
   * Central nodes get more complexity
   */
  getNodeComplexity(nodeId) {
    // Tifereth (center) = most complex
    // Kether (top) = very complex
    // Malkuth (bottom) = very complex
    // Others = moderate
    
    const complexityMap = {
      1: 0.9,  // Kether - highest
      2: 0.7,  // Chokmah
      3: 0.7,  // Binah
      4: 0.6,  // Chesed
      5: 0.6,  // Gevurah
      6: 1.0,  // Tifereth - center, highest
      7: 0.6,  // Netzach
      8: 0.6,  // Hod
      9: 0.8,  // Yesoid
      10: 0.85 // Malkuth - foundation, very complex
    };

    return complexityMap[nodeId] || 0.5;
  }

  /**
   * Generate harmonic color shifts based on Fibonacci sequence
   * Creates visual coherence through mathematical relationship
   */
  getHarmonicColorShift(nodeId, progress, baseColor) {
    const fibIndex = nodeId % 5;
    const shift = (progress + fibIndex * 0.144) % 1; // 144° is Fibonacci angle
    
    return {
      hueRotation: shift * 60, // Rotate through hue
      saturation: 0.7 + Math.sin(shift * Math.PI * 2) * 0.3,
      brightness: 0.8 + Math.cos(shift * Math.PI * 2) * 0.2,
      shimmer: Math.sin(progress * Math.PI * 3 + nodeId) * 0.3
    };
  }

  /**
   * Calculate intersection points for advanced harmonic patterns
   * Useful for creating cross-hatching and resonance points
   */
  getIntersectionPoints(sephirothPositions, pathConnections) {
    const intersections = [];
    
    // Find actual path crossings and near-misses
    for (let i = 0; i < pathConnections.length; i++) {
      for (let j = i + 1; j < pathConnections.length; j++) {
        const path1 = pathConnections[i];
        const path2 = pathConnections[j];
        
        const pos1Start = sephirothPositions[path1.start];
        const pos1End = sephirothPositions[path1.end];
        const pos2Start = sephirothPositions[path2.start];
        const pos2End = sephirothPositions[path2.end];

        // Calculate intersection point (or closest point)
        const intersection = this.#getLineIntersection(
          pos1Start, pos1End,
          pos2Start, pos2End
        );

        if (intersection) {
          intersections.push({
            point: intersection,
            paths: [i, j],
            strength: 0.5 // Harmonic resonance strength
          });
        }
      }
    }

    return intersections;
  }

  /**
   * Calculate line intersection point
   * @private
   */
  #getLineIntersection(p1, p2, p3, p4) {
    const x1 = p1.x, y1 = p1.y;
    const x2 = p2.x, y2 = p2.y;
    const x3 = p3.x, y3 = p3.y;
    const x4 = p4.x, y4 = p4.y;

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(denom) < 0.001) return null;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    
    // Only return if intersection is within both line segments
    if (t >= 0 && t <= 1) {
      return {
        x: x1 + t * (x2 - x1),
        y: y1 + t * (y2 - y1)
      };
    }

    return null;
  }
}