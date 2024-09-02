import React,{useState,useEffect} from 'react';
import axiosInstance from '../axios'
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';

const Blogs = () => {
  // Dummy data for demonstration
  const blogs = [
    {
      id: 1,
      title: 'Blog Title 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel erat vitae nisi consectetur tempus.',
      author: 'John Doe',
      date: 'April 25, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1483996887144-ede479a83102?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjh8MjEwMDExNXx8ZW58MHx8fHx8'
    },
    {
      id: 2,
      title: 'Blog Title 2',
      content: 'Nullam ac nisi vitae nulla congue aliquet. Curabitur quis sem id ipsum rutrum consectetur.',
      author: 'Jane Smith',
      date: 'April 26, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1483996887144-ede479a83102?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjh8MjEwMDExNXx8ZW58MHx8fHx8'
    },
    // Add more blog objects as needed
  ];

  return (
    <>
   
     <MiddleNav/>
    
      <div className="container py-5">
        <h2 className="mb-4 text-center">Blogs</h2>
        <div className="row">
          {blogs.map(blog => (
            <div className="col-lg-6 mb-4" key={blog.id}>
              <div className="card border-0 shadow">
                <img src={blog.imageUrl} className="card-img-top" alt={blog.title} />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.content}</p>
                  <p className="card-text"><small className="text-muted">By {blog.author} on {blog.date}</small></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Blogs;
