
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

![App Screenshot](https://camo.githubusercontent.com/0b83a661ab0b0b8dcf99a457a46894258bd6da46b4f0b5c37f7cd69f15141991/68747470733a2f2f73332e75732d776573742d322e616d617a6f6e6177732e636f6d2f7365637572652e6e6f74696f6e2d7374617469632e636f6d2f38323465346562322d316630362d343835312d383838362d3438653435333039653537632f556e7469746c65642e706e673f582d416d7a2d416c676f726974686d3d415753342d484d41432d53484132353626582d416d7a2d436f6e74656e742d5368613235363d554e5349474e45442d5041594c4f414426582d416d7a2d43726564656e7469616c3d414b49415437334c324734354549505433583435253246323032333032303625324675732d776573742d322532467333253246617773345f7265717565737426582d416d7a2d446174653d3230323330323036543032333835325a26582d416d7a2d457870697265733d383634303026582d416d7a2d5369676e61747572653d3437646164313338646635646131643331316430353037383533373339343933343230396132643566343235626232363461633963303332333564643965363626582d416d7a2d5369676e6564486561646572733d686f737426726573706f6e73652d636f6e74656e742d646973706f736974696f6e3d66696c656e616d65253344253232556e7469746c65642e706e6725323226782d69643d4765744f626a656374)

### How to navigate between folders?
In a URL, the slash "/" is used to separate the different sections of a web address and to indicate the path to a file or directory on the web server. That is why in this case we opted to use "--", later changed to "//" to access the folder in Windows or "/" in Linux.

![App Screenshot](https://camo.githubusercontent.com/29e11a306850ed848535d263972f98949c315c68e50389d1862db4d1a11d4692/68747470733a2f2f73332e75732d776573742d322e616d617a6f6e6177732e636f6d2f7365637572652e6e6f74696f6e2d7374617469632e636f6d2f36333033666564612d373636612d343938312d393938332d6565333036383761666332332f556e7469746c65642e706e673f582d416d7a2d416c676f726974686d3d415753342d484d41432d53484132353626582d416d7a2d436f6e74656e742d5368613235363d554e5349474e45442d5041594c4f414426582d416d7a2d43726564656e7469616c3d414b49415437334c324734354549505433583435253246323032333032303625324675732d776573742d322532467333253246617773345f7265717565737426582d416d7a2d446174653d3230323330323036543032353034345a26582d416d7a2d457870697265733d383634303026582d416d7a2d5369676e61747572653d3639623066653836383865346339623764323666613139623538643637656364316438613938613337393133373132393234343531373265393131383239646626582d416d7a2d5369676e6564486561646572733d686f737426726573706f6e73652d636f6e74656e742d646973706f736974696f6e3d66696c656e616d65253344253232556e7469746c65642e706e6725323226782d69643d4765744f626a656374)

### Creation of folders


#### Create folder

```http
POST /api/dir/path?
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required** |

#### Example

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

#### Example
```http
POST /api/upload/amigos--pollos--familly
```
![App Screenshot](https://camo.githubusercontent.com/da09b5828645cf6747c61bf4dcae6b40cc67c207e0370be814eb7d46bb448db8/68747470733a2f2f73332e75732d776573742d322e616d617a6f6e6177732e636f6d2f7365637572652e6e6f74696f6e2d7374617469632e636f6d2f33323461326162392d353236362d343965352d393963632d6465653233353162323633302f556e7469746c65642e706e673f582d416d7a2d416c676f726974686d3d415753342d484d41432d53484132353626582d416d7a2d436f6e74656e742d5368613235363d554e5349474e45442d5041594c4f414426582d416d7a2d43726564656e7469616c3d414b49415437334c324734354549505433583435253246323032333032303625324675732d776573742d322532467333253246617773345f7265717565737426582d416d7a2d446174653d3230323330323036543033313331365a26582d416d7a2d457870697265733d383634303026582d416d7a2d5369676e61747572653d3561353439363330626232666633633062613633323838633663313264643532623966323834346435313265626434333330373539326536373466326135666126582d416d7a2d5369676e6564486561646572733d686f737426726573706f6e73652d636f6e74656e742d646973706f736974696f6e3d66696c656e616d65253344253232556e7469746c65642e706e6725323226782d69643d4765744f626a656374)


### Download Files

```http
GET /api/download/path?
```


#### Example
```http
GET /api/download/amigos--pollos--familly--gus.png
```
### View Media files

```http
POST /api/img/path?
```

It is not limited to images and videos, you can also view PDFs among many multimedia files.



#### Example
```http
POST /api/img/amigos--pollos--familly--gus.png
```

### Delete Files

```http
DELETE /api/delete/path?
```
#### Example
```http
DELETE /api/delete/amigos--pollos--familly--gus.png
```
### Rename Files

```http
PUT /api/rename/path?
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Raw Json** |

#### Example
```http
PUT /api/rename/amigos--pollos--familly--gus.png
```

![App ScreenShot](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5db6fd7c-e88b-4856-a691-ff12a91f99ac/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230208T224813Z&X-Amz-Expires=86400&X-Amz-Signature=5b62ebedac41def20b8515aa0daa9b2287ceacdb4ca7ce2b08c97614f17f42e5&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)