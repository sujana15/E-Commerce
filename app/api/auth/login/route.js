import { connectDB } from "../../../lib/mongoose";
import User from "../../../models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "No account found with this email." }),
        { status: 404 }
      );
    }

    // Plain-text password comparison
    if (user.password !== password) {
      return new Response(
        JSON.stringify({ error: "Incorrect email or password." }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
}
