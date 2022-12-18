import { useState,useCallback} from 'react'

const useFetch = () => {
  const [error, setError] = useState(null)

  const sendRequest = useCallback(async (applyData, url) => {
    setError(null)
    try {
      const response = await fetch(url, {
        method: 'get',
      })
      if (!response.ok) {
        throw new Error("couldn't fetch")
      }
      const data = await response.json()
      applyData(data)
    } catch (error) {
      setError(error.message || 'something went wrong')
    }
  },[])
  return { sendRequest, error }
}

export default useFetch
