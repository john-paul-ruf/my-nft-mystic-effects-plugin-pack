/**
 * Mathematical interpolation utilities for animation
 */

import { EasingFunctions } from './EasingFunctions.js';

export class AnimationInterpolator {
  /**
   * Linear interpolation with easing
   * @param {number} from - Start value
   * @param {number} to - End value
   * @param {number} progress - Progress [0, 1]
   * @param {string} easingFnName - Easing function name
   * @returns {number} Interpolated value
   */
  lerp(from, to, progress, easingFnName = 'linear') {
    // Clamp progress to [0, 1]
    progress = Math.max(0, Math.min(1, progress));
    
    // Get easing function
    const easingFn = EasingFunctions[easingFnName];
    if (!easingFn) {
      console.warn(`Unknown easing: ${easingFnName}, using linear`);
      return this._linearLerp(from, to, progress);
    }
    
    // Apply easing to progress
    const eased = easingFn(progress);
    
    // Interpolate
    return from + (to - from) * eased;
  }
  
  /**
   * Simple linear interpolation
   */
  _linearLerp(from, to, progress) {
    return from + (to - from) * progress;
  }
  
  /**
   * Interpolate color between two hex codes
   */
  lerpColor(fromHex, toHex, progress) {
    const from = this._hexToRgb(fromHex);
    const to = this._hexToRgb(toHex);
    
    const r = Math.round(this._linearLerp(from.r, to.r, progress));
    const g = Math.round(this._linearLerp(from.g, to.g, progress));
    const b = Math.round(this._linearLerp(from.b, to.b, progress));
    
    return this._rgbToHex(r, g, b);
  }
  
  _hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }
  
  _rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  }
}