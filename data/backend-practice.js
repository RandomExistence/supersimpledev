const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});
// first param: what kind of request, Second param: Where to send the request to
xhr.open('GET', 'https://supersimplebackend.dev/documentation'); 
xhr.send();