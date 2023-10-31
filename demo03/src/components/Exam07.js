import { useEffect, useState } from "react";

const Exam07 = () =>{

    //객체로 상태 변수를 정의
    const[member, setMember] = useState({//입력데이터
        memberId : "",
        memberPw : "",
        memberPwRe : ""
    });

    const[result, setResult] = useState({//검사결과
        memberId:false,
        memberPw:false,
        memberPwRe:false
    });
    //입력데이터가 변하면 검사결과가 자동으로 계산되도록 처리
    useEffect(()=>{
        //console.log("member가 변했습니다.");
        //ID검사
        const idRegex = /^[a-z][a-z0-9]{7,19}$/;
        const idMatch = idRegex.test(member.memberId);

        //PW검사
        const pwRegex = /^[A-Za-z0-9!@#$]{8,16}$/;
        const pwMatch = pwRegex.test(member.memberPw);

        //PW-RE검사
        // const pwReMatch = 비밀번호 1글자 이상 && 비밀번호 == 비밀번호 확인값;
        const pwReMatch = member.memberPw.length > 0 && member.memberPw === member.memberPwRe;

        setResult({
            memberId : idMatch,
            memberPw : pwMatch,
            memberPwRe : pwReMatch
        });
    },[member]);

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
                                onChange={changeMember} 
                                className={`
                                    form-control 
                                    ${result.memberId ? 'is-valid' : 'is-invalid'}
                                    `}
                            />
                            <div className="valid-feedback">멋진 아이디입니다.</div>
                            <div className="invalid-feedback">사용할 수 없는 아이디입니다.</div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col">
                        <label className="form-label">비밀번호</label>
                            <input type="password" name="memberPw" value={member.memberPw} 
                                onChange={changeMember} 
                                className={`
                                    form-control
                                    ${result.memberPw ? 'is-valid' : 'is-invalid'}
                                `}/>
                            <div className="valid-feedback">올바른 형식의 비밀번호입니다.</div>
                            <div className="invalid-feedback">비밀번호 형식이 올바르지 않습니다.</div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col">
                            <label className="form-label">비밀번호 확인</label>
                            <input type="password" name="memberPwRe" value={member.memberPwRe} 
                                    onChange={changeMember} 
                                    className={`
                                        form-control
                                        ${result.memberPwRe ? 'is-valid' : 'is-invalid'}
                                    `}/>
                            <div className="valid-feedback">비밀번호가 일치합니다.</div>
                            <div className="invalid-feedback">비밀번호가 일치하지 않습니다.</div>
                        </div>
                    </div>

                    </form>

                    <div className="row my-4">
                        <div className="col text-end">
                            <button type="submit" className="btn btn-primary"
                                disabled={!(result.memberId && result.memberPw 
                                            && result.memberPwRe)}>가입하기</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Exam07;