import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@saha_belam/medium-common";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";   
  const user = await verify(authHeader, c.env.JWT_SECRET);
    
  if (user && typeof user.id === "number") {
    c.set("userId",  user.id.toString());
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "u r not logged in ",
    });
  }
}); 

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body)
    if(!success){
      c.status(401)
      return c.json({
        message:"inputs are not correct"
      })
    }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try{
    const blog = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: Number(authorId),
        },
      });
      return c.json({
        id: blog.id,
      });
  }catch(e){
    console.error(e)
    c.status(411);
    return c.json({
        message:"something went wrong"
    })
  }
  
});
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body)
    if(!success){
      c.status(401)
      return c.json({
        message:"inputs are not correct"
      })
    }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
      const blog = await prisma.post.update({
        where: {
          id: body.id,
        },
        data: {
          title: body.title,
          content: body.content,
        },
      });
      return c.json({
        id: blog.id,
      });
    
  } catch (error) {
    console.error(error)
    c.status(411);
    return c.json({
        message:"something went wrong"
    })
  }
});
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
      const blogs = await prisma.post.findMany({
        select:{
          title:true,
          content:true,
          id:true,
          author:{
            select:{
              name:true
            }
          }
        }
      });
      return c.json({
        blogs,
      });
  } catch (error) {
    c.status(411);
    return c.json({
        message:"something went wrong"
    })
  }
});
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
      const blog = await prisma.post.findFirst({
        where: {
          id: Number(id),
        },
        select:{
          id:true,
          title:true,
          content:true,
          author:{
            select:{
              name:true
            }
          }
        }
      });
      return c.json({
        blog,
      });
  } catch (error) {
    c.status(411);
    return c.json({
        message:"something went wrong"
    })
  }
});

export default blogRouter;