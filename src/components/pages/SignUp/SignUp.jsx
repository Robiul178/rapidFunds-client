
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Controller } from "react-hook-form";

const SignUp = () => {
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { singUpUser } = useAuth();

    const handleUserInfo = event => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        const name = form.get('name');
        const email = form.get('email');
        const pin = form.get('pin');
        const mobileNumber = form.get('mobile');

        const userData = {
            name: name,
            email: email,
            pin: pin,
            mobileNumber: mobileNumber,
            status: 'pending'
        }

        if (pin.length !== 5 || !/^\d{5}$/.test(pin)) {
            return setMessage('PIN must be a 5-digit number');
        }

        const firebasePass = pin + '0';
        console.log(firebasePass, firebasePass.length);
        singUpUser(email, firebasePass)
            .then(() => {
                axiosSecure.post('/users', userData)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            toast.success("User Sign In Successful")
                            navigate('/dhome');
                        }
                    })
            })

    }



    return (
        <div>
            <div className="max-w-[800px] mx-auto mt-12">
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
            </div>
            <ToastContainer />
        </div>
    );
};


export default SignUp;