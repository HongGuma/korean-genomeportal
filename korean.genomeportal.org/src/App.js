import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

//Routes
import Home from "./routes/Home";
import About from "./routes/About";
import Publications from "./routes/Publications";
import Contact from "./routes/Contact";
import Faq from "./routes/Faq";
import Gene from "./routes/Gene";
import Variant from "./routes/Variant";
//Components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Route path="/" exact={true} component={Home} />
      <Route path="/about" exact={true} component={About} />
      <Route path="/publications" exact={true} component={Publications} />
      <Route path="/contact" exact={true} component={Contact} />
      <Route path="/faq" exact={true} component={Faq} />
      <Route path="/gene/" exact={true} component={Gene} />
      <Route path="/gene/:geneSymbol" component={Gene} />
      <Route path="/variant/" exact={true} component={Variant} />
      <Route path="/variant/:varID" component={Variant} />

      <Footer />
    </BrowserRouter>
  );
}

export default App;
