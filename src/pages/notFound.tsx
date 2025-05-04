// import { Link } from 'react-router-dom';

// export const NotFound = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="text-center px-6 py-12 bg-white rounded-2xl shadow-md">
//         <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
//         <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
//         <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
//         <Link
//           to="/"
//           className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//         >
//           Go back home
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default NotFound;

import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-extrabold text-[#7B5E3C] mb-4">404</h1>
          <div className="bg-[#7B5E3C] px-4 py-2 rounded-lg shadow-md transform rotate-12">
            <p className="text-white text-2xl font-bold">Page Not Found</p>
          </div>
        </div>
        
        <p className="text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#7B5E3C] text-white font-medium rounded-lg hover:bg-rose-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;


