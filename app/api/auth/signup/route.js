import { connectDB } from "../../../lib/mongoose";
import User from "../../../models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Name, email, and password are required." }),
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email is already registered." }),
        { status: 400 }
      );
    }

    // Store password as plain text
    const newUser = await User.create({ name, email, password });

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
}

