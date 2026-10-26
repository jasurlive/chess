import type { Chess, Move } from 'chess.js'

const sounds = {
  capture: '/assets/snd/capture.mp3',
  castle: '/assets/snd/castle.mp3',
  error: '/assets/snd/error.mp3',
  gameEnd: '/assets/snd/game-end.mp3',
  gameStart: '/assets/snd/game-start.mp3',
  moveCheck: '/assets/snd/move-check.mp3',
  move: '/assets/snd/move.mp3',
  promote: '/assets/snd/promote.mp3',
}

const cache = new Map<string, HTMLAudioElement>()

function playSound(type: keyof typeof sounds) {
  let audio = cache.get(type)
  if (!audio) {
    audio = new Audio(sounds[type])
    cache.set(type, audio)
  }
  audio.currentTime = 0
  // browsers block audio until the first click; that's fine, just skip it
  audio.play().catch(() => {})
}

export function handleMoveSounds(game: Chess, move: Move | null) {
  if (!move) return playSound('error')

  if (game.isGameOver()) playSound('gameEnd')
  else if (game.inCheck()) playSound('moveCheck')
  else if (move.isCapture()) playSound('capture')
  else if (move.isKingsideCastle() || move.isQueensideCastle()) playSound('castle')
  else if (move.isPromotion()) playSound('promote')
  else playSound('move')
}

export const playGameStartSound = () => playSound('gameStart')
