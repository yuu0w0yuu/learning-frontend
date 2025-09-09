import { NextResponse } from "next/server";
import supabase from "@/app/utils/database";

export async function GET() {
    try {
        const { data } = await supabase.from('items').select();
        return NextResponse.json({message:"Item read", allitems: data});
    }catch(err){
        return NextResponse.json({ message: err.message });
    }
}

export const revalidate = 0;