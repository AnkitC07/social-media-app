import { Inter } from "next/font/google";
import "./globals.css";
import Wrapper from "./_components/layout/Wrapper";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./_context/User";
import PostContextProvider from "./_context/Post";
import ImageModal from './_components/common/ImageModal'
import  CommentModal  from "./_components/layout/CommentModal.jsx";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head></head>
            <body className={inter.className + "mx-10 md:px-[15px]"}>
                <UserContextProvider>
                    <PostContextProvider>
                    <CommentModal/>
                    <ImageModal/>
                        <Toaster position="bottom-center" reverseOrder={false} />
                        <Wrapper childs={children} />
                    </PostContextProvider>
                </UserContextProvider>
            </body>
        </html>
    );
}
