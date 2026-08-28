import { Chess, Move } from "chess.js";

type MoveResult = {
  valid: boolean;
  move: Move | null;
  updatedFen: string;
};

export default class GameLogic {
  private game: Chess;

  constructor(fen?: string) {
    this.game = new Chess(fen);
  }

  getFen(): string {
    return this.game.fen();
  }

  getInstance(): Chess {
    return this.game;
  }

  getTurn(): "w" | "b" {
    return this.game.turn();
  }

  move(from: string, to: string, promotion: "q" | "r" | "b" | "n" = "q"): MoveResult {
    let move: Move | null = null;
    try {
      move = this.game.move({ from, to, promotion });
    } catch {
      // invalid move, move stays null
    }

    return {
      valid: !!move,
      move,
      updatedFen: this.game.fen(),
    };
  }
}
