# Normal Iframe App Template

Minimal static template for apps embedded inside normal-sized iframes.

## Size Model

- The iframe host can provide any outer size.
- `.embed-shell` fills the iframe with `100vw` by `100vh`.
- `.app` stays centered at the native app size.
- Extra iframe space is normal padding/background from `--embed-bg`.

## Defaults

- Native app size: `752px` by `564px`
- Font: MADE Tommy Soft, with system fallbacks
- Background: white
- Border: visible app boundary for embedding tests

Change `--native-width` and `--native-height` in `styles.css` when starting a template variant.

## GUI Helpers

The template uses a 12 column by 9 row grid inside `.screen`.

- `.screen` for the native app canvas and grid
- `.topbar` for a centered header row
- `.content` to keep semantic grouping without affecting grid placement
- `.stack` for vertical spacing
- `.row` for horizontal button groups
- `.center` for centered content
- `.grid-header`, `.grid-media`, `.grid-copy`, and `.grid-actions` for example placements
- `.button`, `.button-primary`, and `.button-secondary` for actions
- `.media-frame` for image placeholders
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
