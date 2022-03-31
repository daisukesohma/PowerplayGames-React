import { useEffect } from "react";
import Header from "../../components/Header/Header";

const Blog = () => {
    
    useEffect(() => {
        
        const script = document.createElement('script');
      
        script.src = "https://io.dropinblog.com/js/embed.js";
        // script.dib_id = 'c198e903-ff17-4b90-9692-58b8da52c73d'
        script.async = true;
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
    }, []);

    return(
        <>
        <Header isStick={true} style={{maxWidth: 1240}}/>
        <div id="dib-posts"></div>
        </>
    )
}

export default Blog;