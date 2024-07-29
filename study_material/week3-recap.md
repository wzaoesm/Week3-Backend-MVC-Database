# Week 3 Recap
Yo guys, kita lanjut lagi perjalanan phase 1 kita. gua bakal recap apa yang kalian pelajarin di week 3 dan ada beberapa point yang harus di highlight biar kalian paham secara menyeluruh untuk materi backend express js.

ini pake contoh repo nyomanaditia(yayaya) untuk jelasin point point backendnya. 

![image](https://github.com/user-attachments/assets/11c53e8d-506a-4c42-9c47-50c59b9f9916)

overall struktur folder yang paling bagus seperti ini.
flow backend yang rapih:
```
SERVER API -> ROUTER -> CONTROLLER -> MODEL
```

- `server` ini deklarasi dari app.js untuk initiallize server express js kita buat open server sesuai PORT yang kita setting.

- `router` pointing ke route route yang bakal kita buat untuk API kita

- `controller` penghubung handling logic dari setiap route yang ditembak sama route.

- `model` tempat untuk olah data dari kebutuhan logic controller.

- `connection` code untuk open connection ke database SQLite.

***`app.js` atau `index.js`***
```js
const express = require("express");
const app = express();
const port = 3000;
const router = require("./router/router")
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(router)

app.listen(port, () => {
  console.log("Server is running in port: " + port);
});
```

dari server API ini ada beberapa hal yang harus kalian perhatikan, "app.use(express.json())"  ini adalah middleware pertama yang dijalanin oleh server app kita.

jadi server itu membaca middleware secara berurutan atau sequential.

di case ini ada 4 urutan:
```js
app.use(express.json())
```

Middleware untuk parsing json, ini wajib di declare pertama kali agar API kalian bisa menggunakan payload berformat json.

```js
app.get("/", (req, res) => {
  res.send("hello world");
}); 
```
Route API untuk root url, ini optional sebenernya. root url ini fungsinya mengecek server kalian jalan atau tidak.
```
app.use(router)
```
Middleware untuk jalanin router yang kita deklarasi di folder route.
```js
app.listen(port, () => {
  console.log("Server is running in port: " + port);
});
```
Eksekusi proses terakhir, yaitu starting server dengan pointing ke PORT yang sudah di setting.

## INI HANYA AWALAN
yang kalian gunakan ini middleware" sederhana agar kalian mengerti proses backend sederhana. di week4 kalian akan belajar lebih banyak middleware dan membuat backend yang lebih ready untuk production.

***ROUTER***
```JS
const express = require("express");
const router = express.Router();
const contactController = require("../controller/contactController");
const groupController = require("../controller/groupController");
const contactGroupController = require("../controller/contactGroupController");

router
  .route("/contact")
  .get(contactController.getContacts)
  .post(contactController.createContact);

router.put("/contact/:id", contactController.updateContact);
router.delete("/contact/:id", contactController.deleteContact);

router
  .route("/groups")
  .get(groupController.getGroups)
  .post(groupController.createGroups);
router.put("/groups/:id", groupController.updateGroups);
router.delete("/groups/:id", groupController.deleteGroups);

router.post("/contactGroup", contactGroupController.createContactGroup);
router.put("/contactGroup/:id", contactGroupController.updateContactGroup);
router.delete("/contactGroup/:id", contactGroupController.deleteContactGroup);

module.exports = router;
```

disini yang perlu di lihat yaitu cara kita ngarahin controller ke route, jadi sebenernya parameter dari setiap route API itu callback untuk params (req, res, next). nah agar lebih rapih route ini fungsinya hanya pointing URL dan handling logic API nya akan diserahkan ke file controller kita.

***controller contact***
kita ambil contoh 1 controller saja yaitu contact
```js
const ModelContact = require("../model/contact");

const getContacts = async (req, res) => {
  try {
    const result = await ModelContact.getContacts();
    res.status(200).send({
      status: 200,
      message: "Get Contacts Success",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const createContact = async (req, res) => {
  try {
    const body = req.body;
    const result = await ModelContact.createContact(
      body.name,
      body.phoneNumber,
      body.company,
      body.email
    );

    res.status(200).json({
      status: 200,
      message: "Succesc Create Contact",
      data: body,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const result = await ModelContact.updateContact(
      body.name,
      body.phoneNumber,
      body.company,
      body.email,
      id
    );

    res.status(200).json({
      status: 200,
      message: "Success Update Contact",
      data: body,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ModelContact.deleteContact(id);

    res.status(200).json({
      status: 200,
      message: "Success delete Contact",
      data: id,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { getContacts, createContact, updateContact, deleteContact };
```
kita bahas mulai dari params callback dari router, (req, res) params ini yang bakal kita gunakan untuk handling logic API. Req fungsinya untuk mendapatkan informasi request dari http request frontend, kita bisa mendapatkan query params, body, headers. sedangkan Res ini fungsinya untuk mengirimkan balikan respon ke frontend.

***Model***
untuk model sisanya sama saja seperti sebelumnya, fungsi model ini untuk mengolah data dan komunikasi ke database.
