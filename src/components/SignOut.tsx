"use client";

import { signOut } from "next-auth/react";
import React from "react";

export const SignOut = () => {
  return (
    <>
      <button onClick={() => signOut()}>sair</button>
    </>
  );
};
