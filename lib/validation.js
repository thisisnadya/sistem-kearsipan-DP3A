export const login_validation = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password =
      "Password must be 8 characters long and less than 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Password must not contain empty space";
  }
};
