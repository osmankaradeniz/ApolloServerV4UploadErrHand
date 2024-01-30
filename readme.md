# GRAPHQL API - APOLLO SERVER V4 DOSYA YÜKLEME İŞLEVİ

***Graphql API tarafından Apollo server v4 tarafına dosya veya resim yükleme işlevinde hata yönetimi ile alakalı problemi yönetip çözümlediğim çalışma.***

<br/>
<br/>

**[YouTube Video : Çalışan halinin videosunu izlemek için tıklayınız !](https://www.youtube.com/watch?v=2c3fbzrk4k8)**
<br/>
<br/>

### Server (Node.js - express , Apollo Server v4)

Server tarafında .env dosyasında bulunan bazı konfigürasyonlar.
##### Herhangi bir işlevde yüklenecek bir dosya boyutu server max upload size'den düşük tanımlanmalı veya tam tersi şekilde yüklenecek alana göre server max upload size tanımlanmalıdır.
```
PROJECT_URL="http://localhost:3001"
SERVER_STATIC_PATH="public"
SERVER_UPLOAD_MAX_SIZE = "50"  //server'a max yüklenebilecek dosya boyutu kontrolü (MB)
SERVER_UPLOAD_IMAGE_MAX_SIZE = "2" // ilgili yükleme işlevinde kabul edilen dosya boyutu kontrolü parametresi (MB)
```



Paketlerin kurulumu ve sunucunun çalıştırılması.
```
npm install 
node server.js
```


Apollo sanbox tarafında isteği oluşturmak için headers bilgisine **"Apollo-Require-Preflight:true"** tanım eklenmelidir.


Paketler ;
- @apollo/server: ^4.9.2
- @graphql-tools/merge: ^9.0.0
- @graphql-tools/schema: ^10.0.0
- body-parser: ^1.20.2
- cors: ^2.8.5
- dotenv: ^16.3.1
- graphql: ^16.8.0
- graphql-middleware: ^6.1.35
- graphql-scalars: ^1.22.2
- graphql-tag: ^2.12.6
- graphql-upload: ^15.0.2


<br/>
<br/>



### Client (React.js)

client paketlerin kurulumu çalıştırılması ;
```
npm install
npm start
```


Paketler ;
- @apollo/client: ^3.8.10
- @testing-library/jest-dom: ^5.17.0
- @testing-library/react: ^13.4.0
- @testing-library/user-event: ^13.5.0
- apollo-upload-client: ^18.0.1
- graphql: ^16.8.1
- graphql-tag: ^2.12.6
- react: ^18.2.0
- react-dom: ^18.2.0
- react-scripts: 5.0.1
- web-vitals: ^2.1.4



<br/>
<br/>

### incelediğim birkaç kaynak ;
#### Server
 [https://github.com/jaydenseric/graphql-upload/issues/45](https://github.com/jaydenseric/graphql-upload/issues/45)
 [https://github.com/jaydenseric/graphql-upload/issues/246](https://github.com/jaydenseric/graphql-upload/issues/246)
 [https://github.com/jaydenseric/graphql-upload/issues/274](https://github.com/jaydenseric/graphql-upload/issues/274)
 [https://github.com/jaydenseric/graphql-upload/issues/218](https://github.com/jaydenseric/graphql-upload/issues/218)
 [https://www.apollographql.com/docs/apollo-server/v3/data/file-uploads/#integrating-with-fastify](https://www.apollographql.com/docs/apollo-server/v3/data/file-uploads/#integrating-with-fastify)

#### Client
 [https://www.apollographql.com/docs/react/data/file-uploads/](https://www.apollographql.com/docs/react/data/file-uploads/)
 [https://github.com/jaydenseric/apollo-upload-client](https://github.com/jaydenseric/apollo-upload-client)
 [https://gist.github.com/alexandrebodin/fedc71c8513bfbb6283cc90ae62755c5](https://gist.github.com/alexandrebodin/fedc71c8513bfbb6283cc90ae62755c5)
 [https://github.com/jaydenseric/apollo-upload-examples/blob/master/app/pages/_app.mjs](https://github.com/jaydenseric/apollo-upload-examples/blob/master/app/pages/_app.mjs)

#### Diğer
[https://stackoverflow.com/questions/64658321/variable-file-got-invalid-value-upload-value-invalid](https://stackoverflow.com/questions/64658321/variable-file-got-invalid-value-upload-value-invalid)