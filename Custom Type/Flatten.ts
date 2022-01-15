// if T is an array, get the item type
type Flatten1<T> = T extends any[] ? T[number]: T 


type MyStrType =  Flatten1<string[]>



type Flatten2<Type> = Type extends Array<infer Item> ? Item : Type;

type MyStrType =  Flatten2<string[]>
type MyOriginalType =  Flatten2<string>



type Flatten3<T> = T extends (infer V)[] ? V : never;
type MyStrType3 = Flatten3<string> // string