import { MailtrapClient } from 'mailtrap';

const TOKEN = "0ce77a27db8b48cd9cb7facf2c15792b";

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

export const sendVerificationCode = async (email, code) => {
  if (!email || typeof email !== 'string') {
    throw new Error("Invalid email address");
  }

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Code</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f7; color: #51545e; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; }
        .header { font-size: 24px; color: #333333; font-weight: bold; margin-bottom: 10px; }
        .content { font-size: 16px; color: #51545e; }
        .code { font-size: 32px; font-weight: bold; color: #3869d4; margin: 20px 0; }
        .footer { font-size: 12px; color: #999999; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Verification Code</div>
        <div class="content">
          <p>Hello,</p>
          <p>Thank you for signing up! Use the code below to complete your registration:</p>
          <div class="code">${code}</div>
          <p>If you didn’t request this, please ignore this email.</p>
        </div>
        <div class="footer">Best regards, <br> Sala's Company</div>
      </div>
    </body>
    </html>
  `;

  try {
    await client.send({
      from: sender,
      to: [{ email }],
      subject: "Your Verification Code",
      text: `Your verification code is: ${code}`, 
      html: htmlTemplate, 
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification code");
  }
};


// import nodemailer from 'nodemailer';

// const smtpTransport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "9d165befe086f0",
//     pass: "86c642a5c44a15"
//   }
// });

// export const sendVerificationCode = async (email, code) => {
//   if (!email || typeof email !== 'string') {
//     throw new Error("Invalid email address");
//   }

//   const htmlTemplate = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Verification Code</title>
//       <style>
//         body { font-family: Arial, sans-serif; background-color: #f4f4f7; color: #51545e; }
//         .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; }
//         .header { font-size: 24px; color: #333333; font-weight: bold; margin-bottom: 10px; }
//         .content { font-size: 16px; color: #51545e; }
//         .code { font-size: 32px; font-weight: bold; color: #3869d4; margin: 20px 0; }
//         .footer { font-size: 12px; color: #999999; margin-top: 20px; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">Verification Code</div>
//         <div class="content">
//           <p>Hello,</p>
//           <p>Thank you for signing up! Use the code below to complete your registration:</p>
//           <div class="code">${code}</div>
//           <p>If you didn’t request this, please ignore this email.</p>
//         </div>
//         <div class="footer">Best regards, <br> Sala's Company</div>
//       </div>
//     </body>
//     </html>
//   `;

//   try {
//     const info = await smtpTransport.sendMail({
//       from: '"Mailtrap Test" <hello@demomailtrap.com>',
//       to: email,
//       subject: "Your Verification Code",
//       text: `Your verification code is: ${code}`, 
//       html: htmlTemplate,
//     });
//     console.log("Email sent successfully:", info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send verification code");
//   }
// };
