import { DeepReadonly } from './deepReadonly';

export type StateCellReducer<State, Message> = (
  state: DeepReadonly<State>,
  message: DeepReadonly<Message>,
) => DeepReadonly<State>;

type MsgContainer<
  State,
  Type extends Record<string, StateCellReducer<State, any>>,
> = {
  [Property in keyof Type]: (msg: Parameters<Type[Property]>[1]) => void;
};

export const createStateCell = <
  State,
  T extends Record<string, StateCellReducer<State, any>>,
>(
  baseState: DeepReadonly<State>,
  reducerRecord: T,
) => {
  let state = baseState;

  const msg = Object.create(null) as MsgContainer<State, typeof reducerRecord>;
  for (const msgName of Object.keys(reducerRecord)) {
    const isValid = /^[a-z][a-zA-Z0-9]*$/.test(msgName);

    if (!isValid) {
      throw new Error(
        `'${msgName}' is not a valid message name. Message names must be alphanumeric and start with a lowercase letter`,
      );
    }

    (msg as any)[msgName] = (msg: any) => {
      state = reducerRecord[msgName](state, msg);
    };
  }

  return {
    get state(): DeepReadonly<State> {
      return state as DeepReadonly<State>;
    },
    msg,
  };
};
