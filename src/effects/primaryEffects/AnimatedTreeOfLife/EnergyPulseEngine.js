/**
 * Energy Pulse Engine
 * 
 * Generates multiple types of energy pulses:
 * 1. Wave Pulses: Energy waves flowing along paths (Hermetic order)
 * 2. Breathing Pulses: Rhythmic expansion/contraction on all nodes
 * 3. Spiral Vortex: Rotating energy patterns around nodes
 * 4. Multi-layer Pulses: Multiple simultaneous pulse systems with different speeds
 * 5. Aura Waves: Expanding concentric circles from central nodes
 * 6. Path Tracers: Energy particles flowing along the 22 sacred paths
 * 7. Harmonic Resonance: Nodes vibrating at different frequencies
 */

export class EnergyPulseEngine {
  constructor(config = {}) {
    this.config = config;
  }

  /**
   * Calculate wave pulse traveling along a path
   * @returns {Object} {intensity, position} - Position is 0-1 along path, intensity is glow strength
   */
  getWavePulse(progress, pathOrder, totalPaths) {
    // Wave travels along paths in order (1-22) following Hermetic sequence
    const waveSpeed = this.config.pulseWaveSpeed || 2.0;
    const waveTravelTime = (progress * waveSpeed) % 1.0;
    
    // Calculate which path the wave is currently on
    const pathPosition = (waveTravelTime * totalPaths) % totalPaths;
    const currentPath = Math.floor(pathPosition);
    const pathProgress = pathPosition - currentPath;
    
    // Only emit wave for nearby paths
    const pathDistance = Math.abs(pathOrder - currentPath - 1);
    const waveWidth = 3; // Paths the wave affects
    
    if (pathDistance < waveWidth) {
      const intensity = Math.exp(-Math.pow(pathDistance, 2) / 2) * 
                       Math.sin(pathProgress * Math.PI);
      return { intensity: Math.max(0, intensity), position: pathProgress };
    }
    
    return { intensity: 0, position: 0 };
  }

  /**
   * Calculate breathing/pulsing glow on a node
   * Creates organic expansion/contraction effect
   */
  getBreathingPulse(progress, nodeId) {
    const breathSpeed = this.config.pulseBreathSpeed || 1.5;
    const breathIntensity = this.config.pulseBreathIntensity || 0.4;
    
    // Multiple breath cycles with phase offsets per node
    const nodePhase = (nodeId * 0.1) % (Math.PI * 2);
    const breathCycle = Math.sin(progress * breathSpeed * Math.PI * 2 + nodePhase);
    
    // Map to 0.8-1.2 scale
    const scale = 1.0 + (breathCycle * breathIntensity);
    const glowPulse = Math.abs(breathCycle) * 0.5;
    
    return { scale, glowPulse };
  }

  /**
   * Calculate spiral vortex pattern around a node
   * Creates rotating energy pattern
   */
  getSpiralVortex(progress, nodeX, nodeY, nodeId) {
    const spiralSpeed = this.config.pulseSpiralSpeed || 3.0;
    const spiralRadius = this.config.pulseSpiralRadius || 50;
    
    // Rotation angle changes with time
    const angle = (progress * spiralSpeed * Math.PI * 2) + (nodeId * 0.5);
    
    // Generate points around spiral
    const spiralPoints = [];
    for (let i = 0; i < 12; i++) {
      const t = (i / 12) + progress * spiralSpeed;
      const currentAngle = angle + (t * Math.PI * 4); // Multiple rotations
      const radius = spiralRadius * (0.3 + t * 0.7); // Expanding spiral
      
      spiralPoints.push({
        x: nodeX + Math.cos(currentAngle) * radius,
        y: nodeY + Math.sin(currentAngle) * radius,
        intensity: Math.max(0, Math.sin(t * Math.PI) * 0.8)
      });
    }
    
    return spiralPoints;
  }

  /**
   * Multi-layer pulse system with different speeds
   * Creates complex interference patterns
   */
  getMultiLayerPulse(progress, nodeId, totalNodes) {
    const layers = [];
    
    // Layer 1: Fast pulse (3x speed)
    const fast = Math.sin(progress * 6.0 * Math.PI + nodeId * 0.3) * 0.3;
    layers.push({
      name: 'fast',
      intensity: Math.max(0, fast),
      frequency: 6.0,
      phase: nodeId * 0.3
    });
    
    // Layer 2: Medium pulse (2x speed)
    const medium = Math.sin(progress * 4.0 * Math.PI + nodeId * 0.4) * 0.4;
    layers.push({
      name: 'medium',
      intensity: Math.max(0, medium),
      frequency: 4.0,
      phase: nodeId * 0.4
    });
    
    // Layer 3: Slow pulse (1x speed)
    const slow = Math.sin(progress * 2.0 * Math.PI + nodeId * 0.5) * 0.3;
    layers.push({
      name: 'slow',
      intensity: Math.max(0, slow),
      frequency: 2.0,
      phase: nodeId * 0.5
    });
    
    // Combined effect with harmonic interaction
    const combined = (fast + medium + slow) / 3.0;
    
    return { layers, combined: Math.max(0, combined) };
  }

