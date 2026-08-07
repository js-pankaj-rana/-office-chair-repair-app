export const emailUserRegistrationTemplate = (
  username: string,
  appName: string,
  // resetUrl: string,
  supportEmail: string,
  mailVerficationUrl: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to {{appName}}</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f7fb">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
          
          <!-- Header -->
          <tr>
            <td align="center" bgcolor="#0d6efd" style="padding:30px;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;">
                Welcome to ${appName}
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 35px;color:#333333;">
              <h2 style="margin-top:0;">
                Hello {${username}},
              </h2>

              <p style="font-size:16px;line-height:26px;">
                Thank you for registering with
                <strong>${appName}</strong>. We're excited to have you with us!
              </p>

              <p style="font-size:16px;line-height:26px;">
                Before you can start using your account, please verify your
                email address by clicking the button below.
              </p>

              <table cellpadding="0" cellspacing="0" align="center" style="margin:35px auto;">
                <tr>
                  <td align="center" bgcolor="#0d6efd" style="border-radius:6px;">
                    <a href="${mailVerficationUrl}"
                      style="
                        display:inline-block;
                        padding:14px 32px;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:16px;
                        font-weight:bold;
                      ">
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:15px;line-height:24px;">
                Or copy and paste the following link into your browser:
              </p>

              <p style="word-break:break-all;">
                <a href="/${mailVerficationUrl}" style="color:#0d6efd;">
                  ${mailVerficationUrl}
                </a>
              </p>

              <p style="font-size:15px;line-height:24px;color:#555555;">
                <strong>Note:</strong> This verification link will expire in
                <strong>24 hours</strong>.
              </p>

              <hr style="border:none;border-top:1px solid #eeeeee;margin:30px 0;">

              <p style="font-size:14px;line-height:22px;color:#666666;">
                If you didn't create an account with {{appName}}, you can safely
                ignore this email.
              </p>

              <p style="font-size:16px;line-height:26px;">
                Thank you,<br />
                <strong>The ${appName} Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#f8f9fa" align="center" style="padding:25px;">
              <p style="margin:0;font-size:13px;color:#666666;">
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </p>

              <p style="margin:8px 0 0;font-size:13px;">
                <a href="www.zhelps.in" style="color:#0d6efd;text-decoration:none;">
                  www.zhelps.in
                </a>
                &nbsp;|&nbsp;
                <a href="mailto:${supportEmail}" style="color:#0d6efd;text-decoration:none;">
                  ${supportEmail}
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  <hr style="border:none;border-top:1px solid #eeeeee;margin:30px 0;">

<p style="font-size:13px;line-height:22px;color:#6c757d;text-align:center;">
  <strong>Automated Email Notice</strong><br><br>
  This is an automated message sent from <strong>${appName}</strong>.
  Please do <strong>not reply</strong> to this email, as this mailbox is not monitored.
  If you need assistance, please contact our support team at
  <a href="mailto:${supportEmail}" style="color:#0d6efd;text-decoration:none;">
    {{supportEmail}}
  </a>
  or visit our website at
  <a href="{{website}}" style="color:#0d6efd;text-decoration:none;">
    {{website}}
  </a>.
</p>
</body>
</html>`;
