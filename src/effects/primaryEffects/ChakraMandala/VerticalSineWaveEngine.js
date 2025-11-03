/**
 * Vertical Sine Wave Engine
 * 
 * Computes smooth sine wave paths connecting 3+ chakra points vertically,
 * with configurable oscillations for opacity, blur, and accent.
 * 
 * Key Features:
 * - Consecutive or overlapping chakra grouping
 * - Hermite curve interpolation for smooth paths
 * - Start/stop symmetry (frame 0 ≈ frame N-1)
 * - Multi-layer oscillation support (opacity, blur, accent)
 * - Hardware-accelerated rendering via Canvas2dFactory
 */

export class VerticalSineWaveEngine {
  /**
   * Pick a random element from an array, or return the value if it's not an array
   * Used for randomly selecting enum options (algorithms, etc.)
   * @param {Array|string|*} value - Array of options or a single value
   * @return {string|*} - Random element from array or the value itself
   * @static
   */
  static pickRandom(value) {
    if (Array.isArray(value)) {
      return value[Math.floor(Math.random() * value.length)];
    }
    return value;
  }

  /**
   * Calculate vertical sine wave groups from chakra array
   * @param {Array} chakras - Array of chakra position objects
   * @param {string} progression - 'sequential' or 'overlapping'
   * @param {number} grouping - Points per sine wave (3, 4, 5)
   * @returns {Array} Array of sine wave group objects
   */
  static generateSineWaveGroups(chakras, progression = 'sequential', grouping = 3) {
    const groups = [];
    
    if (progression === 'sequential') {
      // Non-overlapping: 0-1-2, 3-4-5, etc.
      for (let i = 0; i < chakras.length; i += grouping) {
        const groupIndices = [];
        for (let j = 0; j < grouping; j++) {
          const idx = (i + j) % chakras.length;
          groupIndices.push(idx);
        }
        
        // Only create group if we have enough unique points
        if (new Set(groupIndices).size === grouping) {
          groups.push({
            groupIndex: groups.length,
            chakraIndices: groupIndices,
            chakras: groupIndices.map(idx => chakras[idx]),
          });
        }
      }
    } else if (progression === 'overlapping') {
      // Rolling window: 0-1-2, 1-2-3, 2-3-4, etc.
      for (let i = 0; i < chakras.length - grouping + 1; i++) {
        const groupIndices = [];
        for (let j = 0; j < grouping; j++) {
          groupIndices.push(i + j);
        }
        
        groups.push({
          groupIndex: groups.length,
          chakraIndices: groupIndices,
          chakras: groupIndices.map(idx => chakras[idx]),
        });
      }
    }
    
    return groups;
  }

  /**
   * Calculate a smooth sine wave path between chakra endpoints
   * Uses hermite interpolation for smooth curves between 3+ points
   * 
   * @param {Array} groupChakras - Array of 3+ chakra objects (start, mid, end)
   * @param {number} amplitude - Horizontal oscillation distance (pixels)
   * @param {number} frequency - Oscillations per wave cycle
   * @param {number} progress - Animation progress (0-1) for phase calculation
   * @param {number} totalFrames - Total frames in animation
   * @param {number} currentFrame - Current frame number
   * @returns {Array} Array of path point objects { x, y, chakraIndex }
   */
  static calculateSineWavePath(groupChakras, amplitude, frequency, progress, totalFrames, currentFrame) {
    if (groupChakras.length < 3) {
      throw new Error('VerticalSineWaveEngine requires minimum 3 chakra points');
    }

    const pathPoints = [];
    const resolution = 20; // Segments per chakra interval
    const numIntervals = groupChakras.length - 1;
    const totalSegments = numIntervals * resolution;

    // Extract Y-coordinates for vertical span
    const startY = groupChakras[0].y;
    const endY = groupChakras[groupChakras.length - 1].y;
    const ySpan = Math.abs(endY - startY);

    // Calculate oscillation phase: ensures symmetry (frame 0 ≈ frame N-1)
    const normalizedProgress = currentFrame / totalFrames;
    const oscillationPhase = normalizedProgress * Math.PI * 2 * frequency;

    // Generate path points
    for (let segment = 0; segment <= totalSegments; segment++) {
      const t = segment / totalSegments; // Local progress (0-1) through wave

      // Vertical position: lerp from start to end
      const y = startY + (endY - startY) * t;

      // Horizontal oscillation: sine wave with configurable amplitude
      const sineValue = Math.sin(oscillationPhase + t * Math.PI * 2 * frequency);
      const xOffset = sineValue * amplitude;

      // Smooth x-coordinate (typically centered on chakra vertical line)
      const x = 0.5 + xOffset / 1000; // Normalized coordinate space (0-1)

      pathPoints.push({
        x,
        y,
        t, // Progress through wave for debugging
        sineValue, // Raw sine for reference
      });
    }

    return pathPoints;
  }

