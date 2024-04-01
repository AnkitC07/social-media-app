import PageWrapper from "../_components/layout/PageWrapper.jsx";
import { cookies } from 'next/headers'
export default function Home() {

    const cookieStore = cookies()

    const token = cookieStore.get('token')

    console.log('cokkie=>',token)
    
    return (
        <>
            <PageWrapper token={token} />
        </>
    );
}
