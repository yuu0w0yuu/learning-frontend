import { NextResponse } from 'next/server';
import supabase from '@/app/utils/database';

export async function POST(request) {

  const requestBody = await request.json();

  try{
    const { error } = await supabase.from('items').insert(requestBody);
    if (error) throw new Error(error.message);
    return NextResponse.json({ message: "item created" });
  } catch(err) {
    return NextResponse.json({ message: err.message });
  }
}
