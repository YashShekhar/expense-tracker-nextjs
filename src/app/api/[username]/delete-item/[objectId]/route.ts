import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: { username: string; objectId: string } }
) {
  const { username, objectId } = params;

  console.log(username, "--", objectId);

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

    const itemId = new mongoose.Types.ObjectId(objectId);

    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { item: { _id: itemId } } }
    );

    if (updatedResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Item not found or already deleted",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Item deleted",
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
        message: "Internal Server Error at delete-item",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
