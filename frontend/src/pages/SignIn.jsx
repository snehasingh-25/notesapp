import AuthForm from "../components/AuthForm";

export default function SignIn({ login }) {
  return <AuthForm title="Login" onSubmit={login} />;
}
