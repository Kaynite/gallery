# Laravel Vue Gallery

## Features

-   SPA.
-   Authentication Using Sanctum.
-   Drag and drop images (requires your account)
-   Pagination
-   Delete Images.

## Tech

-   Vue.Js 3.
-   Vuex.
-   VueRouter.
-   Laravel 8.
-   Fortify.
-   Sanctum.

## To-Do

-   Profile Settings (For Users).
-   Add Images to Readme

## Installation

```sh
git clone https://github.com/Kaynite/gallery.git
cp .env.example .env
composer install
npm install
npm run dev
```

> Add your database connection settings 

```sh
php artisan migrate
php artisan serve
```


For production environments...

```sh
npm run prod
```
