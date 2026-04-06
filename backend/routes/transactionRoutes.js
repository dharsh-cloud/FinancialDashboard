import express from 'express';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction, getGlobalStats } from '../controllers/transactionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/global-stats', getGlobalStats);

router.route('/')
  .get(getTransactions) // Removed 'protect' to allow guest viewing
  .post(protect, admin, addTransaction);

router.route('/:id')
  .put(protect, admin, updateTransaction)
  .delete(protect, admin, deleteTransaction);

export default router;
