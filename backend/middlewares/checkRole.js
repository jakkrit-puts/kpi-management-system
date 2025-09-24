export const authAdmin = async (req, res, next) => {
    const user = req.user;

    // console.log(user.role_id.name);
    
    if (user.role_id.name !== "admin") {
        return res.status(401).json({
            message: "Only admin allow to access"
        });
    }

    next()
}

export const authUser = async (req, res, next) => {
    const user = req.user;

    // console.log(user.role_id.name);
    
    if (user.role_id.name !== "user") {
        return res.status(401).json({
            message: "Only user allow to access"
        });
    }

    next()
}