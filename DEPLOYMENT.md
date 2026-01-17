# Deployment Guide (Vercel)

This project is optimized for deployment on [Vercel](https://vercel.com), the creators of Next.js.

## Option 1: Deploy via GitHub (Recommended)

1.  **Push to GitHub**
    - Create a new repository on GitHub.
    - Run the following commands in your project folder:
      ```bash
      git remote add origin https://github.com/YOUR_USERNAME/yosh-avlod-kanali.git
      git branch -M main
      git push -u origin main
      ```

2.  **Import in Vercel**
    - Log in to [Vercel](https://vercel.com).
    - Click **"Add New..."** > **"Project"**.
    - Select your GitHub repository (`yosh-avlod-kanali`).
    - Click **Import**.

3.  **Configure Environment Variables**
    - In the "Configure Project" screen, expand the **"Environment Variables"** section.
    - Add the following variables (copy values from your `.env.local`):
        - `NEXT_PUBLIC_YOUTUBE_API_KEY`
        - `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID`
        - `NEXT_PUBLIC_SUPABASE_URL`
        - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4.  **Deploy**
    - Click **"Deploy"**.
    - Wait for the build to complete. Vercel will provide a live URL (e.g., `yosh-avlod.vercel.app`).

## Option 2: Deploy via Vercel CLI

1.  **Install Vercel CLI**
    ```bash
    npm i -g vercel
    ```

2.  **Login**
    ```bash
    vercel login
    ```

3.  **Deploy**
    Run the deploy command from the project root:
    ```bash
    vercel
    ```
    - Follow the prompts (Set up and deploy? [Y]).
    - Link to your Vercel account.
    - **Environment Variables**: You can choose to link your local `.env.local` or set them up in the dashboard later.

4.  **Production Deployment**
    To deploy to production (live):
    ```bash
    vercel --prod
    ```

## Post-Deployment Checks
- Visit the live URL.
- Check the **Stats** page to ensure YouTube data is fetching.
- Check the **Programs** page to ensure Supabase connection works.
- Verify that the specific Uzbek fonts/translations display correctly.
