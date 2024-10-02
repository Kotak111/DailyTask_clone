const nodemailer=require("nodemailer")

const transPorter= nodemailer.createTransport({
        service:"gmail",
       auth: {
            user:"kotakh311@gmail.com",
            pass:"casv enss rkeh viaw"
        }
})

async function sendData(to,otp) {

    const mailFormat= {
        from:"kotakh311@gmail.com",
        to:to,
        subject:"Your Reaset PassWord Verification ",
        html:`<h3>Your Verification code is ${otp}  <br>
            <p>Please Do not Share Your Code..</p></h3>
        `
    }

    await transPorter.sendMail(mailFormat , (err,info)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("send mail");
        }
    })
    
}


module.exports=sendData;