// Partial type clone
type PartialDemo<T> = {
  [P in keyof T]? : T[P]
}


type MyType1 = PartialDemo<{label: string, value: string}>


// add timestamp to partial type
type TimeStampedPartial<T> = {
  [P in keyof T]? :T[P]
} & {timestamp: Date}


type MyTypeWithTimestamp = TimeStampedPartial<{label: string}>

