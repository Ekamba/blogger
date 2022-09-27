export default function validate(formData) {
  let errors = {};

  if (!formData.username) {
    errors.username = 'Username is required!';
  }
  if (!formData.emailAddress) {
    errors.emailAddress = 'Email address is required!';
  } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
    errors.emailAddress = 'Email address is invalid!.';
  }
  if (!formData.password) {
    errors.password = 'Password is required!.';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be 8 or more characters!.';
  }
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required!.';
  } else if (formData.confirmPassword.length < 8) {
    errors.confirmPassword = 'Conform Password must be 8 or more characters!.';
  }
  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = 'Confirm Password do not match password!.';
  }
  return errors;
}
