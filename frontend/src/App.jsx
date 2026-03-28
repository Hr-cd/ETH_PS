import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateQuestion from "./pages/CreateQuestion";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import QuestionList from "./pages/QuestionList";
import SubmitAttempt from "./pages/SubmitAttempt";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-question"
          element={
            <ProtectedRoute>
              <CreateQuestion />
            </ProtectedRoute>
          }
        />
        
      <Route
        path="/questions"
        element={
          <ProtectedRoute>
            <QuestionList />
          </ProtectedRoute>
        }
        />

        <Route
          path="/submit-attempt"
          element={
            <ProtectedRoute>
              <SubmitAttempt />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>

  );

}

export default App;