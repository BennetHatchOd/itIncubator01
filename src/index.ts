import express from 'express';
 

export const app = express();
const port = 3000;
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const db = { courses:[ 
    {id:1, title: 'front-end'},
    {id:2, title: 'back-end'},
    {id:3, title: 'automatics'},
    {id:4, title: 'devops'},
    ]
};


app.get('/courses', (req,res) => {   //     courses [GET]
    let foundCourses = db.courses;

    if(req.query.title){
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1);
    }
    
    res.json(foundCourses);
    
})


app.get('/courses/:id', (req,res) => { //   courses/:id [GET]
    const foundCourse = db.courses.find(c => c.id === +req.params.id)
    
    if(!foundCourse) {
        res.sendStatus(404);
        return;
    }
    res.status(200);
    res.json(foundCourse);
})

app.post('/courses/:id', (req,res) => {
    if(!req.body.title){
        res.sendStatus(400);
        return;
    }
    const createCourse = {
        id: +(new Date()),
        title: 'uknown'
    }
            
    db.courses.push(createCourse);
    res
        .status(201)
        .json(createCourse);
})


app.listen(port, () => {
    console.log(`Server works on port ${port}`);
})