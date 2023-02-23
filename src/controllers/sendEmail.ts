import sendGrid, { MailDataRequired } from "@sendgrid/mail";
import dotenv from "dotenv";
import { handleAsyncError } from "../utils/errorUtils";
dotenv.config();

const sendEmail = { signupConfirmation, deleteConfirmation };
export default sendEmail;

//CONNECT TO MAIL SERVICE
sendGrid.setApiKey(process.env.sendGridApiKey as string);

function signupConfirmation(email: string) {
  if (isTestEmail(email)) return;
  const message: MailDataRequired = {
    from: "rolazaraberin.test@gmail.com",
    to: email,
    subject: "Signup Confirmation",
    text: `${email} has been signed up for Online Store`,
    html: `<p>${email} has been signed up for Online Store</p>`,
  };
  send(message);
}

function deleteConfirmation(email: string) {
  if (isTestEmail(email)) return;
  const message: MailDataRequired = {
    from: "rolazaraberin.test@gmail.com",
    to: email,
    subject: "Delete Confirmation",
    text: `${email} has been deleted from Online Store`,
    html: `<p>${email} has been deleted from Online Store</p>`,
  };
  send(message);
}

async function send(message: MailDataRequired) {
  try {
    const result = await sendGrid.send(message);
    return result[0].statusCode;
  } catch (asyncError) {
    const { error, code, message } = await handleAsyncError(asyncError);
    console.log(error);
    debugger;
  }
}

function isTestEmail(email: string) {
  switch (email) {
    case "new@email.com":
    case "temp@email.com":
    case "temporary@email.com":
    case "correct@email.com":
    case "permanent@email.com":
      return true;
  }
  return false;
}
