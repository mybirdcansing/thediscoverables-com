# A Next.js Blog with a Native Authoring Experience<!-- omit in toc -->

This is a statically generated website for my band that uses [Next.js][nextjs] for the frontend and [Sanity][sanity-homepage] to handle its content. It has a native Sanity Studio.

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

## Features

- Update and manage website for The Discoverables


## Table of Contents

- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
  - [Important files and folders](#important-files-and-folders)
- [Configuration](#configuration)
  - [Step 1. Set up the environment](#step-1-set-up-the-environment)
  - [Step 2. Set up the project locally](#step-2-set-up-the-project-locally)
  - [Step 3. Run Next.js locally in development mode](#step-3-run-nextjs-locally-in-development-mode)
  - [Step 4. Deploy to production](#step-4-deploy-to-production)
- [Questions and Answers](#questions-and-answers)
  - [It doesn't work! Where can I get help?](#it-doesnt-work-where-can-i-get-help)
  - [How can I remove the "Next steps" block from my blog?](#how-can-i-remove-the-next-steps-block-from-my-blog)
  - [How can I set up Incremental Static Revalidation?](#how-can-i-set-up-incremental-static-revalidation)
- [Next steps](#next-steps)

## Project Overview

| [Webssite](https://thediscoverables.com)                                                                          | [Studio](https://thediscoverables.com/studio)                                                                          |


## Configuration

### Set up the project locally

[Clone the repository](https://github.com/mybirdcansing/thediscoverables-com). Once cloned, run the following command from the project's root directory:

```bash
npx vercel link
```

Download the environment variables needed to connect Next.js and the Studio to your Sanity project:

```bash
npx vercel env pull
```

### Step 3. Run Next.js locally in development mode

```bash
npm install && npm run dev
```

When you run this development server, the changes you make in your frontend and studio configuration will be applied live using hot reloading.

Your blog should be up and running on [http://localhost:3000][localhost-3000]! You can create and edit content on [http://localhost:3000/studio][localhost-3000-studio].

### Step 4. Deploy to production

To deploy your changes to production you use `git`:

```bash
git add .
git commit
git push
```

Alternatively, you can deploy without a `git` hosting provider using the Vercel CLI:

```bash
npx vercel --prod
```

