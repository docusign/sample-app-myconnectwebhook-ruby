import React from "react";
import "bootstrap";
import { define } from "remount";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { App } from "./App";

const app = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

define({ "app-component": app });
