import { Hono } from 'hono'
import { userRouter } from './routes/users'
import { blogRouter } from './routes/blogs'
import {cors} from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()
app.use('/*', cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


export default app