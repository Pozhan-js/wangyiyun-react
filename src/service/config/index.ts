// export const BASE_URL = 'http://codercba.com:9002'
export const TIME_OUT = 10000

// 判断开发环境还是生产环境 development/production
// console.log(process.env.NODE_ENV)

// 方法二通过脚手架提供的变量来判断
// let BASE_URL = ''
// console.log(BASE_URL)
// if (process.env.NODE_ENV === 'production') {
//   BASE_URL = 'http://codercba.prod:9002'
//   console.log(BASE_URL)
// } else {
//   BASE_URL = 'http://codercba.dev:9002'
//   console.log(BASE_URL)
// }

// 方法三定义.env文件 为了让其有更好的类型提示 要重新配置 react-app-env.ts文件
const BASE_URL = process.env.REACT_APP_BASE_URL
// console.log(BASE_URL)

export { BASE_URL }
