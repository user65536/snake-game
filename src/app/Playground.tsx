import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useMemo } from 'react';
import { Game } from '../model/Game';
import { bindEvent } from './bindEvent';

export interface PlaygroundProps {
  groundSize: [number, number];
}

const girdSize = 60;

export const Playground: FC<PlaygroundProps> = observer((props) => {
  const { groundSize } = props;
  const game = useMemo(() => new Game({ groundSize }), []);
  (window as any).game = game;

  useEffect(() => {
    return bindEvent(game);
  }, [game]);

  return (
    <div
      style={{
        width: groundSize[0] * girdSize,
        height: groundSize[1] * girdSize,
        border: '1px solid black',
        position: 'relative',
      }}
    >
      {game.snake.body.map((i) => (
        <div
          key={`body-${i[0]}-${i[1]}`}
          style={{
            background: '#0077ff',
            position: 'absolute',
            width: girdSize,
            height: girdSize,
            left: i[0] * girdSize,
            top: i[1] * girdSize,
            // transition: 'all linear .1s',
          }}
        ></div>
      ))}
      <div
        style={{
          background: '#ff8000',
          position: 'absolute',
          width: girdSize,
          height: girdSize,
          left: game.food[0] * girdSize,
          top: game.food[1] * girdSize,
          borderRadius: '50%',
        }}
      ></div>
    </div>
  );
});
