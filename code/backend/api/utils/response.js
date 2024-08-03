const response = (success, code, data) => {
    return {
        status: success ? "SUCCESS" : "ERROR",
        code,
        data,
    };
};

export { response };
