# Size and Position Feature Implementation

**Date**: 2025-10-25  
**Status**: ✅ COMPLETE  

## Summary

Added comprehensive size and position controls to the Tree of Life effect, allowing users to:
- Determine where the tree is placed on the canvas
- Control the tree's overall size constraints
- Choose between multiple positioning modes (absolute, center-relative, percentage-based)

## Changes Made

### 1. TreeOfLifeConfig.js
Added 6 new configuration properties:

```javascript
// Size & Position Control
width = null;                   // null = use full canvas width
height = null;                  // null = use full canvas height
sizeMode = 'full';             // 'full' | 'constrained' | 'custom'
positionX = 0;                 // X offset (interpretation depends on positionMode)
positionY = 0;                 // Y offset (interpretation depends on positionMode)
positionMode = 'absolute';     // 'absolute' | 'center' | 'percentage'
```

### 2. TreeOfLifeEffect.js

#### Added Method: `#calculateRenderingBounds()`
Calculates final rendering bounds based on size and position configuration:
- **Input**: Canvas width/height
- **Output**: Object with `{ x, y, width, height, scale }`
- **Logic**:
  1. Apply size mode → determine dimensions and scale
  2. Apply position mode → calculate offsets
  3. Return final bounds for rendering

#### Added Method: `#generateFrameTree()`
Updated to use calculated bounds for tree generation.

#### Updated Method: `invoke()`
- Creates full-size canvas for positioning
- Calculates bounds at start of each frame
- Applies bounds transformations to:
  - Branch coordinates and thickness
  - Leaf/foliage points
  - Fractal blossom coordinates and radius

## Size Modes

### `'full'` (Default)
Tree uses entire canvas. Generates maximum detail.
```javascript
sizeMode: 'full'
// Result: 1024x1024 tree, scale=1.0
```

### `'constrained'`
Tree is fitted within specified bounds while maintaining aspect ratio.
```javascript
sizeMode: 'constrained'
width: 512
height: 512
// Result: 512x512 tree, scale=0.5 (ensures fit)
```

### `'custom'`
Tree is rendered at exact specified dimensions.
```javascript
sizeMode: 'custom'
width: 600
height: 400
// Result: 600x400 tree, scale=1.0
```

## Position Modes

### `'absolute'` (Default)
Pixel coordinates from top-left corner (0,0).
```javascript
positionMode: 'absolute'
positionX: 100   // 100px from left
positionY: 50    // 50px from top
// Result: Tree rendered starting at (100, 50)
```

### `'center'`
Pixel coordinates relative to canvas center.
```javascript
positionMode: 'center'
positionX: 50    // 50px right of center
positionY: -30   // 30px above center
// Result: Tree offset from canvas center
```

### `'percentage'`
Normalized coordinates (0.0-1.0) as percentage of canvas dimensions.
```javascript
positionMode: 'percentage'
positionX: 0.25  // 25% from left
positionY: 0.5   // 50% from top (centered vertically)
// Result: Tree positioned at percentage-based coordinates
```

## Test Results

### Bounds Calculation Tests ✅

| Test Case | Configuration | Result |
|-----------|---------------|--------|
| Default | sizeMode='full', pos=absolute(0,0) | pos=(0,0), size=1024x1024, scale=1.00 |
| Constrained | sizeMode='constrained'(512x512), pos=center(0,0) | pos=(256,256), size=512x512, scale=0.50 |
| Custom | sizeMode='custom'(400x400), pos=absolute(624,624) | pos=(624,624), size=400x400, scale=1.00 |
| Percentage | sizeMode='constrained'(600x600), pos=percentage(0.25,0.5) | pos=(256,512), size=600x600, scale=0.59 |

### Rendering Tests ✅

- **Frames rendered**: 3/3 ✅
- **Average render time**: 380ms per frame
- **Debug output**: Bounds logging shows correct calculations
- **Visual verification**: Trees render with proper positioning and scaling

## Integration

### With Animation
- Size and position transformations are applied **every frame**
- Blossoms fall within configured bounds
- Physics engine uses correct canvas height from bounds

### With Colors
- Color system unaffected
- Works with all color picker configurations

### With Existing Transforms
- `scale` parameter: Overall effect scale multiplier (applied after size mode)
- `offsetX`, `offsetY`: Additional pixel offsets (for fine-tuning)
- New size/position controls take precedence in rendering pipeline

## Performance Impact

- **Negligible**: Bounds calculation is O(1)
- **Minimal**: Coordinate transformations happen only at render time
- **No geometry changes**: Tree geometry generation unchanged

## Debug Output Example

```
[TreeOfLifeEffect] Frame 0/5: time=0.000, blossom_visibility=0.00, fall_progress=0.00
[TreeOfLifeEffect] Rendering bounds: pos=(256,256), size=512x512, scale=0.50
[TreeOfLifeEffect] Rendering 45 branches
[TreeOfLifeEffect] Rendering 18 leaves
[TreeOfLifeEffect] ✅ Frame rendering complete
```

## Files Modified

1. `/src/effects/primaryEffects/TreeOfLife/TreeOfLifeConfig.js`
   - Added 6 new config properties

2. `/src/effects/primaryEffects/TreeOfLife/TreeOfLifeEffect.js`
   - Added `#calculateRenderingBounds()` method
   - Updated `#generateFrameTree()` to use bounds
   - Refactored `invoke()` to apply transformations

3. `/docs/SIZE_AND_POSITION_GUIDE.md` (NEW)
   - User-facing documentation with examples

4. `/scripts/testSizeAndPosition.js` (NEW)
   - Test script demonstrating bounds calculations

## Usage Examples

### Example: Small tree centered on canvas
```javascript
const config = new TreeOfLifeConfig({
  sizeMode: 'constrained',
  width: 500,
  height: 500,
  positionMode: 'center',
  positionX: 0,
  positionY: 0,
});
```

### Example: Tree in corner
```javascript
const config = new TreeOfLifeConfig({
  sizeMode: 'custom',
  width: 400,
  height: 400,
  positionMode: 'absolute',
  positionX: 624,
  positionY: 624,
});
```

### Example: Multiple trees (quad layout)
Create 4 TreeOfLifeConfig instances with different positions:
- Top-left: (0, 0)
- Top-right: (624, 0)
- Bottom-left: (0, 624)
- Bottom-right: (624, 624)

## Backward Compatibility

✅ **Fully backward compatible**
- Default values maintain existing behavior
- Old code using only `scale`, `offsetX`, `offsetY` still works
- New properties are optional

## Next Steps

To use the new size and position features:

1. Import `TreeOfLifeConfig`
2. Create config with size/position properties
3. Create `TreeOfLifeEffect` with custom config
4. Render as usual

```bash
# Test with default configuration:
node scripts/renderTestLoopDirect.js --effect tree-of-life --frames 10

# Test with presets (if implemented):
node scripts/renderTestLoopDirect.js --effect tree-of-life --frames 10 --preset compact
```