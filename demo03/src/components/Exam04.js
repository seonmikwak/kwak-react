import { useState } from "react";

function Exam04(){

    const [length, setLength] = useState(0);

    return(
        <>
            <h1>(Q)주말에 뭐하세요?</h1>
            <textarea className="w-100" rows="6" maxLength="1000"onChange={(e)=>setLength(e.target.textLength)}></textarea>
            <div className="text-end">
                <sapn>{length}</sapn>/1000 btyes
            </div>
            
            
            
        </>
    );
}

export default Exam04;