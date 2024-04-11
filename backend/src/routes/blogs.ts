import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@ravish61/medium-zod";

export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string
      JWT_SECRET: string
    },
    Variables:{
        userId: string
    }
  }>();


  
blogRouter.use('/*', async (c, next)=>{

    //verify the headers
    //if the header is not correct then retun the user with the 403 status code as the route is protecteed and only teh signed in user could edit the post
    //if the header is correct then call the next middleware
  
    const header = c.req.header('Authorization');
    //We are expeccting the user to give us the token as "Bearer token"
    const token = header?.split(' ')[1];
    
    if (!token) {
      c.status(403);
      return c.json({ message: 'Authorization header is missing' });
    }
    const secret = c.env.JWT_SECRET;
    const decodedPayload = await verify(token, secret);
    if (decodedPayload.id) {
      console.log("yes we are here", decodedPayload.email);
      c.set('userId', decodedPayload.id);
      await next();
    } else {
      c.status(403);
      return c.json({ message: 'User not authorized' });
    }
  
  
  })
  
blogRouter.post('/', async (c)=>{
    const body = await c.req.json();

    const {success} = createBlogInput.safeParse(body)

    if(!success){
        c.status(400)
        return c.json({message: " Input is Invalid"})
    }

    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({id: blog.id})

})

blogRouter.put('/', async (c)=>{
    const body = await c.req.json();

    const {success} = updateBlogInput.safeParse(body)
    if(!success){
        c.status(400)
        return c.json({message: " Input is Invalid"})
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const blog = await prisma.post.update(
        {
        where: {
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })

    return c.json({message: 'Blog updated successfully with id: '+ blog.id})

})

blogRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select:{
            id: true,
            title: true,
            content: true,
            author:{
                select:{
                    name: true
                }
            } 
        }
    });
    return c.json({ blogs})    
})

blogRouter.get('/:id', async(c)=>{

    const id=  c.req.param('id')
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    try{
        const blog = await prisma.post.findUnique({
            where:{
                id: id
            },

            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name: true
                    }
                }
            }
        })

        return c.json({ blog})
    }catch(error){
        return c.json({message: 'Blog not found'})
    }
})

