import { NextResponse } from 'next/server';
import supabase from '@/app/utils/database';

export async function PUT(request, context) {
    const { id } = await context.params
    const requestBody = await request.json();

    try{
        const {data, error} = await supabase.from("items")
            .select()
            .eq("id", id)
            .single();
        if(error) throw new Error(error.message);

        if(data.email === requestBody.email){
            await supabase.from("items")
                .update(requestBody)
                .eq("id", id);
            return NextResponse.json({ message: "Edit Success" });
        }else{
            return NextResponse.json({ message: "Email Mismatch" });
        }
    } catch(err) {
        return NextResponse.json({ message: "Edit Failed" });
    }
 }