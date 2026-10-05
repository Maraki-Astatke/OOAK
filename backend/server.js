import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';

dotenv.config();

const PORT = process.env.PORT || 5000;


const listen = async () =>{
    
}