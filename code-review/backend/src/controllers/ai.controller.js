const aiService = require('../services/ai.service');


module.exports.getReview =  async (req,res)=>{
    //code means prompt that user sended to the user
    const code = req.body.code;

    if(!code){
        return res.status(400).send('Prompt is required');
    }
    const response = await aiService(code);

    res.send(response);
}