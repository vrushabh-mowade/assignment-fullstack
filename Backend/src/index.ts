import express from "express";
import cors = require("cors")
import { Response, Request } from "express";
import { USERS } from './users';

const app = express();
const port = 3000;
let id = 4;
app.use(cors());
app.use(express.json());

// write your code here

app.get('/users', (req: Request, res: Response) => {
    const userarray = USERS.users;

    res.json(userarray);

});

app.get("/user/:id", (req: Request, res: Response) => {
    const ID = parseInt(req.params.id, 10);
    const userarray = USERS.users;
    const userExists = userarray.some(user => user.id === ID);
    const user = userarray.find(user => user.id === ID);

    if (userExists) {
        res.json(user);
    } else {
        res.status(404).json({ error: "user not found" });
    }
});



// app.get("/user/:id", (req: Request, res: Response) => {
//     const ID = parseInt(req.params.id, 10);
//     const userarray = USERS.users;
//     const userexist = userarray.map(user => user.id === ID);
//     const user = userarray.find(user => user.id === ID);

//     if (userexist) {
//         res.json(user);
//     }
//     else {
//         res.status(404).json({ error: "user not found " });
//     }

// })


app.post('/user', (req, res) => {
    const { id, name } = req.body;
    const newUser = { id, name };
    const userarray = USERS.users;
    
    userarray.push(newUser);
    res.status(200).json(newUser);


    
});



app.delete("/user/:id", (req: Request, res: Response) => {
    const ID = parseInt(req.params.id, 10);
    const userarray = USERS.users;
    const index = userarray.findIndex(user => user.id === ID);

    console.log('ID:', ID);
    console.log('User Array before deletion:', userarray);

    if (index !== -1) {
        userarray.splice(index, 1);
        console.log("lets debug the file");
        res.json({ msg: "User deleted successfully" });

    } else {
        res.status(404).json({ error :"user not found" })
    }
})




app.put("/user/:id",(req:Request,res:Response)=>{
    const ID = req.params.id;
    const {name} = req.body;
    const userarray = USERS.users;

    const index = userarray.findIndex(user => user.id === parseInt(ID,10));
    userarray[index].name = name;
    res.json({ msg: "update successfully done " });


})


// stop here

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
}
)

export default app;
