import express from 'express';
import bodyParser from 'body-parser';
import MongoClient from 'mongodb';

const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

//all the database endpoint operations passed using operation as a function
const withDB = async(operations, res) => {
    try{
        //connect to the database
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser : true});
        const db = client.db('my-portfolio');
    
        //it's in async so await has to be here
        await operations(db);
    
        client.close();
    }
    catch(error){
        res.status(500).json({message:" Error connecting to db", error});
    }
    
}

//get request for project name
app.get("/api/projects/:name", async (req, res) => {
    //take project name from the url params
    const projectName = req.params.name;

    withDB(async(db) => { 
        //find data with projectname
        const projectInfo = await db.collection('projects').findOne({name : projectName});
        res.status(200).jsonp(projectInfo);
    }, res);    
});

// Post request for upvotes in projects
app.post("/api/projects/:name/upvote", async(req, res) =>{
    //take project name from the url params
    const projectName = req.params.name;
    
    withDB(async (db) =>{
        //update upvotes
        const projectInfo = await db.collection('projects').findOne({name : projectName});
        await db.collection('projects').updateOne({name: projectName}, {
            '$set': {
                upvotes: projectInfo.upvotes + 1
            }
        })

        //updates project info
        const updatedProjectInfo = await db.collection('projects').findOne({name: projectName});
    
        res.status(200).jsonp(updatedProjectInfo);
    }, res);   
});

// Post request for fetching upvotes and adding comments per user
app.post("/api/projects/:name/add-comment", async(req, res) =>{
    //take project name from the url params and {username, text} from request body
    const {username, text} = req.body;
    const projectName = req.params.name;

    withDB(async (db) =>{

        //update comment by appending
        const projectInfo = await db.collection('projects').findOne({name: projectName});
        await db.collection('projects').updateOne({name: projectName}, {
            '$set':{
                comments: projectInfo.comments.concat({username, text})
            }
        })

        //updates project info
        const updatedProjectInfo = await db.collection('projects').findOne({name: projectName})

        res.status(200).jsonp(updatedProjectInfo);
    }, res);

});

app.listen(8000, () => console.log("Listening on the port 8000!"));