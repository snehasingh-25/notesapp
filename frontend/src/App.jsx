import { useState } from "react";
import useAuth from "./hooks/useAuth";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Notes from "./pages/Notes";
import "./App.css";
import BackgroundWrapper from "./components/BackgroundWrapper";
export default function App() {
  const { token, notes, register, login, logout, createNote } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (!token) {
    return (
      <BackgroundWrapper>
      <div className="container">
        <div className="card">
          {showLogin ? (
            <>
              <SignIn login={login} />
              <p className="meta">
                Don’t have an account?{" "}
                <button className="btn" onClick={() => setShowLogin(false)}>
                  Register
                </button>
              </p>
            </>
          ) : (
            <>
              <SignUp register={register} />
              <p className="meta">
                Already have an account?{" "}
                <button className="btn ghost" onClick={() => setShowLogin(true)}>
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
      </BackgroundWrapper>
    );
  }

  return (
   <BackgroundWrapper>
    <div className="container">
       
      <Notes notes={notes} createNote={createNote} logout={logout} />
      
    </div>
    </BackgroundWrapper>
  );
}


