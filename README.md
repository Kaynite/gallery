# Laravel Vue Gallery
A Demo project to practice Vue.js with Laravel and SPA techniques like:
Authentication, Pagination, File Upload, State Management.
## Features

-   SPA.
-   Authentication Using Sanctum.
-   Drag and drop images (requires your account)
-   Pagination
-   Delete Images.

## Tech
-   TailwindCSS
-   Vue.Js 3.
-   Vuex.
-   VueRouter.
-   Laravel 8.
-   Fortify.
-   Sanctum.

## To-Do

-   [x] Profile Settings (For Users).
-   [x] Add Images to Readme

## Images
    ![Homepage](https://i.ibb.co/ZV9ydw2/Web-capture-21-1-2022-83326-gallery-test.jpg)
    ![Upload](https://i.ibb.co/kxjckcS/Web-capture-21-1-2022-83355-gallery-test.jpg)
    ![Profile](https://link](https://i.ibb.co/2PF32Lx/Web-capture-21-1-2022-8343-gallery-test.jpg)
    ![Single Image](https://i.ibb.co/MnCWp4Y/Web-capture-21-1-2022-83341-gallery-test.jpg)
    ![Login](https://i.ibb.co/xSWcV8b/Web-capture-21-1-2022-83414-gallery-test.jpg)
    

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
