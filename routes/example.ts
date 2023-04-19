import express from 'express';
import { MysqlError } from 'mysql';
const router = express.Router();
import Example from '../Models/Example';
router.get('/', (req, res, next) => {
    res.json(Example);
});

export default router;
