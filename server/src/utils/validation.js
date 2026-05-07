import validator from "validator";

export const validateSignUp = (req) => {
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    photoUrl,
    about,
    skills,
  } = req.body;
  if (!firstName) {
    throw new Error("Name is required ");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

// export const validateEditProfileData = (req) => {
//   const allowedEditField = 
// }