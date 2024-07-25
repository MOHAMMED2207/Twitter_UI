import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useUpdateUserProfile } from "./updateProfile";
import LoadingSpinner from "../../Components/coomon/LoadingSpinner";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const EditProfileModal = ({ authUser }: any) => {
  const [showModel, setShowModel] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    link: "",
    newPassword: "",
    currentPassword: "",
    coverImg: "",
    profileImg: "",
  });

  const { updateProfile, isUpdatingProfile, isSuccess } =
    useUpdateUserProfile();

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullname: authUser.fullname,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio,
        link: authUser.link,
        newPassword: "",
        currentPassword: "",
        coverImg: authUser.coverImg,
        profileImg: authUser.profileImg,
      });
    }
  }, [authUser]);

  // Refresh the page when profile update is successful
  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
    }
  }, [isSuccess]);

  const handleInputChange = (e: any) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      <button
        className="btn btn-outline rounded-full btn-sm"
        onClick={() => setShowModel(true)}
      >
        Edit Profile
      </button>
      {showModel && (
        <div
          id="edit_profile_modal"
          className="fixed  inset-0 flex items-center justify-center z-[9999999999] bg-black bg-opacity-50"
        >
          <div className="modal-box  border flex gap-3 flex-col h-80 px-2 pb-3 rounded-md mx-4 border-gray-700 shadow-md bg-black max-w-lg w-full ">
            <div className="relative  w-full flex justify-between items-center ">
              <h3 className="font-bold text-lg my-3">Update Profile</h3>
              <IoCloseSharp
                className=" z-10  text-white bg-gray-800 rounded-full p-1 w-7 h-7 cursor-pointer"
                onClick={() => {
                  setShowModel(false);
                }}
              />
            </div>
            {/* Step Progress Bar */}
            <div className="flex justify-between items-center mb-2  transition-all">
              <span
                className={` relative transition-all flex-1 h-1 ${
                  step >= 1 ? "bg-blue-600" : "bg-gray-300 text-black"
                }`}
              >
                <span
                  className={` border-2 ${
                    step >= 1 ? "border-blue-600 " : "bg-gray-300"
                  }  -top-4 flex justify-center items-center  absolute w-9 h-9 rounded-full `}
                >
                  <span
                    className={`rounded-full ${
                      step >= 0 ? "bg-blue-600" : "bg-gray-300"
                    } -top-3 w-7 h-7 flex justify-center items-center `}
                  >
                    1
                  </span>
                </span>
              </span>
              <span
                className={`flex-1 relative transition-all h-1 ${
                  step >= 2 ? "bg-blue-600" : "bg-gray-300 text-black"
                }`}
              >
                <span
                  className={` border-2 ${
                    step >= 2 ? "border-blue-600 " : "bg-gray-300"
                  }  -top-4 flex justify-center items-center  absolute w-9 h-9 rounded-full `}
                >
                  <span
                    className={`  rounded-full ${
                      step >= 2 ? "bg-blue-600" : "bg-gray-300"
                    } -top-3 w-7 h-7 flex justify-center items-center `}
                  >
                    2
                  </span>
                </span>
              </span>
              <span
                className={`flex-1 relative transition-all h-1 ${
                  step >= 3 ? "bg-blue-600" : "bg-gray-300 text-black"
                }`}
              >
                <span
                  className={` border-2 ${
                    step >= 3 ? "border-blue-600 " : "bg-gray-300"
                  }  -top-4 flex justify-center items-center  absolute w-9 h-9 rounded-full `}
                >
                  <span
                    className={`  rounded-full ${
                      step >= 3 ? "bg-blue-600" : "bg-gray-300"
                    } -top-3 w-7 h-7 flex justify-center items-center `}
                  >
                    3
                  </span>
                </span>
              </span>

              <span
                className={`flex-1 relative transition-all h-1 ${
                  step >= 4 ? "bg-blue-600" : "bg-gray-300 text-black"
                }`}
              >
                <span
                  className={` border-2 ${
                    step >= 4 ? "border-blue-600 " : "bg-gray-300"
                  }  -top-4 flex justify-center items-center  absolute w-9 h-9 rounded-full `}
                >
                  <span
                    className={`  rounded-full ${
                      step >= 4 ? "bg-blue-600" : "bg-gray-300"
                    } -top-3 w-7 h-7 flex justify-center items-center `}
                  >
                    4
                  </span>
                </span>
              </span>
            </div>

            <form
              className="flex flex-col relative justify-between h-full gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                updateProfile(formData);
              }}
            >
              <div>
                {step === 1 && (
                  <div className="grid grid-cols-1  gap-2">
                    <label className="flex flex-col">
                      Full Name
                      <input
                        type="text"
                        className="text-black input border border-gray-700 rounded p-2 input-md"
                        value={formData.fullname}
                        name="fullname"
                        placeholder="Enter your Full Name"
                        onChange={handleInputChange}
                      />
                    </label>
                    <label className="flex flex-col">
                      Username
                      <input
                        type="text"
                        className="text-black input border border-gray-700 rounded p-2 input-md"
                        value={formData.username}
                        name="username"
                        placeholder="Enter your Username"
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                )}
                {step === 2 && (
                  <div className="grid grid-cols-1  gap-2">
                    <label className="flex flex-col">
                      Email
                      <input
                        type="email"
                        className="text-black input border border-gray-700 rounded p-2 input-md"
                        value={formData.email}
                        name="email"
                        placeholder="Enter your @example.com"
                        onChange={handleInputChange}
                      />
                    </label>
                    <label className="flex flex-col">
                      Bio
                      <textarea
                        className="text-black input border border-gray-700 rounded p-2 input-md"
                        value={formData.bio}
                        name="bio"
                        placeholder="Enter your Bioo"
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                )}
                {step === 3 && (
                  <div className="grid grid-cols-1  gap-2">
                    <label className="relative flex flex-col">
                      Current Password
                      <div className="relative w-full flex justify-center items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="text-black w-full input border border-gray-700 rounded p-2 input-md"
                          value={formData.currentPassword}
                          name="currentPassword"
                          placeholder="Enter your Current Password"
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute  right-2 focus:outline-none"
                        >
                          {showPassword ? (
                            <MdVisibilityOff size={22} color="black" />
                          ) : (
                            <MdVisibility size={22} color="black" />
                          )}
                        </button>
                      </div>
                    </label>
                    <label className="relative flex flex-col">
                      New Password
                      <div className="relative w-full flex justify-center items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="text-black w-full input border border-gray-700 rounded p-2 input-md"
                          value={formData.newPassword}
                          name="New Password"
                          placeholder="Enter your new Password"
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 focus:outline-none"
                        >
                          {showPassword ? (
                            <MdVisibilityOff size={22} color="black" />
                          ) : (
                            <MdVisibility size={22} color="black" />
                          )}
                        </button>
                      </div>
                    </label>
                  </div>
                )}
                {step === 4 && (
                  <label className="flex flex-col">
                    Link
                    <input
                      type="text"
                      className="text-black input border border-gray-700 rounded p-2 input-md"
                      value={formData.link}
                      name="link"
                      placeholder="Enter your link"
                      onChange={handleInputChange}
                    />
                  </label>
                )}
              </div>

              <div className="flex  justify-between gap-4">
                {step > 1 && (
                  <button
                    type="button"
                    className="btn flex w-full justify-center items-center bg-gray-600 py-2 rounded-full btn-sm text-white"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                )}
                {step < 4 && (
                  <button
                    type="button"
                    className="btn flex w-full justify-center items-center bg-blue-600 py-2 rounded-full btn-sm text-white"
                    onClick={nextStep}
                  >
                    Next
                  </button>
                )}
                {step === 4 && (
                  <button
                    type="submit"
                    className="btn flex w-full justify-center items-center bg-blue-600 py-2 rounded-full btn-sm text-white"
                  >
                    {isUpdatingProfile ? <LoadingSpinner /> : "Update"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileModal;
