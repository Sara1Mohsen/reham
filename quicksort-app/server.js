const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files (HTML, CSS, JS)

function quicksort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...quicksort(left), ...middle, ...quicksort(right)];
}

app.post("/sort", (req, res) => {
    const numbers = req.body.numbers.split(",").map(num => parseInt(num.trim()));
    if (numbers.some(isNaN)) {
        return res.json({ error: "Invalid input! Please enter valid numbers." });
    }
    res.json({ sortedNumbers: quicksort(numbers) });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
