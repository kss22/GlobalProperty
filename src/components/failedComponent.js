import { Button } from "@mui/material";

const Failed = () => {
    return(
        <>
        <div>
            <h1>Failed...</h1>
            <Button onClick={()=>window.location.href='/listGlobalProperties'}>Sign-in</Button>
        </div>
        </>
    );
}

export default Failed;