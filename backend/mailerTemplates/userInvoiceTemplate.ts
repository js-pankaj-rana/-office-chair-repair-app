export const userInvoiceTemplate = (
  username: string,
  invoiceDownloadUrl: string,
  paymentLink: string,
  totalAmount: number,
  amount: number,
  appName: string,
  appUrl: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Service Request Approved ${appName}</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f7fb">
        <tr>
            <td align="center" style="padding:40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff"
                    style="border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">

                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding:20px;">
                            <h1 style="margin:10px 0;color:#690bb1;">
                                Service Request Approved
                            </h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:10px 20px; color:#333333;">
                            <div style="margin-top:0; font-size:16px;">
                                Dear <strong>${username}</strong>,
                            </div>

                            <p style="font-size:16px;line-height:26px;">
                                We&rsquo;re pleased to inform you that our technician has reviewed the images you
                                uploaded and
                                accepted your service request. <br />
                                Based on the assessment, we have generated a work estimation with a quotation amount of
                                ₹ ${totalAmount}.
                            </p>
                            <p style="font-size:16px;line-height:26px;">
                                <strong>View Your Quotation</strong><br />
                                You can review the detailed quotation using the link below:<br />
                                ${invoiceDownloadUrl}
                            </p>
                            <table cellpadding="0" cellspacing="0" align="center" style="margin:15px auto;">
                                <tr>
                                    <td align="center" bgcolor="#690bb1" style="border-radius:28px;">
                                        <a href="${invoiceDownloadUrl}" style="
                        display:inline-block;
                        padding:14px 20px;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:16px;
                        font-weight:bold;
                      ">
                                            View Quotation
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size:16px;line-height:26px;">
                                <strong>Payment Required</strong><br />
                                Please pay ₹ ${amount} using the secure payment link below:<br />
                                ${paymentLink}
                            </p>
                            <table cellpadding="0" cellspacing="0" align="center" style="margin:15px auto;">
                                <tr>
                                    <td align="center" bgcolor="#690bb1" style="border-radius:28px;">
                                        <a href="${paymentLink}" style="
                        display:inline-block;
                        padding:14px 20px;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:16px;
                        font-weight:bold;
                      ">
                                            Make Payment of ₹ ${amount}
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size:16px;line-height:26px;">
                                Once we receive and confirm your payment, our technician will be scheduled and will be
                                at your doorstep to carry out the required service.
                            </p>
                            <p style="font-size:16px;line-height:26px;">
                                If you have any questions regarding the quotation or service, please feel free to
                                contact us.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 10px 20px">
                            <table style="
          border-collapse: collapse;
          font-size: 13px;
          line-height: 20px;
          border-spacing: 0px;
          width: 100%;
          padding: 0px;
        ">
                                <tr>
                                    <td style="
              font-size: 16px;
              line-height: 24px;
              font-weight: bold;
              padding: 0px;
            ">
                                        <span class="z_tpl_name" style="color: rgb(105, 11, 177)">Helpdesk
                                            Support</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="
              font-size: 13px;
              line-height: 20px;
              font-weight: bold;
              padding: 0px;
            ">
                                        <span class="z_tpl_brand" style="color: rgb(26, 26, 26)">zhelps</span><span
                                            class="z_tpl_divider"
                                            style="padding: 0px 4px; color: rgb(26, 26, 26)">|</span><span
                                            class="z_tpl_title" style="color: rgb(26, 26, 26)">Support team</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0px">
                                        <a class="z_tpl_email" style="text-decoration: none"><span
                                                class="z_tpl_email_txt"
                                                style="color: rgb(26, 26, 26)">support@zhelps.in</span></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0px">
                                        <a class="z_tpl_phone" style="text-decoration: none"><span
                                                class="z_tpl_phone_txt" style="color: rgb(26, 26, 26)">+91 (326)
                                                356-4104</span></a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="z_tpl_card" style="
        border-radius: 8px;
        padding: 0px;
        background-color: rgb(105, 11, 177);
      ">
                            <table>
                                <tr>
                                    <td style="width: 35%; max-width: 132px; padding: 10px">
                                        <table style="border-collapse: collapse; width: 100%">
                                            <tr>
                                                <td style="padding: 0px">
                                                    <img class="z_tpl_logo"
                                                        src="https://api.zoviz.com/lfp?b=M161UYRJmjFMLwaMVi&amp;f=0bTJkH24SaMs&amp;d=3&amp;o=%7B%22type%22%3A%22solid%22%2C%22kind%22%3A%22solid%22%2C%22color%22%3A%22%23fff%22%7D"
                                                        style="width: 100%" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="width: 65%; padding: 10px">
                                        <table style="
                border-collapse: collapse;
                font-size: 13px;
                line-height: 20px;
                border-spacing: 0px;
                width: 100%;
              ">
                                            <tr>
                                                <td style="padding: 0px">
                                                    <span class="z_tpl_address"
                                                        style="color: rgb(255, 255, 255)">Dhanbad, Jharkhand,
                                                        826001</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px">
                                                    <a class="z_tpl_website" style="text-decoration: none"><span
                                                            class="z_tpl_website_txt"
                                                            style="color: rgb(255, 255, 255)">www.zhelps.in</span></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
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
        <a href="mailto:support@zhelps.in" style="color:#690bb1;text-decoration:none;">
            support@zhelps.in
        </a>
        or visit our website at
        <a href="${appUrl}" style="color:#690bb1;text-decoration:none;">
            ${appUrl}
        </a>.
    </p>
</body>

</html>`;
