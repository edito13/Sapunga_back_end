import multer from 'multer'
import path from 'path'

export const  storage = multer.diskStorage({
    destination: (req, file, calback) => {
        calback(null, path.resolve('uploads'))
    },
    filename: (req, file, calback) => {
        const time = new Date().getTime()

        calback(null, `${time}_${file.originalname}`)
    }
})