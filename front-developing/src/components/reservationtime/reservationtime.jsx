import React, { useEffect, useState} from "react";
import styles from "./reservationtime.module.css";
import classNames from "classnames/bind";
import axios from "axios";
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ReservationTime(props) {
    const [rst] = useState(props.rst);
    const [ret] = useState(props.ret);
    const [selectedTime, setSelectedTime] = useState("");
    const [rsvTimeArr, setRsvTimeArr] = useState("");

    const user = useSelector(state => state.user.user);
    const isLogin = useSelector(state => state.user.isLogin);

    const YMD = props.selectedYear + "-" + ("0" + props.selectedMonth).slice(-2) + "-" + ("0" + props.selectedDate).slice(-2);
    //let rsvTimeArr = getRsvTimeArr(`schedules/counselors/date/${props.counselorId}/${YMD}`);

    useEffect(() => {
        console.log("useEffect()");
        async function fetchData() {
            try{
                const result = await axios.get(process.env.REACT_APP_DB_HOST+`schedules/counselors/date/${props.counselorId}/${YMD}`);
                setRsvTimeArr(result.data);
            }
            catch(error){
                alert(error);
            }
        };
        fetchData();
    },[]);

    console.log(rsvTimeArr);

    let allRsvTimeArr = [];
    for (let i = 0; i < rsvTimeArr.length; i++) {
        allRsvTimeArr.push(rsvTimeArr[i].starttime.slice(0,-3)); // 00:00:00에서 뒤에 세자리(초에 해당) 자르기
        let rsvTimeSpl = rsvTimeArr[i].starttime.split(":");
        let rsvTimeH = Number(rsvTimeSpl[0]);
        let rsvTimeM = Number(rsvTimeSpl[1]);
        if (rsvTimeM === 0) {
            allRsvTimeArr.push(rsvTimeH + ":30");
        }
        else {
            allRsvTimeArr.push((rsvTimeH + 1) + ":00");
        }
    }
    console.log(allRsvTimeArr);

    const handleChange = (event) => {
        setSelectedTime(event.currentTarget.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(selectedTime);
        if (selectedTime == null || selectedTime === "") {
            alert("예약 시간을 선택해주세요!");
            return;
        }

        if (isLogin && user.isUser) {
            console.log(user.id);
            axios.post(process.env.REACT_APP_DB_HOST + "schedules", {
                counselorId: props.counselorId,
                startTime: YMD + " " + selectedTime,
                userId: user.id
            })
                .then(function (result) {
                    console.log(result.data);
                    alert("예약되었습니다!");
                }).catch(function (err) {
                    // 에러메세지 수정
                    alert(err);
                });
        }
        else {
            alert("유저 로그인해주세요!");
        }
    };

    const checkRsvTime = (time) => {
        return allRsvTimeArr.includes(time);
    };

    const checkTimeState = () => {
        if (props.selectedYear < props.today.year) {
            return -1; // 과거
        }
        else if (props.selectedYear === props.today.year) {
            if (props.selectedMonth < props.today.month) {
                return -1; // 과거
            }
            else if (props.selectedMonth === props.today.month) {
                if (props.selectedDate < props.today.date) {
                    return -1; // 과거
                }
                else if (props.selectedDate === props.today.date) {
                    return 0; // 오늘
                }
            }
        }
        return 1; // 미래
    };

    const returnTime = () => {
        console.log("returnTime");
        // 예약 시간 설정시 30분 단위로만 설정 가능
        // reserveStartTime, reserveEndTime도 HH:00:00, HH:30:00만 가능하게 해야함
        const rstArr = rst.split(":");
        const rstH = Number(rstArr[0]);
        const rstM = Number(rstArr[1]);

        const retArr = ret.split(":");
        const retH = Number(retArr[0]);
        const retM = Number(retArr[1]);

        let timeArr = [];
        let key = 0;
        let curTime = new Date().getHours();
        let curMinute = new Date().getMinutes();
        let timeState = checkTimeState();
        for (let i = rstH; i <= retH; i++) {
            let checkZero = timeState === -1 || (timeState === 0 && i <= curTime) || checkRsvTime(i + ":00");
            let checkThirty = timeState === -1 || (timeState === 0 && (i < curTime || (i === curTime && curMinute >= 30))) || checkRsvTime(i + ":30");
            if (i === rstH && rstM === 30) {
                timeArr.push(
                    <label key={key++}
                        className={cx(
                            { time_label: true },
                            { reserved: checkThirty }
                        )}>
                        <input type="radio" name="time" value={`${i}:30`} onChange={handleChange}
                            {...(checkThirty ? { disabled: true, checked: false } : {})} />
                        <span>{i}:30</span>
                    </label>
                );
            }
            else if (i === retH && retM === 0) {
                timeArr.push(
                    <label key={key++}
                        className={cx(
                            { time_label: true },
                            { reserved: checkZero }
                        )}>
                        <input type="radio" name="time" value={`${i}:00`} onChange={handleChange}
                            {...(checkZero ? { disabled: true, checked: false } : {})} />
                        <span>{i}:00</span>
                    </label>
                );
            }
            else {
                timeArr.push(
                    <label key={key++}
                        className={cx(
                            { time_label: true },
                            { reserved: checkZero }
                        )}>
                        <input type="radio" name="time" value={`${i}:00`} onChange={handleChange}
                            {...(checkZero ? { disabled: true, checked: false } : {})} />
                        <span>{i}:00</span>
                    </label>
                );
                timeArr.push(
                    <label key={key++}
                        className={cx(
                            { time_label: true },
                            { reserved: checkThirty }
                        )}>
                        <input type="radio" name="time" value={`${i}:30`} onChange={handleChange}
                            {...(checkThirty ? { disabled: true, checked: false } : {})} />
                        <span>{i}:30</span>
                    </label>
                );
            }
        }
        return timeArr;
    };

    return (
        <div className="col-6 text-center">
            <div className={styles.time_header}>
                <h5>{props.selectedMonth + "." + props.selectedDate} 예약 시간</h5>
            </div>
            <form>
                <div className={styles.timeline}>{returnTime()}</div>
                <div><input type="submit" className={styles.rsvBtn} value="예약하기" onClick={(event) => { onSubmit(event); } } /></div>
            </form>
        </div>
    );
}

export default ReservationTime;