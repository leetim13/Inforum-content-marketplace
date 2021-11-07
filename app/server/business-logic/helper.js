exports.sequelizeErrorMessageHandler = (res) => {
    let errorMessage = ""
    const hasErrors = Array.isArray(res.errors);
    if (res.message && !hasErrors) {
        errorMessage = res.message;
    } else if (hasErrors && res.errors.length) {
        let i = 1
        res.errors.forEach(err => {
            if (i > 1) {
                errorMessage += " ";
            }
            errorMessage += i.toString() + ". " + err.message;
            i += 1;
        });
    } 
    return errorMessage;
}