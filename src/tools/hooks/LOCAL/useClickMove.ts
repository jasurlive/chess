import { useState, type CSSProperties } from 'react'
import type { Move, Square } from 'chess.js'
import GameLogic from '../../lib/logic'
import { handleMoveSounds } from '../../lib/sound'

type Args = {
  gameLogic: GameLogic
  setGameLogic: (logic: GameLogic) => void
  setFen: (fen: string) => void
  onMove?: (move: Move) => void // e.g. flip board orientation, record PGN
}

// click a piece, then click where it goes
export function useClickMove({ gameLogic, setGameLogic, setFen, onMove }: Args) {
  const [selected, setSelected] = useState<string | null>(null)
  const [targets, setTargets] = useState<string[]>([])

  const clear = () => {
    setSelected(null)
    setTargets([])
  }

  const select = (square: string) => {
    const chess = gameLogic.getInstance()
    const piece = chess.get(square as Square)
    if (piece && piece.color === chess.turn() && !chess.isGameOver()) {
      setSelected(square)
      setTargets(chess.moves({ square: square as Square, verbose: true }).map((m) => m.to))
      return true
    }
    return false
  }

  const move = (from: string, to: string) => {
    const logic = new GameLogic(gameLogic.getFen())
    const result = logic.move(from, to, 'q')

    handleMoveSounds(logic.getInstance(), result.move)
    clear()

    if (result.valid && result.move) {
      setGameLogic(logic)
      setFen(result.updatedFen)
      onMove?.(result.move)
    }
  }

  const onSquareClick = (square: string) => {
    if (!selected) return void select(square)
    if (selected === square) return clear()
    // clicking another own piece switches the selection instead of an error
    if (!targets.includes(square) && select(square)) return
    move(selected, square)
  }

  const customSquareStyles: Record<string, CSSProperties> = {}
  if (selected) customSquareStyles[selected] = { background: 'var(--square-selected)' }
  targets.forEach((sq) => {
    customSquareStyles[sq] = {
      backgroundImage: 'radial-gradient(circle, rgba(30,30,30,0.3) 25%, transparent 26%)',
    }
  })

  return {
    onSquareClick,
    customSquareStyles,
    turn: gameLogic.getTurn() === 'b' ? 'black' : 'white',
    status: gameLogic.status(),
  } as const
}
