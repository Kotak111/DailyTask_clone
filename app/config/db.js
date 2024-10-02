const { default: mongoose } = require("mongoose");

exports.db= mongoose.connect(`mongodb+srv://kotakh311:ylpVqoffVsFyI1RU@rnwharsh.jhwn3pn.mongodb.net/Task_management`).then(()=>{
    console.log("database connected...");
    
})
.catch((err)=>{
    console.log("database error");
    
})