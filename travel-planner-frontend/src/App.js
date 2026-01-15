// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import CreateTrip from './pages/CreateTrip';
// import TripDetails from './pages/TripDetails';
// import './App.css';
// import "./styles/main.css";
// import MyTrips from "./pages/MyTrips";
// import EditTrip from "./pages/EditTrip";
// import Login from "./pages/Login";



// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* <Route path="/" element={<Dashboard />} /> */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />

//         <Route path="/create" element={<CreateTrip />} />
//         <Route path="/trip/:id" element={<TripDetails />} />
//         <Route path="/trips" element={<MyTrips />} />
//         <Route path="/trip/edit/:id" element={<EditTrip />} />
//         <Route path="/login" element={<Login />} />


//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/MyTrips";
import EditTrip from "./pages/EditTrip";
import Login from "./pages/Login";

import PrivateRoute from "./components/PrivateRoute";
import { Navigate } from "react-router-dom";

import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED WITH LAYOUT */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <Layout>
                <CreateTrip />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/trips"
          element={
            <PrivateRoute>
              <Layout>
                <MyTrips />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/trip/:id"
          element={
            <PrivateRoute>
              <Layout>
                <TripDetails />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/trip/edit/:id"
          element={
            <PrivateRoute>
              <Layout>
                <EditTrip />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;