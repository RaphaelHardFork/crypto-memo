import { matchSorter } from "match-sorter"
import { useState, useCallback, useMemo } from "react"
import { useCurrencies } from "../hooks/useCurrencies"
import Currency from "./Currency"

const List = () => {
  const { error, loading, currencies } = useCurrencies()
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState("")
  const displayedCurrencies = useMemo(() => {
    const filteredCurrency = filter
      ? matchSorter(currencies, filter, { keys: ["name", "symbol"] })
      : currencies
    return filteredCurrency.slice(0, 500)
  }, [filter, currencies])

  const hideDetails = useCallback(() => setActive(null), [])
  const showDetails = useCallback((id) => setActive(id), [])

  return (
    <div className="container p-4 py-5 px-lg-5">
      {loading ? (
        <p>loading... it can take a while...</p>
      ) : (
        <>
          <div className="mb-3">
            <label htmlFor="filter" className="form-label">
              Filter currencies
            </label>
            <input
              className="form-control"
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <p>
            {displayedCurrencies.length} first results / {currencies.length}
          </p>
          {displayedCurrencies.map((el) => {
            return (
              <Currency
                key={el.id}
                currency={el}
                isActive={el.id === active}
                hideDetails={hideDetails}
                showDetails={showDetails}
              />
            )
          })}
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}

export default List
