import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload.js'
import SessionController from './controllers/SessionController.js'
import SpotController from './controllers/SpotController.js'
import RejectionController from './controllers/RejectionController.js'
import ProfileController from './controllers/ProfileController.js'
import BookingController from './controllers/BookingController.js'
import ApprovalController from './controllers/ApprovalController.js'

const routes = Router()
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);
routes.get('/profile', ProfileController.show);
routes.post('/spots/:spot_id/bookings', BookingController.store);
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

export default routes
