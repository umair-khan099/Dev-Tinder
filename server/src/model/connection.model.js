import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignore", "accepted", "intrested", "rejected"],
        message: `{VALUE} is incorrect value type`,
      },
    },
  },
  { timestamps: true },
);
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const connectionRequestModel = mongoose.model(
  "connectionRequest",
  connectionRequestSchema,
);

export default connectionRequestModel;
