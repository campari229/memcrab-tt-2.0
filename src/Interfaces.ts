export interface Cell {
  amount: number;
  id: number;
  isPercentsShown?: boolean,
  isCloser?: boolean,
  flat?: Function;
};
