import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from '@saha_belam/medium-common'

const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET:string
  }
}>()

userRouter.post('/signup', async (c) => {
    const body = await c.req.json() 
    const {success} = signupInput.safeParse(body)
    if(!success){
      c.status(401)
      return c.json({
        message:"inputs are not correct"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try{
      const user = await prisma.user.create({
        data:{
          username: body.username,
          password: body.password,
          name: body.name
        }
      })
      const jwt = await sign({
        id:user.id
      },c.env.JWT_SECRET)
      // return c.text('Hello new User!')
      return c.text(jwt)
    }catch(err){
      c.status(411)
      return c.text("invalid error")
    }
})

userRouter.post('/signin',async(c)=>{
  const body = await c.req.json() 
  const {success} = signupInput.safeParse(body)
    if(!success){
      c.status(401)
      return c.json({
        message:"inputs are not correct"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try{
      const user = await prisma.user.findFirst({
        where:{
          username: body.username,
          password: body.password
        }
      })
      if(!user){
        c.status(403)
        return c.text("user does not exist")
      }
      const jwt = await sign({
        id:user.id
      },c.env.JWT_SECRET)
      // return c.text('Hello new User!')
      return c.text(jwt)
    }catch(err){
      c.status(411)
      return c.text("invalid error")
    }
})
  
export default userRouter