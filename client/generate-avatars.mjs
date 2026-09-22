import fs from "fs"
import path from "path"
import multiavatar from "@multiavatar/multiavatar/esm"

const outputDirectory = path.resolve("src/assets/avatars")

fs.mkdirSync(outputDirectory, { recursive: true })

for (let i = 1; i <= 100; i++) {
    const number = String(i).padStart(3, "0")
    const fileName = `avatar-${number}.svg`

    const svg = multiavatar(`teamhub-avatar-${number}`)

    fs.writeFileSync(
        path.join(outputDirectory, fileName),
        svg,
        "utf8"
    )
}

console.log("Created 100 TeamHub avatars.")