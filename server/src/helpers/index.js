export const generateResponse = (data, message, code = 200, success = true, ) => ({
    code,
    success,
    message,
    data
})