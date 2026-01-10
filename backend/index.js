require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

// Models
const User = require("./models/user.model");
const Note = require("./models/note.model");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.get("/", (req, res) => {
    res.json({ data: "Hello" });
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
// === === BACKEND READY === === //

//Create Account
app.post("/create-account", async (req, res) => {

    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res
            .status(400)
            .json({ error: true, message: "Full Name is required" })
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" })
    }
    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is required" })
    }



    const isUser = await User.findOne({ email: email })

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exist!"
        })
    }

    const user = new User({
        fullName,
        email,
        password
    })

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3600m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registeration SucessFull!"
    })
});

//Login
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password iS required" });
    }

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
        return res.status(400).json({ message: "User not found" });
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "3600m",
        })

        return res.json({
            error: false,
            message: "Login SuccssFul",
            email,
            accessToken,
        })
    } else {
        return res.status(400).json({
            error: true,
            message: "iNvalid Credentials",
        })
    }
});

//Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id });

    if(!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: {fullName: isUser.fullName, email: isUser.email, "_id": isUser._id, createOn: isUser.createdOn},
        message: ""
    })
})

// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is Required" })
    }
    if (!content) {
        return res
            .status(400)
            .json({
                error: true,
                message: "Content is Required"
            })
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

//Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res
            .status(400)
            .json({
                error: true,
                message: "No Changes Provided."
            });
    };

    try {
        const note = await Note.findOne({
            _id: noteId,
            userId: user._id
        });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found."
            })
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Updated SuccessFul."
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error."
        })
    }
});

//Get All Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        // Pinned notes first, then most recent by creation date (descending)
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1, createOn: -1 });

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved Successfully."
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
});

//Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            })
        }

        await Note.deleteOne({
            _id: noteId,
            userId: user._id
        })

        return res.json({
            error: false,
            message: "Note deleted Successfully."
        })
    } catch (error) {
        return res.status(500).json({
            error: true, 
            message: "Internal Server Error"
        })
    }
});

// Update isPinned value
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({
            _id: noteId,
            userId: user._id
        });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found."
            })
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Updated SuccessFul."
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error."
        })
    }
});

// Update seen (read) state
app.put("/update-note-seen/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { seen } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({
            _id: noteId,
            userId: user._id
        });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found."
            })
        }

        note.seen = !!seen;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note seen state updated successfully."
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error."
        })
    }
});

// Search Notes
app.get("/search-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
        return res
            .status(400)
            .json({
                error: true,
                message: "Search Querry is Required"
            })
    }

    try {
        const matchingNote = await Note.find({
            userId: user._id,
            $or: [
                { title: {$regex: new RegExp(query, "i")} },
                { content: {$regex: new RegExp(query, "i")} },

            ]
        }).sort({ isPinned: -1, createOn: -1 });

        return res.json({
            error: false,
            notes: matchingNote,
            message: "Notes matching the search querry retrieved Successfully."
        });

    } catch (error) {
        return res
            .status(500)
            .json({
                error: true,
                message: "Internal Server ErooR."
            })
    }
})
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;