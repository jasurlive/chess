import { Chess, Move } from "chess.js";

type MoveResult = {
  valid: boolean;
  move: Move | null;
  updatedFen: string;
  gameStatus: GameStatus;
};

type GameStatus = {
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  isThreefoldRepetition: boolean;
  isFiftyMoveRule: boolean;
  isCheck: boolean;
  gameOver: boolean;
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

  move(
    from: string,
    to: string,
    promotion: "q" | "r" | "b" | "n" = "q"
  ): MoveResult {
    let move: Move | null = null;
    try {
      move = this.game.move({ from, to, promotion });
    } catch (e) {
      // Invalid move, return immediately
      return {
        valid: false,
        move: null,
        updatedFen: this.game.fen(),
        gameStatus: this.evaluateGameStatus(),
      };
    }

    const gameStatus = this.evaluateGameStatus();

    return {
      valid: !!move,
      move: move || null,
      updatedFen: this.game.fen(),
      gameStatus,
    };
  }

  evaluateGameStatus(): GameStatus {
    return {
      isCheckmate: this.game.isCheckmate(),
      isStalemate: this.game.isStalemate(),
      isDraw: this.game.isDraw(),
      isThreefoldRepetition: this.game.isThreefoldRepetition(),
      isFiftyMoveRule: this.game.isInsufficientMaterial(),
      isCheck: this.game.isCheck(),
      gameOver:
        this.game.isCheckmate() ||
        this.game.isStalemate() ||
        this.game.isDraw() ||
        this.game.isThreefoldRepetition() ||
        this.game.isInsufficientMaterial(),
    };
  }
}
