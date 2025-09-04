import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import ChangePasswordScreen from "./ChangePasswordScreen";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import AnalyticsTracker from "../components/AnalyticsTracker";
import logger from "../utils/logger";

const ProfileScreen = () => {
  const { user, logout, token, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const { first_name, last_name, gender, phone, college } = user;
  const [profileData, setProfileData] = useState({
    first_name,
    last_name,
    gender,
    phone,
    college,
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [changePasswordData, setChangePasswordData] = useState({
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState({
    fnameError: "",
    lnameError: "",
    genderError: "",
    phoneError: "",
    collegeError: "",
  });
  const [resetError, setResetError] = useState({
    passwordError: "",
    repasswordError: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const validateFname = () => {
    if (profileData.first_name.length < 3) {
      return "First Name must have 3 or more characters";
    } else if (profileData.first_name.trim().search(/^[a-zA-Z]{3,}$/)) {
      return "First Name must have alphabets only";
    } else {
      return "";
    }
  };
  // check last name if given
  const validateLname = () => {
    if (profileData.last_name.length) {
      let last_name = profileData.last_name.trim();
      if (
        last_name.search(/^[a-z\sA-Z]{2,}$/) !== 0 ||
        last_name.search(/\s{2,}/) !== -1
      ) {
        return "Remove extra spaces or number from Last Name";
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  // check gender
  const validateGender = () => {
    if (!profileData.gender) return "Please select gender";
    else return "";
  };

  // check phone
  const validatePhone = () => {
    if (!profileData.phone.length) return "Please enter phone number";
    else if (profileData.phone.search(/^\d{10}$/) === -1)
      return "Please enter a valid phone number";
    else return "";
  };

  // check college
  const validateCollege = () => {
    if (profileData.college.trim().length < 3) {
      return "Please enter college name properly";
    } else {
      return "";
    }
  };
  // check password
  const validatePassword = () => {
    if (!changePasswordData.password.length) {
      return "Please enter password";
    } else if (changePasswordData.password.length < 8) {
      return "Password must be 8 character long";
    } else if (!passwordValidator(changePasswordData.password)) {
      return "Password must contain alphanumeric (a-z, A-Z, 0-9) and @, !, $, %, ^, &, *, (, ), +, -, ?, /";
    } else {
      return "";
    }
  };

  // check confirm password
  const validateRepassword = () => {
    if (!changePasswordData.confirm_password.length) {
      return "Please enter confirm password";
    } else if (
      changePasswordData.confirm_password !== changePasswordData.password
    ) {
      return "Confirm Password should be same as password";
    } else if (
      changePasswordData.confirm_password === changePasswordData.password
    ) {
      return validatePassword();
    } else {
      return "";
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (isUpdatingProfile) return;
    const checks = {};
    checks.fnameError = validateFname();
    checks.lnameError = validateLname();
    checks.genderError = validateGender();
    checks.phoneError = validatePhone();
    checks.collegeError = validateCollege();

    setError(checks);
    let errorCount = 0;
    for (const err in checks) {
      errorCount += checks[err].length ? 1 : 0;
    }
    if (!errorCount) {
      logger(profileData);
      setIsUpdatingProfile(true);
      handleProfileUpdate();
    } else {
      toast.warning("Please correct the details");
    }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (isUpdatingPassword) return;
    const checks = {};
    checks.passwordError = validatePassword();
    checks.repasswordError = validateRepassword();

    setError(checks);
    let errorCount = 0;
    for (const err in checks) {
      errorCount += checks[err].length ? 1 : 0;
    }
    if (!errorCount) {
      logger(changePasswordData);
      setIsUpdatingPassword(true);
      handleSignUp();
    } else {
      toast.warning("Please correct the details");
    }
  };

  async function getProfileData() {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND;
      const response = await axios.get(`${apiUrl}/users/profile/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        updateUser(response.data?.data || user);
        sendAnalytics("profile_updated", {});
      }
    } catch (error) {
      logger("Error while retreiving profile: ", error);
    } finally {
      // setIsUpdatingProfile(false);
    }
  }
  async function handleProfileUpdate() {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND;
      const response = await axios.post(
        `${apiUrl}/users/profile/`,
        profileData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 202) {
        logger(response.data);
        updateUser(response.data?.data);
        setIsEditable(false);
        toast.success("Profile updated successfully.");
      }
    } catch (error) {
      logger("Error while updating profile: ", error);
      if (error.response.status === 409)
        toast.error(error.response.data?.message);
      else if (error.response.status === 400)
        toast.error("Please check the details you entered.");
      else toast.error("Something went wrong. Try again!");
    } finally {
      setIsUpdatingProfile(false);
    }
  }
  const getGenderNAme = (val) => {
    const map = {
      m: "Male",
      f: "Female",
      x: "Other",
    };
    if (val.length) return map[val];
    else return "- Select -";
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="bg-gray-50">
      <AnalyticsTracker screenName="ProfileScreen"/>
      {!showChangePassword ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
              <p className="text-gray-600">Manage your account settings</p>
            </div>

            <div className="sathi-card mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Personal Information
              </h2>

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      readOnly={!isEditable || isUpdatingProfile}
                      value={profileData.first_name}
                      onChange={handleChange}
                      className="sathi-input"
                      required={true}
                      style={{
                        borderColor: !error.fnameError.length ? "#555" : "red",
                      }}
                    />
                    <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
                      {error?.fnameError}
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      readOnly={!isEditable || isUpdatingProfile}
                      value={profileData.last_name}
                      onChange={handleChange}
                      className="sathi-input"
                      style={{
                        borderColor: !error.lnameError.length ? "#555" : "red",
                      }}
                    />
                    <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
                      {error?.lnameError}
                    </span>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      readOnly={true}
                      value={user?.email}
                      className="sathi-input bg-gray-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      readOnly={!isEditable || isUpdatingProfile}
                      value={profileData.phone}
                      onChange={handleChange}
                      className="sathi-input"
                      pattern="[0-9]{10}"
                      required={true}
                      style={{
                        borderColor: !error.phoneError.length ? "#555" : "red",
                      }}
                    />
                    <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
                      {error?.phoneError}
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    {!isEditable || isUpdatingProfile ? (
                      <input
                        id="gender"
                        name="gender"
                        readOnly={true}
                        style={{
                          borderColor: error?.genderError ? "red" : "#555",
                        }}
                        value={getGenderNAme(profileData.gender)}
                        onChange={handleChange}
                        className="sathi-input mt-1"
                      />
                    ) : (
                      <select
                        id="gender"
                        name="gender"
                        required={true}
                        readOnly={!isEditable || isUpdatingProfile}
                        style={{
                          borderColor: error?.genderError ? "red" : "#555",
                        }}
                        value={profileData.gender}
                        onChange={handleChange}
                        className="sathi-input mt-1"
                      >
                        <option value="">- Select -</option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                        <option value="x">Other</option>
                      </select>
                    )}
                    <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
                      {error?.genderError}
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="college"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      College/University
                    </label>
                    <input
                      id="college"
                      name="college"
                      type="text"
                      readOnly={!isEditable || isUpdatingProfile}
                      value={profileData.college}
                      onChange={handleChange}
                      className="sathi-input"
                      required={true}
                      style={{
                        borderColor: !error.collegeError.length
                          ? "#555"
                          : "red",
                      }}
                    />
                    <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
                      {error?.collegeError}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  {isEditable ? (
                    <div className="flex justify-end space-x-4">
                      <button type="submit" className="sathi-btn-primary">
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setProfileData(user);
                          setIsEditable(false);
                        }}
                        className="sathi-btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditable(true)}
                      className="sathi-btn-primary"
                    >
                      Update
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="sathi-card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Account Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="sathi-btn-secondary"
                  >
                    Change Password
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md text-red-600 border border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ChangePasswordScreen close={() => setShowChangePassword(false)} />
      )}
    </main>
  );
};

export default ProfileScreen;
