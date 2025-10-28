import sql from "../config/db";

export const getUSerCreations = async (req, res)=>{
    try {
        const {userId} = req.auth()

        await sql``
        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}