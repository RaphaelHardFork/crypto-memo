import { useEffect, useReducer } from "react"
import { reducer } from "../reducers"
export const useCurrencies = () => {
  const [{ loading, error, currencies }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    currencies: [],
  })
  useEffect(() => {
    let isCancelled = false
    dispatch({ type: "FETCH_INIT" })
    fetch(
      `https://api.nomics.com/v1/currencies/ticker?key=${process.env.REACT_APP_CRYPTO_API}&interval=1d,30d&convert=EUR`
    )
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error("Désolée, nous avons rencontré un problème...")
        }
        return response.json()
      })
      .then((data) => {
        if (!isCancelled) {
          dispatch({ type: "FETCH_SUCCESS", payload: data })
        }
      })
      .catch((error) => {
        console.log(error.message)
        if (!isCancelled) {
          dispatch({ type: "FETCH_FAILURE", payload: error.message })
        }
      })
    return () => {
      isCancelled = true
    }
  }, [])
  return { loading, error, currencies }
}
