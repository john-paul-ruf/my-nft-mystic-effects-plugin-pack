/**
 * Primary Effects Index
 * 
 * Primary effects form the foundation of the generated artwork.
 * They are the main visual transformations applied to the canvas.
 * 
 * Export all primary effect classes here for registration.
 */

// Animated Tree of Life Effect
import { AnimatedKabbalisticTreeKeyFrameEffect } from './AnimatedTreeOfLife/AnimatedKabbalisticTreeKeyFrameEffect.js';
import { AnimatedTreeOfLifeConfig } from './AnimatedTreeOfLife/AnimatedTreeOfLifeConfig.js';

// Chakra Mandala Effect
import { ChakraMandalaEffect } from './ChakraMandala/ChakraMandalaEffect.js';
import { ChakraMandalaConfig } from './ChakraMandala/ChakraMandalaConfig.js';

// Export all primary effects
export {
  AnimatedKabbalisticTreeKeyFrameEffect,
  AnimatedTreeOfLifeConfig,
  ChakraMandalaEffect,
  ChakraMandalaConfig,
};