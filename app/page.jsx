'use client'

import { useEffect } from "react";
import { redirect } from 'next/navigation'
import PageWrapper from "../_components/layout/PageWrapper.jsx";
export default function Home() {

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            redirect('/login')
        }
    },[])

    return (
        <>
            <PageWrapper  />
        </>
    );
}
