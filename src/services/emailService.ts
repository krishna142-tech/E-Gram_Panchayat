import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_OTP_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_OTP_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS
export const initEmailJS = () => {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
};

// Email template interfaces
export interface ContactEmailData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_name?: string;
}

export interface SupportRequestData {
  from_name: string;
  from_email: string;
  request_type: 'staff' | 'admin';
  message: string;
  phone?: string;
}

export interface ApplicationNotificationData {
  to_name: string;
  to_email: string;
  service_name: string;
  application_id: string;
  status: string;
  remarks?: string;
}

export interface OTPEmailData {
  to_email: string;
  to_name: string;
  otp_code: string;
}

// Send contact form email
export const sendContactEmail = async (data: ContactEmailData): Promise<void> => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    const templateParams = {
      from_name: data.from_name,
      from_email: data.from_email,
      subject: data.subject,
      message: data.message,
      to_name: data.to_name || 'Support Team',
      reply_to: data.from_email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
};

// Send OTP email
export const sendOTPEmail = async (data: OTPEmailData): Promise<void> => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY) {
      throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    // Use OTP template if available, otherwise use main template
    const templateId = EMAILJS_OTP_TEMPLATE_ID || EMAILJS_TEMPLATE_ID;

    const templateParams = {
      user_email: data.to_email,
      to_name: data.to_name,
      from_name: 'Digital E-Gram Panchayat',
      subject: 'Email Verification - OTP Code',
      message: `
Dear ${data.to_name},

Your email verification code for Digital E-Gram Panchayat registration is:

${data.otp_code}

This code will expire in 5 minutes. Please do not share this code with anyone.

If you did not request this verification, please ignore this email.

Best regards,
Digital E-Gram Panchayat Team
      `,
      otp_code: data.otp_code,
      reply_to: 'noreply@grampanchayat.gov.in',
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      templateId,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error('Failed to send OTP email');
    }
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send verification code. Please try again.');
  }
};

// Send support request email
export const sendSupportRequest = async (data: SupportRequestData): Promise<void> => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    const templateParams = {
      from_name: data.from_name,
      from_email: data.from_email,
      subject: `${data.request_type.toUpperCase()} Access Request`,
      message: `
Access Request Details:
- Name: ${data.from_name}
- Email: ${data.from_email}
- Phone: ${data.phone || 'Not provided'}
- Requested Role: ${data.request_type.charAt(0).toUpperCase() + data.request_type.slice(1)}

Message:
${data.message}
      `,
      to_name: 'Admin Team',
      reply_to: data.from_email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error('Failed to send support request');
    }
  } catch (error) {
    console.error('Error sending support request:', error);
    throw new Error('Failed to send support request. Please try again later.');
  }
};

// Send application status notification
export const sendApplicationNotification = async (data: ApplicationNotificationData): Promise<void> => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured, skipping notification email');
      return;
    }

    const templateParams = {
      from_name: 'Digital E-Gram Panchayat',
      from_email: 'noreply@grampanchayat.gov.in',
      to_name: data.to_name,
      to_email: data.to_email,
      subject: `Application Status Update - ${data.service_name}`,
      message: `
Dear ${data.to_name},

Your application for "${data.service_name}" has been updated.

Application ID: ${data.application_id}
New Status: ${data.status.toUpperCase()}
${data.remarks ? `Remarks: ${data.remarks}` : ''}

You can track your application status by logging into your account at our portal.

Best regards,
Digital E-Gram Panchayat Team
      `,
      reply_to: 'support@grampanchayat.gov.in',
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
  } catch (error) {
    console.error('Error sending application notification:', error);
    // Don't throw error for notifications to avoid breaking the main flow
  }
};