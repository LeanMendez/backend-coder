import { Application } from "./depts.ts";
import { userRouter } from "./routes/user.routes.ts";

const app = new Application(); //creamos la app del servidor
const PORT = 3000;

app.use(userRouter.routes());

app.listen({ port: PORT });
console.log(`Server listening on port ${PORT}`);
