import express from 'express';

import { getProducts } from '../controllers/product.controller.js';
import { createProducts } from '../controllers/product.controller.js';
import { updateProducts } from '../controllers/product.controller.js';
import { deleteProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProducts);
router.put("/:id", updateProducts);
router.delete('/:id', deleteProducts);

export default router; 