import express from "express"
const app = express()
import "dotenv/config"
import cors from "cors"
import { fileURLToPath } from "url"
import path from "path"
import {readdirSync} from "fs"

const port  = process.env.PORT || 8000
app.use(cors())
app.use(express.json())

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const routesPath = path.resolve(_dirname, "./routes")
const routeFiles = readdirSync(routesPath)
routeFiles.map(async (file) => {
  const routeModule = await import(`./routes/${file}`)
  app.use("/", routeModule.default)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(_dirname, "public", "index.html"))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})