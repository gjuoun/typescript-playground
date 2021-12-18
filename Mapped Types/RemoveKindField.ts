type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle {
  kind: "circle";
  radius: number;
}


// type KindlessCircle = {
//   radius: number;
// }
type KindlessCircle = RemoveKindField<Circle>;


// equivalent to 
type KindLessCircle2 = Omit<Circle, 'kind'>