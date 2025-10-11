
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Logged out successfully 👋', { autoClose: 1500 });
  };

  // Base navigation links (same for all)
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/prescribe', label: 'Prescribe' },
  ];

  return (
    <header className="bg-gradient-to-r from-saffron via-indiawhite to-indiagreen shadow w-full">
      <nav className="container mx-auto flex items-center justify-between px-2 py-4 relative">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-bold text-3xl text-indigo">
          <img
            src={logo} // if it's in the public folder
            alt="Dr. Prescribe Logo"
            className="w-10 h-10 rounded-full" // adjust size as needed
          />
          <span>
            Dr.<span className="text-indigo">Prescribe</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-indigo p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open navigation"
        >
          ☰
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1 rounded ${
                    isActive
                      ? 'bg-indiagreen text-white'
                      : 'hover:text-saffron transition'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {/* Auth-dependent section */}
          {user ? (
            <>
              <li>
                <span className="bg-saffron text-white px-3 py-1 rounded hover:bg-orange-500 transition">
                  Hi, Dr. {user.name}
                </span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="font-semibold text-indigo"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded ${
                      isActive
                        ? 'bg-indiagreen text-white'
                        : 'hover:text-saffron transition'
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded ${
                      isActive
                        ? 'bg-indiagreen text-white'
                        : 'hover:text-saffron transition'
                    }`
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Nav */}
        <ul
          className={`absolute z-10 bg-white border rounded right-2 top-14 p-3 w-40 md:hidden transition ${
            open ? 'block' : 'hidden'
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.to} className="mb-2">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${
                    isActive
                      ? 'bg-indiagreen text-white'
                      : 'hover:text-saffron'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {/* Auth-dependent (Mobile) */}
          {user ? (
            <>
              <li className="border-t pt-2 mt-2">
                <span className="block px-3 text-indigo font-semibold">
                  Hi, {user.name}
                </span>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full bg-saffron text-white px-3 py-2 rounded hover:bg-orange-500 transition mt-2"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="block px-3 py-2 rounded hover:text-saffron"
                  onClick={() => setOpen(false)}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="block px-3 py-2 rounded hover:text-saffron"
                  onClick={() => setOpen(false)}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
