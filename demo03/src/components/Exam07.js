import { useState } from "react";

const Exam07 = () =>{

    //객체로 상태 변수를 정의
    const[member, setMember] = useState({
        memberId : "",
        memberPw : "",
        memberPwRe : ""
    });

    //객체의 상태를 한 번에 변경하는 함수를 구현
    const changeMember = (e)=>{
        setMember({
            ...member,
            [e.target.name] : e.target.value
        });
    };

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-6 offset-3">

                    <div className="row">
                        <div className="col">
                            <h2>회원가입</h2>
                        </div>
                    </div>

                    <form autoComplete="off">

                    <div className="row mt-2">
                        <div className="col">
                            <label className="form-label">아이디</label>
                            <input type="text" name="memberId" value={member.memberId} 
                                onInput={changeMember} className="form-control"/>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col">
                        <label className="form-label">비밀번호</label>
                            <input type="password" name="memberPw" value={member.memberPw} 
                                onInput={changeMember} className="form-control"/>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col">
                            <label className="form-label">비밀번호 확인</label>
                            <input type="password" name="memberPwRe" value={member.memberPwRe} 
                                    onInput={changeMember} className="form-control"/>
                        </div>
                    </div>

                    </form>

                    <div className="row my-4">
                        <div className="col text-end">
                            <button type="submit" className="btn btn-primary">가입하기</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Exam07;