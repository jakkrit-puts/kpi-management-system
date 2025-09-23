export const handleZodValidation = (validation, res) => {
    if (!validation.success) {
        const zodError = validation.error;
        let firstErrorMessage = "Validation Error";
        let allErrors = [];

        if (zodError?.issues && Array.isArray(zodError.issues)) {
            allErrors = zodError.issues.map((issue) => ({
                field: issue.path ? issue.path.join(".") : "Unknown",
                message: issue.message || "Validation Error",
                code: issue.code
            }));

            firstErrorMessage = allErrors[0]?.message || "Validation Error";
        }

        return res.status(422).json({
            message: firstErrorMessage,
            error: allErrors
        });
    }

    return null;
};
