/**
 * Chakra Mandala Effect
 * 
 * Animates the 7-chakra energy system through mystical phases:
 * - Individual chakra glows and mandala rings
 * - Energy flow between chakra nodes
 * - Frequency-based visualizations
 * 
 * Includes:
 * - 7 chakra nodes positioned vertically (energy axis)
 * - Mandala ring resonances around each chakra
 * - Smooth phase transitions
 * - Hardware-accelerated rendering via Canvas2dFactory
 */

import { Settings } from 'my-nft-gen/src/core/Settings.js';
import { Canvas2dFactory } from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import { PhaseAnimatedPolygonEffect } from '../../base/PhaseAnimatedPolygonEffect.js';
import { ChakraMandalaConfig } from './ChakraMandalaConfig.js';
import { VerticalSineWaveEngine } from './VerticalSineWaveEngine.js';
import {
  CHAKRA_POSITIONS,
  CHAKRA_CONNECTIONS,
  MANDALA_RING_RADII,
} from './ChakraGeometry.js';

export class ChakraMandalaEffect extends PhaseAnimatedPolygonEffect {
  static _name_ = 'chakra-mandala';
  static _displayName_ = 'Chakra Mandala';
  static _description_ = 'Animates the 7-chakra system with kundalini rising, mandala rings, and energy flow';
  static _version_ = '1.0.0';
  static _author_ = 'Operator';
  static _tags_ = ['effect', 'primary', 'chakra', 'mandala', 'kundalini', 'energy', 'mystical'];

  constructor({
    name = ChakraMandalaEffect._name_,
    requiresLayer = true,
    config = new ChakraMandalaConfig({}),
    additionalEffects = [],
    ignoreAdditionalEffects = false,
    settings = new Settings({}),
    frameNumber = 0,
    totalFrames = 1,
  } = {}) {
    // Ensure config is a ChakraMandalaConfig instance
    // If a plain object is passed (e.g., from presets), wrap it in ChakraMandalaConfig
    if (!(config instanceof ChakraMandalaConfig)) {
      config = new ChakraMandalaConfig(config);
    }
    
    super({
      name,
      requiresLayer,
      config,
      additionalEffects,
      ignoreAdditionalEffects,
      settings,
      frameNumber,
      totalFrames,
    });
  }

  /**
   * Get node positions for chakra geometry
   * Implements required abstract method from PhaseAnimatedPolygonEffect
   * @protected
   * @returns {Array} Array of chakra position objects
   */
  getNodePositions() {
    return Object.values(CHAKRA_POSITIONS);
  }

  /**
   * Get path connections for chakra energy flow
   * Implements required abstract method from PhaseAnimatedPolygonEffect
   * @protected
   * @returns {Array} Array of connection objects
   */
  getPathConnections() {
    return CHAKRA_CONNECTIONS;
  }

  /**
   * Pre-generate hook: randomly select blend mode and chakra focus for each phase
   * All randomization happens here ONCE - guarantees smooth animation across all frames
   * @protected
   */
  generate() {
    // Randomly select blend mode if array provided
    this.config.layerBlendMode = ChakraMandalaConfig.pickRandom(this.config.layerBlendMode);
    
    // Randomly select explosion color scheme once for entire animation cycle
    this.config.explosionColorScheme = ChakraMandalaConfig.pickRandom(this.config.explosionColorScheme);
    
    // Randomly select chakra focus for each phase if array provided
    this.config.awakeningChakraFocus = ChakraMandalaConfig.pickRandom(this.config.awakeningChakraFocus);
    this.config.ascentionChakraFocus = ChakraMandalaConfig.pickRandom(this.config.ascentionChakraFocus);
    this.config.radianceChakraFocus = ChakraMandalaConfig.pickRandom(this.config.radianceChakraFocus);
    this.config.descentChakraFocus = ChakraMandalaConfig.pickRandom(this.config.descentChakraFocus);
    
    // Extract all ColorPicker objects to plain strings for serialization survival
    // These must be stored as pure data because ColorPicker objects with methods
    // cannot survive the multiple serialization/deserialization cycles in the pipeline
    this.config.sineWaveColor = this._extractColor(this.config.sineWaveColor, '#9b59b6');
    this.config.sineWaveFuzzColor = this._extractColor(this.config.sineWaveFuzzColor, '#c8a2e0');
    this.config.explosionFuzzColor = this._extractColor(this.config.explosionFuzzColor, '#ffffff');
    this.config.energyBeadColor = this._extractColor(this.config.energyBeadColor, '#ffff00');
    this.config.chakraColorOverride = this._extractColor(this.config.chakraColorOverride, '#ffffff');
    this.config.chakraGlowColorOverride = this._extractColor(this.config.chakraGlowColorOverride, '#ffffff');
    
    // === CRITICAL: Pre-compute all scaled values for serialization survival ===
    // Getters/setters are lost after JSON serialization, so compute once here
    // Store as plain data properties that survive deserialization
    // IMPORTANT: Use Object.defineProperty to bypass getter/setter interception
    // Use renderingScaleValue (which survives JSON) or fall back to 1.0
    const scale = this.config.renderingScaleValue || this.config.renderingScale || 1.0;
    
    // Bypass getters/setters by using Object.defineProperty
    // These become plain properties that serialize correctly
    Object.defineProperty(this.config, 'nodeSizeComputed', {
      value: Math.round((this.config.nodeSizeRaw || 8) * scale),
      writable: true, enumerable: true, configurable: true
    });
    Object.defineProperty(this.config, 'pathThicknessComputed', {
      value: (this.config.pathThicknessRaw || 2) * scale,
      writable: true, enumerable: true, configurable: true
    });
    Object.defineProperty(this.config, 'chakraGlowSizeComputed', {
      value: (this.config.chakraGlowSizeRaw || 35) * scale,
      writable: true, enumerable: true, configurable: true
    });
    Object.defineProperty(this.config, 'explosionRayLengthComputed', {
      value: (this.config.explosionRayLengthRaw || 50) * scale,
      writable: true, enumerable: true, configurable: true
    });
    Object.defineProperty(this.config, 'sineWaveThicknessComputed', {
      value: (this.config.sineWaveThicknessRaw || 2.5) * scale,
      writable: true, enumerable: true, configurable: true
    });
    Object.defineProperty(this.config, 'sineWaveAmplitudeComputed', {
      value: (this.config.sineWaveAmplitudeRaw || 15) * scale,
      writable: true, enumerable: true, configurable: true
    });
    Object.defineProperty(this.config, 'energyBeadRadiusComputed', {
      value: (this.config.energyBeadRadiusRaw || 6) * scale,
      writable: true, enumerable: true, configurable: true
    });
    Object.defineProperty(this.config, 'mandalaRingThicknessComputed', {
      value: (this.config.mandalaRingThicknessRaw || 2) * scale,
      writable: true, enumerable: true, configurable: true
    });
    
    // === CRITICAL: Pre-select all sine wave algorithm variants to lock in animation ===
    // Stored on effect instance (not config) so they don't need to survive JSON serialization
    // They're computed once in generate() and used throughout frame rendering
    this.sineWaveAmplitudeAlgorithm = ChakraMandalaConfig.pickRandom(this.config.sineWaveAmplitudeOscillationAlgorithm);
    this.sineWaveOpacityAlgorithm = ChakraMandalaConfig.pickRandom(this.config.sineWaveOpacityFindValueAlgorithm);
    this.sineWaveBlurAlgorithm = ChakraMandalaConfig.pickRandom(this.config.sineWaveBlurFindValueAlgorithm);
    this.sineWaveAccentAlgorithm = ChakraMandalaConfig.pickRandom(this.config.sineWaveAccentFindValueAlgorithm);
    
    // === CRITICAL: Pre-compute explosion particle positions to lock in animation ===
    // Stored on effect instance (not config) for same reason as algorithms above
    this._precomputeExplosionParticles();
  }

