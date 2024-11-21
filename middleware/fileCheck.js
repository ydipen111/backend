import path from 'path';

const supportedExts = ['.png', '.jpg', '.webp', '.gif', '.jpeg'];
export const fileCheck = (req, res, next) => {

    

    const file = req.files?.image;

    if (!file) return res.status(400).json({ message: "Image is required" });//checking file

    const type = path.extname(file.name);//then making type to png file

    if (!supportedExts.includes(type)) return res.status(400).json({ message: "Unsupported file type" });//checking last png

    file.mv(`./FileUpload/${file.name}`,(err)=>{
        if(err) return res.status(400).json({message:`${err}`});
        req.image = file.name;
        next();
    });//then moving file
    




}