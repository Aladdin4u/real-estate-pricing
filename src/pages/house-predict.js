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

export default function HousePredict({ className, ...props }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const form = useForm({
    defaultValues: {
      bedrooms: 5,
      toilets: 6,
      parking_space: 5,
      town: "",
      state: "",
    },
  });
  async function onSubmit(values) {
    const data = await fetch("http://localhost:3000/api/estate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await data.json();
    console.log(values, result);
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
      {data && (
        <>
          <h2 className="my-4 self-start text-2xl font-medium">
            Future House Price
          </h2>

          <div className="mb-8 grid text-left">
            <Card key={index} className="w-auto">
              <CardHeader>
                <CardTitle className="text-left">{data.title}</CardTitle>
                <CardDescription className="text-left space-y-2">
                  <span className="flex items-center gap-2">
                    <FaLocationDot />
                    {data.town}, {data.state}
                  </span>
                  <span className="block flex space-x-4">
                    <span className="flex gap-2 text-sm font-medium leading-none">
                      <FaBed />
                      {data.bedrooms} Beds
                    </span>
                    <span className="flex gap-2 text-sm font-medium leading-none">
                      <FaBath />
                      {data.toilets} Baths
                    </span>
                    <span className="flex gap-2 text-sm font-medium leading-none">
                      <FaCar />
                      {data.parking_space} Garage
                    </span>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-justify">
                Lorem ipsum {data.bathrooms} dolor sit amet consectetur
                adipisicing elit. Ipsam quae consequuntur optio ratione corrupti
                hic sapiente, unde non nisi magni quaerat magnam iste rem est,
                in qui quas minima itaque.
              </CardContent>
              <CardFooter>
                <div className="text-left">
                  <span className="text-sm">price</span>
                  <p className="text-sm font-bold leading-none">
                    &#8358;{data.price}/mo
                  </p>
                </div>
              </CardFooter>
            </Card>
            {loading && (
              <div className="backdrop-blur-sm absolute top-1/2 left-1/2 tranform-x-[50%] inline-flex text-black p-4">
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
                    data="10"
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
        </>
      )}
    </main>
  );
}
