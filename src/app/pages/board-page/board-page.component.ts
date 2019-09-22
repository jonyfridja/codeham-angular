import { GameDetails } from './../../models/GameDetails';
import { GameService } from './../../services/game.service';
import { Word } from './../../models/Word';
import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  gameDetails: GameDetails;
  teamClass: object;
  wordsLeft = { redTeam: -10, blueTeam: -10 };
  titleMessage = '';
  allRevealed = false;
  constructor(private gameService: GameService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.newGame();
  }
  newGame() {
    if (this.gameDetails) {
      this.gameDetails.isGameRunning = false;
      this.save();
    }
    const gameId = 'CharlieDeltaToronto';
    this.gameService.getGameDetails(gameId).subscribe(gameDetails => {
      this.gameDetails = gameDetails;
      this.gameDetails.isGameRunning = true;
      if (this.gameService.extraWords) this.addExtraWords();
      this.update();
      this.save();
    });
  }

  addExtraWords() {
    const { extraWords } = this.gameService;
    const indexesSwapped = [];
    extraWords.forEach(word => {
      const chanceForSwap = 3 / extraWords.length; // 3 is the desired average of words to swap
      const shouldSwap = Math.random() <= chanceForSwap;
      if (shouldSwap) {
        let rndIdx = this.utilService.getRandomInt(0, this.gameDetails.words.length);
        while (indexesSwapped.some(idx => idx === rndIdx)) {
          rndIdx = this.utilService.getRandomInt(0, this.gameDetails.words.length);
        }
        indexesSwapped.push(rndIdx);
        this.gameDetails.words[rndIdx].word = word;
      }
    })
  }

  toggleRevealAllCards() {
    this.allRevealed = !this.allRevealed;
  }

  save() {
    this.gameService.saveGameDetails(this.gameDetails);
  }

  nextTurn() {
    if (this.gameDetails.isGameRunning) {
      this.gameDetails.whoseTurn =
        this.gameDetails.whoseTurn === 'blue' ? 'red' : 'blue';
      this.update();
      this.save();
    }
  }

  revealWord(revealedWord: Word) {
    if (this.gameDetails.isGameRunning && !this.allRevealed) {
      if (!revealedWord.isRevealed) {
        const word = this.gameDetails.words.find(w => w === revealedWord);
        word.isRevealed = true;
        if (word.whoseTeam === 'death') {
          this.nextTurn();
          this.endGame(this.gameDetails.whoseTurn);
        } else if (!word.whoseTeam || word.whoseTeam !== this.gameDetails.whoseTurn) {
          this.nextTurn();
        }
      }
      this.update();
      this.save();
    }
  }

  endGame(teamWon: string) {
    console.log('ended game!');
    this.titleMessage = `${teamWon} wins!`
    this.gameDetails.isGameRunning = false;
    this.save();
  }

  update() {
    this.updateWordsLeft();
    this.updateTitleMessage();
    this.updateTeamClass();
  }

  updateTitleMessage() {
    if (this.gameDetails.isGameRunning) {
      this.titleMessage = `${this.gameDetails.whoseTurn} team's turn`;
    }
  }

  updateWordsLeft() {
    this.wordsLeft.redTeam =
      this.gameDetails.words.filter(w => w.whoseTeam === 'red' && !w.isRevealed).length;

    this.wordsLeft.blueTeam =
      this.gameDetails.words.filter(w => w.whoseTeam === 'blue' && !w.isRevealed).length

    if (this.wordsLeft.redTeam === 0) {
      this.endGame('red');
    }
    if (this.wordsLeft.blueTeam === 0) {
      this.endGame('blue');
    }
  }
  updateTeamClass() {
    const whoseTeamClass = 'team-' + this.gameDetails.whoseTurn;
    this.teamClass = {
      [whoseTeamClass]: true,
      'team-container': true
    };
  }

}
