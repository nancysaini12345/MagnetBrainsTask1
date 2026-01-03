import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './views/HomeScreen.jsx';
import TaskScreen from './views/TaskScreen.jsx';
import LoginScreen from './views/Login.jsx';
import RegisterScreen from './views/Register.jsx';
import Header from './components/Header.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={token ? <HomeScreen /> : <LoginScreen setToken={setToken} />} />
            <Route path="/task/:id" element={token ? <TaskScreen /> : <LoginScreen setToken={setToken} />} />
            <Route path="/task" element={token ? <TaskScreen /> : <LoginScreen setToken={setToken} />} />
            <Route path="/login" element={<LoginScreen setToken={setToken} />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