  /**
   * Pre-compute explosion particles once during generation
   * Ensures consistent particle positions across all frames (smooth animation)
   * Stored on effect instance, computed in generate() and used during renderEffect()
   * @private
   */
  _precomputeExplosionParticles() {
    const chakras = Object.values(CHAKRA_POSITIONS);
    this.precomputedExplosionParticles = [];
    
    for (const chakraIdx in chakras) {
      const particleSet = [];
      for (let particleIdx = 0; particleIdx < this.config.explosionParticleCount; particleIdx++) {
        // Pre-compute random values ONCE
        particleSet.push({
          randomDistance: Math.random(),
          randomRadius: Math.random()
        });
      }
      this.precomputedExplosionParticles.push(particleSet);
    }
  }

  /**
   * Apply smooth phase transitions with interpolation
   * @private
   * @returns {Object} Interpolated parameters with smooth transition blending
   */
  #getPhaseWithSmoothTransition(progress, baseConfig) {
    const transWidth = this.config.transitionZoneWidth || 0.05;
    
    // Get base phase boundaries
    const phases = [
      { name: 'awakening', start: 0 },
      { name: 'ascension', start: baseConfig.phaseAscension_start || 0.2 },
      { name: 'radiance', start: baseConfig.phaseRadiance_start || 0.6 },
      { name: 'descent', start: baseConfig.phaseDescentstart || 0.85 }
    ];
    
    // Find current phase and transition zone
    let currentPhase = phases[0];
    let nextPhase = phases[1];
    let transitionProgress = 0;
    let inTransition = false;

    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      const nextIdx = (i + 1) % phases.length;
      const nextPhaseStart = nextIdx === 0 ? 1.0 : phases[nextIdx].start;
      const phaseEnd = nextPhaseStart;
      const transitionStart = phaseEnd - transWidth;

