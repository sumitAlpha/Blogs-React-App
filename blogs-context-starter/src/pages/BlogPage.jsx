import React, { useContext, useEffect, useState } from 'react'
import { useLocation,  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Appcontext } from '../context/Appcontext';
import { baseUrl } from '../baseUrl';
import Header from '../components/Header';
import Spinner from "../components/Spinner";
import BlogDetails from '../components/BlogDetails';

function BlogPage (){
    //current blog jispr click kiye honge
    const[blog,SetBlog]=useState(null);

    const[relatedblogs,SetRelatedBlogs]=useState([]);

    const location=useLocation();
    const navigation= useNavigate();

  const{loading, setLoading}=useContext(Appcontext);

  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";

   //url se find krenge blog ki ID
  const blogId = location.pathname.split("/").at(-1);

  async function FetchRelatedBlogs(){
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    console.log("URL is: ");
    console.log(url);

     try{
       const result=await fetch(url);
       const data=await result.json();
       SetBlog(data.blog);
       SetRelatedBlogs(data.relatedBlogs);
     }

     catch(error){
        console.log("Error aagya in blog id wali call");
        SetBlog(null);
        SetRelatedBlogs([]);

     }
     setLoading(false);

  }
    
  useEffect( () => {
    if(blogId) {
        FetchRelatedBlogs();
    }
}, [location.pathname] )
    return (
        <div>
        <Header/>
        <div>
            <button onClick={()=>navigation(-1)}>
                Back
        </button>
        </div>

        {
        loading ?
        (<div>
            <p> <Spinner/></p>
        </div>) :
        blog ?
        (<div>
            <BlogDetails post={blog} />
            <h2> Related Blogs </h2>
            {
                relatedblogs.map( (post) => (
                    <div key = {post.id}>
                        <BlogDetails post={post} /> 
                    </div>
                ) )
            }

        </div>) :
        (<div>
            <p>No Blog Found</p>
        </div>)
       
      }
        </div>
    );
}
export default BlogPage;