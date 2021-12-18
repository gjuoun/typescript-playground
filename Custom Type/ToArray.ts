type ToArray<Type> = Type extends any ? Type[]: never

// string[]
type StrArr = ToArray<string>


// string[] | number[]
type ComboArr = ToArray<string | number>


// avoid distributivity, use square brackets [Type] 
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never

// (string | number)[]
type ComboArr2 = ToArrayNonDist<string | number>
