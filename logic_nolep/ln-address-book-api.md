# Logic Nolep (Address Book API)

Bungkus tugas ini jadi folder address-book-api.

Deskripsi Tugas
Sama seperti address book sebelumnya, bedanya kita akan ubah sistemnya menjadi API dari aplikasi manual terminal. Route wajib panggil Controller sesuai bagian masing masing. 

***Project Set Up***
Struktur Project API Pertama kalian wajib seperti ini

![image](https://github.com/user-attachments/assets/b9d98bfa-732a-431c-ba24-3bc5e09c45e3)

Handling logic akan terpisah sesuai route yang di hit oleh request, jadi kita menggunakan callback function untuk memanggil controller di router kita. 

setelah itu, app.js adalah server express kalian, jadi kalian harus define route middleware untuk mengarahkan api routenya ke file router.js

`app.js`
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

`router.js`
```js
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

**API Testing**
ada 2 cara untuk API Testing: 
- Memakai Library Axios seperti materi sebelumnya (consume API) dan implement di testing-api.js

- Menggunakan Aplikasi POSTMAN

pada contoh ini url api kalian adalah `http://localhost:3000/contact` 
