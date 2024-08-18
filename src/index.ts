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

const HTTP_STATUSES = {
    OK_200:             200,
    CREATED_201:        201,
    NO_CONTENT_204:     204,
    BAD_REQUEST_400:    400,
    NOT_FOUND_404:      404 
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
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(HTTP_STATUSES.OK_200);
    res.json(foundCourse);
})

app.post('/courses/:id', (req,res) => {  //   courses/:id [POST]
    if(!req.body.title){
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const createCourse = {
        id: +(new Date()),
        title: req.body.title
    };
            
    db.courses.push(createCourse);
    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(createCourse);
})

app.delete('/courses/:id', (req,res) => { //   courses/:id [DELETE]
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    
    if(!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.put('/courses/:id', (req,res) => { //   courses/:id [PUT]
    const foundCourse = db.courses.find(c => c.id === +req.params.id)
    
    if(!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    if(!req.body.title){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    foundCourse.title = req.body.title;

    res.status(HTTP_STATUSES.NO_CONTENT_204);
})

app.listen(port, () => {
    console.log(`Server works on port ${port}`);
})