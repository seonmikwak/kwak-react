import { useState } from "react";

function Exam04(){

    const [content, setContent] = useState(0);

    return(
        <>
            <div className="row">
                <div className="col-8 offset-2">
                    <h1>네 번째 예제</h1>
                    <h2 className="card text-white bg-info">(Q)주말에 뭐하세요?</h2>
                    <textarea className="form-label bg-light w-100" rows="6" maxLength="1000"onChange={(e)=>setContent(e.target.value)}></textarea>
                    <div className="text-end">
                    {content.length}/1000
                    </div>
                </div>
            </div>
        </>
    );
}

export default Exam04;