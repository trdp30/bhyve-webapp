import React from "react";
import AppContainer from "../components/app-container";

function NotFound() {
  return (
    <AppContainer>
      <div className="ten wide column text-center">
        <h1>404</h1>
        <div>No page found</div>
      </div>
    </AppContainer>
  );
}

export default NotFound;
