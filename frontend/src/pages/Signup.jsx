import AuthForm from "../components/AuthForm";

export default function SignUp({ register }) {
  return <AuthForm title="Register" onSubmit={register} />;
}
