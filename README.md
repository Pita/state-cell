# State Cell

## Description

Basically a mini redux. It creates a "state cell" which then can can be modified by sending messages to it. The messages get processed by reducers which then output the new state.

Checks:

✔️ Functional programming
✔️ Works with every framework
✔️ Super small, no dependencies
✔️ Enforces readonly types when used with Typescript
✔️ Allows stateful functional programming without classes

## NPM

```
npm install --save state-cell
```

## Usage

```typescript
import { createStateCell, StateCellReducer } from "state-cell";

// State interface
interface Rectangle {
  width: number;
  height: number;
}

// interface of messages
interface EnsureRatioMsg {
  ratio: number;
}
interface ScaleMsg {
  scaleFactor: 2;
}

const initialState: Rectangle = {
  width: 3,
  height: 4,
};

// setup message reducers
const scale: StateCellReducer<Rectangle, ScaleMsg> = (state, msg) => ({
  width: state.width * msg.scaleFactor,
  height: state.height * msg.scaleFactor,
});
const ensureRatio: StateCellReducer<Rectangle, EnsureRatioMsg> = (
  state,
  msg
) => ({ width: state.width, height: state.width * msg.ratio });
const msgs = { scale, ensureRatio };

// finally, create the state cell
const stateCell = createStateCell<Rectangle, typeof msgs>(initialState, msgs);

// send a message to the state cell
stateCell.msg.scale({ scaleFactor: 2 });

// get the new state
console.log(stateCell.state);
```

Feedback very welcome!
