import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

const SignUp = () => {
  return (
    <div className="grid lg:grid-cols-2">
        <div>
          <Auth type="signup"/>
        </div>
        <div className="invisible lg:visible">
          <Quote/>
        </div>
    </div>
  )
}

export default SignUp