import { pizzas } from "@/data";
import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (category: string) => {
  const res = await fetch(`${process.env.baseURL}/api/products?cat=${category}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return new Error("failed!");
  }
  return res.json();
};

type Props = {
  params: { category: string };
};

const CategoryPage = async ({ params }: Props) => {
  try {
    const products: Product[] = await getData(params.category);

    return (
      <div className="flex flex-wrap text-red-500">
        {products &&
          products.map((item) => (
            <Link
              className="w-full h-[60vh] rounded-3xl sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-100"
              href={`/product/${item.id}`}
              key={item.id}
            >
              {/* IMAGE CONTAINER */}
              {item.img && (
                <div className="relative h-[80%]">
                  <Image
                    src={item.img}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              {/* TEXT CONTAINER */}
              <div className="flex items-center justify-between font-bold">
                <h1 className="text-2xl uppercase p-2">{item.title}</h1>
                <h2 className="group-hover:hidden text-xl">${item.price}</h2>
                <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
      </div>
    );
  } catch (error) {
    return <h1>Error</h1>;
  }
};

export default CategoryPage;
