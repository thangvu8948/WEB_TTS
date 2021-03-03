import { useEffect, useState } from "react";
import { EvalAudio } from "./evalaudio";
export const Mos = () => {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [rdiogr1, setRdiogr1] = useState(0);
  const [rdiogr2, setRdiogr2] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [current, setCurrent] = useState(0);
  let obj = {
    sentence: "abv",
    link1:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav",
    link2:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav",
  };
  let obj2 = {
    sentence: "123",
    link1:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav",
    link2:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav",
  };
  let data1 = [];
  data1.push(obj);
  data1.push(obj2);
  useEffect(() => {
    setData(data1);
  }, []);
  const onScore1 = (e) => {
    setRdiogr1(parseInt(e.target.value));
  };
  const onScore2 = (e) => {
    setRdiogr2(parseInt(e.target.value));
  };

  const handleNextClick = () => {
    if (current <= data.length - 1) {
      if (rdiogr1 != 0 && rdiogr2 != 0) {
        setScore1(score1 + rdiogr1);
        setScore2(score2 + rdiogr2);
        setCurrent(current + 1);
      } else {
        alert("please check");
      }
    }
  };
  function validateEmail(e) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const handleSubmitClick = async () => {
    if (!validateEmail(email)) {
      alert("valid Email");
    } else {
      if (rdiogr1 != 0 && rdiogr2 != 0) {
        console.log(score1 + rdiogr1);
        console.log(score2 + rdiogr2);
        ///post data
        const response = await fetch(
          // `http://localhost:3889/task`,
          `https://tts-api-hcmus.herokuapp.com/task`,
          {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
              email: email,
              score1: ((score1 + rdiogr1) / data.length).toFixed(2),
              score2: ((score2 + rdiogr2) / data.length).toFixed(2),
            }), // body data type must match "Content-Type" header
          }
        );
        window.location.href = "/tks";
      }
    }
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const hStyle = { color: "red" };
  return data == null ? (
    <p>Loading</p>
  ) : (
    <>
      <div className="container">
        <div className="input-group mb-3 col-6">
          <div className="input-group-prepend">
            <span className="input-group-text">Email</span>
          </div>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={handleChangeEmail}
          />
        </div>
        <p>Sentence:</p>
        <h4 style={hStyle}>{data[current].sentence}</h4>

        <div className="row">
          <div className="col-6">
            <EvalAudio
              onScore={onScore1}
              modelName="Mô hình 1"
              link={data[current].link1}
              //   link={
              //     "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav"
              //   }
            ></EvalAudio>
          </div>
          <div className="col-6">
            <EvalAudio
              onScore={onScore2}
              modelName="Mô hình 2"
              link={data[current].link2}
              //   link={
              //     "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav"
              //   }
            ></EvalAudio>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-9"></div>
          <div className="col-3">
            {current == data.length - 1 ? (
              <button
                className="btn btn-primary pull-right float-end"
                onClick={handleSubmitClick}
              >
                Submit
              </button>
            ) : (
              <button
                className="btn btn-primary pull-right float-end"
                onClick={handleNextClick}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
