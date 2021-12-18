type EventConfig<Events extends { kind: string }> = {
  // square: (event: E) => void
  // E is a combo of all the keys of Events bbject
  // E = {kind: 'square' , x: number, y: number}
  [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };


// type Config = {
//   square: (event: SquareEvent) => void;
//   circle: (event: CircleEvent) => void;
// }
type Config = EventConfig<SquareEvent | CircleEvent >


const config:Config = {
  square: ({kind, x, y}) => {},
  circle: ({kind, radius}) => {}
}