import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider.jsx";
import { TripProvider } from "./context/TripProvider.jsx";
import { RoomProvider } from "./context/RoomProvider.jsx";

import AuthLayout from "./layout/authLayout";
import ProtectedRoute from "./layout/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import SignIn from "./pages/SignIn.jsx";
import AccountConfirmation from "./pages/AccountConfirmation.jsx";
import Home from "./pages/Home.jsx";
import Trip from "./pages/Trip.jsx";
import Tickets from "./pages/Tickets.jsx";
import CreateTrip from "./pages/CreateTrip.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import ConfigPage from "./pages/ConfigPage.jsx";
import TripDetailsPage from "./pages/TripDetailsPage.jsx";
import PassengerProvider from "./context/PassengerProvider.jsx";
import "react-toastify/dist/ReactToastify.css";

function App({}) {
  return (
    <div>
      <Router>
        <AuthProvider>
          <TripProvider>
            <RoomProvider>
              <PassengerProvider>
                <Routes>
                  <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route
                      path="confirmation/:token"
                      element={<AccountConfirmation />}
                    />
                  </Route>
                  <Route path="/app" element={<ProtectedRoute />}>
                    <Route path="" element={<Home />} />
                    <Route path="trip" element={<Trip />} />
                    <Route path="ticket" element={<Tickets />} />
                    <Route path="createtrip" element={<CreateTrip />} />
                    <Route path="myprofile" element={<MyProfile />} />
                    <Route path="configuration" element={<ConfigPage />} />
                    <Route path="trip/:id" element={<TripDetailsPage />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </PassengerProvider>
            </RoomProvider>
          </TripProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
