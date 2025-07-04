import { Link, useLocation } from 'react-router';

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              mee
            </Link>
          </div>
          
          <ul className="flex space-x-8" >
            <li role="none">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-blue-100 text-blue-700 aria-current="page"' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                role="menuitem"
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            <li role="none">
              <Link 
                to="/posts" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/posts') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                role="menuitem"
                aria-current={isActive('/posts') ? 'page' : undefined}
              >
                Posts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
} 