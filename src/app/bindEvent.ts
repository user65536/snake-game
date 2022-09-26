import { Game } from '../model/Game';

export const bindEvent = (game: Game) => {
  const handleEnd = () => {
    window.alert('end');
  };
  const handler = (event: KeyboardEvent) => {
    if (event.code === 'Space') game.toggle();
    if (!game.started) return;
    if (event.code === 'ArrowDown') game.moveDown();
    if (event.code === 'ArrowUp') game.moveUp();
    if (event.code === 'ArrowLeft') game.moveLeft();
    if (event.code === 'ArrowRight') game.moveRight();
  };
  document.addEventListener('keydown', handler);
  game.event.on('end', handleEnd);

  return () => {
    document.removeEventListener('keydown', handler);
    game.event.off('end', handleEnd);
  };
};
