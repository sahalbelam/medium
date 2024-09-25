import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
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
  const {success} = signinInput.safeParse(body)
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

userRouter.get('/check-user', async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    c.status(401);
    return c.json({ message: 'Authorization header is missing' });
  }
  // const token = authHeader; it is not used 
  try {
    const payload = await verify(authHeader, c.env.JWT_SECRET); // Decode the JWT
    const userId = payload.id; // Get user ID from the token

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      c.status(404);
      return c.json({ isSignedUp: false });
    }

    c.status(200);
    return c.json({ isSignedUp: true });

  } catch (err) {
    c.status(403);
    return c.json({ message: 'Invalid token' });
  }
});

  
export default userRouter