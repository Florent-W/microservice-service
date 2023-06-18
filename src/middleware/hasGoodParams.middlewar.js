export const hasGoodParams = (req, res, next) => {
    const myregexp = /^[0-9a-fA-F]{24}$/
    const { id } = req.params
    console.log(req.params.id.length);
    if (!id.match(myregexp)) {
        return res.send({ message: "Please enter valid params" })
    }

    next()
}
