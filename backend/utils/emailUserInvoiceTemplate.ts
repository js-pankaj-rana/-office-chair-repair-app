export const emailUserInvoiceTemplate = (
  username: string,
  invoiceDownloadUrl: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invoice</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

<table style="border-collapse: collapse; font-family: Arial, Helvetica, sans-serif; line-height: 20px; min-width: 400px; max-width: 600px; min-height: 70px; border: 0px; border-spacing: 0px; background-color: rgb(255, 255, 255);">
<tbody>
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
    <tbody>
    <!-- Invoice Info -->
    <tr>
        <td style="padding:30px;">

            <table width="100%">
                <tr>
                     <td>
<p>Dear ${username},</p>

<p>We hope you are doing well.</p>

<p>Your invoice has been successfully generated and is now ready for download.</p>

<p>You can access and download your invoice using the link below:</p>

<p><strong>Download Invoice:</strong></p>
<p>${invoiceDownloadUrl}</p>

<p>If you have any questions or need any assistance regarding your invoice, please feel free to reply to this email. We're happy to help.</p>

<p>Thank you for choosing our services.</p>

                     </td>
                </tr>
                </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
        </td>
    </tr>
    </tbody>
    <!-- Footer -->

</table>


</body>
</html>`;
