app.get("/profile", async function(req, res) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ msg: "Unauthorized: No token provided" });
    }

    try {
        // 2. Decode the token to get the data inside (the userId)
        // If the token is "Bearer <token>", you might need to split it
        const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        const decodedPayload = jwt.verify(actualToken, JWT_SECRET);
        // 3. Find the user in the database using the ID from the token
        const user = await Register.findById(decodedPayload.userId); // got this syntax from docs and used ai aswell

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }res.json({
            Username: user.Username,
            Useremail: user.Useremail
        });

    } catch (err) {
        res.status(403).json
        ({ msg: "Invalid token" });
    }
});
