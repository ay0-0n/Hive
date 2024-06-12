import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../auth/AuthProvider";
import coverImage from "../../assets/coverImage.jpg";
import { MdReportGmailerrorred } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUploadImage from "../../hooks/useUploadImage";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const JoinUs = () => {
  const {
    createUser,
    logInWithEmailPass,
    logInWithGoogle,
    profileUpdate,
    loading,
    setLoading,
  } = useContext(AuthContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname === "/join-us"?'/' : location.state?.from?.pathname;
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const { uploadImage } = useUploadImage();

  const mutation = useMutation({
    mutationFn: (user) => {
      return axiosPublic.post("/users", user);
    },
    onSuccess: () => {
      setError("");
      navigate(from);
      Swal.fire({
        title: "Logged in successfully!",
        icon: "success",
        confirmButtonText: "Explore Hive",
        confirmButtonColor: "#3D8B95",
      });
    },
    onError: () => {
      setError("Database error. Please try again later.");
    },
  });

  const onSubmit = async (data) => {
    if (isLogin) {
      logInWithEmailPass(data.email, data.password)
        .then(() => {
          setError("");
          navigate(from);
          Swal.fire({
            title: "Logged in successfully!",
            icon: "success",
            confirmButtonText: "Explore Hive",
            confirmButtonColor: "#3D8B95",
          });
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      if (data.confirmPassword !== data.password) {
        setError("Password does not match");
        return;
      }

      const file = data.photo[0];
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }

      try {
        const imgUrl = await uploadImage(file);

        createUser(data.email, data.password)
          .then(() => {
            setError("");
            profileUpdate({
              displayName: data.displaynName,
              photoURL: imgUrl,
            })
              .then(() => {
                const user = {
                  name: data.displaynName,
                  email: data.email,
                  photo: imgUrl,
                  role: "user",
                  membership: false,
                  registerDate: new Date().toISOString(),
                };
                mutation.mutate(user);
              })
              .catch((err) => {
                setError(err.message);
                setLoading(false);
              });
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      } catch (err) {
        setError("Image upload failed. Please try again.");
        setLoading(false);
      }
    }
  };

  const googleLogin = () => {
    logInWithGoogle()
      .then((res) => {
        const name = res.user.displayName;
        const email = res.user.email;
        const photo = res.user.photoURL;
        const role = "user";
        const membership = false;
        const registerDate = new Date().toISOString();

        const user = { name, email, photo, role, membership, registerDate };
        mutation.mutate(user);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  loading && Swal.showLoading()

  return (
    <>
      <Helmet>
        <title>Hive - JoinUs</title>
      </Helmet>
      <div className="flex min-h-[95vh] bg-slate-100 justify-center items-center">
        <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row justify-center max-w-4xl w-full min-h-[34rem] mx-5">
          <div className="w-full md:w-1/2 md:block relative">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-full rounded-t-2xl md:rounded-t-none md:rounded-l-2xl md:rounded-tl-2xl"
            />
            <div className="absolute inset-24 md:inset-44 flex flex-col justify-center items-center">
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
              <span className="text-3xl font-semibold">Hello</span>, Bee!
            </h2>
            <div className="flex mb-8">
              <button
                onClick={() => {
                  setError("");
                  setIsLogin(true);
                }}
                className={`mr-4 ${
                  isLogin
                    ? "border-b-2 border-customBlue text-customBlue pb-2"
                    : "pb-2"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setError("");
                  setIsLogin(false);
                }}
                className={`${
                  !isLogin
                    ? "border-b-2 border-customBlue text-customBlue pb-2"
                    : "pb-2"
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
                    className="w-full bg-white border-b-2 border-customBlue py-3 focus:outline-none focus:text-gray-700 text-gray-500 pl-2"
                    required
                  />
                  <div className="relative pt-4">
                    <label
                      htmlFor="photo"
                      className=" bg-customBlue text-white py-2 rounded px-2 text-center cursor-pointer bottom-0 left-0 absolute"
                    >
                      Upload Photo
                    </label>
                    <input
                      type="file"
                      {...register("photo", { required: true })}
                      id="photo"
                      className=" bg-white border-b-2 border-customBlue w-full pl-[1rem]"
                    />
                  </div>
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
              {errors.email?.type === "pattern" && (
                <p className="text-red-600 font-light text-base flex justify-start items-center gap-2">
                  <MdReportGmailerrorred /> Invalid email
                </p>
              )}
              <div className="relative">
                <input
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+|:";'<>,.?/{}[\]]).+$/,
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full bg-white border-b-2 border-customBlue py-3 focus:outline-none focus:text-gray-700 text-gray-500 pl-2"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 font-light text-base flex justify-start items-center gap-2">
                  <MdReportGmailerrorred /> Password length must be 6 or more
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600 font-light text-base flex justify-start items-center gap-2">
                  <MdReportGmailerrorred /> Password must contain at least one
                  letter, one number and one special character
                </p>
              )}
              {!isLogin && (
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full bg-white border-b-2 border-customBlue py-3 focus:outline-none focus:text-gray-700 text-gray-500 pl-2"
                    required
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              )}
              {error && (
                <p className="text-red-600 font-light text-base flex justify-start items-center gap-2">
                  <MdReportGmailerrorred /> {error}
                </p>
              )}
              <div className={`${isLogin ? "pt-4" : "mt-2"}`}>
                <button
                  type="submit"
                  className="bg-customBlue py-2 text-white rounded-md w-full flex justify-center items-center"
                >
                  {isLogin ? (
                    "Login"
                  ) : (
                    "Sign Up")
                  }
                </button>
              </div>
            </form>
            
            <div className="divider pt-6">OR</div>

            <div className="flex justify-center mt-8 w-full">
              <button
                onClick={googleLogin}
                className="flex justify-center items-center gap-3 border-2 w-full py-3 rounded-xl border-gray-300 text-gray-400"
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinUs;
