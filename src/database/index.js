import mongoose from "mongoose";


const configOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}

const conectToDB = async ()=>{
    const conectUrl = process.env.NEXT_PUBLIC_MONGODB_URL;

    mongoose.connect(conectUrl, configOptions)
        .then(()=> console.log('vfit - store database connected successfully'))
        .catch((err)=>console.log(`DB conection error from: ${err.message}`));
}

export default conectToDB;