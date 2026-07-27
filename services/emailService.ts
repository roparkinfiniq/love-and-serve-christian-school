import emailjs from '@emailjs/browser';

// EmailJS Configuration Keys (Can also be set in .env as VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_lscsi';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_lscsi';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'user_lscsi_key';

export interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendEmailNotification(payload: EmailPayload): Promise<boolean> {
  const templateParams = {
    from_name: payload.name,
    from_email: payload.email,
    reply_to: payload.email,
    subject: payload.subject,
    message: payload.message,
    to_name: 'Love and Serve Christian School Admin',
    to_email: 'loveandserve2014@gmail.com',
    submitted_date: new Date().toLocaleString(),
  };

  try {
    // If EmailJS public key is set, attempt EmailJS dispatch
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'user_lscsi_key') {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      console.log('EmailJS notification sent successfully:', response.status, response.text);
      return true;
    }
  } catch (error) {
    console.warn('EmailJS auto dispatch failed or unconfigured, logged inquiry locally:', error);
  }

  return false;
}
