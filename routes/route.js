import express from "express"; 
import { saveSentEmails, getEmails, moveEmailsToBin, toggleStarredEmails, deleteEmail } from "../controller/email-controllers.js";

const router = express.Router();

router.post('/save',saveSentEmails);
router.get('/emails/:type',getEmails);
router.post('/save-draft',saveSentEmails);
router.post('/bin',moveEmailsToBin);
router.post('/starred',toggleStarredEmails);
router.delete('/delete',deleteEmail);
export default router;