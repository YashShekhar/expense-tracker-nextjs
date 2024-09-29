import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  await dbConnect();
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return Response.json(
        {
          success: false,
          messages: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      {
        success: true,
        messages: "Item fetched successfully",
        data: user.item,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error adding messages", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
