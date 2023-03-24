// 定义函数调用签名
interface IFnCall<IRoot> {
  <TWhy>(fn: (num: IRoot) => TWhy, age: number): TWhy
}

// 定义函数对象
const foo: IFnCall<number> = function (fn, age) {
  return fn(111)
}

foo<string>(() => {
  return 'aaa'
}, 18)

const res = foo<string>(() => {
  return 'aaa'
}, 18)
