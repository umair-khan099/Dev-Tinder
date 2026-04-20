import app from "./src/app.js";
import connectDb from "./src/config/db.js";

await connectDb();
app.listen(3000, () => {
  console.log("server is listing you my frnd");
});
