import { Inter } from "next/font/google";
import "./globals.css";
import Wrapper from "../_components/layout/Wrapper";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import UserContextProvider from "../_context/User";
import PostContextProvider from "../_context/Post";
import ChatContextProvider from "../_context/Chat";
import ImageModal from "../_components/common/ImageModal";
import CommentModal from "../_components/layout/CommentModal.jsx";
import SocketConnect from "../_components/layout/SocketConnect";
// export const metadata = {
//     title: "Create Next App",
//     description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head></head>
            <body className={inter.className + "mx-10 md:px-[15px]"}>
                <PostContextProvider>
                    <ChatContextProvider>
                        <UserContextProvider>
                            <CommentModal />
                            <ImageModal />
                            <Toaster position="bottom-center" reverseOrder={false} />
                            <Wrapper childs={children} />
                            <SocketConnect />
                        </UserContextProvider>
                    </ChatContextProvider>
                </PostContextProvider>
            </body>
        </html>
    );
}
