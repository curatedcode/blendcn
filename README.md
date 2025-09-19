# BlendCN
A semantic theme builder for shadcn/ui. BlendCN helps you generate, map, and preview design tokens. You can choose directly from color steps (based on Radix custom colors) or create your own palette.

# Features
- Token Mapping – Assign color steps or custom values to shadcn/ui tokens
- Live Component Previews – Instantly see how your theme affects all of the shadcn/ui elements
- Palette Ramp Visualizer – Scan and compare color steps across semantic roles
- Export-Ready Tokens – Generate css variables for shadcn/ui

# Component Showcase
- Forms – Inputs, selects, sliders, switches
- Feedback – Alerts, toasts, skeletons
- Navigation – Tabs, breadcrumbs, sidebar
- Overlays – Dialogs, drawers, tooltips, popovers
- Identity – Avatars and badges
- Data – Tables and charts
- Layout – Carousels, resizable panels, cards

# Contributing
Thanks for your interest in contributing! Improvements, fixes, and new features that make the system more robust and user-friendly are always welcome.

## Getting started
1. Clone it locally
	```bash
	git clone git@github.com:curatedcode/radix2shadcn.git
	```
2. Install dependencies
   ```bash
   pnpm install
   ```
3. Start dev server
	```bash
	pnpm dev
	```

Running tests
``` bash
pnpm test
pnpm test:unit # only unit tests
pnpm test:e2e  # only e2e tests
```

Linting files (we use biome)
```bash
pnpm check       	# checks for errors
pnpm check:write 	# check and fix errors
```

Use conventional commit prefixes:

`feat:` – New features or enhancements

`fix:` – Bug fixes or visual corrections

`chore:` – Refactors, tooling, or non-user-facing changes

Example:
`git commit -m "feat: add live preview for badge component"`

Create a new branch when working on an issue. Keep PRs focused and scoped. Include a short description of what you changed. Test and lint before submitting.