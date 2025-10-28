/**
 * My NFT Mystic Effects Plugin Pack
 * 
 * Central registry and entry point for all custom effects plugins.
 * This module exports all effects and provides a register function
 * to integrate them with the main my-nft-gen effect system.
 */

// Plugin metadata
export const name = 'my-nft-mystic-effects-plugin-pack';
export const version = '1.0.0';

/**
 * Register all effects with the effect registry
 * 
 * @param {Object} EffectRegistry - The effect registry instance from my-nft-gen
 * @param {Object} PositionRegistry - The position registry instance from my-nft-gen
 * @returns {Promise<void>}
 * 
 * @example
 * import { register } from 'my-nft-mystic-effects-plugin-pack';
 * import { effectRegistry, positionRegistry } from 'my-nft-gen';
 * 
 * await register(effectRegistry, positionRegistry);
 */
export async function register(EffectRegistry, PositionRegistry) {
  try {
    console.log('🔄 [Plugin] Starting registration...');
    console.log('🔄 [Plugin] Current file:', import.meta.url);
    console.log('🔄 [Plugin] EffectRegistry:', EffectRegistry ? 'Available' : 'Missing');
    console.log('🔄 [Plugin] PositionRegistry:', PositionRegistry ? 'Available' : 'Missing');
    
    // Import EffectCategories
    console.log('📦 [Plugin] Importing EffectCategories...');
    const { EffectCategories } = await import('my-nft-gen/src/core/registry/EffectCategories.js');
    
    // Import Animated Tree of Life effect
    console.log('📦 [Plugin] Importing Animated Tree of Life effect...');
    const { AnimatedKabbalisticTreeKeyFrameEffect } = await import('./effects/primaryEffects/AnimatedTreeOfLife/AnimatedKabbalisticTreeKeyFrameEffect.js');
    const { AnimatedTreeOfLifeConfig } = await import('./effects/primaryEffects/AnimatedTreeOfLife/AnimatedTreeOfLifeConfig.js');
    
    // Import presets
    console.log('📦 [Plugin] Importing animation presets...');
    const { 
      HERMETIC_ASCENT, 
      CHAKRA_SPIN, 
      ALCHEMICAL_TRANSMUTATION,
      CINEMATIC,
      GEOMETRIC,
      ETHEREAL,
      MINIMALIST,
      QUANTUM,
      OPERATOR_OVERLOAD
    } = await import('./effects/primaryEffects/AnimatedTreeOfLife/presets/index.js');
    
    // Set config class references
    console.log('⚙️ [Plugin] Setting config class references...');
    AnimatedKabbalisticTreeKeyFrameEffect._configClass_ = AnimatedTreeOfLifeConfig;
    
    // Set presets for the effect (PresetRegistry format - matching my-nft-zencoder pattern)
    console.log('🎨 [Plugin] Setting presets for effects...');
    AnimatedKabbalisticTreeKeyFrameEffect.presets = [
      {
        name: 'hermetic-ascent',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: HERMETIC_ASCENT
      },
      {
        name: 'chakra-spin',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: CHAKRA_SPIN
      },
      {
        name: 'alchemical-transmutation',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: ALCHEMICAL_TRANSMUTATION
      },
      {
        name: 'cinematic',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: CINEMATIC
      },
      {
        name: 'geometric',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: GEOMETRIC
      },
      {
        name: 'ethereal',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: ETHEREAL
      },
      {
        name: 'minimalist',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: MINIMALIST
      },
      {
        name: 'quantum',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: QUANTUM
      },
      {
        name: 'operator-overload',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: OPERATOR_OVERLOAD
      }
    ];
    
    console.log(`✅ [Plugin] Presets set for effects (count: ${AnimatedKabbalisticTreeKeyFrameEffect.presets.length})`);
    console.log('🔄 [Plugin] All imports successful, registering effects...');
    
    // Register Animated Tree of Life as PRIMARY effect
    console.log(`📦 Effect name: ${AnimatedKabbalisticTreeKeyFrameEffect._name_}`);
    if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(AnimatedKabbalisticTreeKeyFrameEffect._name_)) {
      console.log(`ℹ️ Effect '${AnimatedKabbalisticTreeKeyFrameEffect._name_}' is already registered, skipping...`);
    } else {
      EffectRegistry.registerGlobal(AnimatedKabbalisticTreeKeyFrameEffect, EffectCategories.PRIMARY, {
        displayName: AnimatedKabbalisticTreeKeyFrameEffect._displayName_ || 'Animated Tree of Life',
        description: AnimatedKabbalisticTreeKeyFrameEffect._description_ || 'An animated kabbalistic tree with dynamic phase transitions, sacred geometry, and mystical energy visualization.',
        version: AnimatedKabbalisticTreeKeyFrameEffect._version_ || '1.0.0',
        author: AnimatedKabbalisticTreeKeyFrameEffect._author_ || 'Mystic Effects Pack',
        tags: AnimatedKabbalisticTreeKeyFrameEffect._tags_ || ['effect', 'primary', 'tree', 'animated', 'kabbalah', 'sacred-geometry', 'mystical']
      });
      console.log(`✅ Registered: ${AnimatedKabbalisticTreeKeyFrameEffect._name_} as PRIMARY effect`);
    }
    
    console.log('✅ [Plugin] All effects registered successfully');
    
  } catch (error) {
    console.error('❌ [Plugin] Error during registration:', error);
    throw error;
  }
}

/**
 * Export individual effect categories for selective imports
 */
export { AnimatedKabbalisticTreeKeyFrameEffect, AnimatedTreeOfLifeConfig } from './effects/primaryEffects/index.js';