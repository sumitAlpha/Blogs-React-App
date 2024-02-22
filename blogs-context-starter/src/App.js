
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Appcontext } from './context/Appcontext';
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BlogPage from './pages/BlogPage';
import CategoryPage from './pages/CategoryPage';
import Home from './pages/Home';
import TagsPage from './pages/TagsPage';
  import './App.css'

 function App(){

  const{fetchBlogPosts}=useContext(Appcontext);

   //hooks creation of usesearchParmas
   const [searchParams, setSearchParams] = useSearchParams();

   //hook creation of use location
   const location=useLocation();

    useEffect(() => {
     const page= searchParams.get("page") ?? 1

     if(location.pathname.includes("tags")) {
      //iska matlab tag wala page show krna h 
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), tag);
    
    } 
     else if (location.pathname.includes("categories")){
      const category=location.pathname.split("/").at(-1).replaceAll("-","");
      //iska mtlb ki categories wala page dikahana hai
      fetchBlogPosts(Number(page), null,category);
     }

     else {
      //normal Page dikahan hai
      fetchBlogPosts(Number(page));
    }
  
   },[location.pathname,location.search]);

   return (
     <>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/blog/:blogId' element={<BlogPage/>}/>
     <Route path='/categories/:category' element={<CategoryPage/>}/>
     <Route path='/tags/:tag' element={<TagsPage/>}/>
     </Routes>
    </>
  )
 }
 export default App;
