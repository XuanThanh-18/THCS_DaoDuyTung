import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Server-side Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export async function GET(request: NextRequest) {
  try {
    // Ví dụ: Truy vấn dữ liệu từ một bảng
    // const { data, error } = await supabase
    //   .from("your_table_name")
    //   .select("*");

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 400 });
    // }

    return NextResponse.json({
      message: "Supabase connected successfully",
      // data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Ví dụ: Thêm dữ liệu vào bảng
    // const { data, error } = await supabase
    //   .from("your_table_name")
    //   .insert([body]);

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 400 });
    // }

    return NextResponse.json({
      message: "Data inserted successfully",
      // data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 },
    );
  }
}
