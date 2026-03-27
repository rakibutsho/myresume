type EmailTemplateProps = {
  name: string;
  email: string;
  message: string;
};

export const contactEmailTemplate = ({
  name,
  email,
  message,
}: EmailTemplateProps) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
    
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background: #111827; color: #ffffff; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">📩 New Contact Message</h2>
      </div>

      <!-- Body -->
      <div style="padding: 20px; color: #333;">
        <p style="font-size: 16px;">You have received a new message from your portfolio website:</p>

        <div style="margin-top: 20px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 8px;">
          <p style="margin: 0;"><strong>Message:</strong></p>
          <p style="margin-top: 10px; line-height: 1.6;">${message}</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p style="margin: 0;">This email was sent from your portfolio contact form</p>
        <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Your Portfolio</p>
      </div>

    </div>
  </div>
  `;
};
