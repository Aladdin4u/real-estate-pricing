import Image from "next/image";
import Link from "next/link"
import {
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`bg-[url('/images/home.jpg')] relative flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="absolute bottom-20 p-10 bg-gradient-to-t from-blue-500 backdrop-blur-sm flex place-items-center">
        <div className="flex flex-col">
          <h2 className={`mb-3 text-2xl text-white font-semibold`}>
            Explore Your Dream House
          </h2>
          <Link
            href="/houses"
            className="flex w-full justify-center items-center group dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto rounded-xl lg:border lg:bg-gray-200 lg:hover:bg-gray-300 lg:p-4 dark:bg-zinc-800/30"
          >
            Get started &nbsp;
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <ChevronRightIcon className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
