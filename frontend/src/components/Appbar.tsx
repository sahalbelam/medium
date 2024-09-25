import { Avatar } from "./BlogCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen } from "lucide-react";
import { BACKEND_URL } from "@/config";

const Appbar = () => {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate()

  useEffect(() => {
    const checkUserStatus = async () => {
      setLoading(true); // Start loading
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await axios.get(`${BACKEND_URL}/user/check-user`, {
          headers: {
            Authorization: `${token}`, // Include the token in the Authorization header
          },
        });
        setAuthenticated(response.data.isSignedUp); // Update authenticated state
      } catch (error) {
        console.error('Error checking user status:', error);
        setAuthenticated(false); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    checkUserStatus();
  }, []);

  const handleSignOut = async () => {
    // Optional: Call sign-out endpoint on the server to invalidate the session
    // try {
    //   const token = localStorage.getItem('token'); // Retrieve token from local storage
    //   await axios.post(`${BACKEND_URL}/signout`, {}, { // Call your sign-out endpoint if needed
    //     headers: {
    //       Authorization: `${token}`, // Include the token in the Authorization header
    //     },
    //   });
    // } catch (error) {
    //   console.error('Error during sign-out:', error);
    // } finally {
    //   // Clear the token from local storage
      // localStorage.removeItem('token'); // Clear the token
      setAuthenticated(false); // Update authenticated state
      navigate('/'); // Redirect to home page or login page
    // }
  };

  return (
    <div className="border-slate-200 border-b-2 flex justify-between items-center py-5 px-5">
      <Link to={'/'}>
        <div className="flex text-2xl font-bold hover:cursor-pointer">
          <BookOpen className="h-8 w-8 mr-2" />
          Large
        </div>
      </Link>
      
      <div className="flex items-center">
        {loading ? (
          <div>Loading...</div> // Placeholder for loading state
        ) : (
          <>
            {!authenticated && (
              <Link to={'/signup'}>
                <Button className="mr-5 h-7 rounded-lg">
                  Sign-up
                </Button>
              </Link>
            )}
            {location.pathname !== '/publish' && (
              <Link to={'/publish'}>
                <Button className="mr-5 h-7 rounded-lg">
                  Publish
                </Button>
              </Link>
            )}
             {authenticated && (
              <Button className="mr-5 h-7 rounded-lg" onClick={handleSignOut}>
                Sign Out
              </Button>
            )}
            <Avatar name={"sahal"} />
          </>
        )}
      </div>
    </div>
  );
}

export default Appbar;
