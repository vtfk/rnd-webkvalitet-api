module.exports = data => {
  const results = data.reduce((previous, current) => {
    console.log(current)
    if (!previous.hasOwnProperty(current.id)) {
      previous[current.id] = current
    } else {
      previous[current.id].result = previous[current.id].result.concat(current.result)
    }
    return previous
  }, {})
  return Object.values(results)
}
