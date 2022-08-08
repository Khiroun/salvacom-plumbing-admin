
import LoginTop from "../src/components/LoginTop";
import LoginWrapper from "../src/components/LoginWrapper";
import LoginForm from "../src/components/LoginForm";
import Head from "next/head";

export default function SignIn() {
  return (
    <LoginWrapper>
      <Head>
        <title>Connexion Siana dz</title>
      </Head>
      <LoginTop />
      <LoginForm />
    </LoginWrapper>
  );
}
