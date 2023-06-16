import { useEffect, useState } from "react";
import * as authentication from "./authentication";
import Failed from "../components/failedComponent";
import { Button } from "@mui/material";

const Authorization = () => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`${authentication.SERVER_URL}/v1/config/global-props/1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        branchId: "1",
        instId: "1",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          setFailed(true);
        }
        return response.json();
      });
  }, []);

  return (
    <>
      {failed ? (
        <Failed />
      ) : (
        <div>
            <Button onClick={()=>(window.location.href = "/listGlobalProperties")}>Continue</Button>
        </div>
        
      )}
    </>
  );
};

export default Authorization;
