const appDiv = document.getElementById('app');
const msgDiv = document.getElementById('msg');

window.onload = function () {
var hashValue = '';
var hashValueBase64 = window.location.hash.slice(1);
if (isBase64(hashValueBase64)){
  hashValue = atob(hashValueBase64);
 console.log(hashValue)

 let success = true
 try{
   window.qrcodeObject = new QRCode('qrcode', {
     text: hashValue,
     width: 720,
     height: 720,
     colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M,
  });
  console.dir(window.qrcodeObject)
  appDiv.innerHTML = `<h1>Your Data as QR-Image</h1>`;
  msgDiv.innerHTML = `<i>DATA= ${hashValue}</i>`;
  }catch(e){
    success = false
    appDiv.innerHTML = `<h1>Encoding failed</h1>`;
    msgDiv.innerHTML = `<i>dont send to big data</i>`;
  }

  const download = document.getElementById("download")
  const print = document.getElementById("print")
  if(success){
    download.hidden=false
    download.onclick = () => {
      var img = document.getElementsByTagName("img")[0]
      const a = document.createElement("a");
      a.href = img.src
      a.download = "qrcode.png";
      document.body.appendChild(a)
      a.click();
      document.body.removeChild(a)
    }
    print.hidden=false
    print.onclick = () => {
      window.print()
    }
  } else {
    document.body.removeChild(print)
    document.body.removeChild(download)
  }
  }else {
  console.log("data is not base 64")
} 

function isBase64(str) {
  if (str === '' || str.trim() === '') {
    return false;
  }
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}
}
document.getElementById("example").onclick = () =>{
  window.location.hash = "aGVsbG8gd29ybGQ="
  location.reload(true)
}