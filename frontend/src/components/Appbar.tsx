import { Avatar } from "./BlogCard"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { BookOpen } from "lucide-react"

const Appbar = () => {
  const location = useLocation()
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${BACKEND_URL}/blog/`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);

  return (
    <div className="border-slate-200 border-b-2 flex justify-between items-center py-5 px-5">
      <Link to={'/'}>
        <div className="flex text-2xl font-bold hover:cursor-pointer">
      <   BookOpen className="h-8 w-8 mr-2" />
          Large
        </div>
      </Link>
      
      <div className="flex items-center">
        {!authenticated && <Link to={'/signup'}>
            <Button className="mr-5 h-7 rounded-lg">
              Sign-up
            </Button>
          </Link>
        }
        {authenticated && location.pathname !== '/publish' && (
          <Link to={'/publish'}>
            <Button className="mr-5 h-7 rounded-lg">
              Publish
            </Button>
          </Link>
        )}
        <Avatar name={"sahal"} />
      </div>
    </div>
  )
}

export default Appbar
