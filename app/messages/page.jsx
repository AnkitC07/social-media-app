
import ChattingArea from "./ChattingArea.jsx";
import ChatList from "./ChatList.jsx";

const MessagesPage = () => {

    const users = [
        {
            user_id: "1",
            socketId: "1",
            data:{
                name:'John Smith',
                avatar:"",
            }
        },
        {
            user_id: "2",
            socketId: "2",
            data:{
                name:'John Smith',
                avatar:"https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg",
            }
        },
        {
            user_id: "3",
            socketId: "3",
            data:{
                name:'John Smith',
                avatar:"",
            }
        },
        {
            user_id: "4",
            socketId: "4",
            data:{
                name:'John Smith',
                avatar:"",
            }
        },
        {
            user_id: "5",
            socketId: "5",
            data:{
                name:'John Smith',
                avatar:"",
            }
        }
    ]
    
    const list = [
        {
            id: 1,
            name: "Jhon",
            message: "Hello",
        },
        {
            id: 2,
            name: "Emma",
            message: "Hi",
        },
        {
            id: 3,
            name: "Same",
            message: "How are you?",
        },
        {
            id: 4,
            name: "Jhon",
            message: "Good Morning",
        },
        {
            id: 5,
            name: "Emma",
            message: "I am fine",
        },
        {
            id: 6,
            name: "Same",
            message: "I am fine too",
        },
        {
            id: 7,
            name: "Jhon",
            message: "Good Night",
        },
        {
            id: 8,
            name: "Emma",
            message: "Bye",
        },
    ]


    return (
        <>
            <div className="chat_area container mx-auto pb-[65px]   max-md:fixed md:pb-0">
                <div className="min-w-full border rounded md:grid md:grid-cols-3 ">

                    <ChatList  />

                    <ChattingArea  />
                </div>
            </div>
        </>
    );
};

export default MessagesPage;
