import dbConnect from "@/lib/dbConnect";
import UserModel, { Item } from "@/model/User";

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const { itemName, itemValue, expenseType, category, createdAt, modifiedAt } =
    await request.json();
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

    const item = {
      itemName,
      itemValue,
      expenseType,
      category,
      createdAt,
      modifiedAt,
    };

    user.item.push(item as Item);
    await user.save();

    return Response.json(
      {
        success: true,
        messages: "Item added successfully",
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
