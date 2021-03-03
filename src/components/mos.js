import { useEffect, useState } from "react";
import { EvalAudio } from "./evalaudio";
export const Mos = () => {
  const [data, setData] = useState(null);
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
  const handleSubmitClick = () => {
    if (rdiogr1 != 0 && rdiogr2 != 0) {
      console.log(score1 + rdiogr1);
      console.log(score2 + rdiogr2);
      ////////////////////////////////
      window.location.href = "/tks";
    }
  };
  const hStyle = { color: "red" };
  return data == null ? (
    <p>Loading</p>
  ) : (
    <>
      <div className="container">
        <p>Sentence:</p>
        <h3 style={hStyle}>{data[current].sentence}</h3>

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
