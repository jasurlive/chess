import { Chess, type Move, type Square } from 'chess.js'

type MoveResult = {
  valid: boolean
  move: Move | null
  updatedFen: string
}

// thin wrapper around chess.js so pages don't touch it directly
export default class GameLogic {
  private game: Chess

  constructor(fen?: string) {
    this.game = new Chess(fen)
  }

  getFen(): string {
    return this.game.fen()
  }

  getInstance(): Chess {
    return this.game
  }

  getTurn(): 'w' | 'b' {
    return this.game.turn()
  }

  move(from: string, to: string, promotion: 'q' | 'r' | 'b' | 'n' = 'q'): MoveResult {
    let move: Move | null = null
    try {
      move = this.game.move({ from: from as Square, to: to as Square, promotion })
    } catch {
      // invalid move, move stays null
    }

    return { valid: !!move, move, updatedFen: this.game.fen() }
  }

  // "Checkmate, White wins" etc., or null while the game is on
  status(): string | null {
    const g = this.game
    if (g.isCheckmate()) return `Checkmate, ${g.turn() === 'w' ? 'Black' : 'White'} wins`
    if (g.isStalemate()) return 'Draw by stalemate'
    if (g.isThreefoldRepetition()) return 'Draw by repetition'
    if (g.isInsufficientMaterial()) return 'Draw, insufficient material'
    if (g.isDraw()) return 'Draw (50-move rule)'
    if (g.inCheck()) return 'Check'
    return null
  }
}
