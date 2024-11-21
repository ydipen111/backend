import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'
import authRoutes1 from './routes/authRoutes1.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors';
import fileUpload from 'express-fileupload';


const port =4000;
const app = express();
app.use(express.json());
app.use(cors());

app.use(fileUpload({
    limits:{fileSize:5*1024*1024},
}));
mongoose.connect('mongodb+srv://DipenDra:Dipendra123@cluster0.h9oaq.mongodb.net/').then((val)=>{
        
app.listen(port,()=>{
    
    console.log(`server is running on port ${port}`);
})
}).catch((err)=>{
    console.log(err);;
    
})


app.use('/api/users',authRoutes);
app.use('/api/youtuber',authRoutes1);
app.use('/api',productRoute);