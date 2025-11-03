/**
 * PhaseAnimatedPolygonEffect - Base class for phase-animated effects
 * 
 * Provides a unified animation framework for geometry-based effects with:
 * - 4-phase animation cycle (Awakening → Ascension → Radiance → Descent)
 * - Smooth cross-phase transitions
 * - Optional energy pulse systems
 * - Optional mystic symbol systems
 * - Coordinate transformation and rendering helpers
 * 
 * Subclasses must implement:
 * - getNodePositions() - Define geometry nodes
 * - getPathConnections() - Define path connections
 * 
 * Subclasses can override:
 * - #generate() - Pre-generate geometry data
 * - #renderEffect() - Custom rendering pipeline
 */

import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import { Settings } from 'my-nft-gen/src/core/Settings.js';
import { Canvas2dFactory } from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';

export class PhaseAnimatedPolygonEffect extends LayerEffect {
  static _name_ = 'phase-animated-polygon';
  static _displayName_ = 'Phase Animated Polygon';
  static _description_ = 'Base class for phase-animated polygon effects';
  static _version_ = '1.0.0';
  static _abstract_ = true;

  constructor({
    name,
    requiresLayer = true,
    config = null,
    additionalEffects = [],
    ignoreAdditionalEffects = false,
    settings = new Settings({}),
    frameNumber = 0,
    totalFrames = 1,
  } = {}) {
    super({
      name: name ?? PhaseAnimatedPolygonEffect._name_,
      requiresLayer,
      config,
      additionalEffects,
      ignoreAdditionalEffects,
      settings,
    });

    this.frameNumber = frameNumber;
    this.totalFrames = totalFrames;

    // Lazy-initialized engines (can be null for worker thread safety)
    this.animationEngine = null;
    this.energyPulseEngine = null;
    this.mysticSymbolsEngine = null;

    // Pre-generate any geometry data if needed (subclasses can override)
    this.generate();
  }

  /**
   * Pre-generation hook (called once in constructor)
   * Subclasses can override to pre-compute geometry
   * Protected so subclasses can override
   * @protected
   */
  generate() {
    // Default: nothing. Subclasses can override if needed.
  }

  /**
   * Calculate animation progress (0 to 1, exclusive of 1.0 for perfect looping)
   * CRITICAL: Uses frame/(totalFrames-1) NOT frame/totalFrames
   * 
   * Perfect loop formula:
   * - Frame 0: progress = 0.0 (animation start)
   * - Frame N-1: progress = 1.0 (animation end) 
   * - Frame N loops back to Frame 0 with progress = 0.0 (seamless)
   * 
   * This ensures last frame state mathematically equals first frame state,
   * guaranteeing smooth, seamless animation looping with zero jarring transitions.
   * 
   * @returns {number} Progress from 0.0 to 1.0 (clamped)
   */
  getProgress() {
    if (this.totalFrames <= 1) return 0;
    const progress = this.frameNumber / (this.totalFrames - 1);
    // Clamp to [0, 1] to handle any floating-point precision issues
    return Math.max(0, Math.min(1, progress));
  }

  /**
   * Detect which animation phase we're in (based on progress)
   * @param {number} progress - Animation progress (0-1)
   * @returns {string} Phase name: 'awakening' | 'ascension' | 'radiance' | 'descent'
   */
  getCurrentPhase(progress) {
    const awakeStart = this.config.phaseAwakening_start ?? 0.0;
    const ascStart = this.config.phaseAscension_start ?? 0.20;
    const radStart = this.config.phaseRadiance_start ?? 0.60;
    const descStart = this.config.phaseDescentstart ?? 0.85;

    if (progress < ascStart) return 'awakening';
    if (progress < radStart) return 'ascension';
    if (progress < descStart) return 'radiance';
    return 'descent';
  }

