import MemberModel from "../Models/MemberModel.js";
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body.memberData;
     
        if (!email) return res.send(401).json({ success: false, message: "Please provide valid email to login" })

        if (!password) return res.send(401).json({ success: false, message: "Please provide correct password to login" })
        const member = await MemberModel.findOne({ email: email });
        if (!member) return res.status(401).json({ success: false, message: "Member not Found, Register now!" });
    
        const memberPassword= await bcrypt.compare(password,member.password)

        if (!memberPassword) return res.status(401).json({ success: false, message: "Please provide correct passowrd to login!" });
        console.log(member,"1")
     
        const token = await Jwt.sign({ id: member.id }, process.env.JWT_SECRET);

        return res.status(200).json({ success: true, message: "Logged in Successfully!", token })
        



    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong. Try again after some time." })
    }

}
export const register = async (req, res) => {
    try {
        console.log("1")
        const { email, password, Dob } = req.body;
        console.log(email, password, "2")
        if (!email) return res.send(401).json({ success: false, message: "Please provide valid email for registration" })
        if (!password) return res.send(401).json({ success: false, message: "Please create a password for registration" })

        if (!Dob) return res.send(401).json({ success: false, message: "Please create a password for registration" })
        console.log("5")
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword, "3")

        const member = new MemberModel({ email, password: hashedPassword, Dob })
        await member.save();
        console.log(member, "4")
        return res.status(200).json({ success: true, message: "Registration Successful" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong. Try again after some time." })
    }

}
