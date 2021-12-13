export const sanitize = (values) => {
  const valuesCopy = {...values}
  const keys = Object.keys(valuesCopy)

  keys.forEach(key => {
    if (typeof valuesCopy[key] === 'string') {
      valuesCopy[key] = valuesCopy[key].trim()
    }
  })

  return valuesCopy
}

// export const handleProductSubmitValues = (values, isAddFormOpen) => {
//   const valuesCopy = sanitize(values)

//   if (isAddFormOpen) {
//     delete valuesCopy.product
//     delete valuesCopy.weight
//     return valuesCopy
//   }
  
//   const { product, weight } = valuesCopy
//   return { product, weight }
// }