  /**
   * Normalize progress to phase boundaries (0→1 within phase)
   * @param {number} progress - Overall animation progress (0-1)
   * @param {string} phase - Phase name
   * @returns {number} Progress within phase (0-1)
   */
  getPhaseProgress(progress, phase) {
    const boundaries = {
      awakening: [0.0, this.config.phaseAscension_start ?? 0.20],
      ascension: [this.config.phaseAscension_start ?? 0.20, this.config.phaseRadiance_start ?? 0.60],
      radiance: [this.config.phaseRadiance_start ?? 0.60, this.config.phaseDescentstart ?? 0.85],
      descent: [this.config.phaseDescentstart ?? 0.85, 1.0],
    };

    const [start, end] = boundaries[phase];
    if (start === end) return 0;
    return (progress - start) / (end - start);
  }

  /**
   * Get phase boundaries for all phases
   * @returns {Object} Map of phase names to [start, end] tuples
   */
  getPhaseBoundaries() {
    return {
      awakening: [0.0, this.config.phaseAscension_start ?? 0.20],
      ascension: [this.config.phaseAscension_start ?? 0.20, this.config.phaseRadiance_start ?? 0.60],
      radiance: [this.config.phaseRadiance_start ?? 0.60, this.config.phaseDescentstart ?? 0.85],
      descent: [this.config.phaseDescentstart ?? 0.85, 1.0],
    };
  }

  /**
   * Main entry point - called once per frame by my-nft-gen
   * @param {Layer} layer - Target rendering layer
   * @param {number} currentFrame - Current frame number
   * @param {number} numberOfFrames - Total number of frames
   */
  async invoke(layer, currentFrame, numberOfFrames) {
    try {
      // Update frame tracking
      this.frameNumber = currentFrame ?? 0;
      this.totalFrames = numberOfFrames ?? 1;

      // Get canvas dimensions
      const width = this.finalSize?.width || this.canvas?.width || 1024;
      const height = this.finalSize?.height || this.canvas?.height || 1024;

      // Calculate current progress (0-1, perfect loop)
      const progress = this.getProgress();

      // Create new canvas for rendering
      const renderCanvas = await Canvas2dFactory.getNewCanvas(width, height);

      // Synthesize frame-specific animation config
      const frameConfig = this.synthesizeAnimationFrame(progress);

      // Render the effect (delegated to subclass or use default)
      await this.renderEffect(renderCanvas, width, height, frameConfig, progress);

      // Convert to layer and composite onto main canvas
      const renderedLayer = await renderCanvas.convertToLayer();

      // Apply layer opacity
      const layerOpacity = this.config.layerOpacity || 1.0;
      await renderedLayer.adjustLayerOpacity(layerOpacity);

      await layer.compositeLayerOver(renderedLayer);

      // Call parent for effect chaining
      await super.invoke(layer, currentFrame, numberOfFrames);
    } catch (error) {
      console.error(`${this.constructor._displayName_} error:`, error);
      throw error;
    }
  }

  /**
   * Detect if we're in a transition zone between phases and get blend amount
   * @protected
   * @param {number} progress - Overall animation progress (0-1)
   * @returns {Object} { inTransition: boolean, blendAmount: 0-1, currentPhase, nextPhase }
   */
  getTransitionInfo(progress) {
    const transitionWidth = this.config.transitionZoneWidth ?? 0.05; // Default 5% transition
    const boundaries = this.getPhaseBoundaries();
    const phases = ['awakening', 'ascension', 'radiance', 'descent'];

    // Check each phase boundary for transition zone
    for (let i = 0; i < phases.length - 1; i++) {
      const currentPhase = phases[i];
      const nextPhase = phases[i + 1];
      const phaseEnd = boundaries[currentPhase][1];

      // Calculate transition zone: [phaseEnd - transitionWidth, phaseEnd]
      const transitionStart = phaseEnd - transitionWidth;
      const transitionEnd = phaseEnd;

      if (progress >= transitionStart && progress < transitionEnd) {
        const blendAmount = (progress - transitionStart) / transitionWidth;
        return { inTransition: true, blendAmount, currentPhase, nextPhase };
      }
    }

    // Not in transition zone
    return { inTransition: false, blendAmount: 0, currentPhase: this.getCurrentPhase(progress), nextPhase: null };
  }

