
# lOCAL CLOUD
### This is an API, to have something similar to Google Cloud locally, so you can later complement it with a frontend.
##  Setup project

#### Install the project dependencies.

```bash
  //using npm
  npm install
  
  //using pnpm
  pnpm install
```
Open .env-example and copy its content into a new file named .env, then set the correct value for HOME_CLOUD_STORAGE. 

#### Build the project.
```bash
  //using npm
  npm run build
  
  //using pnpm
  pnpm build
```
#### Run the project
```bash
  //using npm
  npm run start
  
  //using pnpm
  pnpm star
```


## API Reference

#### Get Directory

```http
  GET /api/content/path?
```


Return what is in the current directory.

![App Screenshot](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/824e4eb2-1f06-4851-8886-48e45309e57c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230206T023852Z&X-Amz-Expires=86400&X-Amz-Signature=47dad138df5da1d311d05078537394934209a2d5f425bb264ac9c03235dd9e66&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

### How to navigate between folders?
In a URL, the slash "/" is used to separate the different sections of a web address and to indicate the path to a file or directory on the web server. That is why in this case we opted to use "--", later changed to "//" to access the folder in Windows or "/" in Linux.

![App Screenshot](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6303feda-766a-4981-9983-ee30687afc23/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230206T025044Z&X-Amz-Expires=86400&X-Amz-Signature=69b0fe8688e4c9b7d26fa19b58d67ecd1d8a98a3791371292445172e911829df&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

### Creation of folders


#### Create folder

```http
  POST /api/dir/path?
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required** |

To create folders is a simple way, let's follow the path above, within this we want to create a folder.

```http
POST /api/dir/amigos--pollos--familly
```

### File Upload

```http
  POST /api/upload/path?
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file`      | `file` | **Form Data** |

### Example
```http
POST /api/upload/amigos--pollos--familly
```
![App Screenshot](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/324a2ab9-5266-49e5-99cc-dee2351b2630/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230206T031316Z&X-Amz-Expires=86400&X-Amz-Signature=5a549630bb2ff3c0ba63288c6c12dd52b9f2844d512ebd43307592e674f2a5fa&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

