type ParametersDemo<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never


const myfunc = (arg1: string, arg2: number) => { }


type MyFuncArgType = ParametersDemo<typeof myfunc>

type FirstArgType = MyFuncArgType[0]





// chunk function 
const chunk = <T>(arr: T[], size: number): T[][] => { // get T type automatically from the argument
  return [arr]
}


const result = chunk([1, 2, 3], 3)
const result1 = chunk(['1', '2'], 3)

const list = [1,2,3] as const


type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

type EmailMessageContents = MessageOf<Email>;