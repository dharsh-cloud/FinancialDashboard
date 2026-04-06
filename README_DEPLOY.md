# Deployment Guide: Vercel + MongoDB Atlas

This application is ready to be deployed to Vercel with a MongoDB Atlas backend.

## 1. Set up MongoDB Atlas

1.  Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a new Cluster (the free shared tier is fine).
3.  In **Database Access**, create a user with a username and password.
4.  In **Network Access**, add `0.0.0.0/0` to allow access from anywhere (Vercel's serverless functions).
5.  In **Clusters**, click **Connect** -> **Connect your application**.
6.  Copy the connection string (it looks like `mongodb+srv://<username>:<password>@cluster0...`).

## 2. Deploy to Vercel

1.  Push your code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and click **New Project**.
3.  Import your GitHub repository.
4.  In **Environment Variables**, add the following:
    *   `MONGODB_URI`: Your MongoDB Atlas connection string (replace `<username>` and `<password>` with your credentials).
    *   `JWT_SECRET`: A long, random string for security.
    *   `NODE_ENV`: `production`
    *   `GEMINI_API_KEY`: Your Gemini API key.
    *   `ADMIN_EMAIL`: Your desired admin email.
    *   `ADMIN_PASSWORD`: Your desired admin password.
5.  Click **Deploy**.

## 3. Post-Deployment

*   Vercel will automatically run `npm run build` to compile the frontend.
*   The backend routes are handled by the serverless functions as configured in `vercel.json`.
*   Your app will be live at the provided Vercel URL!