  /**
   * Aura waves: Expanding concentric circles from central nodes
   * Emanates from Tifereth (central sun)
   */
  getAuraWave(progress, nodeDistance) {
    const auraSpeed = this.config.pulseAuraSpeed || 2.5;
    const auraWidth = this.config.pulseAuraWidth || 0.15;
    
    // Wave position expands outward
    const wavePos = (progress * auraSpeed) % 2.0;
    
    // Distance from center (normalized)
    const normalizedDist = nodeDistance / 1.0; // Max distance ~1.0
    
    // Wave front
    const waveFront = Math.abs(wavePos - normalizedDist);
    const intensity = Math.max(0, 1.0 - (waveFront / auraWidth)) * 0.6;
    
    return { intensity, wavePos };
  }

  /**
   * Path tracers: Glowing particles flowing along paths
   * Creates impression of energy moving through sacred geometry
   */
  getPathTracer(progress, pathIndex, totalPaths) {
    const tracerSpeed = this.config.pulseTracerSpeed || 3.0;
    const tracerCount = this.config.pulseTracerCount || 5;
    
    const tracers = [];
    
    for (let i = 0; i < tracerCount; i++) {
      const offset = i / tracerCount;
      const positionOnPath = (progress * tracerSpeed + offset) % 1.0;
      
      // Tracer brightness varies
      const brightness = Math.sin((progress * 4.0 + i * 0.5) * Math.PI) * 0.5 + 0.5;
      
      tracers.push({
        position: positionOnPath,
        brightness,
        particleId: i
      });
    }
    
    return tracers;
  }

  /**
   * Harmonic Resonance: Nodes vibrating at different frequencies
   * Each Sephiroth vibrates at its own harmonic frequency
   */
  getHarmonicResonance(progress, nodeId, totalNodes) {
    // Fundamental frequencies mapped to Sephiroth (1-10)
    // Using harmonic series: 1x, 2x, 3x, etc.
    const fundamentalFreq = (nodeId % 10) + 1;
    const frequency = fundamentalFreq * 1.5; // 1.5 Hz base
    
    // Vibration in x and y at different phases
    const vibrationX = Math.sin(progress * frequency * Math.PI * 2) * 3;
    const vibrationY = Math.cos(progress * frequency * Math.PI * 2 + (nodeId * 0.5)) * 3;
    
    // Amplitude modulation (builds and fades)
    const amplitude = Math.sin(progress * Math.PI) * 0.6 + 0.2;
    
    return {
      offsetX: vibrationX * amplitude,
      offsetY: vibrationY * amplitude,
      frequency,
      amplitude
    };
  }

  /**
   * Combined energy pulse system for a node
   * Merges all pulse types with proper weighting
   */
  getCombinedNodePulse(progress, nodeId, nodeX, nodeY, nodeDistance, totalNodes, phaseWeight) {
    const breathing = this.getBreathingPulse(progress, nodeId);
    const multiLayer = this.getMultiLayerPulse(progress, nodeId, totalNodes);
    const aura = this.getAuraWave(progress, nodeDistance);
    const harmonic = this.getHarmonicResonance(progress, nodeId, totalNodes);
    
    // Weight contributions based on animation phase
    const weights = {
      breathing: phaseWeight.breathing || 0.3,
      multiLayer: phaseWeight.multiLayer || 0.3,
      aura: phaseWeight.aura || 0.2,
      harmonic: phaseWeight.harmonic || 0.2
    };
    
    // Combined scale and glow
    const scale = 1.0 +
      (breathing.scale - 1.0) * weights.breathing +
      (multiLayer.combined * 0.3) * weights.multiLayer +
      (aura.intensity * 0.2) * weights.aura;
    
    const glow = breathing.glowPulse * weights.breathing +
      multiLayer.combined * weights.multiLayer +
      aura.intensity * weights.aura;
    
    return {
      scale,
      glow,
      offsetX: harmonic.offsetX,
      offsetY: harmonic.offsetY,
      breathing,
      multiLayer,
      aura,
      harmonic
    };
  }

  /**
   * Get phase-appropriate pulse weights
   * Different phases emphasize different pulse types
   */
  getPhaseWeights(phase) {
    const weights = {
      awakening: {
        breathing: 0.5,
        multiLayer: 0.2,
        aura: 0.2,
        harmonic: 0.1
      },
      ascension: {
        breathing: 0.3,
        multiLayer: 0.4,
        aura: 0.2,
        harmonic: 0.1
      },
      radiance: {
        breathing: 0.2,
        multiLayer: 0.3,
        aura: 0.4,
        harmonic: 0.1
      },
      descent: {
        breathing: 0.4,
        multiLayer: 0.2,
        aura: 0.2,
        harmonic: 0.2
      }
    };
    
    return weights[phase] || weights.awakening;
  }
}