export const checkLetterHandler2= (string, index, char) => {
    if (index >= string.length) return string
    console.log("zadziałało!!")
    return string.substring(0, index) + char + string.substring(index + char.length)
}


// export const checkLetterHandler3={

//   replaceCharString: replaceCharString = (string, index, char) => {
//     if (index >= string.length) return string
//     console.log("zadziałało!!")
//     return string.substring(0, index) + char + string.substring(index + char.length)
//   }
// }
// // export default checkLetterHandler2