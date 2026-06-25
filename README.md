# Normal Iframe App Template

Minimal static template for apps embedded inside normal-sized iframes.

## Files

- `styles.css` imports the CSS modules.
- `css/theme.css` contains fonts, colors, dimensions, and reusable variables.
- `css/base.css` contains document defaults, the iframe shell, native app frame, grid, and layout utilities.
- `css/components.css` contains reusable UI components.
- `css/layout.css` contains placement classes for the current screen.

## Size Model

- The iframe host can provide any outer size.
- `.embed-shell` fills the iframe with `100vw` by `100vh`.
- `.app` stays centered at the native app size.
- Extra iframe space is normal padding/background from `--embed-bg`.

## Defaults

- Native app size: `752px` by `564px`
- Font: MADE Tommy Soft, with system fallbacks
- Background: white
- Border: controlled separately with `--border`
- Primary color: `--primary`, used for foreground and active UI
- Secondary color: `--secondary`, used for backgrounds and inverse UI

Change `--native-width` and `--native-height` in `css/theme.css` when starting a template variant.

## GUI Helpers

The template uses a 12 column by 9 row grid inside `.screen`. Component classes describe what an element is. Placement classes describe where it sits.

- `.screen` for the native app canvas and grid
- `.topbar` for a centered header row
- `.content` to keep semantic grouping without affecting grid placement
- `.stack` for vertical spacing
- `.row` for horizontal button groups
- `.center` for centered content
- `.place-header`, `.place-media`, `.place-copy`, and `.place-actions` for example placements
- `.text` with `.text-title`, `.text-heading`, `.text-subheading`, `.text-large`, `.text-body`, `.text-text`, or `.text-footnote` for text styles
- `.button`, `.button-primary`, and `.button-secondary` for actions
- `.image` for responsive images

## Font

Place the MADE Tommy Soft webfonts in:

```text
fonts/
```

The template currently loads these files through `@font-face`:

- `MADE Tommy Soft Light.woff`
- `MADE Tommy Soft Regular.woff`
- `MADE Tommy Soft Medium.woff`
- `MADE Tommy Soft Bold.woff`
