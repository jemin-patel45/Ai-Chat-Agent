import { Router } from 'express';
import * as aiController from '../controller/ai.controller.js'
import { generateResult } from '../services/ai.service.js';

const router = Router();

router.get('/get-result',aiController.getResult);




export default router;