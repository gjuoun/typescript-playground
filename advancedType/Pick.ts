type PickDemo <T, K extends keyof T> = {
  [P in K] : T[P]
}


type MyPick = PickDemo<{label:string, value: string}, 'label'>
