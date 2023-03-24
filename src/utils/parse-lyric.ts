export interface ILyric {
  time: number
  text: string
}

const timeRegExp = /\[(\d{2}):(\d{2}).(\d{2,3})\]/
export function ParseLyric(lyricString: string) {
  const lines: string[] = lyricString.split('\n')

  //现获取时间
  const lyrics: ILyric[] = []

  for (const line of lines) {
    const result = timeRegExp.exec(line)
    // console.log(result)

    // 没有就执行下一次循环
    if (!result) continue

    const time1 = Number(result[1]) * 60 * 1000
    const time2 = Number(result[2]) * 1000
    const time3 =
      result[3].length === 2 ? Number(result[3]) * 10 : Number(result[3])
    // const time3 = Number(result[3])

    const time = time1 + time2 + time3
    const text = line.replace(timeRegExp, '')

    lyrics.push({ time, text })
  }
  // 获取内容
  return lyrics
}
