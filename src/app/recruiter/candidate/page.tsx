"use client";
import CandidatesAll from "@/components/CandidateComponent";
import CheckRoleRecruiter from "@/util/CheckRoleRecruiter";
import React from "react";

type Props = {};

const page = (props: Props) => {
  CheckRoleRecruiter();

  return (
    <>
      <CandidatesAll />
    </>
  );
};

export default page;
