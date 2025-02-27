const Task = require('../models/user/Task.model');

const checkAndUpdateOverdueTasks = async () => {
    const now = new Date();

   
    const overdueTasks = await Task.find({ 
        status: 'pending', 
        dueDate: { $lt: now } 
    });

    overdueTasks.forEach(async (task) => {
        task.status = 'overdue';
        await task.save();
    });
};

module.exports = { checkAndUpdateOverdueTasks };
