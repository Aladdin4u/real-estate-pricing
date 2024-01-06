import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { FaBath, FaCar, FaBed } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function House({ houses, className, ...props }) {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState(houses);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  console.log(data);
  let pages = [];
  for (let i = 1; i <= 5; i++) {
    pages.push(i);
  }
  const handleNextPage = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      document.documentElement.scrollTop = 0;
    }
  };

  const handlePrevPage = async (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      document.documentElement.scrollTop = 0;
    }
  };

  const handleSinglePage = async (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-14 scroll-smooth ${inter.className}`}
    >
      {isClient ? (
        <>
          {currentItems.length > 1 && (
            <div>
              <h2 className="my-4 self-start text-2xl font-medium">
                Best for you
              </h2>

              <div className="mb-8 grid text-center gap-4 lg:w-full lg:grid-cols-3 lg:text-left">
                {currentItems.length > 1 &&
                  currentItems.map((r, index) => {
                    return (
                      <Card key={index} className="w-auto">
                        <CardHeader>
                          <CardTitle className="text-left">
                            {r.data.title}
                          </CardTitle>
                          <CardDescription className="text-left space-y-2">
                            <span className="flex items-center gap-2">
                              <FaLocationDot />
                              {r.data.town}, {r.data.state}
                            </span>
                            <span className="block flex space-x-4">
                              <span className="flex gap-2 text-sm font-medium leading-none">
                                <FaBed />
                                {r.data.bedrooms} Beds
                              </span>
                              <span className="flex gap-2 text-sm font-medium leading-none">
                                <FaBath />
                                {r.data.toilets} Baths
                              </span>
                              <span className="flex gap-2 text-sm font-medium leading-none">
                                <FaCar />
                                {r.data.parking_space} Garage
                              </span>
                            </span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-justify">
                          Welcome to {r.data.title}, a lavish {r.data.bedrooms}{" "}
                          bedrooms, {r.data.bathrooms} bathroom home in {r.data.town}, {r.data.state}. This luxury residence
                          features {r.data.toilets} toilets, {r.data.parking_space} parking spaces, and a stunning
                          design with top-notch finishes. The master suite
                          offers a private sanctuary, while the gourmet kitchen
                          and spacious living areas make entertaining a breeze.
                          Conveniently located, this home combines opulence with
                          practicality, ensuring a sophisticated lifestyle in
                          the heart of {r.data.state}.
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <div className="text-left">
                            <span className="text-sm">Price</span>
                            <p className="text-sm font-bold leading-none">
                              &#8358;{r.data.price_original}
                            </p>
                          </div>
                          <div className="text-left text-green-500">
                            <span className="text-sm">Predicted Price</span>
                            <p className="text-sm font-bold leading-none">
                              &#8358;{r.data.price}
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
