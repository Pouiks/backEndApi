const Message = require('../models/Message');

const messageController = {
    // Envoi du message
    processMessage : async (req, res) => {
        const message = new Message(req.body);
        message.send_by = req.session.user.info.animal_id;
        console.log(req.session.user.info)
        message.send_to = Number(req.params.id); 
        await message.save();
        res.status(200).json(message);
    }
};

module.exports = messageController;