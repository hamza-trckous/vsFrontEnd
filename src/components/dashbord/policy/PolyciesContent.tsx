"use client";
import { getPolicies } from "@/api/Policy";
import { Policy } from "@/Types/Policy";
import React, { useEffect, useState } from "react";
import Title from "@/components/dashbord/multualCompenents/Title";
import Container from "@/components/dashbord/policy/Container";
import CreatPolicy from "@/components/dashbord/policy/CreatPolicy/CreatPolicy";
import ShowingPolicys from "@/components/dashbord/policy/ShowingPolicys";
import { useAlert } from "@/context/useAlert";
import AlertModal from "@/components/AlertModal";
const PolyciesContent = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const { alertType, alertMessage, setAlertType, setAlertMessage } = useAlert();
  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    const data = await getPolicies();
    setPolicies(data);
  };

  return (
    <Container>
      <Title title={"السياسات"} />
      <CreatPolicy
        fetchPolicies={fetchPolicies}
        setAlertType={setAlertType}
        setAlertMessage={setAlertMessage}
      />
      <ShowingPolicys
        policies={policies}
        fetchPolicies={fetchPolicies}
        setAlertType={setAlertType}
        setAlertMessage={setAlertMessage}
      />
      {alertMessage && (
        <AlertModal
          onClose={() => setAlertMessage(null)}
          message={alertMessage}
          type={alertType}
        />
      )}
    </Container>
  );
};

export default PolyciesContent;
