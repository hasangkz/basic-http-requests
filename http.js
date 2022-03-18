const express = require('express');
const app = express();
//express'in jsonu otomatil olarak çevirmesi için:
app.use(express.json());

const users = [
  { id: 1, name: 'hasan', age: 10 },
  { id: 2, name: 'murat', age: 19 },
  { id: 3, name: 'george', age: 33 },
];

app.get('/', (req, res) => {
  res.status(200).send('ANA SAYFA');
});

/*query string
url kısmında "?x=true yada y=false" kısımlarına denir.
koşul ifadeleri kullanarak kullanıcı için ekstra kodlar yazmamıza olanak sağlar
 */
app.get('/users', (req, res) => {
  // kullanıcı "?ters=true" yazdı farz edelim
  if (req.query.ters) {
    res.send(users.reverse());
  } else {
    res.send(users);
  }
});

app.get('/users/:id', (req, res) => {
  id = req.params.id;
  const kullanıcı = users.find((user) => user.id === parseInt(id));
  if (kullanıcı) {
    res.send(id, "'li kullanıcı bulundu: ", kullanıcı);
  } else {
    res.status(404).send('kullanıcı bulunamadı!');
  }
});

/*params
Rota parametreleri, URL’deki konumlarında belirtilen değerleri yakalamak için kullanılan adlandırılmış URL bölümleridir. Yakalanan değerler, yolda belirtilen rota parameterlerinin ilgili isimlerini alarak req.params objesinde tutulur.

Rota yolu: /users/:userId/books/:bookId -> url'de değişkenleri ":" kullanarak belirtiriz.
İstek URL'i: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/

/*.post -> eleman eklemek için
postman'da veri eklemek için aşağıdaki yöntemleri izliyoruz:
 */
app.post('/users', (req, res) => {
  const yeni_user = {
    id: users.length + 1,
    name: req.body.name,
    // postman'de eklediğimiz elemanları body kısmına eklediğimiz için req.body diyoruz
    age: req.body.age,
  };
  users.push(yeni_user);
  // en son yeni eklenilen kullanıcıyı döneriz
  res.send(yeni_user);
});

/*.put -> var olan bir elemanı güncellemek için
postman'da veri eklemek için aşağıdaki yöntemleri izliyoruz:
 */
app.put('/users/:id', (req, res) => {
  id = req.params.id;
  const kullanıcı = users.find((user) => user.id === parseInt(id));
  // yukarıdakilerden farklı bir if yapısı kurduk. tek if kurdugumuz için return ile ifadeyi döndürmek zorundayız aksi halde kod hem ife girip hem de altındaki kodları çalıştırır.
  if (!kullanıcı) {
    return res.status(404).send('kullanıcı bulunamadı!');
  }
  kullanıcı.name = req.body.name;
  kullanıcı.age = req.body.age;
  res.send(kullanıcı);
});
/*.delete -> var olan bir elemanı silmek için
postman'da veri silmek için aşağıdaki yöntemleri izliyoruz:
 */
app.delete('/users/:id', (req, res) => {
  id = req.params.id;
  const kullanıcı = users.find((user) => user.id === parseInt(id));
  if (kullanıcı) {
    const index = users.indexOf(kullanıcı); //aradığımız kullanıcının indeksini veriyor
    users.splice(index, 1); // .splice -> index'teki elemandan başlar ve sona doğru yazdıgım değer kadar yani 1 tane veriyi siler
    res.send(kullanıcı);
  } else {
    res.status(404).send('kullanıcı bulunamadı');
  }
});

app.get('/contact', (req, res) => {
  res.status(200).send('İLETİŞİM');
});

app.get('/*', (req, res) => {
  res.status(404).send('ERROR');
});
const port = 3000;

app.listen(port);
