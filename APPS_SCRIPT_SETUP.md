# Google Sheets & Email Integration Setup

To connect your contact form to Google Sheets and enable auto-replies from your Gmail, follow these steps:

## 1. Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new sheet.
2. Name it "Portfolio Contact Form" (or whatever you like).
3. In the first row, add these headers: `Date`, `Name`, `Email`, `Message`.

## 2. Add the Script
1. In the Google Sheet, clicking on **Extensions** > **Apps Script** in the top menu.
2. Delete any code in the editor and paste the code below:

```javascript
// Updated Script for Modern Email with Drive Logo
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // 1. Append data to Google Sheet
    var timestamp = new Date();
    sheet.appendRow([timestamp, data.name, data.email, data.message]);
    
    // 2. Setup Logo URL (Google Drive Direct Link)
    var logoUrl = "https://drive.google.com/uc?export=view&id=1x-vRX9Dw-wjDybMypmEoaQvCFF2N3vfQ";

    // 3. Select Random Success Message
    var successMessages = [
      "Thank you for your message. It has been received, and I will be in touch shortly.",
      "Your message has been received successfully. I will respond as soon as possible.",
      "Thank you for getting in touch. Your message has been noted, and I will respond shortly.",
      "I appreciate you reaching out. Your message has been received, and I will follow up accordingly.",
      "Thank you for contacting me. Your message has been received, and I will reply shortly.",
      "Your message has been received. I will review it and respond at the earliest opportunity.",
      "Thank you for your message. I will review the details and get back to you shortly.",
      "Your message has been successfully received. I will be in touch soon.",
      "Thank you for reaching out. Your message is under review, and I will respond shortly.",
      "Your message is acknowledged with thanks. I will get back to you as soon as possible."
    ];
    var randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
    
    // 4. Construct Fancy HTML Email
    var subject = "Thank you for contacting Nabin Nepali";
    var htmlBody = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #ffffff;">
        
        <!-- Card Container -->
        <div style="max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);">
          
          <div style="text-align: center;">
            <img src="${logoUrl}" alt="Nabin Nepali Logo" style="width: 80px; height: auto; margin-bottom: 24px;">
          </div>
          
          <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 8px; font-size: 26px; font-weight: 800; text-align: center; letter-spacing: -0.025em;">Hi ${data.name} 👋,</h2>
          
          <p style="color: #14b8a6; font-size: 13px; font-weight: 600; text-align: center; margin-top: 0; margin-bottom: 32px; letter-spacing: 0.05em; text-transform: uppercase;">Message Received Successfully</p>
          
          <p style="font-size: 16px; line-height: 1.7; color: #475569; text-align: center; margin-bottom: 32px;">
            ${randomMessage}
          </p>
          
          <!-- Tech Vibe Message Box (Terminal Style) -->
          <div style="background-color: #1e293b; border-radius: 12px; padding: 0; overflow: hidden; margin: 32px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #334155; padding: 8px 16px; line-height: 0;">
              <!-- Dots Group -->
              <span style="display: inline-block; vertical-align: middle;">
                <span style="display: inline-block; width: 10px; height: 10px; background-color: #ef4444; border-radius: 50%;"></span><span style="display: inline-block; width: 2px;"></span><span style="display: inline-block; width: 10px; height: 10px; background-color: #eab308; border-radius: 50%;"></span><span style="display: inline-block; width: 2px;"></span><span style="display: inline-block; width: 10px; height: 10px; background-color: #22c55e; border-radius: 50%;"></span>
              </span>
              <!-- Filename -->
              <span style="display: inline-block; vertical-align: middle; font-family: monospace; color: #94a3b8; font-size: 12px; line-height: 12px; margin-left: 8px;">your_message.txt</span>
            </div>
            <div style="padding: 20px;">
              <p style="margin: 0; font-family: 'Consolas', 'Monaco', 'Courier New', monospace; color: #e2e8f0; font-size: 14px; line-height: 1.6;">
                <span style="color: #14b8a6; margin-right: 8px;">$</span>${data.message}
              </p>
            </div>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 32px 0;">
          
          <div style="text-align: center;">
             <p style="margin: 0; font-weight: 600; color: #0f172a;">Best regards,</p>
             <p style="margin: 8px 0; color: #14b8a6; font-weight: 800; font-size: 20px; letter-spacing: -0.025em;">Nabin Nepali</p>
             <p style="margin: 0; color: #64748b; font-size: 14px; font-weight: 500;">ML Engineer | AI Automation Specialist</p>
          </div>
          
        </div>
      </div>
    `;

    // 4. Send Email
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody
    });
    
    // Return success
    return ContentService.createTextOutput(JSON.stringify({ 'status': 'success', 'message': 'Message sent successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'status': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deploy the Script
1. Click **Deploy** (blue button top right) > **New deployment**.
2. Click the **Select type** (gear icon) > **Web app**.
3. Configure the following:
   - **Description**: Contact Form API
   - **Execute as**: **Me** (this ensures the email comes from YOUR account)
   - **Who has access**: **Anyone** (this allows your website to send data to it)
4. Click **Deploy**.
5. **Authorize** the script when prompted (you might see a "Unsafe" warning since it's your own script; click Advanced > Go to... (unsafe)).

## 4. Get the URL
1. Copy the **Web App URL** (it ends with `/exec`).
2. Go to your project code.
3. Create or open the `.env.local` file.
4. Add the URL like this:
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_LONG_SCRIPT_ID/exec
   ```

Done! Your contact form will now save to Sheets and send emails from your account.
