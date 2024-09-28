import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, password } = await request.json();

  try {
    const user = await UserModel.findOne({
      username: username,
    });

    if (user) {
      return Response.json(
        {
          status: "failed",
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username: username,
      password: hashedPassword,
    });

    const saveduser = await newUser.save();

    if (saveduser) {
      return Response.json({
        status: "success",
        message: "User create successfully",
        data: saveduser,
      });
    }
  } catch (error: any) {
    console.log("Failed to create user");
    return Response.json(
      {
        success: false,
        message: "Failed to create user",
        error: error?.message,
      },
      {
        status: 500,
      }
    );
  }
}