  /**
   * Synthesize frame-specific animation config based on progress
   * Handles phase transitions and smooth parameter interpolation with cross-phase blending
   * Protected so subclasses can call it or override it
   * @protected
   * @param {number} progress - Overall animation progress (0-1)
   * @returns {Object} Frame-specific configuration with smooth transitions
   */
  synthesizeAnimationFrame(progress) {
    const transitionInfo = this.getTransitionInfo(progress);
    const phase = transitionInfo.currentPhase;
    const phaseProgress = this.getPhaseProgress(progress, phase);
    const easingName = this.config[`${phase}Easing`] || 'linear';

    // Create frame config with interpolated values
    const frameConfig = { ...this.config };

    // === SMOOTH NODE ALPHA TRANSITION ===
    const alphaKey = `${phase}NodeAlpha`;
    if (this.config[alphaKey] !== undefined) {
      const from = this.config[`${phase}NodeAlpha_start`] || this.config[alphaKey];
      const to = this.config[`${phase}NodeAlpha_end`] || this.config[alphaKey];
      let nodeAlpha = this.lerp(from, to, phaseProgress, easingName);

      // Blend with next phase if in transition zone
      if (transitionInfo.inTransition && transitionInfo.nextPhase) {
        const nextPhase = transitionInfo.nextPhase;
        const nextFrom = this.config[`${nextPhase}NodeAlpha_start`] || this.config[`${nextPhase}NodeAlpha`];
        const nextTo = this.config[`${nextPhase}NodeAlpha_end`] || this.config[`${nextPhase}NodeAlpha`];
        const nextEasingName = this.config[`${nextPhase}Easing`] || 'linear';
        const nextNodeAlpha = this.lerp(nextFrom, nextTo, 0, nextEasingName); // Blend from start of next phase
        nodeAlpha = this.lerp(nodeAlpha, nextNodeAlpha, transitionInfo.blendAmount, 'smoothstep');
      }

      frameConfig.nodeAlpha = nodeAlpha;
    }

    // === SMOOTH PATH INTENSITY TRANSITION ===
    const pathIntensityKey = `${phase}PathIntensity`;
    if (this.config[pathIntensityKey] !== undefined) {
      const from = this.config[`${phase}PathIntensity_start`] || this.config[pathIntensityKey];
      const to = this.config[`${phase}PathIntensity_end`] || this.config[pathIntensityKey];
      let pathIntensity = this.lerp(from, to, phaseProgress, easingName);

      // Blend with next phase if in transition zone
      if (transitionInfo.inTransition && transitionInfo.nextPhase) {
        const nextPhase = transitionInfo.nextPhase;
        const nextFrom = this.config[`${nextPhase}PathIntensity_start`] || this.config[`${nextPhase}PathIntensity`];
        const nextTo = this.config[`${nextPhase}PathIntensity_end`] || this.config[`${nextPhase}PathIntensity`];
        const nextPathIntensity = this.lerp(nextFrom, nextTo, 0, easingName);
        pathIntensity = this.lerp(pathIntensity, nextPathIntensity, transitionInfo.blendAmount, 'smoothstep');
      }

      frameConfig.pathIntensity = pathIntensity;
    }

    // === SMOOTH PATH ANIMATION SPEED TRANSITION ===
    let pathAnimSpeed = this.config[`${phase}PathAnimSpeed`] || this.config.pathAnimSpeed || 1.0;
    
    if (transitionInfo.inTransition && transitionInfo.nextPhase) {
      const nextPhase = transitionInfo.nextPhase;
      const nextPathAnimSpeed = this.config[`${nextPhase}PathAnimSpeed`] || this.config.pathAnimSpeed || 1.0;
      pathAnimSpeed = this.lerp(pathAnimSpeed, nextPathAnimSpeed, transitionInfo.blendAmount, 'smoothstep');
    }

    frameConfig.pathAnimSpeed = pathAnimSpeed;

    return frameConfig;
  }

  /**
   * Main rendering pipeline - subclasses can override for custom behavior
   * Protected so subclasses can call super.renderEffect() or override completely
   * @protected
   * @param {Canvas2d} canvas - Render canvas
   * @param {number} width - Canvas width
   * @param {number} height - Canvas height
   * @param {Object} frameConfig - Frame-specific configuration
   * @param {number} progress - Overall animation progress
   */
  async renderEffect(canvas, width, height, frameConfig, progress) {
    // Default implementation: render nodes and paths
    await this.renderNodes(canvas, width, height, frameConfig, progress);
    await this.renderPaths(canvas, width, height, frameConfig, progress);

    // Optional: render energy effects
    if (this.config.enableEnergyPulses) {
      await this.renderEnergyEffects(canvas, width, height, frameConfig, progress);
    }

    // Optional: render symbols
    if (this.config.enableMysticSymbols) {
      await this.renderSymbols(canvas, width, height, frameConfig, progress);
    }
  }

