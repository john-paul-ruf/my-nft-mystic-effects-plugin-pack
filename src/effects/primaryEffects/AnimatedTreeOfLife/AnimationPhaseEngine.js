/**
 * Animation Phase Engine - detects phases and synthesizes frame configurations
 * NOW WITH SMOOTH CROSS-PHASE TRANSITIONS!
 */

import { AnimationInterpolator } from './AnimationInterpolator.js';
import { getNodeActivationOrder, PATHS_CONNECTIONS } from './SephirothGeometry.js';

export class AnimationPhaseEngine {
  constructor(config = {}) {
    this.config = config;
    // Transition zone width (as fraction of total animation, default 5%)
    this.transitionZoneWidth = config.transitionZoneWidth || 0.05;
  }
  
  /**
   * Main synthesis method: given base config and progress, 
   * return frame-specific config
   * NOW WITH SMOOTH CROSS-PHASE TRANSITIONS!
   */
  synthesizeConfig(baseConfig, progress) {
    // 1. Detect which phase we're in (and if we're in a transition zone)
    const phaseInfo = this.getPhaseWithTransition(progress, baseConfig);
    const phase = phaseInfo.currentPhase;
    const nextPhase = phaseInfo.nextPhase;
    const transitionBlend = phaseInfo.transitionBlend; // 0 = fully current, 1 = fully next
    
    // 2. Normalize progress within this phase (0-1 within boundaries)
    const phaseProgress = this.getNormalizedPhaseProgress(progress, phase, baseConfig);
    
    // 3. If in transition zone, also calculate next phase progress for blending
    let nextPhaseProgress = 0;
    if (transitionBlend > 0 && nextPhase !== phase) {
      nextPhaseProgress = this.getNormalizedPhaseProgress(progress, nextPhase, baseConfig);
    }
    
    // 4. Get easing functions for smooth blending
    const currentEasing = baseConfig[`${phase}Easing`] || 'linear';
    const nextEasing = nextPhase !== phase ? (baseConfig[`${nextPhase}Easing`] || 'linear') : currentEasing;
    
    // 5. Synthesize complete config for this frame with cross-phase blending
    const frameConfig = this.interpolatePhaseWithTransition(
      baseConfig, 
      progress, 
      phase, 
      phaseProgress,
      currentEasing,
      nextPhase,
      nextPhaseProgress,
      nextEasing,
      transitionBlend
    );
    
    return frameConfig;
  }
  
  /**
   * Get phase info including transition blend factor
   * Smoothly transitions between phases instead of hard snaps
   */
  getPhaseWithTransition(progress, baseConfig) {
    const boundaries = this.getPhaseBoundaries(baseConfig);
    const currentPhase = this.getPhase(progress, baseConfig);
    
    // Find which boundary we're closest to
    let nextPhase = currentPhase;
    let transitionBlend = 0;
    
    // Check distance to next phase boundary
    const phaseNames = ['awakening', 'ascension', 'radiance', 'descent'];
    const currentPhaseIdx = phaseNames.indexOf(currentPhase);
    const transitionZone = this.transitionZoneWidth;
    
    if (currentPhaseIdx < phaseNames.length - 1) {
      const nextPhaseName = phaseNames[currentPhaseIdx + 1];
      const currentEnd = boundaries[currentPhase][1];
      const distToNext = currentEnd - progress;
      
      // If we're within the transition zone before the boundary
      if (distToNext >= 0 && distToNext <= transitionZone) {
        nextPhase = nextPhaseName;
        transitionBlend = 1 - (distToNext / transitionZone); // 0 to 1 as we approach boundary
      }
    }
    
    // Also check if we're entering from previous phase
    if (currentPhaseIdx > 0) {
      const prevPhaseName = phaseNames[currentPhaseIdx - 1];
      const prevEnd = boundaries[prevPhaseName][1];
      const distFromPrev = progress - prevEnd;
      
      // If we're within transition zone after the boundary
      if (distFromPrev >= 0 && distFromPrev <= transitionZone) {
        // Only override if this creates a smoother blend
        transitionBlend = Math.max(transitionBlend, distFromPrev / transitionZone);
      }
    }
    
    return { currentPhase, nextPhase, transitionBlend };
  }
  
