import { createStateCell, StateCellReducer } from '.';

interface Rectangle {
  width: number;
  height: number;
}

interface EnsureRatioMsg {
  ratio: number;
}

interface ScaleMsg {
  scaleFactor: 2;
}

test('basic state test', () => {
  const initialState: Rectangle = {
    width: 3,
    height: 4,
  };
  const scale: StateCellReducer<Rectangle, ScaleMsg> = (state, msg) => ({
    width: state.width * msg.scaleFactor,
    height: state.height * msg.scaleFactor,
  });
  const ensureRatio: StateCellReducer<Rectangle, EnsureRatioMsg> = (
    state,
    msg,
  ) => ({ width: state.width, height: state.width * msg.ratio });

  const msgs = { scale, ensureRatio };
  const stateCell = createStateCell<Rectangle, typeof msgs>(initialState, msgs);

  // original state
  expect(stateCell.state.width).toEqual(3);
  expect(stateCell.state.height).toEqual(4);

  // scale
  stateCell.msg.scale({ scaleFactor: 2 });
  expect(stateCell.state.width).toEqual(6);
  expect(stateCell.state.height).toEqual(8);

  // ratio
  stateCell.msg.ensureRatio({ ratio: 2 });
  expect(stateCell.state.width).toEqual(6);
  expect(stateCell.state.height).toEqual(12);
});

test('rejects invalid message names', () => {
  const initialState: Rectangle = {
    width: 3,
    height: 4,
  };

  const Scale: StateCellReducer<Rectangle, ScaleMsg> = (state, msg) => ({
    width: state.width * msg.scaleFactor,
    height: state.height * msg.scaleFactor,
  });

  const msgs = { Scale };
  expect(() => {
    createStateCell<Rectangle, typeof msgs>(initialState, msgs);
  }).toThrowErrorMatchingSnapshot();
});
