import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const inter = Inter({ subsets: ["latin"] });
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaBath, FaCar, FaBed } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function House({ houses, className, ...props }) {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(houses);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const totalPages = Math.ceil(data?.totals[0].count / itemsPerPage);
  const currentItems = data?.rows;

  let pages = [];
  for (let i = 1; i <= 5; i++) {
    pages.push(i);
  }
  const handleNextPage = async (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      setLoading(true);
      const pageNumber = currentPage + 1;
      try {
        const datas = await fetch(
          `http://localhost:3000/api/estate?page=${pageNumber}`
        );
        const result = await datas.json();
        setData(result);
        setCurrentPage(currentPage + 1);
        console.log(data);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrevPage = async (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setLoading(true);
      const pageNumber = currentPage - 1;
      try {
        const data = await fetch(
          `http://localhost:3000/api/estate?page=${pageNumber}`
        );
        const result = await data.json();
        setData(result);
        setCurrentPage(currentPage - 1);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSinglePage = async (e, page) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await fetch(`http://localhost:3000/api/estate?page=${page}`);
      const result = await data.json();
      setData(result);
      setCurrentPage(page);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {isClient ? (
        <>
          {currentItems.length > 1 && (
            <div className="relative">
              <h2 className="my-4 self-start text-2xl font-medium">
                Best for you
              </h2>

              <div className="mb-8 grid text-center gap-4 lg:w-full lg:grid-cols-3 lg:text-left">
                {currentItems.length > 1 &&
                  currentItems.map((r, index) => {
                    return (
                      <Card key={index} className="w-auto">
                        <CardHeader>
                          <CardTitle className="text-left">{r.title}</CardTitle>
                          <CardDescription className="text-left space-y-2">
                            <span className="flex items-center gap-2">
                              <FaLocationDot />
                              {r.town}, {r.state}
                            </span>
                            <span className="block flex space-x-4">
                              <span className="flex gap-2 text-sm font-medium leading-none">
                                <FaBed />
                                {r.bedrooms} Beds
                              </span>
                              <span className="flex gap-2 text-sm font-medium leading-none">
                                <FaBath />
                                {r.toilets} Baths
                              </span>
                              <span className="flex gap-2 text-sm font-medium leading-none">
                                <FaCar />
                                {r.parking_space} Garage
                              </span>
                            </span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-justify">
                          Lorem ipsum {r.bathrooms} dolor sit amet consectetur
                          adipisicing elit. Ipsam quae consequuntur optio
                          ratione corrupti hic sapiente, unde non nisi magni
                          quaerat magnam iste rem est, in qui quas minima
                          itaque.
                        </CardContent>
                        <CardFooter>
                          <div className="text-left">
                            <span className="text-sm">price</span>
                            <p className="text-sm font-bold leading-none">
                              &#8358;{r.price}/mo
                            </p>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href=""
                      className={`${
                        currentPage <= 1 ? "cursor-not-allowed" : ""
                      }`}
                      onClick={(e) => handlePrevPage(e)}
                    />
                  </PaginationItem>

                  <PaginationItem className="flex">
                    {pages.map((page, idx) => (
                      <PaginationLink
                        key={idx}
                        href=""
                        isActive={currentPage === page}
                        onClick={(e) => handleSinglePage(e, page)}
                      >
                        {page}
                      </PaginationLink>
                    ))}
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href=""
                      className={`${
                        currentPage === totalPages ? "cursor-not-allowed" : ""
                      }`}
                      onClick={(e) => handleNextPage(e)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              {loading && (
                <div className="backdrop-blur-sm absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 inline-flex text-black p-4">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <Button
          type="button"
          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white transition ease-in-out duration-150 cursor-not-allowed"
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </Button>
      )}
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/estate");
  const houses = await res.json();
  return { props: { houses } };
}