  /**
   * Render all nodes with phase-based animation
   * Protected so subclasses can call or override
   * @protected
   */
  async renderNodes(canvas, width, height, frameConfig, progress) {
    const nodes = this.getNodePositions();
    const nodeAlpha = frameConfig.nodeAlpha ?? 1.0;
    const nodeSize = this.config.nodeSize ?? 20;

    for (const node of nodes) {
      const pixelPos = this.transformCoordinate(node.x, node.y, width, height);

      // Draw node
      await canvas.drawFilledPolygon2d(
        nodeSize,
        pixelPos,
        6, // hexagon (can customize per geometry)
        0,
        node.color || '#FFFFFF',
        nodeAlpha
      );

      // Draw glow
      const nodeGlowSize = this.config.nodeGlowSize ?? 25;
      await canvas.drawRing2d(
        pixelPos,
        nodeGlowSize,
        3,
        node.glowColor || '#FFFF00',
        0,
        nodeAlpha * 0.5
      );
    }
  }

  /**
   * Render all paths with phase-based animation
   * Protected so subclasses can call or override
   * @protected
   */
  async renderPaths(canvas, width, height, frameConfig, progress) {
    const nodes = this.getNodePositions();
    const paths = this.getPathConnections();
    const pathIntensity = frameConfig.pathIntensity ?? 1.0;
    const pathThickness = (this.config.pathThickness || 2) * (this.config.pathSizeScale || 1.0);

    for (let i = 0; i < paths.length; i++) {
      const [nodeAIdx, nodeBIdx] = paths[i];
      const nodeA = nodes[nodeAIdx];
      const nodeB = nodes[nodeBIdx];

      if (!nodeA || !nodeB) continue;

      const posA = this.transformCoordinate(nodeA.x, nodeA.y, width, height);
      const posB = this.transformCoordinate(nodeB.x, nodeB.y, width, height);

      await canvas.drawLine2d(
        posA,
        posB,
        pathThickness,
        '#FFFFFF',
        1,
        '#FFFF00',
        pathIntensity
      );
    }
  }

  /**
   * Render energy effects (pulses, auras, etc.)
   * Can be overridden by subclasses
   * @protected
   */
  async renderEnergyEffects(canvas, width, height, frameConfig, progress) {
    // Default: do nothing. Subclasses can override to render energy effects.
    // See EnergyPulseEngine integration for detailed example.
  }

  /**
   * Render mystic symbols
   * Can be overridden by subclasses
   * @protected
   */
  async renderSymbols(canvas, width, height, frameConfig, progress) {
    // Default: do nothing. Subclasses can override to render symbols.
    // See MysticSymbolsEngine integration for detailed example.
  }

  /**
   * Transform normalized coordinates (0-1) to canvas pixels
   * Handles scaling and centering
   * Protected so subclasses can call it
   * @protected
   * @param {number} normalizedX - X coordinate (0-1)
   * @param {number} normalizedY - Y coordinate (0-1)
   * @param {number} width - Canvas width
   * @param {number} height - Canvas height
   * @returns {Object} {x, y} in canvas coordinates
   */
  transformCoordinate(normalizedX, normalizedY, width, height) {
    const scale = this.config.scale ?? 1.0;
    const centerX = this.config.centerX !== undefined ? this.config.centerX : 0.5;
    const centerY = this.config.centerY !== undefined ? this.config.centerY : 0.5;

    // Scale around 0.5
    const scaledX = 0.5 + (normalizedX - 0.5) * scale;
    const scaledY = 0.5 + (normalizedY - 0.5) * scale;

    // Shift to center position
    const x = (scaledX - 0.5) + centerX;
    const y = (scaledY - 0.5) + centerY;

    return {
      x: x * width,
      y: y * height,
    };
  }

