import { Inter } from "next/font/google";
import "./globals.css";
import Wrapper from "./_components/layout/Wrapper";
const inter = Inter({ subsets: ["latin"] });
import {Toaster} from "react-hot-toast"

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className + "mx-10 md:px-[15px]"}>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
                <Wrapper childs={children} />
            </body>
        </html>
    );
}
