// import React, { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';
// import axiosInstance from '../axios';
// import { useNavigate } from 'react-router-dom';

// const CategorySection = styled.section`
//   padding: 50px 20px;
//   background-color: #f8f9fa;
// `;

// const SectionTitle = styled.h2`
//   text-align: center;
//   font-size: 2.5rem;
//   font-weight: 700;
//   color: #ff0000;
//   margin-bottom: 24px;
// `;

// const CategoryScrollContainer = styled.div`
//   position: relative;
// `;

// const CategoryScroll = styled.div`
//   display: flex;
//   overflow-x: auto;
//   scroll-snap-type: x mandatory;
//   -webkit-overflow-scrolling: touch;
//   scrollbar-width: none;
//   -ms-overflow-style: none;
  
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const CategoryCard = styled.div`
//   flex: 0 0 200px;
//   margin: 20px;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
//   scroll-snap-align: start;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
//   }
// `;

// const CategoryImage = styled.img`
//   width: 100%;
//   height: 150px;
//   object-fit: cover;
// `;

// const CategoryName = styled.h3`
//   font-size: 16px;
//   font-weight: 500;
//   color: #34495e;
//   padding: 12px;
//   text-align: center;
//   background-color: #fff;
//   margin: 0;
// `;

// const ScrollButton = styled.button`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   background-color: rgba(100, 100, 100, 0.7); 
//   border: none;
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   font-size: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   z-index: 1;

//   &:hover {
//     background-color: rgba(100, 100, 100, 0.9); 
//   }

//   &.left {
//     left: 10px;
//   }

//   &.right {
//     right: 10px;
//   }

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// function HomeCategory() {
//   const [categories, setCategories] = useState([]);
//   const scrollRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get('/category/clientCategory');
//         setCategories(response.data.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = direction === 'left' ? -200 : 200;
//       scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   // const handleCategoryClick = (categoryId) => {    
//   //   navigate(`/products?category=${categoryId}`);
//   // };
//   const handleCategoryClick = (category) => {
//     navigate(`/allproducts?category=${category._id}`);
//   };
 
//   return (
//     <CategorySection>
//       {/* <SectionTitle className='text-danger'>Explore Popular Categories</SectionTitle> */}
//       <CategoryScrollContainer>
//         <ScrollButton className="left" onClick={() => scroll('left')}>
//           ‹
//         </ScrollButton>
//         <CategoryScroll ref={scrollRef} style={{display:'flex',justifyContent:'center'}}>
//           {categories.map((category) => (
//             <CategoryCard key={category._id} onClick={() => handleCategoryClick(category)}>
//               <CategoryImage src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${category.image}`} alt={category.name} />
//               <CategoryName>{category.name}</CategoryName>
//             </CategoryCard>
//           ))}
//         </CategoryScroll>
//         <ScrollButton className="right" onClick={() => scroll('right')}>
//           ›
//         </ScrollButton>
//       </CategoryScrollContainer>
//     </CategorySection>
//   );
// }

// export default HomeCategory;



import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

const CategorySection = styled.section`
  padding: 20px 10px;
  background-color: #f8f9fa;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ff0000;
  margin-bottom: 24px;
`;

const CategoryScrollContainer = styled.div`
  position: relative;
`;

const CategoryScroll = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryCard = styled.div`
  flex: 0 0 200px;
  margin: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  scroll-snap-align: start;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex: 0 0 140px; /* Reduce size for smaller screens */
    margin: 10px;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 100px; /* Reduce height for smaller screens */
  }
`;

const CategoryName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #34495e;
  padding: 12px;
  text-align: center;
  background-color: #fff;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px; /* Adjust font size for smaller screens */
    padding: 8px;
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(100, 100, 100, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: rgba(100, 100, 100, 0.9);
  }

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }

  @media (max-width: 768px) {
    display: none; /* Hide scroll buttons on mobile */
  }
`;

function HomeCategory() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/category/clientCategory');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/allproducts?category=${category._id}`);
  };

  return (
    <CategorySection>
      <CategoryScrollContainer>
        <ScrollButton className="left" onClick={() => scroll('left')}>
          ‹
        </ScrollButton>
        <CategoryScroll ref={scrollRef} style={{ display: 'flex', justifyContent: 'center' }}>
          {categories.map((category) => (
            <CategoryCard key={category._id} onClick={() => handleCategoryClick(category)}>
              <CategoryImage src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${category.image}`} alt={category.name} />
              <CategoryName>{category.name}</CategoryName>
            </CategoryCard>
          ))}
        </CategoryScroll>
        <ScrollButton className="right" onClick={() => scroll('right')}>
          ›
        </ScrollButton>
      </CategoryScrollContainer>
    </CategorySection>
  );
}

export default HomeCategory;
