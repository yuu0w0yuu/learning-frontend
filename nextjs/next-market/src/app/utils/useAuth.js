"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtVerify } from "jose"

const useAuth = () => {
    const [loginUserEmail, setLoginUserEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        const checkToken = async() => {
            const token = localStorage.getItem("token");

            if(!token){
                router.push("/login");
            }

            try{
                const secretKey = new TextEncoder().encode("next-market-route-handlers")
                const decodedJwt = jwtVerify(token, secretKey)  
                setLoginUserEmail(decodedJwt.payload.email);
            }catch{
                router.push("/login");
            }
        };
        checkToken();
    }, [router]);

    return loginUserEmail;
};

export default useAuth;