# Food We Eat Sorter

A dependency-free browser sorting game built from the shared conveyor template. Serve this folder locally (for example, `python3 -m http.server 8000`) and open it in a browser.

## Levels

| Level | Challenge | Containers | Belt items |
| --- | --- | --- | ---: |
| 1 | Parts of Plants We Eat | Fruits, Leaves, Stems, Roots, Seeds | 4 |
| 2 | Plants or Animals? | Plants, Animals | 4 |

Each level uses the supplied food artwork and keeps four evenly spaced foods visible while the next item is continuously staged beyond the belt edge. The first level includes the template's forced, skippable learn-by-doing tutorial. Progress is saved locally.

Backgrounds, start-page artwork, bin artwork, character animation, audio, HUD, and success screens remain template-driven so their art can be replaced independently later.
