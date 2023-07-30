const Board = require("./Board")
const Player = require("./Player")

class Game {
    constructor(board, players){
        this.players = players
        this.board = board
        this.turn = 0;
        this.isGameEnded = false
    }
    static newGame(player0Name,player1Name){
        if (!player0Name || !player1Name) {
            return("Player names are required.");
        } 
        
        let boardForGame = new Board()
        let player0 = new Player("X", player0Name)
        let player1 = new Player("O", player1Name)

        return new Game(boardForGame, [player0, player1])
    }
    play(cellNumber){
        if (this.isGameEnded){
            return "Game Has Ended"
        }
        if(!Number.isInteger(cellNumber) || cellNumber < 0 || cellNumber > 8) { 
            return "Invalid number"; 
          }

        if (!this.board.isEmpty(cellNumber)){
            return "Cell Not empty"
        }
        let currentPlayer
        if (this.turn %2 == 0){
            currentPlayer = this.players[0]
        } else {
            currentPlayer = this.players[1]
        }
        let cellObj = this.board.getCellObj(cellNumber)
        currentPlayer.markCell(cellObj)
        this.turn++
        this.board.printBoard()
        let [symbolOfWinner, gameStatus] = this.board.analyzeResult()
        if (gameStatus == "continue") {
            return "Continue Playing"
        }
        if (gameStatus == "draw"){
            this.isGameEnded = true
            return "Game Ended as Draw"
        }
        if (symbolOfWinner == this.players[0].symbol){
            this.isGameEnded = true
            return this.players[0].name + " Is Winner "
        }
        else{
            this.isGameEnded = true
            return this.players[1].name + " Is Winner "
        }
    }
}

module.exports = Game





  
  
  
