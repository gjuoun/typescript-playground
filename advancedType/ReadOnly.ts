type ReadOnlyDemo<T> = {
  readonly [P in keyof T]: T[P]
}


type MyReadOnly = ReadOnlyDemo<{label: string}>


type WritableDemo<T> = {
  -readonly [P in keyof T]: T[P]  // non-readonly
}

type MyReadOnly = WritableDemo<{label: string}>