  /**
   * Get phase boundaries from config
   */
  getPhaseBoundaries(baseConfig) {
    return {
      awakening: [
        baseConfig.phaseAwakening_start || 0.0,
        baseConfig.phaseAscension_start || 0.20
      ],
      ascension: [
        baseConfig.phaseAscension_start || 0.20,
        baseConfig.phaseRadiance_start || 0.60
      ],
      radiance: [
        baseConfig.phaseRadiance_start || 0.60,
        baseConfig.phaseDescentstart || 0.85
      ],
      descent: [
        baseConfig.phaseDescentstart || 0.85,
        1.0
      ]
    };
  }
  
  /**
   * Determine which of 4 phases we're in
   */
  getPhase(progress, baseConfig = null) {
    const config = baseConfig || this.config;
    const awakeStart = config.phaseAwakening_start || 0.0;
    const ascStart = config.phaseAscension_start || 0.20;
    const radStart = config.phaseRadiance_start || 0.60;
    const descStart = config.phaseDescentstart || 0.85;
    
    if (progress < ascStart) return 'awakening';
    if (progress < radStart) return 'ascension';
    if (progress < descStart) return 'radiance';
    return 'descent';
  }
  
  /**
   * Normalize progress to [0, 1] within current phase boundaries
   */
  getNormalizedPhaseProgress(progress, phase, baseConfig = null) {
    const config = baseConfig || this.config;
    const boundaries = this.getPhaseBoundaries(config);
    
    const [start, end] = boundaries[phase];
    if (start === end) return 0;
    return (progress - start) / (end - start);
  }
  
