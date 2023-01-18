import { useState,useCallback} from 'react'

const useFetch = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  const sendRequest = useCallback(async (applyData, url) => {
    setError(null)
    setIsLoading(false)
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
    setIsLoading(true)
  },[])
  return { sendRequest, error,isLoading}
}

export default useFetch