  /**
   * Linear interpolation with easing
   * Protected so subclasses can call it
   * @protected
   * @param {number} from - Starting value
   * @param {number} to - Ending value
   * @param {number} progress - Progress (0-1)
   * @param {string} easingName - Easing function name
   * @returns {number} Interpolated value
   */
  lerp(from, to, progress, easingName = 'linear') {
    // Clamp progress
    progress = Math.max(0, Math.min(1, progress));

    // Apply easing
    const eased = this.applyEasing(progress, easingName);

    // Interpolate
    return from + (to - from) * eased;
  }

  /**
   * Apply easing function by name
   * Protected so subclasses can call it
   * @protected
   * @param {number} progress - Progress value (0-1)
   * @param {string} easingName - Name of easing function
   * @returns {number} Eased progress (0-1)
   */
  applyEasing(progress, easingName) {
    const easings = {
      linear: (t) => t,
      easeInCubic: (t) => t * t * t,
      easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
      easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      smoothstep: (t) => t * t * (3 - 2 * t),
      easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
      easeInQuart: (t) => t * t * t * t,
      easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
      easeInQuint: (t) => t * t * t * t * t,
      easeOutQuint: (t) => 1 - Math.pow(1 - t, 5),
      easeInOutQuint: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2),
      easeInExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
      easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      easeInOutElastic: (t) => {
        const c5 = (2 * Math.PI) / 4.5;
        return t === 0 ? 0 : t === 1 ? 1 : t < 0.5
          ? -(Math.pow(2, 20 * t - 10) * Math.sin((t * 10 - 11.125) * c5)) / 2
          : (Math.pow(2, -20 * t + 10) * Math.sin((t * 10 - 11.125) * c5)) / 2 + 1;
      },
      easeInOutBack: (t) => {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return t < 0.5
          ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
          : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
      },
    };

    const fn = easings[easingName] || easings.linear;
    return fn(progress);
  }

  /**
   * Extract colors from ColorPicker instances
   * Handles fallback defaults if ColorPicker returns undefined
   * Protected so subclasses can call it
   * @protected
   * @returns {Object} Map of color names to hex strings
   */
  extractColors() {
    const defaultColors = {
      nodeColor: '#FFFFFF',
      pathColor: '#FFFFFF',
      glowColor: '#FFFF00',
    };

    const settings = this.settings || new Settings({});

    return {
      nodeColor: this.config.nodeColor?.getColor?.(settings) || defaultColors.nodeColor,
      pathColor: this.config.pathColor?.getColor?.(settings) || defaultColors.pathColor,
      glowColor: this.config.glowColor?.getColor?.(settings) || defaultColors.glowColor,
    };
  }

  /**
   * === ABSTRACT METHODS (Subclasses MUST implement) ===
   */

  /**
   * Define node positions for this geometry
   * @abstract
   * @returns {Array<{id, name, x, y, color?, glowColor?, metadata...}>}
   *   - id: unique node identifier (number)
   *   - name: human-readable name (string)
   *   - x, y: normalized coordinates (0-1)
   *   - color: optional node color (hex string)
   *   - glowColor: optional glow color (hex string)
   *   - metadata: any additional properties
   */
  getNodePositions() {
    throw new Error(
      `${this.constructor.name}.getNodePositions() must be implemented by subclass`
    );
  }

  /**
   * Define path/connection relationships
   * @abstract
   * @returns {Array<[nodeIndexA, nodeIndexB]>}
   *   - Each pair connects two nodes by index
   *   - Order may define animation sequence
   */
  getPathConnections() {
    throw new Error(
      `${this.constructor.name}.getPathConnections() must be implemented by subclass`
    );
  }

  /**
   * Optional: Define geometry metadata
   * @returns {Object}
   *   - name: geometry name
   *   - description: what this represents
   *   - nodeCount: how many nodes
   *   - pathCount: how many paths
   */
  getGeometryMetadata() {
    const nodes = this.getNodePositions();
    const paths = this.getPathConnections();
    return {
      name: this.constructor._displayName_,
      description: this.constructor._description_,
      nodeCount: nodes.length,
      pathCount: paths.length,
    };
  }
}