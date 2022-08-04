import React, {useState} from 'react';
import {useParams} from 'react-router-dom'
import Conferences from '../components/schedule/Conferences'
import './MyPage.css'
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import UserProfile from '../components/profile/UserProfile';
function UserMyPage (){
    //본인인경우 아니면 오류페이지로
    let conference = [{
      "id": 1,
      "counselor": {
        "id": 1,
        "counselorId": "parkcs",
        "name": "박상담",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
        "contactStartTime": "10:00:00",
        "contactEndTime": "09:00:00",
        "career": 0,
        "longIntroduction": null,
        "reserveStartTime": null,
        "reserveEndTime": null,
        "consultTarget": null,
        "price": 0,
        "consultNumber": 0,
        "holiday": null,
        "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
        "hibernateLazyInitializer": {}
      },
      "user": {
        "id": 1,
        "userId": "kimssafy",
        "name": "김싸피",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
      },
      "startTime": "2022-07-27T08:30:00.000+00:00",
      "endTime": "2022-07-27T09:30:00.000+00:00",
      "holiday": false,
      "complete": true
    },
    {
      "id": 2,
      "counselor": {
        "id": 1,
        "counselorId": "parkcs",
        "name": "박상담",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
        "contactStartTime": "10:00:00",
        "contactEndTime": "09:00:00",
        "career": 0,
        "longIntroduction": null,
        "reserveStartTime": null,
        "reserveEndTime": null,
        "consultTarget": null,
        "price": 0,
        "consultNumber": 0,
        "holiday": null,
        "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
        "hibernateLazyInitializer": {}
      },
      "user": {
        "id": 1,
        "userId": "kimssafy",
        "name": "김싸피",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
      },
      "startTime": "2022-07-27T08:30:00.000+00:00",
      "endTime": "2022-07-27T09:30:00.000+00:00",
      "holiday": false,
      "complete": false
    },
    {
      "id": 3,
      "counselor": {
        "id": 1,
        "counselorId": "parkcs",
        "name": "박상담",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
        "contactStartTime": "10:00:00",
        "contactEndTime": "09:00:00",
        "career": 0,
        "longIntroduction": null,
        "reserveStartTime": null,
        "reserveEndTime": null,
        "consultTarget": null,
        "price": 0,
        "consultNumber": 0,
        "holiday": null,
        "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
        "hibernateLazyInitializer": {}
      },
      "user": {
        "id": 1,
        "userId": "kimssafy",
        "name": "김싸피",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
      },
      "startTime": "2022-07-27T09:30:00.000+00:00",
      "endTime": "2022-07-27T10:30:00.000+00:00",
      "holiday": false,
      "complete": false
    },
    {
      "id": 4,
      "counselor": {
        "id": 1,
        "counselorId": "parkcs",
        "name": "박상담",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
        "contactStartTime": "10:00:00",
        "contactEndTime": "09:00:00",
        "career": 0,
        "longIntroduction": null,
        "reserveStartTime": null,
        "reserveEndTime": null,
        "consultTarget": null,
        "price": 0,
        "consultNumber": 0,
        "holiday": null,
        "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
        "hibernateLazyInitializer": {}
      },
      "user": {
        "id": 1,
        "userId": "kimssafy",
        "name": "김싸피",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
      },
      "startTime": "2022-07-27T11:30:00.000+00:00",
      "endTime": "2022-07-27T12:30:00.000+00:00",
      "holiday": false,
      "complete": false
    }]
    const URL = `http://localhost:8080/api/v1/schedules/users/${useParams().id}`
    axios.get(URL)
    .then(function (response) {
            console.log(response)
            conference = response
    });
    const [see,setSee] = useState("모두") 
    const [onoff,setOnoff] = useState("오래된")
    const [list,setList] = useState(conference)
    let conferenceList = list.map((x)=>(<Conferences show={see} className="conference" complete={x.complete} name={x.counselor.name} date={x.startTime}/>))
    function clickButton(){
      console.log("버튼")
      setList(list.reverse())
      if (onoff === "최신순"){setOnoff(onoff=>"오래된")}
      else {setOnoff(onoff=>"최신순")}
      
      conferenceList = list.map((x)=>(<Conferences show={see} complete={x.complete} name={x.counselor.name} date={x.startTime}/>))
    }
    function changeSee(e){
        console.log(e.target.value)
        setSee(see=>e.target.value)
        conferenceList = list.map((x)=>(<Conferences show={see} complete={x.complete} name={x.counselor.name} date={x.startTime}/>))
    }
      
      

    return (
      <div>
        <h1>마이페이지</h1>
        <h2>{useParams().id}의 페이지</h2>
        <div><UserProfile id={useParams().id}/></div>
        <label>
            <select onChange={changeSee}>
                <option value="모두">모두</option>
                <option value="완료">완료</option>
                <option value="예정">예정</option>
            </select>
        </label>
        <div>
            <button className="button" onClick={clickButton}>{onoff}</button>
            <div>{conferenceList}</div>
        </div>
        <div>
            <Stack spacing={2}>
                <Pagination count={parseInt(list.length/2)} color="primary" />
            </Stack>
        </div>
      </div>
    )
    }
  export default UserMyPage