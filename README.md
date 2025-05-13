## How to effortlessly setup a blog with Strapi and Next.js

### Introduction

Building a modern, fast, and scalable blog is easier than ever with the combination of **Strapi** and **Next.js**. Strapi, a headless CMS, allows you to manage your content effortlessly through its API-first approach. It provides flexibility, scalability, and a user-friendly interface for content creators, enabling seamless content management and localization.

On the other hand, **Next.js** is a powerful React framework that excels in building static and dynamic websites with minimal configuration. By integrating **Static Site Generation (SSG)** with **Edge Caching**, Next.js provides exceptional performance by pre-rendering your content and delivering it from the nearest server, making your blog blazing fast. This combination of Strapi's content management capabilities and Next.js's performance optimizations ensures a headless blog setup that's both efficient and easy to scale.

In this post, we'll guide you through setting up a headless blog using Strapi and Next.js, leveraging SSG and Edge Cache for outstanding speed and reliability.

> 🧶 **Note:** We use **Yarn** over `npm` for its faster install times, deterministic dependency resolution via `yarn.lock`, and generally more reliable performance in monorepos and complex JavaScript projects.

## Getting started

### Requirements

- Node.js
- Folder structure

We assume you are familiar with node.js and won't cover the details of setting it up.

#### Folder

Create a folder that holds the _cms_ and the _frontend_

e.g. `mkdir myblog` and change into the directory. `cd myblog`

Head over to [https://github.com/SynTessera/headless-strapi-blog](https://github.com/SynTessera/headless-strapi-blog) and clone the Strapi backend.

#### Cloning the backend / CMS boilerplate

```
git clone https://github.com/SynTessera/headless-strapi-blog.git cms
```

You can develop locally, but in order to manage your content you need to host it somewhere.

Using [railway](https://railway.com) is an easy and straight forward way to host your Strapi instance.

But let's get this running locally first.

### Install Dependencies

You need to install Strapis deps before you can start the local dev server.

Open a terminal inside _myblog/cms_ and run `yarn`.

After dependencies have been installed you can start Strapi using `yarn dev`

#### A database

In order to work, Strapi needs to connect to a database. You can easily spin up a Postgresql server using Docker. (just google).

#### Updating .env

Before you can run `yarn dev` you need to create a _.env_ file with the correct variables. You'll need something like this:

```
# Secrets
APP_KEYS=EInnGAeA+gvuthXRvw3eAg==,l+Rvw0N0dS1CpSe3Tz4ecA==,PzK6E5r+Ffp4odeGdvmh4Q==,BwftPgNPs9ZQ4sbvINPOxQ==
API_TOKEN_SALT=6VuagpJq9UVMmx+i0vBXew==
ADMIN_JWT_SECRET=9rWYtbGN4Cpg5igTZ+8G9A==
TRANSFER_TOKEN_SALT=rQs9gqpVK0F8c3cwUYH/Zg==
# Database
DATABASE_CLIENT=postgres
DATABASE_URL="postgresql://postgres:QTeofJUMUacQPJLtuLNnwXBFxhHcFPHG@postgres.myblog.com:4532/railway"
```

#### Running Dev

Once you spun up a DB and configured all environment variables correctly, you can run `yarn dev`

Once Strapi is up and running, you can open the _Admin panel_ and create your admin user.

Before we can connect a headless frontend to Strapi, we need to setup a few things.

You need to enable localization in the Settings and create an API_TOKEN we can use to authenticate our frontend.

You also need to enable public permissions for your entities. You can find them under _Admin/Settings/Users & Permissions plugin/Roles/Public_.

There you have to enable _find_ and _findOne_ for all the custom content types we created.

#### Run the dev server

Once you configured localization, created your api token and setup permissions, you just need to connect the frontend to display your content.

We are using Next.js for the headless frontend instead of modern bundlers like Vite as it supports SSG and ISR with TypeScript/ESM on both, unix and windows.

> 🧶 **Note:** Vite is still having issues with TypeScript/ESM + SSG on Windows.

### Cloning the headless blog boilerplate

Head over to your _myblog_ folder and run

```
git clone https://github.com/SynTessera/headless-strapi-frontend.git frontend
```

As with Strapi, you also need to install the frontend deps, so cd into the folder _myblog/frontend_ and run `yarn`.

#### Env Files

You'll find a _.env.example_ file in the frontend repo which exposes a few environment variables you need to configure.

```
STRAPI_TOKEN=generateoneinthestrapiadminpanel
STRAPI_BASE=https://localhost:1337
STRAPI_URL=https://localhost:1337/api
```

#### Run the frontend dev server

Once dependencies are installed and your _.env_ file is configured properly, you can start the frontend.

Run `yarn dev` and open _https://localhost:3000/blog_ to get started.

## Create Content

Now you only need to customize your frontend and start to create content.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
