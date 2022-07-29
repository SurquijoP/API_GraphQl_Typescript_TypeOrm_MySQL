import app from './app';
import { PORT } from './config';
import {connectDB} from './db';


async function main(){
    try {
    await connectDB()
    app.listen(PORT);
    console.log("App listen on ", PORT)
    } catch(error){
    console.error(error);
    }
}

main();
