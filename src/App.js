import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import PostDetails from "./components/postDetails/postDetails";
import Navbar from "./components/navbar/navbar";
import Home from "./components/Home/Home";
import { Auth } from "./components/Auth/Auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <GoogleOAuthProvider
      clientId="436993774030-6n8rjn8ib4mv1sc41atbdkak5eco4gi2.apps.googleusercontent.com" /*clientId={`${process.env.GOOGLE_OAUTH_CLIENT_ID}`}*/
    >
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" exact Component={() => <Navigate to="/posts" />} />
            <Route path="/posts" exact element={<Home />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:id" exact element={<PostDetails />} />
            <Route
              path="/auth"
              exact
              Component={() => (!user ? <Auth /> : <Navigate to={"/posts"} />)}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
