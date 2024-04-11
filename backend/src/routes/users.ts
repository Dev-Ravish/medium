import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@ravish61/medium-zod";

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string
      JWT_SECRET: string
    }
  }>();


userRouter.post('/signup', async (c)=>{
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    
    const {success} = signupInput.safeParse(body)

    if(!success){
        c.status(400)
        return c.json({message: " Input is Invalid"})
    }

    try {
      
      const user = await prisma.user.create({
        data:{
          name:body.name,
          email:body.email,
          password:body.password
        }
      })
    
      const secret = c.env.JWT_SECRET
      const token = await sign({id:user.id}, secret)
      
      return c.json({message: `${user.email} signed up successfully`,
      jwt: `Bearer ${token}`,
      name: body.name})
      
    } catch (error) {
  
      return c.json({message: 'User signing up failed',error

      })  
  
    }
  })
  
  userRouter.post('/signin', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
  
    const {success} = signinInput.safeParse(body)
    if(!success){
        c.status(400)
        return c.json({message: " Input is Invalid"})
    }

    try {
      const user = await prisma.user.findUnique({
        where:{
          email:body.email,
          password:body.password
        }
      })
  
      if(!user){
        c.status(403)
        return c.json({message: 'User not found'})
      }
      const jwt = await sign({id:user.id}, c.env.JWT_SECRET)
      return c.json({message: 'User signed in successfully',
                      jwt: `Bearer ${jwt}`,
                      name: user.name})
    } catch(error){
      return c.json({message: 'User signing in failed',
    error: error})
    }
  })