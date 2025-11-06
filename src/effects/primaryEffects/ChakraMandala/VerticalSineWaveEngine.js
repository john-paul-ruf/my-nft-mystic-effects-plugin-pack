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
   * UPDATED: Now supports wrapping to generate unlimited waves via cycling
   * @param {Array} chakras - Array of chakra position objects
   * @param {string} progression - 'sequential' or 'overlapping' (wraps when needed for more waves)
   * @param {number} grouping - Points per sine wave (3, 4, 5)
   * @param {number} maxWaves - (optional) Maximum waves to generate. null = all natural groups
   * @returns {Array} Array of sine wave group objects
   */
  static generateSineWaveGroups(chakras, progression = 'sequential', grouping = 3, maxWaves = null) {
    const groups = [];
    
    if (progression === 'sequential') {
      // Non-overlapping sequential: 0-1-2, 3-4-5, 6-0-1 (wraps), etc.
      // With wrapping, can generate unlimited waves
      const targetCount = maxWaves || Math.ceil(chakras.length / grouping);
      for (let wave = 0; wave < targetCount; wave++) {
        const groupIndices = [];
        for (let j = 0; j < grouping; j++) {
          const idx = (wave * grouping + j) % chakras.length;
          groupIndices.push(idx);
        }
        
        groups.push({
          groupIndex: groups.length,
          chakraIndices: groupIndices,
          chakras: groupIndices.map(idx => chakras[idx]),
        });
      }
    } else if (progression === 'overlapping') {
      // Rolling window with wrapping: 0-1-2, 1-2-3, ..., N-1-0-1, etc.
      // Can cycle through to generate unlimited waves
      const targetCount = maxWaves || chakras.length;
      for (let i = 0; i < targetCount; i++) {
        const groupIndices = [];
        for (let j = 0; j < grouping; j++) {
          const idx = (i + j) % chakras.length;
          groupIndices.push(idx);
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
   * Endpoints and control points (chakra centers) stay fixed
   * Oscillation is modulated to be zero at control points and maximum between them
   * 
   * @param {Array} groupChakras - Array of 3+ chakra objects (start, mid, end)
   * @param {number} amplitude - Horizontal oscillation distance in pixels (e.g., 15)
   * @param {number} frequency - Oscillations per wave cycle
   * @param {number} progress - Animation progress (0-1) for phase calculation
   * @param {number} totalFrames - Total frames in animation
   * @param {number} currentFrame - Current frame number
   * @param {number} canvasWidth - Canvas width for amplitude normalization (e.g., 1024, 1920, 1080)
   * @returns {Array} Array of path point objects { x, y, chakraIndex }
   */
  static calculateSineWavePath(groupChakras, amplitude, frequency, progress, totalFrames, currentFrame, canvasWidth = 1024) {
    if (groupChakras.length < 3) {
      throw new Error('VerticalSineWaveEngine requires minimum 3 chakra points');
    }

    const pathPoints = [];
    const resolution = 20; // Segments per chakra interval
    const numIntervals = groupChakras.length - 1;
    const totalSegments = numIntervals * resolution;

    // Extract coordinates for vertical span and base x positions
    const startY = groupChakras[0].y;
    const endY = groupChakras[groupChakras.length - 1].y;

    // Calculate oscillation phase: ensures symmetry (frame 0 ≈ frame N-1)
    const normalizedProgress = currentFrame / totalFrames;
    const oscillationPhase = normalizedProgress * Math.PI * 2 * frequency;

    // Convert amplitude from pixels to normalized 0-1 space
    // Amplitude is in pixels (e.g., 15), canvas width can vary (1024, 1920, 1080, etc.)
    // Normalized = pixelAmplitude / canvasWidth
    // Example for 1024px canvas:
    //   - 8 pixels / 1024 = 0.00586 normalized
    //   - At render: 0.00586 × 512 × 2 = 6 pixels ✓
    // Example for 1920px canvas:
    //   - 8 pixels / 1920 = 0.00417 normalized
    //   - At render: 0.00417 × 672 × 2 ≈ 5.6 pixels (proportionally correct)
    // Example for 1080px portrait canvas:
    //   - 8 pixels / 1080 = 0.0074 normalized
    //   - At render: 0.0074 × 378 × 2 ≈ 5.6 pixels (proportionally correct)
    const normalizedAmplitude = amplitude / canvasWidth;

    // Generate path points
    for (let segment = 0; segment <= totalSegments; segment++) {
      const t = segment / totalSegments; // Local progress (0-1) through wave

      // Vertical position: lerp from start to end
      const y = startY + (endY - startY) * t;

      // Horizontal base position: interpolate through control points (chakra x-positions)
      // This ensures start/end/mid points stay at their chakra centers
      const baseX = this.#interpolateControlPointX(groupChakras, t);

      // Calculate oscillation envelope: zero at control points, maximum between them
      // This modulates the sine wave to fade in/out at chakra centers
      const oscillationEnvelope = this.#calculateOscillationEnvelope(groupChakras, t);

      // Horizontal oscillation: sine wave with configurable amplitude, modulated by envelope
      const sineValue = Math.sin(oscillationPhase + t * Math.PI * 2 * frequency);
      const xOffset = sineValue * normalizedAmplitude * oscillationEnvelope;

      // Final x-coordinate: base position plus oscillation
      const x = baseX + xOffset;

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
   * Interpolate x-position through chakra control points
   * Ensures intermediate points pass through mid-wave chakras
   * @private
   * @param {Array} groupChakras - Chakra control points
   * @param {number} t - Progress through wave (0-1)
   * @returns {number} Interpolated x-position (normalized)
   */
  static #interpolateControlPointX(groupChakras, t) {
    const numChakras = groupChakras.length;
    
    // Determine which interval we're in
    const intervalSize = 1 / (numChakras - 1);
    let interval = Math.floor(t / intervalSize);
    interval = Math.min(interval, numChakras - 2); // Clamp to valid interval
    
    const nextInterval = interval + 1;
    const localT = (t - interval * intervalSize) / intervalSize; // 0-1 within interval
    
    // Linear interpolation between chakra x-positions
    const x1 = groupChakras[interval].x;
    const x2 = groupChakras[nextInterval].x;
    return x1 + (x2 - x1) * localT;
  }

  /**
   * Calculate oscillation envelope function
   * Returns 0 at chakra control points, 1.0 at midpoints between them
   * Creates smooth fade in/out of oscillation near control points
   * @private
   * @param {Array} groupChakras - Chakra control points
   * @param {number} t - Progress through wave (0-1)
   * @returns {number} Envelope value (0-1)
   */
  static #calculateOscillationEnvelope(groupChakras, t) {
    const numChakras = groupChakras.length;
    const intervalSize = 1 / (numChakras - 1);
    
    // Find closest control point
    let closestDist = Infinity;
    for (let i = 0; i < numChakras; i++) {
      const controlPointT = i * intervalSize;
      const dist = Math.abs(t - controlPointT);
      closestDist = Math.min(closestDist, dist);
    }
    
    // At control points (dist ≈ 0), envelope = 0
    // At midpoint between controls (dist ≈ intervalSize/2), envelope = 1
    // Use quadratic easing for smooth fade
    const fadeDist = intervalSize / 2;
    const normalized = Math.min(closestDist / fadeDist, 1.0);
    
    // Quadratic: x^2 gives smooth fade from 0 to 1
    return normalized * normalized * (3 - 2 * normalized); // Smoothstep for nice curve
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
   * @param {number} canvasWidth - Canvas width for amplitude normalization (e.g., 1024, 1920, 1080)
   * @returns {Array} Array of wave group objects with computed paths
   */
  static generateRenderableSineWaves(config, chakras, totalFrames, currentFrame, canvasWidth = 1024) {
    if (!config.enableVerticalSineWaves) {
      return [];
    }

    // Generate groups with wrapping support - pass maxWaves to respect sineWaveCount
    // Now supports unlimited waves via cycling through chakras
    const groups = this.generateSineWaveGroups(
      chakras,
      config.sineWaveProgression,
      config.sineWaveChakraGrouping,
      config.sineWaveCount  // Pass maxWaves to generate requested count with wrapping
    );

    // All requested waves are now generated with wrapping
    const wavesToRender = groups;

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
        currentFrame,
        canvasWidth  // Pass actual canvas width for proper normalization
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