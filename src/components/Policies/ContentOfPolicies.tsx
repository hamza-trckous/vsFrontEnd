"use client";
import React from "react";
import { useState, useEffect } from "react";

import { getPolicies } from "@/api/Policy";
import { Policy } from "@/Types/Policy";
const ContentOfPolicies = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      const data = await getPolicies();
      setPolicies(data);
    };

    fetchPolicies();
  }, []);
  return (
    <div>
      {policies.map((policy) => (
        <div className="m-5" key={policy._id}>
          <h1 className=" text-2xl text-black/75">{policy.title}</h1>
          <p>{policy.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ContentOfPolicies;
