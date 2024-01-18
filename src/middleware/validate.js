const validateRequest = joiSchema => async (request, response, next) => {
    try {
        await joiSchema.validateAsync(request.body);
        next()
    } catch (error) {
        return response.status(400).json({ mensagem: error.message });
    }
}


module.exports = validateRequest;
