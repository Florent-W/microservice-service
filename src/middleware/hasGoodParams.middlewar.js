export const hasGoodParams = (req, res, next) => {
    const myregexp = /^[0-9a-fA-F]{24}$/
    const { id } = req.params
    if (!id.match(myregexp)) {
        return res.send({ message: "Please enter valid params" })
    }

    next()
}
