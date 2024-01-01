import { useState } from "react";
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
const houses = [
  {
    id: 1,
    bedrooms: 6,
    bathrooms: 5,
    toilets: 5,
    parking_space: 4,
    title: "Detached Duplex",
    town: "Mabushi",
    state: "Abuja",
    price: 450000000,
  },
  {
    id: 2,
    bedrooms: 4,
    bathrooms: 5,
    toilets: 5,
    parking_space: 4,
    title: "Terraced Duplexes",
    town: "Katampe",
    state: "Abuja",
    price: 800000000,
  },
  {
    id: 3,
    bedrooms: 4,
    bathrooms: 5,
    toilets: 5,
    parking_space: 4,
    title: "Detached Duplex",
    town: "Lekki",
    state: "Lagos",
    price: 120000000,
  },
  {
    id: 4,
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking_space: 6,
    title: "Detached Duplex",
    town: "Ajah",
    state: "Lagos",
    price: 40000000,
  },
  {
    id: 5,
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking_space: 2,
    title: "Semi Detached Duplex",
    town: "Lekki",
    state: "Lagos",
    price: 75000000,
  },
  {
    id: 6,
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    parking_space: 1,
    title: "Detached Duplex",
    town: "Lekki",
    state: "Lagos",
    price: 450000000,
  },
  {
    id: 7,
    bedrooms: 4,
    bathrooms: 5,
    toilets: 5,
    parking_space: 4,
    title: "Detached Duplex",
    town: "Lekki",
    state: "Lagos",
    price: 65000000,
  },
  {
    id: 8,
    bedrooms: 2,
    bathrooms: 2,
    toilets: 3,
    parking_space: 6,
    title: "Detached Bungalow",
    town: "Epe",
    state: "Lagos",
    price: 12000000,
  },
  {
    id: 9,
    bedrooms: 1,
    bathrooms: 1,
    toilets: 1,
    parking_space: 1,
    title: "Detached Duplex",
    town: "Lekki",
    state: "Lagos",
    price: 200000000,
  },
  {
    id: 10,
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking_space: 5,
    title: "Detached Duplex",
    town: "Ajah",
    state: "Lagos",
    price: 60000000,
  },
];
export default function House({ className, ...props }) {
  const [data, setData] = useState(houses);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
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
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle>Real Estate Price</CardTitle>
          <CardDescription>
            Enter the attributes of the housing.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  rules={{ required: "This field is required", min: 1 }}
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
                  rules={{ required: "This field is required", min: 1 }}
                  name="toilets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Toilets</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="toilets" {...field} />
                      </FormControl>
                      <FormDescription>
                        Total Toilets within a block.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  rules={{ required: "This field is required", min: 1 }}
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
                      <FormDescription>House State Address.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Mark all as read</Button>
        </CardFooter>
      </Card>
      <h2>Browse houses</h2>
      <div className="mb-32 grid text-center gap-4 lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        {currentItems.map((r, index) => {
          return (
            <Card key={index} className="w-auto">
              <CardHeader>
                <CardTitle>{r.title}</CardTitle>
                <CardDescription>
                  Lorem ipsum {r.bathrooms} dolor sit amet consectetur
                  adipisicing elit. Ipsam quae consequuntur optio ratione
                  corrupti hic sapiente, unde non nisi magni quaerat magnam iste
                  rem est, in qui quas minima itaque.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {r.town}, {r.state}
                </p>
                <div className="space-x-4">
                  <span className="text-sm font-medium leading-none">
                    {r.bedrooms} Beds
                  </span>
                  <span className="text-sm font-medium leading-none">
                    {r.toilets} Baths
                  </span>
                  <span className="text-sm font-medium leading-none">
                    {r.parking_space} Garage
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-left">
                  <p className="text-sm">price</p>
                  <p className="text-sm font-bold leading-none">
                    N{r.price}/mo
                  </p>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}

// export async function getStaticProps() {
//   const res = await fetch('http://localhost:3000/api/estate');
//   const repo = await res.json()
//   // console.log(repo);
//   return { props: { repo } }
// }
