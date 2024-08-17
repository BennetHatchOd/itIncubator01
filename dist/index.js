"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 3000;
const db = { courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automatics' },
        { id: 4, title: 'devops' },
    ]
};
exports.app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCourses);
});
exports.app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    res.status(200);
    res.json(foundCourse);
});
// app.post('/courses/:id', (req,res) => {
//     const createCourse = {
//         id: +(new Date()),
//         title: 'uknown'
//     }
//     db.courses.push(createCourse);
//     res.json(createCourse);
//     })
exports.app.listen(port, () => {
    console.log(`Server works on port ${port}`);
});
