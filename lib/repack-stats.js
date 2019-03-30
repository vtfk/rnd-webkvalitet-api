module.exports = data => {
  const results = data.reduce((previous, current) => {
    console.log(current)
    if (!previous.hasOwnProperty(current.id)) {
      previous[current.id] = current
      previous[current.id]['registered-categories'] = [current.category]
    } else {
      if (!previous[current.id]['registered-categories'].includes(current.category)) {
        previous[current.id].result = previous[current.id].result.concat(current.result)
        previous[current.id]['registered-categories'].push(current.category)
      }
    }
    return previous
  }, {})
  return Object.values(results)
}
