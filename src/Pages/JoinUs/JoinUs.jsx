import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../auth/AuthProvider";
import coverImage from "../../assets/coverImage.jpg";
import { MdReportGmailerrorred } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";

const JoinUs = () => {
  const { createUser, logInWithEmailPass, logInWithGoogle, profileUpdate, loading } =
    useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

    const [error, setError] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    if (isLogin) {
      logInWithEmailPass(data.email, data.password)
        .then(() => {
            setError("");
            navigate(from);
        })
        .catch((err) => {
            setError(err.message);
        }
        );


    } else {
        if(data.confirmPassword !== data.password){
            setError("Password does not match")
            return;
        }
        createUser(data.email, data.password)
        .then(() => {
            setError("");
            profileUpdate({
                displayName: data.displaynName,
                photoURL: data.photoURL,
                }).then(() => {
                    navigate(from);
                }
                ).catch((err) => {
                    setError(err.message);
                }
                );
      })
      .catch((err) => {
        setError(err.message);
      }
        );
    }
  };

  return (
    <div className="flex min-h-[95vh] bg-slate-100 justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg flex  flex-col md:flex-row justify-center max-w-4xl w-full min-h-[34rem] mx-5">
        <div className="w-full md:w-1/2 md:block relative">
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full rounded-t-2xl md:rounded-t-none md:rounded-l-2xl md:rounded-tl-2xl"
          />
          <div className="absolute inset-24 md:inset-44  flex flex-col justify-center items-center">
            <h1 className="text-white text-2xl lg:text-3xl font-extrabold text-center">
              A Community
            </h1>
            <h1 className="text-white text-2xl lg:text-3xl font-extrabold text-center">
              Like no other.
            </h1>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-4 text-customBlue">
            <span className="text-3xl font-semibold ">Hello</span>, Bee!
          </h2>
          <div className="flex mb-8">
            <button
              onClick={() => {
                setError("");
                setIsLogin(true)}}
              className={`mr-4 ${
                isLogin
                  ? "border-b-2 border-customBlue text-customBlue pb-2"
                  : " pb-2"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setError("");
                setIsLogin(false)}}
              className={`${
                !isLogin
                  ? "border-b-2 border-customBlue text-customBlue pb-2"
                  : " pb-2"
              }`}
            >
              SignUp
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <>
                <input
                  {...register("displaynName", { required: true })}
                  placeholder="Enter your name"
                  className=" w-full bg-white border-b-2 border-customBlue py-3 focus:outline-none focus:text-gray-700 text-gray-500 pl-2"
                  required
                />
                <input
                  {...register("photoURL", { required: true })}
                  placeholder="Enter your photo URL"
                  className=" w-full bg-white border-b-2 border-customBlue py-3 focus:outline-none focus:text-gray-700 text-gray-500 pl-2"
                />
              </>
            )}
            <input
              {...register("email", {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white border-b-2 border-customBlue py-3 focus:outline-none focus:text-gray-700 text-gray-500 pl-2"
              required
            />
            {errors.email?.type == "pattern" && (
              <p className="text-red-600 font-light text-base flex justify-start items-center gap-2">
                <MdReportGmailerrorred /> Invalid email
              </p>
            )}
            <input
              {...register("password", {
                required: true,
                minLength: 8,
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+|:";'<>,.?/{}[\]]).+$/,
              })}
              type="password"
              placeholder="Enter Password"
              className="w-full bg-white border-b-2 border-customBlue py-3 focus:outline-none focus:text-gray-700 text-gray-500 pl-2"
            />
            {errors.password?.type == "minLength" && (
              <p className="text-red-600 font-light text-base flex justify-start items-center gap-2">
                <MdReportGmailerrorred /> Password length must be 6 or more
              </p>
            )}
            {errors.password?.type == "pattern" && (
              <p className="text-red-600 font-light text-base flex justify-start items-center gap-2">
                <MdReportGmailerrorred /> Password must contain at least one
                letter, one number and one special character
              </p>
            )}
            {!isLogin && (
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-white border-b-2 border-customBlue py-3 focus:outline-none focus:text-gray-700 text-gray-500 pl-2"
                required
              />
            )}
            {error && (
                <p className="text-red-600 font-light text-base flex justify-start items-center gap-2">
                  <MdReportGmailerrorred /> {error}
                </p>
              )}
            <div className={`${isLogin ? "pt-4" : "mt-2"}`}>
              <button
                type="submit"
                className={` bg-customBlue py-2 text-white  rounded-md w-full flex justify-center items-center`}
              >
                {loading ? (
                    <span className="loading loading-infinity loading-md text-white"></span>
                    ) : (
                     isLogin ? "Login" : "Sign Up"
                    )}
              </button>
            </div>
          </form>

          {isLogin && <div className="divider pt-6">OR</div>}

          {isLogin && (
            <div className="flex justify-center mt-8 w-full">
              <button
                onClick={logInWithGoogle}
                className="flex justify-center items-center gap-3 border-2 w-full py-3 rounded-xl border-gray-300 text-gray-400"
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
