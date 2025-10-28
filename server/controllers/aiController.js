import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from 'axios'
import {v2 as cloudinary} from 'cloudinary'
import FormData from 'form-data';
import fs from 'fs'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");






const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle = async (req, res)=>{
    try {
        const {userId}  = req.auth();
        const {prompt, length} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >= 10)
        {
            return res.json({success: false, message: "Limit reached, Upgrade to continue."})

        }
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
        });

        const content = response.choices[0].message.content

        await sql ` INSERT INTO creations (user_id, prompt, content, type)
        VALUES(${userId}, ${prompt}, ${content}, 'article')`;

        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata:{
                    free_usage: free_usage + 1
                }
            })
        }
        res.json({success: true, content})
        
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const generateBlogTitle = async (req, res)=>{
    try {
        const {userId}  = req.auth();
        const {prompt} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >= 10)
        {
            return res.json({success: false, message: "Limit reached, Upgrade to continue."})

        }
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 100,
        });

        const content = response.choices[0].message.content

        await sql ` INSERT INTO creations (user_id, prompt, content, type)
        VALUES(${userId}, ${prompt}, ${content}, 'blog-article')`;

        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata:{
                    free_usage: free_usage + 1
                }
            })
        }
        res.json({success: true, content})
        
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const generateImage = async (req, res) => {
    try {
      const { userId } = req.auth();
      const { prompt, publish } = req.body;
      const plan = req.plan;
  
      // Validate prompt
      if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
        return res.json({ success: false, message: "Invalid prompt for image generation." });
      }
  
      // Check subscription
      if (plan !== 'premium') {
        return res.json({
          success: false,
          message: "This feature is only available for premium subscriptions."
        });
      }
  
      // Prepare form data for ClipDrop
      const formData = new FormData();
      formData.append('prompt', prompt);
  
      // Call ClipDrop API
      const clipdropRes = await axios.post(
        'https://clipdrop-api.co/text-to-image/v1',
        formData,
        {
          headers: { 'x-api-key': process.env.CLIPDROP_API_KEY },
          responseType: 'arraybuffer'
        }
      );
  
      if (clipdropRes.status !== 200 || !clipdropRes.data) {
        console.error("ClipDrop API failed:", clipdropRes.status);
        return res.json({ success: false, message: "Image generation failed from ClipDrop." });
      }
  
      // Convert image to base64
      const base64Image = `data:image/png;base64,${Buffer.from(clipdropRes.data, 'binary').toString('base64')}`;
  
      // Upload to Cloudinary
      let secure_url;
      try {
        const cloudRes = await cloudinary.uploader.upload(base64Image);
        secure_url = cloudRes.secure_url;
      } catch (err) {
        console.error("Cloudinary upload failed:", err.message);
        return res.json({ success: false, message: "Image upload failed." });
      }
  
      // Store image in database
      await sql`
        INSERT INTO creations (user_id, prompt, content, type, publish)
        VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
      `;
  
      // Respond with image URL
      res.json({ success: true, content: secure_url });
  
    } catch (error) {
      console.error("❌ generateImage error:", error.message);
      res.json({ success: false, message: error?.message || "Unexpected error occurred." });
    }
  };


  export const removeImageBackground = async (req, res) => {
    try {
      const { userId } = req.auth();
      const { image } = req.file;
      const plan = req.plan;
  
      // Validate prompt
     
  
      // Check subscription
      if (plan !== 'premium') {
        return res.json({
          success: false,
          message: "This feature is only available for premium subscriptions."
        });
      }
  
      
      // Upload to Cloudinary
      let secure_url;
      try {
        const cloudRes = await cloudinary.uploader.upload(image.path,{
            transformation:[
                {
                    effect: 'background_removal',
                    background_removal: 'remove_the_background'
                }
            ]
        });
        secure_url = cloudRes.secure_url;
      } catch (err) {
        console.error("Cloudinary upload failed:", err.message);
        return res.json({ success: false, message: "Image upload failed." });
      }
  
      // Store image in database
      await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, 'Rempve background from image', ${secure_url}, 'image') `;
  
      // Respond with image URL
      res.json({ success: true, content: secure_url });
  
    } catch (error) {
      console.error("❌ generateImage error:", error.message);
      res.json({ success: false, message: error?.message || "Unexpected error occurred." });
    }
  };





  export const removeImageObject = async (req, res) => {
    try {
      const { userId } = req.auth();
      const { object  } = req.body;
      const { image } = req.file;
      const plan = req.plan;
  
  
      // Check subscription
      if (plan !== 'premium') {
        return res.json({
          success: false,
          message: "This feature is only available for premium subscriptions."
        });
      }
  
      
      // Upload to Cloudinary
     
      try {
        const cloudRes = await cloudinary.uploader.upload(image.path);
        const public_id = cloudRes.secure_url;
      } catch (err) {
        console.error("Cloudinary upload failed:", err.message);
        return res.json({ success: false, message: "Image upload failed." });
      }

     const imageUrl =  cloudinary.url(public_id, {
        transformation: [{effect:`gen_remove:${object}`}],
        resource_type: 'image'
      })
  
      // Store image in database
      await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image') `;
  
      // Respond with image URL
      res.json({ success: true, content: imageUrl });
  
    } catch (error) {
      console.error("❌ generateImage error:", error.message);
      res.json({ success: false, message: error?.message || "Unexpected error occurred." });
    }
  };





  export const resumeReview = async (req, res) => {
    try {
      const { userId } = req.auth();
      const resume = req.file;
      const plan = req.plan;
  
  
      // Check subscription
      if (plan !== 'premium') {
        return res.json({
          success: false,
          message: "This feature is only available for premium subscriptions."
        });
      }

      if(resume.size>5*1024*1024)
      {
        return res.json({success: false, message: "Resume file size exceeds allowed size (5MB)."})
      }

      const dataBuffer = fs.readFileSync(resume.path)
      const pdfData = await pdf(dataBuffer)

      const prompt = `Review the following resume and provide constructive
      feedback on its strengths, weakness, and areas for improvement. Resume
      Content:\n\n${pdfData.text}`

      const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.7,
        max_tokens: 1000,
    });

    const content = response.choices[0].message.content

  
      // Store image in database
      await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review') `;
  
      // Respond with image URL
      res.json({ success: true, content });
  
    } catch (error) {
      console.error("❌ generateImage error:", error.message);
      res.json({ success: false, message: error?.message || "Unexpected error occurred." });
    }
  };