# uzchess
<img width="500" alt="image" src="https://github.com/user-attachments/assets/896267fc-ba9f-470d-be0d-86eae640cc22" />
<img width="500" alt="image" src="https://github.com/user-attachments/assets/b7b92ea8-df51-463f-93f3-fafd134afce2" />

## mobile view:
<img width="120" alt="image" src="https://github.com/user-attachments/assets/dd137991-416a-4418-8c52-f290de7df740" />

## yes, another chess app

---

## features

* play chess locally
* two board modes
* analysis board (arrow keys to step through moves, `F` to flip)
* check / checkmate / draw detection
* works offline after load
* clean minimalistic ui

---

## stack

* react 19 + typescript
* vite 8, react router
* chess.js for the rules
* built on the [django-react](https://github.com/jasurlive/django-react) front template (sidebar menu, light/dark theme with `Ctrl+J`)

---

## installation

```bash
git clone https://github.com/jasurlive/chess.git
cd chess
npm install
npm run dev          # http://localhost:1212
```

needs node 20.19+ or 22.12+. `npm run build` puts the site in `dist/`.

---

## project structure

```
src/
├── ts/                 entry: main.tsx, App.tsx (routes)
└── tools/
    ├── pages/          Home, Chess1, Chess2, Analysis, Online, NotFound
    ├── components/     Layout, Chessboard, PGN, Time, GameStatus
    ├── shared/         Menu (sidebar / mobile bar)
    ├── hooks/LOCAL/    click-to-move, fullscreen, theme, shortcuts
    ├── lib/            game logic (chess.js), sounds
    └── css/
public/assets/          piece images and sounds
```

simple, minimal

---

## roadmap

* [ ] online multiplayer
* [ ] better ui
* [ ] adding stockfish
---

## contributing

PRs are welcome. add a single feature at a time, no rush, no AI.

---

## license

MIT

---

## important note

if you lose, it’s not a bug it’s you.
