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
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // 1. Append data to Google Sheet
    var timestamp = new Date();
    sheet.appendRow([timestamp, data.name, data.email, data.message]);
    
    // 2. Send Auto-Reply Email to the User
    var subject = "Thank you for contacting Nabin Nepali";
    var body = "Hi " + data.name + ",\n\n" +
               "Thanks for reaching out! I have received your message and will get back to you as soon as possible.\n\n" +
               "Your Message:\n" + data.message + "\n\n" +
               "Best regards,\n" +
               "Nabin Nepali\n" +
               "ML Engineer | AI Developer";
               
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body
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
