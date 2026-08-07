export const REGISTRATION_SUCCESS = {
  TITLE: "Thank You for Registering!",
  SUBTITLE: "Your account has been created successfully.",

  EMAIL_VERIFICATION: {
    TITLE: "Verify Your Email Address",
    DESCRIPTION:
      "We've sent a verification email to the address you used during registration.",

    STEPS: [
      "Check your inbox for the verification email.",
      "If you don't see it, check your Spam or Junk folder.",
      "Click the verification link to activate your account.",
      "The verification link will expire in 48 hours.",
    ],

    FOOTER:
      "Once your email has been verified, you'll be able to sign in and access your account.",
  },

  BUTTONS: {
    HOME: "Back to Home",
  },
} as const;
