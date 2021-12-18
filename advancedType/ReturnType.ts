// <T extends (...args: any) => any> : restricts the T, which is a function 
type ReturnTypeDemo<T extends (...args: any) => any> = T extends (...args: any) => infer R? R: unknown


const demoFunc = (arg1: string) => {

  return 123
}


type DemoFuncReturnType = ReturnTypeDemo<typeof demoFunc>