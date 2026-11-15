# Behind the scenes

This document explains how *Elemental: The Last Classifier* works, for project reviewers.

## 1. Architecture

Plain HTML, CSS and JavaScript. No framework, no build tools, no backend.

| File | Role |
|---|---|
| `index.html` | Screens: Start, Realms map, Play (arena), Classifier Lab, Codex. Plus a modal used for briefings, rewards and the player manager. |
| `styles.css` | Theme (CSS variables per element), cards, book layout, arena HUD. |
| `game.js` | Everything else, in labelled sections (below). |

## 2. `game.js` map

1. **Data and model**: `RAW` lists 20 creatures (temperature, moisture, density, energy). `DATA` adds labels. `TRAIN` / `TEST` is a deterministic split (every 5th creature is test). `knn()` and `loo()` (leave-one-out) are the classifier.
2. **Save system**: `DB` holds up to 4 players in `localStorage`. `S` is the active player's state (`hero`, `xp`, `done[]`). `save()`, `loadP()`, `resetP()`, `delP()`.
3. **Screens**: `go(id)` switches the visible `<section>`. `drawMap()` and `intro()` build the realm cards and the how-to-play briefing.
4. **Arena engine**: `start(i)` builds a level (entities, wisps, door). `upd(dt)` updates the world and `draw()` renders it on a `<canvas>` (parallax background, ground, entities, guardian sprite, particles). `loop()` is the `requestAnimationFrame` game loop.
5. **Powers**: `cast()` implements Fireball (projectile), Water Shield (timed invulnerability), Freeze (timer on all wisps) and Stone Barrier (temporary blocker). Powers cost energy that regenerates. `unl()` decides which powers are unlocked.
6. **Dialogs**: `dlgCls`, `dlgTab` and `dlgTune` open the classification, label-judging and K-tuning panels. They pause the game while open.
7. **Win / lose**: `win()` grants XP, a relic and possibly a new power. `die()` plays the fall animation and shows the retry screen.
8. **Codex book**: `SPREADS` defines each page spread. `turn()` flips pages with a CSS animation. Locked powers render a "?" but keep their description.
9. **Lab**: `plot()` paints the decision regions by running `knn()` on a 30×30 grid, then draws data points, the unknown creature and its neighbour lines.

## 3. The KNN classifier

```js
const dist=(a,b)=>Math.hypot(...a.map((v,i)=>v-b[i]));
function knn(f,tr,k){
  const nb=tr.map(d=>({d,x:dist(f,d.f)})).sort((a,b)=>a.x-b.x).slice(0,k), v={};
  nb.forEach(n=>v[n.d.label]=(v[n.d.label]||0)+1);          // votes
  /* winner = most votes, ties broken by the closest neighbour */
}
```

- Small K follows noise (it can overfit). Large K blurs the boundary (it can underfit). Realm 4 lets players discover this.
- `loo(d,k)` classifies a creature with itself removed from the training set, so scores are honest.
- Realm 3 uses `TEST`, which the model never trains on, to show **test accuracy**.

## 4. Game design links to the syllabus

Features and labels → training data → train/test and accuracy → decision boundary and K → noisy data. Each realm unlocks the next idea and a new element power.

## 5. Art pipeline

- Realm art: supplied images, cropped and compressed to JPEG. The Ice realm is cropped from the world-map image.
- Guardian sprites: cut from a sprite sheet. Background removal used a flood fill from the image border on dark pixels, followed by blob filtering and edge feathering.
- Logo: hand-written SVG (`assets/logo.svg`), also rendered to PNG.

## 6. Testing

The game was exercised with a headless browser (Playwright): opening the start screen, entering every realm, classifying creatures, judging tablets, solving the K puzzle, fighting the boss, dying and retrying, and flipping through the Codex, while watching for console errors.

## 7. Ideas for extension

More creatures and features, a larger dataset with a proper train/validation split, other classifiers (decision tree, naive Bayes) as new realms, and online leaderboards.
