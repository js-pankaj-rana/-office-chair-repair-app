import EmailVerification from "@/components/user/EmailVerification";

export const metadata = {
  title: "Verify your email address",
};

interface Props {
  params: { token: string };
}

const EmailVerificationdPage = async ({ params }: Props) => {
  const { token } = await params;

  return (
    <div>
      <EmailVerification token={token} />
    </div>
  );
};

export default EmailVerificationdPage;