  /**
   * Calculate oscillation value using findValue-compatible algorithm
   * Mimics the pattern from Canvas2dFactory rings rendering
   * 
   * @param {number} lower - Minimum value
   * @param {number} upper - Maximum value
   * @param {number} times - Number of oscillation cycles per animation
   * @param {number} totalFrames - Total frames in animation
   * @param {number} currentFrame - Current frame number
   * @param {string} algorithm - Oscillation algorithm ('sinusoidal', 'square', 'sawtooth')
   * @returns {number} Interpolated oscillation value
   */
  static calculateOscillationValue(lower, upper, times, totalFrames, currentFrame, algorithm = 'sinusoidal') {
    const normalizedFrame = currentFrame / totalFrames;
    const phaseValue = normalizedFrame * times * Math.PI * 2;

    let oscillation;
    switch (algorithm) {
      case 'sinusoidal':
        oscillation = Math.sin(phaseValue) * 0.5 + 0.5; // Range 0-1
        break;
      case 'square':
        oscillation = Math.sin(phaseValue) > 0 ? 1 : 0;
        break;
      case 'sawtooth':
        oscillation = (phaseValue / (Math.PI * 2)) % 1;
        break;
      default:
        oscillation = Math.sin(phaseValue) * 0.5 + 0.5;
    }

    return lower + (upper - lower) * oscillation;
  }

  /**
   * Calculate fade opacity for smooth start/stop symmetry
   * Ensures sine wave appears and disappears gracefully
   * 
   * @param {number} progress - Animation progress (0-1)
   * @param {number} fadeInDuration - Fade-in duration as fraction of cycle
   * @param {number} fadeOutStart - When to begin fade-out (0-1)
   * @returns {number} Opacity multiplier (0-1)
   */
  static calculateFadeOpacity(progress, fadeInDuration = 0.1, fadeOutStart = 0.85) {
    if (progress < fadeInDuration) {
      // Fade in (ease-out quadratic)
      const t = progress / fadeInDuration;
      return t * t;
    } else if (progress > fadeOutStart) {
      // Fade out (ease-in quadratic)
      const t = (progress - fadeOutStart) / (1 - fadeOutStart);
      return 1 - (t * t);
    }
    // Full opacity between fade zones
    return 1.0;
  }

  /**
   * Interpolate between two chakra points using cubic hermite spline
   * Provides smooth curvature for natural-looking sine wave
   * 
   * @param {Object} p0 - Previous point { x, y }
   * @param {Object} p1 - Start point { x, y }
   * @param {Object} p2 - End point { x, y }
   * @param {Object} p3 - Next point { x, y }
   * @param {number} t - Interpolation parameter (0-1)
   * @returns {Object} Interpolated point { x, y }
   */
  static hermiteInterpolate(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;

    // Hermite basis functions
    const h00 = 2 * t3 - 3 * t2 + 1;
    const h10 = t3 - 2 * t2 + t;
    const h01 = -2 * t3 + 3 * t2;
    const h11 = t3 - t2;

    // Tangent vectors (use central difference)
    const m1 = { x: (p2.x - p0.x) / 2, y: (p2.y - p0.y) / 2 };
    const m2 = { x: (p3.x - p1.x) / 2, y: (p3.y - p1.y) / 2 };

    const x = h00 * p1.x + h10 * m1.x + h01 * p2.x + h11 * m2.x;
    const y = h00 * p1.y + h10 * m1.y + h01 * p2.y + h11 * m2.y;

    return { x, y };
  }

