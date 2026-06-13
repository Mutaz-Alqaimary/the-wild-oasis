import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";

import SignupForm from "../features/authentication/SignupForm";
import { useUser } from "../features/authentication/useUser";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";

const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 48em);
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  padding: 4rem 2.4rem;
  background-color: var(--color-grey-50);

  @media (max-width: 37.5em) {
    align-content: start;
    gap: 2.4rem;
    padding: 6.4rem 1.6rem 3.2rem;
  }
`;

const AuthSwitch = styled.p`
  text-align: center;
  color: var(--color-grey-600);

  & a {
    color: var(--color-brand-600);
    font-weight: 500;
  }

  & a:hover {
    color: var(--color-brand-700);
  }
`;

function Signup() {
  const { isLoading, isAuthenticated } = useUser();

  if (isLoading) return <Spinner />;
  if (isAuthenticated) return <Navigate replace to="/dashboard" />;

  return (
    <SignupLayout>
      <Logo />
      <Heading as="h4">Create your account</Heading>
      <SignupForm />
      <AuthSwitch>
        Already have an account? <Link to="/login">Log in</Link>
      </AuthSwitch>
    </SignupLayout>
  );
}

export default Signup;
