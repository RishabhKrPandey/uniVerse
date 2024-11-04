const Message = require('../models/Message');
const User = require('../models/User');

exports.listMessages = async (req, res) => {
    try {
        // Fetch messages where the current user is either the sender or receiver
        const messages = await Message.find({
            $or: [{ sender: req.user._id }, { receiver: req.user._id }]
        })
        .populate('sender', 'name')  
        .populate('receiver', 'name') 
        .sort({ createdAt: -1 }); 

        // Fetch all users except the current user
        const users = await User.find({ _id: { $ne: req.user._id } });

        // Pass both `messages` and `users` to the template
        res.render('messages', { user: req.user, messages, users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
