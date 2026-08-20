import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Blog from "../blog/Blog";
import BlogPage from "../blogpage/BlogPage";
import BlogPost from "../blogpage/BlogPost";
import BlogSoon from "../blogpage/BlogSoon";
import ProjectDetail from "../blogpage/ProjectDetail";
import Services from "../services/Services";
import ServiceDetail from "../services/ServiceDetail";
import ProcessDetail from "../services/ProcessDetail";
import Contact from "../contact/Contact";
import PolicyPage from "../common/PolicyPage";
import NotFound from "../common/NotFound";
import ChatBubble from "../common/ChatBubble";
import PriceBubble from "../common/PriceBubble";
import BackToTop from "../common/BackToTop";
import ScrollToTop from "../common/ScrollToTop";

const Pages = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/services/:slug" component={ServiceDetail} />
          <Route exact path="/process/:slug" component={ProcessDetail} />
          <Route exact path="/projects" component={Blog} />
          <Route exact path="/projects/:id" component={ProjectDetail} />
          <Route exact path="/blog" component={BlogPage} />
          <Route exact path="/blog-soon" component={BlogSoon} />
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
          <Route component={NotFound} />
        </Switch>
        <Footer />
        <ChatBubble />
        <PriceBubble />
        <BackToTop />
      </Router>
    </>
  );
};

export default Pages;
