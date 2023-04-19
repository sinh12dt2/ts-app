import express from 'express';
const router = express.Router();
router.post('/productByStockLotSerial', (req, res, next) => {
    res.status(200).json([{
        icProductGroupName: 'abcdgsdgsdgsdg',
        icProductNo: 'sdgsdgsdg',
        icProductName: '123123',
        icStockNo: '4324234'
    }]);
});

export default router;
