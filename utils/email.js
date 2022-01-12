import sgMail from "@sendgrid/mail";

sgMail.setApiKey('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');

export default {

    // const msg = {
    //     to: 'vnthtpk@gmail.com', // Change to your recipient
    //     from: 'tranhoangthaigl@gmail.com', // Change to your verified sender
    //     subject: 'Xác thực đăng ký',
    //     text: 'Mã OTP của bạn là',
    //     html: 'Mã OTP của bạn là<strong>1234</strong>',
    // };
    // sgMail
    // .send(msg)
    //     .then(() => {
    //         console.log('Email sent')
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })
    sendOTP(email, otp) {
        const msg = {
            to: email, // Change to your recipient
            from: 'tranhoangthaigl@gmail.com', // Change to your verified sender
            subject: 'Xác thực đăng ký',
            text: 'Mã OTP của bạn là',
            html: `Mã OTP của bạn là <strong>${otp}</strong>`,
        };
        return sgMail.send(msg);
    }

}