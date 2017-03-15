import express from 'express';
import validateInput from '../shared/validations/signup';
import userSeeder from '../models/userSeeder';

let app = express();
let router = express.Router();


router.post('/', (req, res) => {
    console.log(req.body);
    const { errors, isValid} = validateInput(req.body);
    //
    if (isValid) {
        const {username, password, email} = req.body;
        userSeeder.seed(username, email, password);
        res.redirect('/')
    } else {
        res.status(400).json(errors);
    }
});


export default router;