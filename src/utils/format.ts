export function formatCount(num: number) {
  if (num > 100000) {
    return Math.floor(num / 10000) + '万'
  } else {
    return num
  }
}

export function getImageUrl(
  imageUrl: string,
  width: number,
  height: number = width
) {
  return imageUrl + `?param=${width}y${height}`
}
