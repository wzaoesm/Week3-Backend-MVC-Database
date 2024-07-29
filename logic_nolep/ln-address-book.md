# Logic Nolep (Address Book) Part 21

Bungkus isi dari tugas ini jadi folder address-book. disini kita menyimpan data menggunakan database sqlite

**Deskripsi Tugas**
Kalian akan membuat aplikasi backend sederhana (sama seperti Hospital di week 2). bedanya kali ini kita akan memakai SQLite untuk menyimpan datanya.

`connection.js`
connection js ini lah yang bakal kalian sering panggil di model.
karna kalian akan menggunakan instance DB ini untuk komunkasi dengan SQLite dari nodejs.
sekaligus otomatis membuat database address_book.db.

```js
let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./address_book.db");

module.exports = db;
```
<br/>

Kita kan menggunakan Case Table seperti ini :
```
     +-----------------------+
     |       Contact         |
     +-----------------------+
     | id (PK)               |
     | name                  |
     | phoneNumber (UNIQUE)  |
     | company               |
     | email (UNIQUE)        |
     +-----------------------+
          |
          |
          |
          |  1
          |
          |
          v
     +-----------------------+
     |    GroupContact      |
     +-----------------------+
     | id (PK)               |
     | ContactId (FK)        |
     | GroupId (FK)          |
     +-----------------------+
          |
          |
          |
          |  N
          |
          |
          v
     +-----------------------+
     |       Groups          |
     +-----------------------+
     | id (PK)               |
     | groupName             |
     +-----------------------+
```

Penjelasan:

- Tabel "Contact" memiliki hubungan satu-ke-banyak (one-to-many) dengan tabel "GroupContact" melalui kolom "id" yang dihubungkan ke kolom "ContactId" di "GroupContact."

- Tabel "Groups" juga memiliki hubungan satu-ke-banyak (one-to-many) dengan tabel "GroupContact" melalui kolom "id" yang dihubungkan ke kolom "GroupId" di "GroupContact."

- Ini berarti bahwa satu kontak dalam tabel "Contact" dapat terhubung dengan banyak grup melalui tabel "GroupContact," dan satu grup dalam tabel "Groups" juga dapat memiliki banyak kontak melalui tabel "GroupContact."

- Kolom "id" dalam setiap tabel adalah kunci utama (primary key - PK) yang digunakan untuk mengidentifikasi setiap catatan dalam tabelnya.

- Kolom "ContactId" dan "GroupId" di tabel "GroupContact" adalah kunci asing (foreign key - FK) yang menghubungkan catatan dalam tabel tersebut dengan catatan dalam tabel "Contact" dan "Groups" yang sesuai.

- Kolom "phoneNumber" dan "email" dalam tabel "Contact" memiliki konstrain UNIQUE yang memastikan bahwa tidak ada nomor telepon atau alamat email yang sama dalam tabel tersebut.

***Command List***
```
/*
====================
ADDRESS BOOK COMMAND
====================

> node main.js create Contact <name> <phoneNumber> <company> <email>
> node main.js update Contact <id> <name> <phoneNumber> <company> <email>
> node main.js delete Contact <id>
> node main.js showContact
> node main.js create Groups <groupName>
> node main.js update Groups <id> <groupName>
> node main.js delete Groups <id>
> node main.js showGroups
> node main.js create ContactGroups <contactId> <groupId>
> node main.js update ContactGroups <id> <contactId> <groupId>
> node main.js delete ContactGroups <id> 
> node main.js help

*/
```

Tugas kalian harus menyelesaikan fitur fitur dari semua command list ini.

***Multiple Controller & Model***
Karena kalian mempunyai 3 part data. kalian wajib membuat controller dan model terpisah di setiap table.
jadi 1 table mempunyai -> 1 controller & 1 model.

***Contoh Implementasi Model***
ini salah satu contoh saja agar kalian mengerti cara komunikasi di SQLite nya.

```js
let db = require("./connection");

class Contact {
    constructor(name, phoneNumber, company, email) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.company = company;
        this.email = email;
    }

    static create(name, phoneNumber, company, email) {
        let newContact = new Contact(name, phoneNumber, company, email);
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO Contact VALUES (null, ?, ?, ?, ?)`,
                [newContact.name, newContact.phoneNumber, newContact.company, newContact.email],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                })
        })

    }
}

module.exports = Contact;
```

***Buatlah View kalian lebih kreatif!!***

Disini kita hanya menggunakan 1 view.js untuk menampilkan semua output. akan dinilai lebih jika view kalian lebih ada interaksi nya seperti message message di terminal untuk user , atau tampilan data berupa console.table.

**Relation Effect**
- showContact ->  wajib join 2 table lainnya untuk mendapatkan semua data
- showGroups -> wajib join 2 table lainnya agar bisa dapat data list contact dari setiap group
- deleteGroup -> delete data group berarti harus delete data contactGroup yang menggunakan data id group yang di delete tersebut.