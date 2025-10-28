/**
 * Easing functions library for animation
 */

export const EasingFunctions = {
  // Linear (no easing)
  linear: (t) => t,
  
  // Ease In (accelerate)
  easeInCubic: (t) => t * t * t,
  easeInQuart: (t) => t * t * t * t,
  
  // Ease Out (decelerate)
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
  
  // Ease In/Out
  easeInOutCubic: (t) => t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2,
  
  // Smooth step (naturally eases both directions)
  smoothstep: (t) => t * t * (3 - 2 * t),
  
  // Smoother step (even smoother easing)
  smootherstep: (t) => t * t * t * (t * (t * 6 - 15) + 10),
  
  // Elastic bounce effect
  easeOutElastic: (t) => {
    const c5 = (2 * Math.PI) / 4.5;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c5) + 1;
  }
};