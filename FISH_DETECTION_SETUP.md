# Fish Detection Project Setup Guide

## Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd "c:/Users/A S U S/FISH DECTECT/backend"
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Update CORS settings in `main.py`:**
   
   Update the CORS middleware to allow your Next.js frontend:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=[
           "http://localhost:5173",  # Vite dev server
           "http://127.0.0.1:5173",
           "http://localhost:3000",   # Next.js dev server
           "http://127.0.0.1:3000",
           "https://nabinnepali.com.np",  # Production domain (if applicable)
       ],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

4. **Start the FastAPI server:**

   **Option 1: Use the startup script (Easiest)**
   - Double-click `start-backend.bat` in your portfolio project root
   - Or run `start-backend.ps1` in PowerShell
   
   **Option 2: Manual start**
   ```bash
   cd "c:/Users/A S U S/FISH DECTECT/backend"
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

   **Note:** You need to run the backend server every time you want to use the Fish Detection feature. Keep the terminal window open while using it.

## Frontend Configuration

1. **Create a `.env.local` file in your Next.js project root:**
   ```env
   NEXT_PUBLIC_FISH_API_URL=http://127.0.0.1:8000
   ```

   For production, update this to your deployed backend URL:
   ```env
   NEXT_PUBLIC_FISH_API_URL=https://your-backend-url.com
   ```

2. **Restart your Next.js development server** after adding the environment variable.

## Testing

1. Navigate to the Fish Detection project page: `/projects/5`
2. Upload an image of a fish
3. Click "Detect Fish" to see the results

## Supported Fish Species

The model can detect the following 13 fish species:
- AngelFish
- BlueTang
- ButterflyFish
- ClownFish
- GoldFish
- Gourami
- MorishIdol
- PlatyFish
- RibbonedSweetlips
- ThreeStripedDamselfish
- YellowCichlid
- YellowTang
- ZebraFish

## Running the Backend

**Yes, you need to start the backend server every time you want to use the Fish Detection feature.**

### Quick Start Methods:

1. **Double-click `start-backend.bat`** (Windows Batch file)
   - Easiest method - just double-click the file
   - The server will start automatically

2. **Run `start-backend.ps1`** (PowerShell script)
   - Right-click → Run with PowerShell

3. **Manual command:**
   ```bash
   cd "c:/Users/A S U S/FISH DECTECT/backend"
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

### Keep the Server Running:
- **Don't close the terminal window** while using the Fish Detection feature
- The server must stay running for the frontend to connect
- Press `CTRL+C` to stop the server when done

### Auto-Start on Boot (Optional):
If you want the backend to start automatically, you can:
- Create a Windows Task Scheduler task
- Or use a service manager like NSSM (Non-Sucking Service Manager)

## Troubleshooting

### "Failed to fetch" or "Unable to connect to the detection server"
1. **Check if backend is running:**
   - Open `http://127.0.0.1:8000/` in your browser
   - You should see: `{"message":"Fish Detector API is running!"}`
   - If not, start the backend using one of the methods above

2. **Verify the port:**
   - Backend should be on port 8000
   - Check for any error messages in the terminal

3. **Check CORS settings:**
   - Make sure `localhost:3000` and `127.0.0.1:3000` are in the CORS origins

4. **Environment variable:**
   - Verify `NEXT_PUBLIC_FISH_API_URL=http://127.0.0.1:8000` in `.env.local`
   - Restart Next.js dev server after adding/changing env variables

### Detection not working
- Ensure the model file `best.pt` is in `main/best (1).pt`
- Check that all dependencies are installed: `pip install -r requirements.txt`
- Review the backend logs in the terminal for errors
- Make sure you're uploading a valid image file (JPG, PNG, etc.)

