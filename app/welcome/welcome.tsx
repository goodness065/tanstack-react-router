import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <img 
          src={logoLight} 
          alt="Logo" 
          className="h-16 w-16 dark:hidden"
        />
        <img 
          src={logoDark} 
          alt="Logo" 
          className="h-16 w-16 hidden dark:block"
        />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Welcome to React Router
      </h1>
      <p className="text-lg text-gray-600">
        Get started by editing this welcome component
      </p>
    </div>
  );
}
