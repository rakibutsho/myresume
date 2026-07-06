type EmailTemplateProps = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export const contactEmailTemplate = ({
  name,
  email,
  subject,
  message,
}: EmailTemplateProps) => {
  return `
  <div style="font-family: 'Courier New', Courier, monospace; background-color: #0a0a0c; padding: 40px 20px; color: #a1a1aa; line-height: 1.6;">
    
    <div style="max-width: 600px; margin: 0 auto; background: #0f0f11; border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
      
      <!-- Header -->
      <div style="background: #121214; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding: 30px; text-align: center;">
        <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-family: Arial, sans-serif; letter-spacing: 1px;">
          INCOMING <span style="color: #10b981;">TRANSMISSION</span>
        </h2>
        <p style="margin: 10px 0 0 0; font-size: 12px; letter-spacing: 2px; color: #6b7280; text-transform: uppercase;">
          PORTFOLIO CONTACT SYSTEM
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 40px 30px;">
        
        <div style="margin-bottom: 30px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="color: #6b7280; text-transform: uppercase; letter-spacing: 1px; font-size: 11px;">Sender Name</span><br/>
                <strong style="color: #ffffff; font-size: 16px; font-family: Arial, sans-serif;">${name}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="color: #6b7280; text-transform: uppercase; letter-spacing: 1px; font-size: 11px;">Reply-To Email</span><br/>
                <a href="mailto:${email}" style="color: #10b981; text-decoration: none; font-size: 16px; font-family: Arial, sans-serif;">${email}</a>
              </td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="color: #6b7280; text-transform: uppercase; letter-spacing: 1px; font-size: 11px;">Subject</span><br/>
                <strong style="color: #ffffff; font-size: 16px; font-family: Arial, sans-serif;">${subject}</strong>
              </td>
            </tr>
            ` : ''}
          </table>
        </div>

        <div style="background: #121214; border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 20px;">
          <span style="color: #6b7280; text-transform: uppercase; letter-spacing: 1px; font-size: 11px; display: block; margin-bottom: 15px;">Message Payload</span>
          <p style="margin: 0; color: #ffffff; font-family: Arial, sans-serif; font-size: 15px; white-space: pre-wrap;">${message}</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #09090b; border-top: 1px solid rgba(255, 255, 255, 0.05); padding: 20px; text-align: center; font-size: 11px; color: #6b7280; letter-spacing: 1px;">
        <p style="margin: 0;">SECURE MESSAGE ROUTED FROM RAKIBUL ISLAM'S PORTFOLIO</p>
        <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} ALL SYSTEMS OPERATIONAL</p>
      </div>

    </div>
  </div>
  `;
};