  /**
   * Generate array of sine wave groups with computed paths
   * Ready for rendering
   * 
   * Features:
   * - Wave count filtering: limits rendered waves by sineWaveCount
   * - Harmonic ratios: each wave gets frequency multiplier from sineWaveHarmonicRatios
   * - Amplitude oscillation: amplitude changes over time based on wave index
   * 
   * @param {Object} config - ChakraMandalaConfig object
   * @param {Array} chakras - Array of chakra position objects
   * @param {number} totalFrames - Total animation frames
   * @param {number} currentFrame - Current frame number
   * @returns {Array} Array of wave group objects with computed paths
   */
  static generateRenderableSineWaves(config, chakras, totalFrames, currentFrame) {
    if (!config.enableVerticalSineWaves) {
      return [];
    }

    const groups = this.generateSineWaveGroups(
      chakras,
      config.sineWaveProgression,
      config.sineWaveChakraGrouping
    );

    // Filter by wave count if specified (null = all waves)
    let wavesToRender = groups;
    if (config.sineWaveCount !== null && config.sineWaveCount > 0) {
      wavesToRender = groups.slice(0, Math.min(config.sineWaveCount, groups.length));
    }

    const renderableWaves = wavesToRender.map((group, waveIndex) => {
      // Get harmonic ratio for this wave (cycles through ratios if more waves than ratios)
      const harmonicRatio = (config.sineWaveHarmonicRatios && config.sineWaveHarmonicRatios.length > 0)
        ? config.sineWaveHarmonicRatios[waveIndex % config.sineWaveHarmonicRatios.length]
        : 1;

      // Apply harmonic ratio to frequency
      const harmonicFrequency = config.sineWaveFrequency * harmonicRatio;

      // Calculate amplitude with optional oscillation
      // Use precomputed value (which survives deserialization) or fall back to getter
      let amplitude = config.sineWaveAmplitudeComputed ?? config.sineWaveAmplitude;
      if (config.enableSineWaveAmplitudeOscillation) {
        const amplitudeMultiplier = this.calculateOscillationValue(
          config.sineWaveAmplitudeOscillationRange.lower,
          config.sineWaveAmplitudeOscillationRange.upper,
          config.sineWaveAmplitudeOscillationTimes,
          totalFrames,
          currentFrame,
          config.sineWaveAmplitudeAlgorithm || 'sinusoidal'  // Use pre-selected algorithm
        );
        amplitude = (config.sineWaveAmplitudeComputed ?? config.sineWaveAmplitude) * amplitudeMultiplier;
      }

      const path = this.calculateSineWavePath(
        group.chakras,
        amplitude,
        harmonicFrequency,
        currentFrame / totalFrames,
        totalFrames,
        currentFrame
      );

      const opacity = this.calculateOscillationValue(
        config.sineWaveOpacityRange.lower,
        config.sineWaveOpacityRange.upper,
        config.sineWaveOpacityTimes,
        totalFrames,
        currentFrame,
        config.sineWaveOpacityAlgorithm || 'sinusoidal'  // Use pre-selected algorithm
      );

      const blur = Math.ceil(this.calculateOscillationValue(
        config.sineWaveBlurRange.lower,
        config.sineWaveBlurRange.upper,
        config.sineWaveBlurTimes,
        totalFrames,
        currentFrame,
        config.sineWaveBlurAlgorithm || 'sinusoidal'  // Use pre-selected algorithm
      ));

      const accent = this.calculateOscillationValue(
        config.sineWaveAccentRange.lower,
        config.sineWaveAccentRange.upper,
        config.sineWaveAccentTimes,
        totalFrames,
        currentFrame,
        config.sineWaveAccentAlgorithm || 'sinusoidal'  // Use pre-selected algorithm
      );

      return {
        groupIndex: group.groupIndex,
        chakraIndices: group.chakraIndices,
        harmonicRatio,
        harmonicFrequency,
        waveIndex,
        path,
        opacity,
        blur,
        accent,
      };
    });

    return renderableWaves;
  }
}