type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
 
type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
 
// type ObjectsNeedingGDPRDeletion = {
//   id: false;
//   name: true;
// }
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;













type ExtractGender<Type> = {
  [Property in keyof Type]: Type[Property] extends {gender: 'girl'}? true: false
}

type Students = {
  sam: {gender: 'boy'},
  sali: {gender: 'girl'}
}

// type DetectGirls = {
//   sam: false;
//   sali: true;
// }
type DetectGirls = ExtractGender<Students>