import request from "supertest";
import {app} from '../../src'

describe('/course', () => {


    it('should return 200 and empty array', async () => {
        await request(app)
        .get('/courses')
        .expect(200, []); 

     
    })
})