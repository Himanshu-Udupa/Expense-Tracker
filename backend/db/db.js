import mongoose from "mongoose";

const db = () => {
  // try {
  mongoose.set("strictQuery", false);
  // await connect(
  //   "mongodb+srv://himanshu:expense@123@expense-tracker.cu2j8.mongodb.net/?retryWrites=true&w=majority&appName=expense-tracker"
  // );
  // mongoose
  //   .connect(
  //     "mongodb+srv://himanshu:expense@123@expense-tracker.cu2j8.mongodb.net/?retryWrites=true&w=majority&appName=expense-tracker",
  //     { useNewUrlParser: true, useUnifiedTopology: true }
  //   )
  //   .then(() => console.log("MongoDB connected"))
  //   .catch((err) => console.error("MongoDB connection error:", err));
  const uri =
    "mongodb+srv://udupahimanshu:lLaKz1UNdlSl5QFv@cluster0.fkubh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
  // console.log("Db Connected");
  // } catch (error) {
  // console.log("DB Connection Error");
};

export default { db };
