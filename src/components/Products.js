import React, { useEffect } from "react";
import Product from "./Product";
import { upsertProduct } from "../utils/productApi";
import "./Products.css";
import useShoppingStore from "../context/useShoppingStore";

const Products = () => {
  const products = useShoppingStore((state) => state.products);
  const addProduct = useShoppingStore((state) => state.addProduct);

  const productList = [
    {
      id: "1",
      title: "Wireless Gaming Mouse",
      image: "/assets/GameMouse.png", // served via public folder
      price: 29.99,
      rating: 4,
    },
    {
      id: "2",
      title: "Type Writer",
      image: "https://media.istockphoto.com/id/182190212/photo/green-electric-typewriter-with-blank-paper.jpg?s=2048x2048&w=is&k=20&c=p-ov_s6Jg7sRYtILQGlcOX0a16m_XIimyzbPLAVG1xw=",
      price: 49.99,
      rating: 4,
    },
    {
      id: "3",
      title: "Dark Marvel Collectible",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn7HBxm1SJwLla1_fPdJmiXjKMNbl04HFHXA&s",
      price: 1250.00,
      rating: 5,
    },
    {
      id: "4",
      title: "Bluetooth Speaker",
      image: "https://media.istockphoto.com/id/1059154330/photo/boombox.jpg?s=2048x2048&w=is&k=20&c=iN5xamuHbsPuOY7IAHReP5JpHebOeEIm-DB_DShVjX8=",
      price: 45.99,
      rating: 5,
    },
    {
      id: "5",
      title: "future headphones",
      image: "https://media.istockphoto.com/id/2166412804/photo/headphones-with-particles-on-neon-lighting-purple-background-minimal-music-concept.jpg?s=2048x2048&w=is&k=20&c=YA2dBwWvPW2_olu3ChTrfLWKKF_YUrAIjD3zxWMXwFM=",
      price: 59.99,
      rating: 4,
    },
    {
      id: "6",
      title: "Portable Power Bank",
      image: "https://media.istockphoto.com/id/2187902146/photo/charging-two-phones-on-the-red-luggage-case.jpg?s=2048x2048&w=is&k=20&c=I1IbsBLPwm-cEJKTfOrcflQAOlo5R3i_u2b5eucR9YY=",
      price: 39.99,
      rating: 4,
    },
    {
      id: "7",
      title: "Funny gym shirt",
      image: "https://i5.walmartimages.com/seo/Got-Tren-Trenbolone-Acetate-Funny-Gym-T-Shirt_3319ada2-a10b-402a-9e75-682a39d3f32b.77135b8ae434fd46a3d97652d2cf0242.jpeg",
      price: 150.25,
      rating: 3,
    },
    {
      id: "8",
      title: "programmer's Mug",
      image: "https://www.i-programmer.info/images/stories/News/2016/Dec/A/bugcup.jpg",
      price: 150.25,
      rating: 3,
    }

  ];
  //Lets Friggginnnnn GOOOOOOOOOOOOOOO!!!

  useEffect(() => {
    productList.forEach((product) => {
      upsertProduct(product);
      addProduct(product);
    });
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-12 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500 p-4 col-span-full">
            🕵️‍♂️ No products available yet...
          </p>
        ) : (
          products.map((product) => <Product key={product.id} {...product} />)
        )}
      </div>
    </section>
  );
};

export default Products;