      if (progress >= phase.start && progress < transitionStart) {
        currentPhase = phase;
        inTransition = false;
        break;
      } else if (progress >= transitionStart && progress < phaseEnd) {
        currentPhase = phase;
        nextPhase = phases[nextIdx];
        transitionProgress = (progress - transitionStart) / transWidth;
        inTransition = true;
        break;
      }
    }

    return { currentPhase, nextPhase, transitionProgress, inTransition };
  }

  /**
   * Interpolate alpha values smoothly during transitions
   * @private
   */
  #interpolateAlpha(baseAlpha, transitionInfo) {
    if (!transitionInfo.inTransition) {
      return baseAlpha;
    }
    // Linear easing for smooth crossfade
    return baseAlpha; // Alpha stays constant; other parameters interpolate
  }

  /**
   * Extract color from either a ColorPicker object or a string
   * Safely handles both cases without throwing errors
   * @protected
   * @param {ColorPicker|string} colorValue - Color value (string or ColorPicker)
   * @param {string} fallback - Fallback color if extraction fails
   * @returns {string} Hex color string
   */
  _extractColor(colorValue, fallback = '#000000') {
    if (!colorValue) return fallback;
    
    // If it's a string, return it directly
    if (typeof colorValue === 'string') {
      return colorValue;
    }
    
    // If it has a getColor method, call it
    if (typeof colorValue.getColor === 'function') {
      try {
        return colorValue.getColor(this.settings) || fallback;
      } catch (e) {
        return fallback;
      }
    }
    
    // Otherwise return fallback
    return fallback;
  }

  /**
   * Override rendering to inject chakra-specific visualizations
   * @protected
   * @param {Canvas2d} canvas - Render canvas (Canvas2d vector drawing)
   * @param {number} width - Canvas width
   * @param {number} height - Canvas height
   * @param {Object} frameConfig - Frame-specific configuration
   * @param {number} progress - Overall animation progress (0-1)
   */
  async renderEffect(canvas, width, height, frameConfig, progress) {
    const centerX = width * this.config.centerX;
    const centerY = height * this.config.centerY;
    const scale = Math.min(width, height) * this.config.scale * 0.35; // Chakra system scale

    // Get smooth transition information
    const transitionInfo = this.#getPhaseWithSmoothTransition(progress, frameConfig);

    // Draw components in order (back to front for proper layering)
    // Deepest/background layers first
    await this.#renderChakraExplosions(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
    await this.#renderCentralChannel(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
    await this.#renderCentralChannelAuras(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
    await this.#renderMandalaRings(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
    await this.#renderMandalaResonancePatterns(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
    await this.#renderEnergyFlowSpirals(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
    await this.#renderEnergyFlow(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
    await this.#renderChakras(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
    await this.#renderChakraBreathing(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
    await this.#renderFrequencyVisualization(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
    await this.#renderVerticalSineWaves(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
    await this.#renderEnergyBeads(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo);
  }

  /**
   * Render the central channel (Sushumna Nadi) - vertical line through chakra centers
   * @private
   */
  async #renderCentralChannel(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    if (!this.config.enableCentralChannel) return;

    const chakras = Object.values(CHAKRA_POSITIONS);
    const startChakra = chakras[0];
    const endChakra = chakras[chakras.length - 1];

    const startY = centerY + (startChakra.y - 0.5) * scale * 2;
    const endY = centerY + (endChakra.y - 0.5) * scale * 2;

    const alpha = 0.3 * frameConfig.nodeAlpha * this.config.centralChannelGlow;
    
    await canvas.drawLine2d(
      { x: centerX, y: startY },
      { x: centerX, y: endY },
      3,  // innerStroke
      '#FFFFFF',  // innerColor
      0,  // outerStroke
      null,  // outerColor
      alpha
    );
  }

  /**
   * Render multi-layer auras around the central channel
   * @private
   */
  async #renderCentralChannelAuras(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    if (!this.config.enableCentralChannel || !this.config.centralChannelAuras) return;

    const chakras = Object.values(CHAKRA_POSITIONS);
    const startChakra = chakras[0];
    const endChakra = chakras[chakras.length - 1];

    const startY = centerY + (startChakra.y - 0.5) * scale * 2;
    const endY = centerY + (endChakra.y - 0.5) * scale * 2;

    // Draw expanding aura layers around central channel
    for (let layer = 1; layer <= 3; layer++) {
      const auraWidth = 8 * layer;
      const opacity = frameConfig.nodeAlpha * (0.2 / layer) * this.config.centralChannelGlow;
      const breathing = Math.sin(progress * 2 * Math.PI) * 0.3 + 0.7;
      
      await canvas.drawLine2d(
        { x: centerX - auraWidth * breathing, y: startY },
        { x: centerX - auraWidth * breathing, y: endY },
        1,
        '#64C8FF',
        0,
        null,
        opacity
      );

      await canvas.drawLine2d(
        { x: centerX + auraWidth * breathing, y: startY },
        { x: centerX + auraWidth * breathing, y: endY },
        1,
        '#64C8FF',
        0,
        null,
        opacity
      );
    }
  }

  /**
   * Render mandala rings around each chakra with radial segments
   * @private
   */
  async #renderMandalaRings(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    if (!this.config.enableMandalaRings) return;

    const chakras = Object.values(CHAKRA_POSITIONS);
    const rotation = (progress * this.config.mandalaRingSpeed * Math.PI * 2) % (Math.PI * 2);

    // Calculate ring radii between inner and outer bounds, scaled by mandala radius multiplier
    const innerRadius = scale * this.config.mandalaInnerRadius * this.config.mandalaRadiusMultiplier;
    const outerRadius = scale * this.config.mandalaOuterRadius * this.config.mandalaRadiusMultiplier;
    const ringCount = 3 + this.config.mandalaRingLayers;
    const ringRadii = [];
    for (let i = 0; i < ringCount; i++) {
      const t = i / (ringCount - 1);
      ringRadii.push(innerRadius + (outerRadius - innerRadius) * t);
    }

    // Draw rings around each chakra
    for (const chakra of chakras) {
      const x = centerX + (chakra.x - 0.5) * scale * 2;
      const y = centerY + (chakra.y - 0.5) * scale * 2;

      for (let ringIdx = 0; ringIdx < ringRadii.length; ringIdx++) {
        const ringRadius = ringRadii[ringIdx];
        const opacity = this.config.mandalaRingOpacity * (1 - ringIdx * 0.2) * frameConfig.nodeAlpha;

        // Draw the ring
        await canvas.drawRing2d(
          { x, y },
          ringRadius,
          this.config.mandalaRingThicknessComputed,  // innerStroke
          '#C8C8FF',  // innerColor (200, 200, 255)
          0,  // outerStroke
          null,  // outerColor
          opacity
        );

        // Draw radial segments as rays from ring
        const segments = this.config.mandalaSymmetry || 6;
        for (let i = 0; i < segments; i++) {
          const angle = (i / segments) * Math.PI * 2 + rotation;
          const x1 = x + Math.cos(angle) * ringRadius;
          const y1 = y + Math.sin(angle) * ringRadius;
          const x2 = x + Math.cos(angle) * (ringRadius * 0.3);
          const y2 = y + Math.sin(angle) * (ringRadius * 0.3);

          await canvas.drawLine2d(
            { x: x1, y: y1 },
            { x: x2, y: y2 },
            1,  // innerStroke
            '#C8C8FF',  // innerColor
            0,  // outerStroke
            null,  // outerColor
            opacity
          );
        }
      }
    }
  }

  /**
   * Render harmonic resonance patterns between chakras
   * @private
   */
  async #renderMandalaResonancePatterns(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    if (!this.config.enableMandalaRings || !this.config.mandalaResonancePatterns) return;

    const chakras = Object.values(CHAKRA_POSITIONS);
    
    // Create resonance between each pair of chakras
    for (let i = 0; i < chakras.length; i++) {
      for (let j = i + 1; j < chakras.length; j++) {
        const chakra1 = chakras[i];
        const chakra2 = chakras[j];
        
        const x1 = centerX + (chakra1.x - 0.5) * scale * 2;
        const y1 = centerY + (chakra1.y - 0.5) * scale * 2;
        const x2 = centerX + (chakra2.x - 0.5) * scale * 2;
        const y2 = centerY + (chakra2.y - 0.5) * scale * 2;

        // Calculate resonance intensity based on distance
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const resonanceIntensity = Math.exp(-distance / (scale * 0.5)); // Closer = stronger
        
        // Pulsing resonance line
        const pulse = Math.sin(progress * 3 * Math.PI + i * j) * 0.5 + 0.5;
        const opacity = resonanceIntensity * pulse * 0.3 * frameConfig.nodeAlpha;

        await canvas.drawLine2d(
          { x: x1, y: y1 },
          { x: x2, y: y2 },
          1,
          '#96C8FF',
          0,
          null,
          opacity
        );
      }
    }
  }

  /**
   * Render energy flow spirals around connections
   * @private
   */
  async #renderEnergyFlowSpirals(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    if (!this.config.enableEnergyFlow || !this.config.energyFlowSpirals) return;

    for (const connection of CHAKRA_CONNECTIONS) {
      const startChakra = CHAKRA_POSITIONS[connection.start];
      const endChakra = CHAKRA_POSITIONS[connection.end];

      const x1 = centerX + (startChakra.x - 0.5) * scale * 2;
      const y1 = centerY + (startChakra.y - 0.5) * scale * 2;
      const x2 = centerX + (endChakra.x - 0.5) * scale * 2;
      const y2 = centerY + (endChakra.y - 0.5) * scale * 2;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx * dx + dy * dy);

      // Draw spiral patterns around energy connection
      for (let spiral = 0; spiral < this.config.energyFlowSpiralDensity; spiral++) {
        const spiralPhase = (progress * 2 + spiral / this.config.energyFlowSpiralDensity) * Math.PI * 2;
        const spiralSegments = 12;
        const spiralRadius = 6;

        for (let seg = 0; seg < spiralSegments; seg++) {
          const t1 = seg / spiralSegments;
          const t2 = (seg + 1) / spiralSegments;
          
          const px1 = x1 + dx * t1 + Math.cos(spiralPhase + t1 * 4 * Math.PI) * spiralRadius;
          const py1 = y1 + dy * t1 + Math.sin(spiralPhase + t1 * 4 * Math.PI) * spiralRadius;
          const px2 = x1 + dx * t2 + Math.cos(spiralPhase + t2 * 4 * Math.PI) * spiralRadius;
          const py2 = y1 + dy * t2 + Math.sin(spiralPhase + t2 * 4 * Math.PI) * spiralRadius;

          const opacity = frameConfig.pathIntensity * 0.3 * (1 - Math.abs(t1 - 0.5) * 2);
          
          await canvas.drawLine2d(
            { x: px1, y: py1 },
            { x: px2, y: py2 },
            1,
            '#A0E0FF',
            0,
            null,
            opacity
          );
        }
      }
    }
  }

  /**
   * Render energy flow between chakras - particle trail effect
   * @private
   */
  async #renderEnergyFlow(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    if (!this.config.enableEnergyFlow) return;

    for (const connection of CHAKRA_CONNECTIONS) {
      const startChakra = CHAKRA_POSITIONS[connection.start];
      const endChakra = CHAKRA_POSITIONS[connection.end];

      const x1 = centerX + (startChakra.x - 0.5) * scale * 2;
      const y1 = centerY + (startChakra.y - 0.5) * scale * 2;
      const x2 = centerX + (endChakra.x - 0.5) * scale * 2;
      const y2 = centerY + (endChakra.y - 0.5) * scale * 2;

      // Draw energy particles along connection with trail effect
      for (let i = 0; i < this.config.energyFlowDensity; i++) {
        const particleProgress = (progress * this.config.energyFlowSpeed + i / this.config.energyFlowDensity) % 1.0;
        const px = x1 + (x2 - x1) * particleProgress;
        const py = y1 + (y2 - y1) * particleProgress;

        const glow = Math.sin(particleProgress * Math.PI) * frameConfig.pathIntensity;
        const particleAlpha = glow * 0.8;
        const particleRadius = 4;

        // Main particle
        await canvas.drawRing2d(
          { x: px, y: py },
          particleRadius,
          particleRadius,  // innerStroke
          '#64C8FF',  // innerColor (100, 200, 255)
          0,  // outerStroke
          null,  // outerColor
          particleAlpha
        );

        // Trail particles for more complexity
        if (this.config.energyFlowTrailLength > 0) {
          for (let trail = 1; trail <= Math.min(3, this.config.energyFlowTrailLength / 3); trail++) {
            const trailProgress = (particleProgress - trail * 0.1) % 1.0;
            if (trailProgress < 0) continue;
            
            const trailX = x1 + (x2 - x1) * trailProgress;
            const trailY = y1 + (y2 - y1) * trailProgress;
            const trailAlpha = particleAlpha * (1 - trail / 3) * 0.6;

            await canvas.drawRing2d(
              { x: trailX, y: trailY },
              particleRadius * 0.6,
              particleRadius * 0.6,
              '#4096FF',
              0,
              null,
              trailAlpha
            );
          }
        }
      }
    }
  }

  /**
   * Render individual chakra nodes with optional glows and focus highlighting
   * @private
   */
  async #renderChakras(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    // Get focused chakra for current phase (with fallback for different config types)
    const phase = frameConfig.phase || 'awakening';
    const focusedChakraName = typeof this.config.getChakraFocusForPhase === 'function'
      ? this.config.getChakraFocusForPhase(phase)
      : null;

    for (const chakra of Object.values(CHAKRA_POSITIONS)) {
      const x = centerX + (chakra.x - 0.5) * scale * 2;
      const y = centerY + (chakra.y - 0.5) * scale * 2;
      
      // Apply frequency-based size modulation if enabled
      let radiusMultiplier = 1.0;
      if (this.config.enableFrequencyVisualization) {
        const freq = chakra.frequency || 0;
        const oscillation = Math.sin(progress * this.config.frequencyOscillationSpeed * freq * Math.PI * 2) * 0.2 + 0.9;
        radiusMultiplier = oscillation;
      }
      
      const radius = chakra.radius * this.config.scale * 0.5 * radiusMultiplier;

      // Determine chakra color (custom or authentic)
      let chakraColor = chakra.color;
      let glowColor = chakra.glowColor;
      
      if (this.config.useCustomChakraColors) {
        chakraColor = this.config.chakraColorOverride.getColor(this.settings) || chakra.color;
        glowColor = this.config.chakraGlowColorOverride.getColor(this.settings) || chakra.glowColor;
      }

      // Highlight focused chakra with extra glow
      let extraGlowSize = 0;
      if (chakra.name === focusedChakraName) {
        extraGlowSize = this.config.chakraGlowSizeComputed * this.config.scale * 0.8;
      }

      // Multi-layer glow effect
      if (this.config.enableChakraGlows) {
        for (let glowLayer = 0; glowLayer < this.config.chakraAuraLayers; glowLayer++) {
          const glowSize = this.config.chakraGlowSizeComputed * this.config.scale * 0.5 + extraGlowSize * (1 - glowLayer / this.config.chakraAuraLayers);
          const glowOpacity = this.config.chakraGlowIntensity * frameConfig.nodeAlpha * (0.4 / (glowLayer + 1));

          await canvas.drawRing2d(
            { x, y },
            glowSize,
            glowSize * 0.2,
            '#FFFFFF',
            0,
            null,
            glowOpacity
          );
        }
      }

      // Main chakra node
      const alpha = frameConfig.nodeAlpha;
      await canvas.drawRing2d(
        { x, y },
        radius,
        Math.max(1, radius * 0.15),  // innerStroke for outline
        chakraColor,  // fill color
        2,  // outerStroke for outline
        glowColor,  // outline color
        alpha
      );
    }
  }

  /**
   * Render chakra breathing/pulsing auras
   * @private
   */
  async #renderChakraBreathing(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    if (!this.config.enableChakraGlows || this.config.chakraBreatheIntensity === 0) return;

    for (const chakra of Object.values(CHAKRA_POSITIONS)) {
      const x = centerX + (chakra.x - 0.5) * scale * 2;
      const y = centerY + (chakra.y - 0.5) * scale * 2;
      
      // Breathing effect - slow pulse
      const breathPhase = progress * 2 * Math.PI + chakra.y * Math.PI * 4; // Phase offset by position
      const breathMagnitude = Math.sin(breathPhase) * this.config.chakraBreatheIntensity;
      const breathingRadius = this.config.chakraGlowSizeComputed * this.config.scale * 0.6 * (1 + breathMagnitude);
      
      const breathingOpacity = frameConfig.nodeAlpha * Math.abs(breathMagnitude) * 0.3;
      
      await canvas.drawRing2d(
        { x, y },
        breathingRadius,
        breathingRadius * 0.15,
        '#FFFFFF',
        0,
        null,
        breathingOpacity
      );
    }
  }

  /**
   * Render structured energy explosions at each chakra
   * Creates radiating spikes, concentric rings, and particle shards synchronized with breathing
   * @private
   */
  async #renderChakraExplosions(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    if (!this.config.enableChakraExplosions) return;

    for (const chakra of Object.values(CHAKRA_POSITIONS)) {
      const x = centerX + (chakra.x - 0.5) * scale * 2;
      const y = centerY + (chakra.y - 0.5) * scale * 2;
      
      // Calculate explosion pulse synchronized with breathing
      const breathPhase = progress * 2 * Math.PI + chakra.y * Math.PI * 4;
      let explosionPulse = Math.sin(breathPhase);
      
      if (!this.config.explosionSynchronizeWithBreathing) {
        // If not synced with breathing, use a continuous oscillation
        explosionPulse = Math.sin(progress * Math.PI * 4);
      }
      
      // Map pulse to 0-1 range with smooth continuous oscillation (always visible)
      explosionPulse = Math.abs(explosionPulse); // Use absolute value for smooth continuous animation
      const explosionMagnitude = explosionPulse * this.config.explosionIntensity;

      // Get chakra color based on selected color scheme (picked once during generate())
      const colorScheme = this.config.explosionColorScheme;
      let baseColor;
      
      if (colorScheme === 'white') {
        // White color scheme
        baseColor = '#ffffff';
      } else if (colorScheme === 'rainbow') {
        // Rainbow spectrum based on chakra position (0.0 to 1.0)
        const hue = chakra.y * 360; // Map vertical position to hue (0-360°)
        baseColor = `hsl(${hue}, 100%, 50%)`;
      } else {
        // Default: chakraColor scheme
        baseColor = chakra.color;
        if (this.config.useCustomChakraColors) {
          // Safe extraction of color - handles both strings and ColorPicker objects
          baseColor = this._extractColor(this.config.chakraColorOverride, chakra.color);
        }
      }

      // Get fuzz color for rings/rays
      let fuzzColorRays = baseColor;
      if (this.config.explosionEnableFuzzLayer) {
        fuzzColorRays = this._extractColor(this.config.explosionFuzzColor, baseColor);
      }
      
      // Helper function to render one layer of rings
      const renderRingLayer = async (isFuzz) => {
        for (let ringIdx = 0; ringIdx < this.config.explosionRingCount; ringIdx++) {
          const ringPhase = ringIdx / this.config.explosionRingCount;
          const ringDelay = ringPhase - explosionPulse;
          
          let ringMagnitude = Math.sin(Math.max(0, 1 - Math.abs(ringDelay) * 2) * Math.PI);
          ringMagnitude = Math.pow(ringMagnitude, 0.5);
          
          const ringRadius = this.config.chakraGlowSizeComputed * this.config.scale * 0.5 * (1 + explosionMagnitude * ringMagnitude * 1.5);
          const baseOpacity = frameConfig.nodeAlpha * explosionMagnitude * ringMagnitude * 0.8 * (1 - ringIdx / this.config.explosionRingCount);
          
          if (isFuzz) {
            const ringOpacity = baseOpacity * this.config.explosionFuzzOpacityMultiplier * this.config.explosionFuzzLayerOpacity;
            if (ringOpacity > 0.01) {
              await canvas.drawRing2d(
                { x, y },
                ringRadius * 1.1,  // Slightly larger for halo
                Math.max(0.5, ringRadius * 0.2),  // Thicker for fuzz
                fuzzColorRays,
                0,
                null,
                ringOpacity
              );
            }
          } else {
            const ringOpacity = baseOpacity;
            if (ringOpacity > 0.01) {
              await canvas.drawRing2d(
                { x, y },
                ringRadius,
                Math.max(0.5, ringRadius * 0.15),
                baseColor,
                0,
                null,
                ringOpacity
              );
            }
          }
        }
      };
      
      // ===== RENDER CONCENTRIC EXPLOSION RINGS - WITH INVERSION SUPPORT =====
      if (this.config.explosionInvertFuzzLayers) {
        // Fuzz on top (inverted order)
        if (!this.config.explosionEnableFuzzLayer) {
          await renderRingLayer(false);
        } else {
          await renderRingLayer(false);
          if (this.config.explosionEnableFuzzLayer) await renderRingLayer(true);
        }
      } else {
        // Base on top (default order)
        if (this.config.explosionEnableFuzzLayer) {
          await renderRingLayer(true);
        }
        await renderRingLayer(false);
      }

      // Helper function to render one layer of rays
      const renderRayLayer = async (isFuzz) => {
        for (let rayIdx = 0; rayIdx < this.config.explosionRayCount; rayIdx++) {
          const rayAngle = (rayIdx / this.config.explosionRayCount) * Math.PI * 2;
          const rotationSpeed = 2.0;
          const rotatedAngle = rayAngle + progress * rotationSpeed * Math.PI * 2;
          const rayLength = this.config.explosionRayLengthComputed * this.config.explosionRayLengthMultiplier * this.config.scale * 0.2 * explosionMagnitude;
          
          const rayStart = {
            x: x + Math.cos(rotatedAngle) * this.config.chakraGlowSizeComputed * this.config.scale * 0.3,
            y: y + Math.sin(rotatedAngle) * this.config.chakraGlowSizeComputed * this.config.scale * 0.3
          };
          
          const rayEnd = {
            x: x + Math.cos(rotatedAngle) * (this.config.chakraGlowSizeComputed * this.config.scale * 0.3 + rayLength),
            y: y + Math.sin(rotatedAngle) * (this.config.chakraGlowSizeComputed * this.config.scale * 0.3 + rayLength)
          };
          
          const baseRayOpacity = frameConfig.nodeAlpha * explosionMagnitude * 0.8;
          
          if (isFuzz) {
            const rayOpacity = baseRayOpacity * this.config.explosionFuzzOpacityMultiplier * this.config.explosionFuzzLayerOpacity;
            if (rayOpacity > 0.01) {
              await canvas.drawLine2d(
                rayStart,
                rayEnd,
                Math.max(0.5, 4.5 * explosionMagnitude),  // Thicker for fuzz halo
                fuzzColorRays,
                0,
                null,
                rayOpacity
              );
            }
          } else {
            if (baseRayOpacity > 0.01) {
              await canvas.drawLine2d(
                rayStart,
                rayEnd,
                Math.max(0.5, 3 * explosionMagnitude),  // Thickness varies with explosion intensity
                baseColor,
                0,
                null,
                baseRayOpacity
              );
            }
          }
        }
      };
      
      // ===== RENDER RADIATING ENERGY RAYS/SPIKES - WITH INVERSION SUPPORT =====
      if (this.config.explosionInvertFuzzLayers) {
        // Fuzz on top (inverted order)
        if (!this.config.explosionEnableFuzzLayer) {
          await renderRayLayer(false);
        } else {
          await renderRayLayer(false);
          if (this.config.explosionEnableFuzzLayer) await renderRayLayer(true);
        }
      } else {
        // Base on top (default order)
        if (this.config.explosionEnableFuzzLayer) {
          await renderRayLayer(true);
        }
        await renderRayLayer(false);
      }

      // ===== RENDER CHAOTIC ENERGY PARTICLE SHARDS =====
      // Generate particles with even distribution if enabled, otherwise use random
      const particlePositions = [];
      
      if (this.config.explosionEvenParticleDistribution) {
        // Even grid distribution: arrange particles in concentric rings
        const particlesPerRing = Math.ceil(Math.sqrt(this.config.explosionParticleCount));
        const ringCount = Math.ceil(this.config.explosionParticleCount / particlesPerRing);
        
        for (let ringIdx = 0; ringIdx < ringCount; ringIdx++) {
          const ringRadius = ((ringIdx + 1) / ringCount) * this.config.explosionRayLengthComputed * this.config.scale * 0.2;
          const particlesInRing = Math.min(
            particlesPerRing, 
            this.config.explosionParticleCount - ringIdx * particlesPerRing
          );
          
          for (let pIdx = 0; pIdx < particlesInRing; pIdx++) {
            const angle = (pIdx / particlesInRing) * Math.PI * 2 + ringIdx * 0.5; // Slight offset per ring
            const distance = ringRadius * (0.8 + Math.sin(progress * Math.PI * 2 + pIdx) * 0.2);
            
            particlePositions.push({
              angle: angle,
              distance: distance,
              radius: 1.5 + explosionMagnitude * 1.5
            });
          }
        }
      } else {
        // Random distribution: use pre-computed particles to ensure smooth animation
        const precomputedSet = this.precomputedExplosionParticles?.[chakraIndex] || [];
        for (let particleIdx = 0; particleIdx < this.config.explosionParticleCount; particleIdx++) {
          const particleSeed = (chakra.y * 1000 + particleIdx * 7 + progress * 100) % 360;
          const particleAngle = (particleSeed * Math.PI * 2 / 360 + progress * Math.PI) % (Math.PI * 2);
          
          // Use pre-computed random values instead of generating new ones each frame
          const precomputed = precomputedSet[particleIdx] || { randomDistance: 0.5, randomRadius: 0.5 };
          const particleDistance = (precomputed.randomDistance + explosionMagnitude) * 
            this.config.explosionRayLengthComputed * this.config.scale * 0.15;
          
          particlePositions.push({
            angle: particleAngle,
            distance: particleDistance,
            radius: precomputed.randomRadius * 3 + explosionMagnitude * 2
          });
        }
      }
      
      // Get fuzz color if dual-layer enabled
      let fuzzColor = baseColor;
      if (this.config.explosionEnableFuzzLayer) {
        fuzzColor = this._extractColor(this.config.explosionFuzzColor, baseColor);
      }
      
      // Helper function to render one layer of particles
      const renderParticleLayer = async (isFuzz) => {
        for (const particle of particlePositions) {
          const particleX = x + Math.cos(particle.angle) * particle.distance;
          const particleY = y + Math.sin(particle.angle) * particle.distance;
          const distanceFromCenter = Math.sqrt(Math.pow(particleX - x, 2) + Math.pow(particleY - y, 2));
          const maxDistance = this.config.explosionRayLengthComputed * this.config.scale * 0.2 + 50;
          const baseParticleOpacity = frameConfig.nodeAlpha * explosionMagnitude * 0.7 * 
            Math.max(0, 1 - distanceFromCenter / maxDistance);
          
          if (isFuzz) {
            const particleOpacity = baseParticleOpacity * this.config.explosionFuzzOpacityMultiplier * this.config.explosionFuzzLayerOpacity;
            if (particleOpacity > 0.01) {
              await canvas.drawRing2d(
                { x: particleX, y: particleY },
                particle.radius * 1.3,  // Slightly larger for halo effect
                Math.max(0.5, particle.radius * 0.5),
                fuzzColor,
                0,
                null,
                particleOpacity
              );
            }
          } else {
            if (baseParticleOpacity > 0.01) {
              await canvas.drawRing2d(
                { x: particleX, y: particleY },
                particle.radius,
                Math.max(0.5, particle.radius * 0.4),
                baseColor,
                0,
                null,
                baseParticleOpacity
              );
            }
          }
        }
      };
      
      // ===== RENDER CHAOTIC ENERGY PARTICLE SHARDS - WITH INVERSION SUPPORT =====
      if (this.config.explosionInvertFuzzLayers) {
        // Fuzz on top (inverted order)
        if (!this.config.explosionEnableFuzzLayer) {
          await renderParticleLayer(false);
        } else {
          await renderParticleLayer(false);
          if (this.config.explosionEnableFuzzLayer) await renderParticleLayer(true);
        }
      } else {
        // Base on top (default order)
        if (this.config.explosionEnableFuzzLayer) {
          await renderParticleLayer(true);
        }
        await renderParticleLayer(false);
      }
    }
  }

  /**
   * Render vertical oscillating sine waves between chakra points
   * Uses layered drawing approach: fuzz layer first, then sharp layer on top
   * @private
   */
  async #renderVerticalSineWaves(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    if (!this.config.enableVerticalSineWaves) return;

    const chakras = Object.values(CHAKRA_POSITIONS);
    
    // Pass precomputed algorithms to config for engine consumption
    // These were computed in generate() and stored on effect instance
    this.config.sineWaveAmplitudeAlgorithm = this.sineWaveAmplitudeAlgorithm;
    this.config.sineWaveOpacityAlgorithm = this.sineWaveOpacityAlgorithm;
    this.config.sineWaveBlurAlgorithm = this.sineWaveBlurAlgorithm;
    this.config.sineWaveAccentAlgorithm = this.sineWaveAccentAlgorithm;
    
    const sineWaves = VerticalSineWaveEngine.generateRenderableSineWaves(
      this.config,
      chakras,
      this.totalFrames,
      this.frameNumber
    );

    // Extract colors (handle both strings and ColorPicker objects)
    const fuzzColor = this._extractColor(this.config.sineWaveFuzzColor, '#c8a2e0');
    const baseColor = this._extractColor(this.config.sineWaveColor, '#9b59b6');

    // Render each sine wave group with layered drawing effect
    for (const wave of sineWaves) {
      // Convert normalized path to canvas coordinates
      const pathPoints = wave.path.map(pt => ({
        x: centerX + (pt.x - 0.5) * scale * 2,
        y: centerY + (pt.y - 0.5) * scale * 2,
      }));

      // Calculate final opacity and layer properties
      const finalOpacity = wave.opacity * frameConfig.nodeAlpha;
      const fuzzLayerOpacity = finalOpacity * this.config.sineWaveFuzzLayerOpacity;

      // Helper function to render a layer
      const renderLayer = async (isFuzz) => {
        const color = isFuzz ? fuzzColor : baseColor;
        const opacity = isFuzz ? fuzzLayerOpacity : finalOpacity;
        const thickness = isFuzz 
          ? this.config.sineWaveThicknessComputed + wave.accent * 1.5  // Thicker for halo
          : this.config.sineWaveThicknessComputed;  // Normal thickness

        // Render entire path as single polyline (more efficient than individual segments)
        await canvas.drawPath(
          pathPoints,
          thickness,
          color,
          0,  // No outer stroke
          null,
          opacity  // Pass opacity if supported by drawPath
        );
      };

      // Render layers in appropriate order based on invert flag
      if (this.config.sineWaveInvertLayers) {
        // Inverted: base layer on bottom, fuzz layer on top (ethereal effect dominates)
        await renderLayer(false);  // Base layer first (bottom)
        await renderLayer(true);   // Fuzz layer second (top)
      } else {
        // Default: fuzz layer on bottom, base layer on top (crisp appearance)
        await renderLayer(true);   // Fuzz layer first (bottom)
        await renderLayer(false);  // Base layer second (top)
      }
    }
  }

  /**
   * Render frequency visualization - harmonic pulsing rings around chakras
   * @private
   */
  async #renderFrequencyVisualization(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    if (!this.config.enableFrequencyVisualization) return;

    for (const chakra of Object.values(CHAKRA_POSITIONS)) {
      const x = centerX + (chakra.x - 0.5) * scale * 2;
      const y = centerY + (chakra.y - 0.5) * scale * 2;
      
      const freq = chakra.frequency || 0;
      
      // Create harmonic rings around each chakra with extra detail layers
      const harmonicCount = 3 + this.config.frequencyDetailLayers;
      for (let harmonic = 1; harmonic <= harmonicCount; harmonic++) {
        const harmonicFreq = freq * harmonic;
        const pulseRadius = (scale * 0.15) * Math.sin(progress * this.config.frequencyOscillationSpeed * harmonicFreq * Math.PI * 2);
        const ringRadius = chakra.radius * this.config.scale * 0.5 + Math.max(0, pulseRadius);
        
        const opacity = frameConfig.nodeAlpha * (1 - harmonic * 0.15) * 0.5;
        
        await canvas.drawRing2d(
          { x, y },
          ringRadius,
          1,
          '#6496FF',
          0,
          null,
          opacity
        );
      }
    }
  }

  /**
   * Render energy beads orbiting the mandala rings
   * Beads move with perfect loop synchronization (frame 0 = frame N-1)
   * @private
   */
  async #renderEnergyBeads(canvas, centerX, centerY, scale, frameConfig, progress, transitionInfo) {
    if (!this.config.enableEnergyBeads) return;

    const chakras = Object.values(CHAKRA_POSITIONS);
    const beadCount = Math.max(1, Math.min(24, this.config.energyBeadCount));
    const beadRadius = this.config.energyBeadRadiusComputed;
    const beadOpacity = this.config.energyBeadOpacity;
    const beadSpeed = this.config.energyBeadSpeed;
    const ringLayer = this.config.energyBeadRingLayer;
    const pulseEnabled = this.config.energyBeadPulseEnabled;
    const pulseRange = this.config.energyBeadPulseRange;
    const pulseTimes = this.config.energyBeadPulseTimes;
    
    // Extract bead color (handles ColorPicker or string)
    const beadColor = this._extractColor(this.config.energyBeadColor, '#64C8FF');

    // Calculate ring radii (same as mandala rings)
    const innerRadius = scale * this.config.mandalaInnerRadius * this.config.mandalaRadiusMultiplier;
    const outerRadius = scale * this.config.mandalaOuterRadius * this.config.mandalaRadiusMultiplier;
    const ringCount = 3 + this.config.mandalaRingLayers;
    const ringRadii = [];
    for (let i = 0; i < ringCount; i++) {
      const t = i / (ringCount - 1);
      ringRadii.push(innerRadius + (outerRadius - innerRadius) * t);
    }

    // Determine which rings to render on
    const ringsToRender = [];
    if (ringLayer === -1) {
      // All rings
      ringsToRender.push(0, 1, 2);
    } else {
      ringsToRender.push(Math.min(ringLayer, ringRadii.length - 1));
    }

    // Render beads on each chakra
    for (const chakra of chakras) {
      const chakraX = centerX + (chakra.x - 0.5) * scale * 2;
      const chakraY = centerY + (chakra.y - 0.5) * scale * 2;

      // Render beads on selected rings
      for (const ringIdx of ringsToRender) {
        if (ringIdx >= ringRadii.length) continue;
        
        const orbitRadius = ringRadii[ringIdx];

        // Render each bead
        for (let beadIdx = 0; beadIdx < beadCount; beadIdx++) {
          // Perfect loop: use cosine for frame 0 = frame N-1
          // Each bead starts at a different angle
          const baseAngle = (beadIdx / beadCount) * Math.PI * 2;
          const orbitPhase = Math.cos(progress * Math.PI * 2 * beadSpeed) * Math.PI * 2;
          const beadAngle = baseAngle + progress * Math.PI * 2 * beadSpeed;
          
          // Calculate bead position on the ring
          const beadX = chakraX + Math.cos(beadAngle) * orbitRadius;
          const beadY = chakraY + Math.sin(beadAngle) * orbitRadius;

          // Calculate pulse effect if enabled using findValue algorithm
          let currentRadius = beadRadius;
          if (pulseEnabled) {
            // Use VerticalSineWaveEngine for configurable oscillation cycles
            // pulseTimes controls how many times beads pulse between min/max during animation
            const pulseMult = VerticalSineWaveEngine.calculateOscillationValue(
              pulseRange.lower,
              pulseRange.upper,
              pulseTimes,      // Oscillation cycles per animation
              1,               // normalized totalFrames (0-1 range)
              progress,        // normalized currentFrame (0-1 range)
              'sinusoidal'     // smooth pulse effect
            );
            currentRadius = beadRadius * pulseMult;
          }

          // Draw bead with glow effect
          const glowIntensity = this.config.energyBeadGlowIntensity;
          
          // Outer glow (soft)
          await canvas.drawRing2d(
            { x: beadX, y: beadY },
            currentRadius * glowIntensity * 1.5,  // larger radius for glow
            0,              // innerStroke
            null,           // fillColor (no fill for glow)
            2,              // outerStroke for glow edge
            beadColor,      // outlineColor
            beadOpacity * 0.3
          );

          // Inner solid bead
          await canvas.drawRing2d(
            { x: beadX, y: beadY },
            currentRadius,  // bead radius
            0,              // innerStroke
            beadColor,      // fillColor
            0,              // outerStroke (no outline)
            null,           // outlineColor
            beadOpacity
          );
        }
      }
    }
  }
}
