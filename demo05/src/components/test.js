axios.request({
  url:"https://petstore.swagger.io/pet/findPetsByStatus/available",
  method:"get"
  })
  .then(response=>{
    if(response.data.length === 0) {
    console.log("검색 결과가 존재하지 않습니다");
    }
    else {
      for(let i=0; i < response.data.length; i++) {
      console.log("<Pet information>");
      console.log("ID = " + response.data[i].id);
      console.log("Name = " + response.data[i].name);
      console.log("Photo count = " + response.data[i].photoUrls.length);
      console.log("Tag count = " + response.data[i].tags.length);
      console.log("Status = " + response.data[i].status);
      }
    }
  })
  
  .catch(err=>{
    console.log("서버와의 통신이 원활하지 않습니다");
  });