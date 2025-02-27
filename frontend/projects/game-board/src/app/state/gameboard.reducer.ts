import { createReducer, on } from '@ngrx/store';
import {
  askQuestion,
  getPlayers,
  getRoomCode,
  pause,
  resume,
  setPlayerReadyStatus,
  startGame,
} from './gameboard.actions';
import { Game, GamePhase } from '@models/game';
import { Player } from '@models/player';

const initialState: Game = {
  phase: GamePhase.lobby,
  roomCode: '',
  isPaused: false,
  players: [],
  currentQuestion: { question: '', answer: '', wrongAnswers: [] },
};

export const gameReducer = createReducer(
  initialState,
  on(pause, (state) => ({ ...state, isPaused: true })),
  on(resume, (state) => ({ ...state, isPaused: false })),
  on(getRoomCode, (state, { roomCode }) => ({ ...state, roomCode })),
  on(getPlayers, (state, { players }) => ({ ...state, players })),
  on(setPlayerReadyStatus, (state, { playerId, isReady }) => {
    console.log('isready', playerId, isReady);
    const idx = state.players.findIndex(
      (player: Player) => player.id === playerId
    );

    return {
      ...state,
      players: state.players.map((player: Player) =>
        player.id === state.players[idx].id ? { ...player, isReady } : player
      ),
    };
  }),
  on(startGame, (state) => ({ ...state, phase: GamePhase.gamePlay })),
  on(askQuestion, (state, { question }) => ({
    ...state,
    currentQuestion: question,
  }))
);
