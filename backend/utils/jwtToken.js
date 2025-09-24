import jwt from 'jsonwebtoken';

export const generateToken = async (id) => {

    const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "2h",
    })

    return { accessToken }
}