  /**
   * Interpolate all animation parameters for the current phase with smooth cross-phase transitions
   * This method supports blending between two phases for smooth animations
   */
  interpolatePhaseWithTransition(
    baseConfig, progress, 
    phase, phaseProgress, easingName,
    nextPhase, nextPhaseProgress, nextEasing,
    transitionBlend
  ) {
    const interpolator = new AnimationInterpolator();
    
    // Start with all base config
    const frameConfig = { ...baseConfig };
    
    // ===== NODE ALPHA =====
    const alphaKey = `${phase}NodeAlpha`;
    if (baseConfig[alphaKey] !== undefined) {
      // Interpolate within current phase
      let currentAlpha = interpolator.lerp(
        baseConfig[`${phase}NodeAlpha_start`] || baseConfig[alphaKey],
        baseConfig[`${phase}NodeAlpha_end`] || baseConfig[alphaKey],
        phaseProgress,
        easingName
      );
      
      // If in transition, blend with next phase
      if (transitionBlend > 0 && nextPhase !== phase) {
        const nextAlphaKey = `${nextPhase}NodeAlpha`;
        let nextAlpha = interpolator.lerp(
          baseConfig[`${nextPhase}NodeAlpha_start`] || baseConfig[nextAlphaKey],
          baseConfig[`${nextPhase}NodeAlpha_end`] || baseConfig[nextAlphaKey],
          nextPhaseProgress,
          nextEasing
        );
        // Smooth blend between phases
        currentAlpha = currentAlpha * (1 - transitionBlend) + nextAlpha * transitionBlend;
      }
      
      frameConfig.nodeAlpha = currentAlpha;
    }
    
    // ===== PATH INTENSITY =====
    const pathIntensityKey = `${phase}PathIntensity`;
    if (baseConfig[pathIntensityKey] !== undefined) {
      // Interpolate within current phase
      let currentIntensity = interpolator.lerp(
        baseConfig[`${phase}PathIntensity_start`] || baseConfig[pathIntensityKey],
        baseConfig[`${phase}PathIntensity_end`] || baseConfig[pathIntensityKey],
        phaseProgress,
        easingName
      );
      
      // If in transition, blend with next phase
      if (transitionBlend > 0 && nextPhase !== phase) {
        const nextIntensityKey = `${nextPhase}PathIntensity`;
        let nextIntensity = interpolator.lerp(
          baseConfig[`${nextPhase}PathIntensity_start`] || baseConfig[nextIntensityKey],
          baseConfig[`${nextPhase}PathIntensity_end`] || baseConfig[nextIntensityKey],
          nextPhaseProgress,
          nextEasing
        );
        // Smooth blend between phases
        currentIntensity = currentIntensity * (1 - transitionBlend) + nextIntensity * transitionBlend;
      }
      
      frameConfig.pathIntensity = currentIntensity;
    }
    
    // ===== PATH ANIMATION SPEED (SMOOTHLY INTERPOLATED!) =====
    // This is critical for smooth transitions—speed changes should be gradual, not snappy
    const currentSpeed = baseConfig[`${phase}PathAnimSpeed`] || baseConfig.pathAnimSpeed || 1.0;
    let finalSpeed = currentSpeed;
    
    if (transitionBlend > 0 && nextPhase !== phase) {
      const nextSpeed = baseConfig[`${nextPhase}PathAnimSpeed`] || baseConfig.pathAnimSpeed || 1.0;
      // Smooth interpolation between speeds using ease curve
      const speedEasing = (t) => t * t * (3 - 2 * t); // smoothstep for speed changes
      finalSpeed = currentSpeed + (nextSpeed - currentSpeed) * speedEasing(transitionBlend);
    }
    frameConfig.pathAnimSpeed = finalSpeed;
    
    // ===== KETHER GLOW =====
    const ketherGlowKey = `${phase}KetherGlow`;
    if (baseConfig[ketherGlowKey] !== undefined) {
      let glowValue = baseConfig[ketherGlowKey];
      
      if (transitionBlend > 0 && nextPhase !== phase) {
        const nextGlowKey = `${nextPhase}KetherGlow`;
        const nextGlow = baseConfig[nextGlowKey] || 1.0;
        glowValue = glowValue * (1 - transitionBlend) + nextGlow * transitionBlend;
      }
      
      frameConfig.ketherGlow = glowValue;
    } else {
      frameConfig.ketherGlow = 1.0;
    }
    
    // Node activation sequencing for this phase (determines which nodes light up in order)
    frameConfig.nodeActivationOrder = getNodeActivationOrder(phase);
    
    // Path animation order (sorted by activation sequence)
    frameConfig.pathAnimationOrder = PATHS_CONNECTIONS.map(p => ({ ...p })).sort((a, b) => a.order - b.order);
    
    return frameConfig;
  }
  
  /**
   * Legacy method for backward compatibility—delegates to new interpolatePhaseWithTransition
   */
  interpolatePhase(baseConfig, progress, phase, phaseProgress, easingName) {
    return this.interpolatePhaseWithTransition(
      baseConfig, progress,
      phase, phaseProgress, easingName,
      phase, phaseProgress, easingName,  // No next phase blending
      0  // No transition blend
    );
  }
  
  /**
   * Validate configuration against schema
   */
  static validate(options = {}) {
    const errors = [];
    
    // Phase timing must be monotonically increasing
    const aw = options.phaseAwakening_start || 0.0;
    const asc = options.phaseAscension_start || 0.20;
    const rad = options.phaseRadiance_start || 0.60;
    const desc = options.phaseDescentstart || 0.85;
    
    if (!(aw < asc && asc < rad && rad < desc)) {
      errors.push('Phase timing must be monotonic: awakening < ascension < radiance < descent');
    }
    
    // Validate all alpha parameters are [0, 1]
    for (const key of Object.keys(options)) {
      if (key.includes('Alpha')) {
        const val = options[key];
        if (typeof val === 'number' && (val < 0 || val > 1)) {
          errors.push(`${key} must be between 0 and 1, got ${val}`);
        }
      }
    }
    
    // Validate glow intensity is reasonable
    for (const key of Object.keys(options)) {
      if (key.includes('Glow')) {
        const val = options[key];
        if (typeof val === 'number' && val < 0) {
          errors.push(`${key} must be >= 0, got ${val}`);
        }
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}