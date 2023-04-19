import express from 'express';
import { MysqlError } from 'mysql';
const router = express.Router();
import SinhVien from '../Models/Student';
router.get('/:id?', (req, res, next) => {
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
