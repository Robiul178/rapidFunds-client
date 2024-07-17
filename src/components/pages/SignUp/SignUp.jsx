
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select"

const SignUp = () => {
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { singUpUser } = useAuth();



    // const handleUserInfo = event => {
    //     event.preventDefault();
    //     const form = new FormData(event.currentTarget);

    //     const name = form.get('name');
    //     const email = form.get('email');
    //     const pin = form.get('pin');
    //     const mobileNumber = form.get('mobile');

    //     const userData = {
    //         name: name,
    //         email: email,
    //         pin: pin,
    //         mobileNumber: mobileNumber,
    //         status: 'pending'
    //     }

    //     if (pin.length !== 5 || !/^\d{5}$/.test(pin)) {
    //         return setMessage('PIN must be a 5-digit number');
    //     }

    //     const firebasePass = pin + '0';
    //     console.log(firebasePass, firebasePass.length);
    //     singUpUser(email, firebasePass)
    //         .then(() => {
    //             axiosSecure.post('/users', userData)
    //                 .then(res => {
    //                     console.log(res.data);
    //                     if (res.data.insertedId) {
    //                         toast.success("User Sign In Successful")
    //                         navigate('/dhome');
    //                     }
    //                 })
    //         })

    // }


    const { register, handleSubmit, reset, control } = useForm(
        {
            userRole: 'Select Role',
        }
    );

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(data);
        const userRole = data.userRole?.value;

        if (data?.pin.length !== 5 || !/^\d{5}$/.test(data?.pin)) {
            return setMessage('PIN must be a 5-digit number');
        }

        const firebasePass = data.pin + '0';
        console.log(firebasePass, firebasePass.length);
        singUpUser(data.email, firebasePass)
            .then(() => {
                axiosSecure.post('/users', data)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            toast.success("User Sign In Successful")
                            navigate('/dhome');
                        }
                    })
            })

    };



    return (
        <div>
            <div>
                <ToastContainer />
                <div className="mt-12">
                    <div className="text-center ">
                        <h2 className="text-3xl font-bold font-serif ">RapidFunds</h2>
                    </div>

                    <div className='w-[700px] mx-auto mb-8'>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="card-body">
                            <div className="form-control">
                                <input type="text" placeholder="Your Name" name='name' {...register("name")} className="input input-bordered w-full shadow-md" />
                            </div>
                            <div className="form-control">
                                <input type="email" placeholder="Your Email" name='email' {...register("email")} className="input input-bordered shadow-md" />
                            </div>
                            <div className="form-control">
                                <input type="password" placeholder="Your pin" name='picture' {...register("pin")} className="input input-bordered shadow-md" />
                            </div>

                            <div className="form-control">
                                <input type="number" name='number' placeholder="Mobile Number" {...register("number")} className="input input-bordered shadow-md" />

                            </div>

                            <div className="shadow-md">
                                <Controller
                                    name="userRole"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={[
                                                { label: "User" },
                                                { label: "Agent" },
                                            ]}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-outline  btn-success border border-b-4">Sing Up</button>
                            </div>
                            <div>
                                <p className="text-red-800">{message}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <div className="max-w-[800px] mx-auto mt-12">
                <h2 className="text-4xl font-bold text-center"> Registration Here</h2>
                <div>
                    <form
                        onSubmit={handleUserInfo}
                        className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Your Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pin</span>
                            </label>
                            <input type="number" name='pin' placeholder="Pin must be 5 digit" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mobile Number</span>
                            </label>
                            <input type="number" name='mobile' placeholder="Number" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Your Email" className="input input-bordered" required />
                        </div>
                        <div className="shadow-md">
                            <Controller
                                name="userRole"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={[
                                            { value: "worker", label: "Worker" },
                                            { value: "taskCreator", label: "Task Creator" },
                                        ]}
                                    />
                                )}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Registration</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <p>If you have already an acoount ,<Link to='/login' className="text-blue-700 underline">please login here</Link> </p>
                        <p className="text-red-800 font-semibold">{message}</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};


export default SignUp;