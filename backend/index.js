import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

app.get("/check", (req, res) => {
    res.status(200).json({
        "message": "ok"
    })
})

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
})