import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaBath, FaCar, FaBed } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function House({ houses, className, ...props }) {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState(houses);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const totalPages = Math.ceil(data.totals.count / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.rows.slice(startIndex, endIndex);

  let pages = [];
  for (let i = 1; i <= 5; i++) {
    pages.push(i);
  }
  const handleNextPage = async (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      const pageNumber = currentPage + 1;
      try {
        const data = await fetch(
          `http://localhost:3000/api/estate?page=${pageNumber}`
        );
        setData(data);
        setCurrentPage(currentPage + 1);
      } catch (error) {
        throw error;
      }
    }
  };

  const handlePrevPage = async (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      const pageNumber = currentPage - 1;
      try {
        const data = await fetch(
          `http://localhost:3000/api/estate?page=${pageNumber}`
        );
        setData(data);
        setCurrentPage(currentPage - 1);
      } catch (error) {
        throw error;
      }
    }
  };

  const handleSinglePage = async (page) => {
    // e.preventDefault();
    try {
      const data = await fetch(`http://localhost:3000/api/estate?page=${page}`);
      setData(data);
      setCurrentPage(page);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm({
    defaultValues: {
      bedrooms: 5,
      toilets: 6,
      parking_space: 5,
      town: "",
      state: "",
    },
  });
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Card className={cn("w-md", className)} {...props}>
        <CardHeader>
          <CardTitle>Real Estate Price</CardTitle>
          <CardDescription>
            Enter the attributes of the housing.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 border-y p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    rules={{
                      required: "This field is required",
                      min: {
                        value: 1,
                        message: "This input is below minimum value",
                      },
                    }}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bed Rooms</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="bedsrooms"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Total Bed Rooms within a block.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    rules={{
                      required: "This field is required",
                      min: {
                        value: 1,
                        message: "This input is below minimum value",
                      },
                    }}
                    name="toilets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Toilets</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="toilets"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Total Toilets within a block.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    rules={{
                      required: "This field is required",
                      min: {
                        value: 1,
                        message: "This input is below minimum value",
                      },
                    }}
                    name="parking_space"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Garage</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Parking Space"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Total Parking Space within a block.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <h2>Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      rules={{ required: "This field is required" }}
                      name="town"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Town</FormLabel>
                          <FormControl>
                            <Input placeholder="town" {...field} />
                          </FormControl>
                          <FormDescription>
                            House Local Goverment Address.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormDescription>
                            House State Address.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Predict
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter>&copy; Real Estate Forcast</CardFooter>
      </Card>

      {isClient ? (
        <>
          <h2 className="my-4 self-start text-2xl font-medium">Best for you</h2>
          <div className="mb-32 grid text-center gap-4 lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
            {currentItems &&
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
                      adipisicing elit. Ipsam quae consequuntur optio ratione
                      corrupti hic sapiente, unde non nisi magni quaerat magnam
                      iste rem est, in qui quas minima itaque.
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

          <Pagination className="mt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href=""
                  disabled={currentPage < totalPages && currentPage === 1}
                  onClick={() => handlePrevPage()}
                />
              </PaginationItem>

              <PaginationItem className="flex">
                {pages.map((page, idx) => (
                  <PaginationLink
                    key={idx}
                    href=""
                    disabled={currentPage === totalPages}
                    isActive={currentPage === page}
                    onClick={handleSinglePage(page)}
                  >
                    {page}
                  </PaginationLink>
                ))}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="" onClick={() => handleNextPage()} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <span>loading</span>
      )}
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/estate");
  const houses = await res.json();
  return { props: { houses } };
}
