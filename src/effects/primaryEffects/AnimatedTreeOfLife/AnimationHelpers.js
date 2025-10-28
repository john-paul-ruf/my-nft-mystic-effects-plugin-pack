/**
 * Utility functions for animation
 */

export function normalizePhaseProgress(progress, phase, config) {
  const boundaries = {
    awakening: [config.phaseAwakening_start || 0.0, config.phaseAscension_start || 0.20],
    ascension: [config.phaseAscension_start || 0.20, config.phaseRadiance_start || 0.60],
    radiance: [config.phaseRadiance_start || 0.60, config.phaseDescentstart || 0.85],
    descent: [config.phaseDescentstart || 0.85, 1.0]
  };
  
  const [start, end] = boundaries[phase];
  if (start === end) return 0;
  return (progress - start) / (end - start);
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function getPhaseAtProgress(progress, config) {
  const aw = config.phaseAwakening_start || 0.0;
  const asc = config.phaseAscension_start || 0.20;
  const rad = config.phaseRadiance_start || 0.60;
  const desc = config.phaseDescentstart || 0.85;
  
  if (progress < asc) return 'awakening';
  if (progress < rad) return 'ascension';
  if (progress < desc) return 'radiance';
  return 'descent';
}