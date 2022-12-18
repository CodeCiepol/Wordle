export const replaceCharString= (string, index, char) => {
    if (index >= string.length) return string
    console.log("zadziałało!!")
    return string.substring(0, index) + char + string.substring(index + char.length)
}

export const findAndReplace = (string, charToFind, CharToReplace) => {
    let stringTemp = string.split('')
    string.split('').every((leter, j) => {
      if (leter === charToFind) {
        stringTemp[j] = CharToReplace
        stringTemp = stringTemp.join('')
        // console.log('znaleziono i podmieniono na:', stringTemp)
        return false
      }
      return true
    })
    return stringTemp
  }


// export const checkLetterHandler3={

//   replaceCharString: replaceCharString = (string, index, char) => {
//     if (index >= string.length) return string
//     console.log("zadziałało!!")
//     return string.substring(0, index) + char + string.substring(index + char.length)
//   }
// }
// // export default checkLetterHandler2