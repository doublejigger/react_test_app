import * as React from "react";
import ReactDOM from "react-dom";
import Notie from "notie";
import App from "./app";

const mountNodeId = "VjMY47TxZpjtJowgKEGvqPej";
const mountElement = document.getElementById(mountNodeId);

if (mountElement) {
  ReactDOM.render(<App/>, mountElement);
} else {
  const message = "The app can't find the mount DOM element. Please check the HTML within tre page.";
  console.error(message);
  Notie.alert({type: "error", text: message, time: 3});
}