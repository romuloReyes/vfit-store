import mongoose from "mongoose";


const configOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}

const conectToDB = async ()=>{
    const conectUrl = 'mongodb+srv://reyesromulo:olumor1997@vfitcluster.uo1pnvd.mongodb.net/';

    mongoose.connect(conectUrl, configOptions)
        .then(()=> console.log('vfit - store database connected successfully'))
        .catch((err)=>console.log(`DB conection error from: ${err.message}`));
}

export default conectToDB;