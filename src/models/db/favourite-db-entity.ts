import mongoose from "mongoose";

const FavoriteEntitySchema = new mongoose.Schema({
  entityType: { type: String, required: true },
  userId: { type: String, required: true },
  entityId: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
});

const FavoriteDBEntity = mongoose.model("Favorite", FavoriteEntitySchema);

export default FavoriteDBEntity;
