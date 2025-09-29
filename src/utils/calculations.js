export const calculateTotalPrice = (price, quantity) => {
    const safePrice = Number(price) || 0
    const safeQuantity = Number(quantity) > 0 ? Number(quantity) : 0
    return safePrice * safeQuantity
}