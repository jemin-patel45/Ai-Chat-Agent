import projectModel from '../models/project.model.js';
import * as projectService from '../services/project.service.js';
import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';


export const createProject = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });

        const userId = loggedInUser._id;

        const newProject = await projectService.createProject({ name, userId });

        res.status(201).send(newProject);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }

}

export const getAllProject = async (req, res) => {
    try {

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })

        const allUserProjects = await projectService.getAllProjectByUserId({
            userId: loggedInUser._id
        })

        return res.status(200).json({
            projects: allUserProjects
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}

export const addUserToProject = async (req, res) => {   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { projectId, users } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });

        const project = await projectService.addUsersToProject({
            projectId,
            users,
            userId: loggedInUser._id
        });

        res.status(200).json({
            project,
        })
        
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

    
export const getProjectById = async (req, res) => {
    const { projectId } = req.params;

    try{
        const project = await projectService.getProjectById({projectId});
        res.status(200).json({
            project
        })

    }catch(err){
        console.log(err);
        res.status(400).json({error:err.message})
    }
}



export const updateFileTree = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { projectId, fileTree } = req.body;

        const project = await projectService.updateFileTree({
            projectId,
            fileTree
        })

        return res.status(200).json({
            project
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }

}




export const updateChatHistory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { projectId, chatHistory } = req.body;
        const updatedProject = await projectService.updateChatHistory({ projectId, chatHistory });
        res.status(200).json({
            message: 'Chat history updated successfully',
            project: updatedProject,
        });
    } catch (error) {
        console.error('Error updating chat history:', error);
        res.status(500).json({ message: 'Error updating chat history', error: error.message });
    }
};