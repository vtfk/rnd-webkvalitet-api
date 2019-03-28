module.exports = data => {
  const results = data.reduce((previous, current) => {
    if (!previous.hasOwnProperty(current.id)) {
      previous[current.id] = current
    }
    previous[current.id].result = previous[current.id].result.concat(current.result)
    return previous
  }, {})
  return Object.values(results)
}
