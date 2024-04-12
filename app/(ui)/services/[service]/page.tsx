import React from "react";

const page = async ({ params }: any) => {
  console.log("🚀 ~ page ~ params:", params);
  const { service } = params;
  const response = await fetch(
    `${process.env.NEXT_DEPLOYED_URL}/api/services`,
    {
      method: "POST",
      body: JSON.stringify({ service: decodeURIComponent(service) }),
      cache: "no-store",
    }
  );
  console.log("🚀 ~ page ~ response:123", response);
  const data = await response.json();
  console.log("🚀 ~ page ~ data:456", data);

  return <div>{JSON.stringify(data)}</div>;
};

export default page;
