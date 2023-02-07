import express, {Application, Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";
import 'dotenv/config'
import enoent from './middlewares/enoent'
import eexist from './middlewares/eexist'
import err from './middlewares/err'
import {router} from "./routes"
const app:Application = express()
const PORT = process.env.PORT || 3000

const storeEnv = process.env.HOME_CLOUD_STORAGE
if (!storeEnv) {
  console.error(
    'Storage path not defined,',
    'set a value for HOME_CLOUD_STORAGE environment variable'
  );
  process.exit(1);
}




app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(router)

app.get('*', (_:Request,res:Response)=>{
  res.json({message: 'this route does exist', statusCode: 400})
})

app.use(enoent)
app.use(eexist)
app.use(err)


app.listen(PORT, ()=>{
  console.log(`server running on http://localhost:${PORT}`)
})
