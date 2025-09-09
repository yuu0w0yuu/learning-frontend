import { NextResponse } from "next/server";
import supabase from "@/app/utils/database";

export async function GET(request, context) {
    const { id } = await context.params

    try {
        const { data, error } = await supabase.from("items")
            .select()
            .eq('id', id)
            .single();
        if (error) throw new Error(error.message);
        return NextResponse.json({message:"Success", Item: data})
    }catch(err){
        return NextResponse.json({ message: "failed" })
    }
}