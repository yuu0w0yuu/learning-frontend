import { NextResponse } from 'next/server';
import supabase from '@/app/utils/database';
import { SignJWT} from "jose"

export async function POST(request) {
    const requestBody = await request.json();

    try {
        const { data, error } = await supabase
            .from('users')
            .select().eq('email', requestBody.email)
            .single();
        if(!error){
            if(data.password == requestBody.password){

                const secretKey = new TextEncoder().encode("next-market-route-handlers")
                const payload = {
                    email: requestBody.email
                }

                const token = await new SignJWT(payload)
                    .setProtectedHeader({ alg: "HS256" })
                    .setExpirationTime("1d")
                    .sign(secretKey);
                return NextResponse.json({ message: "Login Succeeded", token: token });
            }else{
                return NextResponse.json({ message: "Invalid Password" });
            }
        }else{
            return NextResponse.json({ message: "User Not Exist"});
        }
    } catch (err) {
        return NextResponse.json({ message: err.message });
    }
    
}