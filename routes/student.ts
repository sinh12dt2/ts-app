import express, { NextFunction, Response , Request } from 'express';
import { MysqlError } from 'mysql';
const router = express.Router();
import SinhVien from '../Models/Student';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader: string | undefined = req.headers['authorization'];
    console.log(bearerHeader);
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ');
        const [bear, token] = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

router.get('/:id?', verifyToken, (req, res, next) => {
    if(req.params.id) {
        SinhVien.getSinhVienById(Number(req.params.id), (err: MysqlError | null, results: any) => {
            if(err){
                res.json(err);
            }
            else{
                res.json(results);
            }
        });
    } else {
        SinhVien.getAllSinhVien((err: MysqlError | null, results: any) => {
            if(err){
                res.json(err);
            } else {
                console.log(req.headers.cookie);
                res.cookie("jwt", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyTmFtZSI6IkpvaW4iLCJlbWFpbCI6IkpvaW5AZ21haWwuY29tIn0sImlhdCI6MTY1MDg5Njg4OX0.O79uVOQ4nkBah3FKN95cabXvygulzC9BE3nOFGtNsqs', {
                    httpOnly: true,
                    sameSite: 'strict'
                });
                console.log(JSON.stringify(req.cookies));
                res.json(results);
            }
        });
    }
});

router.post('/', (req, res, next) => {
    SinhVien.addSV(req.body, (err: MysqlError | null, results: any) => {
        if(err){
            res.json(err);
        } else{
            res.json(req.body);
        }
    });
});

router.delete('/:id', (req, res, next) => {
    SinhVien.deleteSV(Number(req.params.id), (err: MysqlError | null, results: any) => {
        if(err){
            res.json(err);
        } else{
            res.json(results);
        }
    });
});

router.put('/:id', (req, res, next) => {
    SinhVien.updateSV(Number(req.params.id), req.body, (err: MysqlError | null, results: any) => {
        if(err){
            res.json(err);
        } else{
            res.json(results);
        }
    });
});

export default router;
