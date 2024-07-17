import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
    const { logInuser } = useAuth()
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors }, } = useForm(
        {
            defaultValues: {
                userRole: 'Select Role',
            },
        }
    );

    const onSubmit = (data, e) => {
        e.preventDefault();

        console.log(data);
        logInuser(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    navigate('/')
                }

            })
            .catch(() => {
            });

    };


    return (
        <div className="p-28">
            <div>
                <h2 className="text-4xl font-bold text-center"> LogIn Here</h2>
            </div>
            <div className='w-[700px] mx-auto'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
                    <div className="form-control ">
                        <input type="email" placeholder="Email" name='email' {...register("email")} className="input input-bordered shadow-md" required />
                    </div>

                    <div className="form-control">
                        <input type="password" name='password' placeholder="Password" {...register("password")} className="input input-bordered shadow-md" required />
                        <label className="label">
                            {errors.exampleRequired && <span>This field is required</span>}
                        </label>
                    </div>

                    <Link to='/signup' className="underline text-blue-800 border p-2 rounded-sm text-center shadow-md">
                        Please click here for Sing Up
                    </Link>

                    <div className="form-control mt-6 shadow-md">
                        <button type='submit' className="btn btn-outline  btn-success border border-b-4">Sing Up</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;