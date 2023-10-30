import { useState } from "react";

//function Exam03(){};
//const Exam03 = function(){};
//두가지 같은 방식

function Exam03(){

    const[money, setMoney] = useState(0);

    return(
        <>
            <div className="col-6">
                <h1 className="text-white bg-warning text-center">세 번째 예제</h1>
            <div className="row">
                <div className="col-4 text-center">
                    출금 금액 : 
                </div>
                <div className="col-6">
                    <h2 className="form-control">{money}</h2>
                </div>
                <div className="col-2">
                    원 
                </div>
                </div>
            </div>
            <button onClick = {()=>setMoney(money+100000)} className="btn btn-warning ms-2">10만원</button>
            <button onClick = {()=>setMoney(money+50000)} className="btn btn-warning ms-2">5만원</button>
            <button onClick = {()=>setMoney(money+10000)} className="btn btn-warning ms-2">1만원</button>
            <button onClick = {()=>setMoney(0)} className="btn btn-secondary ms-2">초기화</button>
            <br/>
            <input type="range" min="0" max="10000000" step="10000" value={money} onChange={e=>setMoney(parseInt(e.target.value))}/>
        </>
    );
    
}

export default Exam03;