const token = '8688127385:AAEhkwyAzvZG4_WV1NVDirYwavrPSusBhtY';
fetch(`https://api.telegram.org/bot${token}/getUpdates`)
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err));
