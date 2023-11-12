import axios from "axios";
import { useEffect, useState } from "react";

const Profile = (props) =>{
  // const [profile, setProfile] = useState([]);

  // //서버에서 profile을 불러와서 state에 설정하는 코드
  // const loadProfile = () =>{
  //   axios({
  //     url:`${process.env.REACT_APP_REST_API_URL}/profile/`,
  //     method:"get"
  //   })
  //   .then(response=>{//성공
  //     setProfile(response.data);
  //   })
  //   .catch(err=>{});//실패
  // };

  // useEffect(()=>{
  //   loadProfile();
  // },[]);

  return(
    <>
      <button className="btn btn-primary">일단 프로필 모달 나올 버튼</button>

      {/* Modal */}
      <div className="modal fade" ref={bsModal} 
                data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" >제목</h5>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
          
            </div>
            <div className="modal-footer">
                <button className="btn btn-secondary">닫기</button>
            </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Profile;