import request from "supertest";
import {app} from '../../src'

describe('/course', () => {


    it('should return 200 and empty array', async () => {
        await request(app)
        .get('/courses')
        .expect(200, []); 
        
                // await request(app)
                //  .get('/cources') 
                //  .get('/courses')
                // .expect(200); 
        
        // await request(app)
        // .get('/courses')
        // .expect(200);
        // const response = await request(app).get('/courses');
        // expect(response.status).toBe(200);
        // expect(response.text).toBe('Hello, World!');
    })
})