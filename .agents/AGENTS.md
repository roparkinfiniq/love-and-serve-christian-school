# LSCS Website Development Guidelines

## 🎨 Brand Colors & Identity
- **Main Primary Color**: `#E11D48` (Rose / Deep Crimson Red)
- **Secondary Accent**: `#1877F2` (Facebook Blue for social integration), `rose-50/100` for soft card backgrounds.
- **Official School Name**: `Love and Serve Christian School Inc.` / `LSCSI`

## 🎬 Motion & Animation
- **Subtle & Slow Motion**: Never use fast/snappy transitions (e.g., 200ms-300ms). Always use smooth, slow, natural, and subtle animations (`duration-500` ~ `duration-700` with `ease-in-out` / `ease-out`).

## 👁️ Icons & Aesthetics
- **Warm & Inspirational Iconography**: Avoid intense/creepy icons (e.g., solid staring eye). Use warm Christian school icons (e.g., compass for vision, hand-holding-heart for mission, cross, seedling).

## 📐 Layout & UX Rules
- **Compact Layouts**: Avoid tall vertically stretched timelines. Prefer compact interactive horizontal tracks/steppers.
- **Custom Toast Validation**: Never trigger HTML5 browser default tooltips (`required`). Always use custom English red Toast alerts (`showToast(..., 'error')`).
- **Gallery Empty State**: When a category has 0 photos, display a friendly empty state card with a `View All Photos` button instead of a blank white space.
- **Asset Optimization**: Keep images web-optimized under 500KB-1.5MB for fast page loading.

## 📝 Maintenance Rule
- Automatically update this document whenever new design rules, colors, or core architecture preferences are updated by the user.
