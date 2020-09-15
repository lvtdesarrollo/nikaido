import axios from "axios";

var urlorigin = '';
if(window.location.host=='localhost:9001'){
  urlorigin="http://localhost:3000/api/";
}else{
  urlorigin="http://157.245.233.151:3000/api/";
}
export default axios.create({
  baseURL: urlorigin,
  headers: {
    "Content-type": "application/json"
  }
});