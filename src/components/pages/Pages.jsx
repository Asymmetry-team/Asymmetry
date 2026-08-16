import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Blog from "../blog/Blog";
import BlogPage from "../blogpage/BlogPage";
import BlogPost from "../blogpage/BlogPost";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import PolicyPage from "../common/PolicyPage";
import ChatBubble from "../common/ChatBubble";
import BackToTop from "../common/BackToTop";
import ScrollToTop from "../common/ScrollToTop";

const Pages = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/services" component={Services} />
        <Route exact path="/projects" component={Blog} />
        <Route exact path="/blog" component={BlogPage} />
        <Route exact path="/blog/:slug" component={BlogPost} />
        <Route exact path="/contact" component={Contact} />
        <Route
          exact
          path="/privacy-policy"
          render={() => (
            <PolicyPage title="კონფიდენციალურობის პოლიტიკა" path="/privacy-policy" />
          )}
        />
        <Route
          exact
          path="/return-policy"
          render={() => (
            <PolicyPage title="დაბრუნების პოლიტიკა" path="/return-policy" />
          )}
        />
        <Route
          exact
          path="/terms"
          render={() => (
            <PolicyPage title="წესები და პირობები" path="/terms" />
          )}
        />
        <Footer />
        <ChatBubble />
        <BackToTop />
      </Router>
    </>
  );
};

export default Pages;
