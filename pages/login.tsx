import * as React from "react";

import LoginTop from "../src/components/LoginTop";
import LoginWrapper from "../src/components/LoginWrapper";
import LoginForm from "../src/components/LoginForm";

export default function SignIn() {
  return (
    <LoginWrapper>
      <LoginTop />
      <LoginForm />
    </LoginWrapper>
  );
}
