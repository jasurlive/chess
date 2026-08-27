const sounds = {
  capture: new Audio("/assets/snd/capture.mp3"),
  castle: new Audio("/assets/snd/castle.mp3"),
  error: new Audio("/assets/snd/error.mp3"),
  gameEnd: new Audio("/assets/snd/game-end.mp3"),
  gameStart: new Audio("/assets/snd/game-start.mp3"),
  moveCheck: new Audio("/assets/snd/move-check.mp3"),
  move: new Audio("/assets/snd/move.mp3"),
  premove: new Audio("/assets/snd/premove.mp3"),
  promote: new Audio("/assets/snd/promote.mp3"),
};

function playSound(type: keyof typeof sounds) {
  const sound = sounds[type];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

export function handleMoveSounds(game: any, move: any) {
  if (!move) {
    playSound("error"); // Invalid move
    return;
  }

  if (move.flags.includes("c")) playSound("capture");
  else if (move.flags.includes("k") || move.flags.includes("q"))
    playSound("castle"); // Castling
  else if (move.flags.includes("p")) playSound("promote"); // Promotion
  else playSound("move"); // Regular move

  // Play check sound if in check after move
  if ((game.in_check && game.in_check()) || (game.inCheck && game.inCheck())) {
    playSound("moveCheck");
  }

  if (game.isGameOver && game.isGameOver()) playSound("gameEnd"); // Game Over
}

export function playGameStartSound() {
  playSound("gameStart");
}
