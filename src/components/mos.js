import { useEffect, useState } from "react";
import React from 'react'
import { EvalAudio } from "./evalaudio";
let score1 = 0;
let score2 = 0;
export const Mos = () => {
  const [email, setEmail] = useState("");
  const [rdiogr1, setRdiogr1] = useState(-1);
  const [rdiogr2, setRdiogr2] = useState(-1);
  let eval1 = React.createRef();
  let eval2 = React.createRef();
  //const [score1, setScore1] = useState(0);
  //const [score2, setScore2] = useState(0);
  const [values1, setValues1] = useState([{ label: "1-Bad", checked: false },
  { label: "2-Poor", checked: false },
  { label: "3-Fair", checked: false },
  { label: "4-Good", checked: false },
  { label: "5-Excellent", checked: false }]);
  const [values2, setValues2] = useState([{ label: "1-Bad", checked: false },
  { label: "2-Poor", checked: false },
  { label: "3-Fair", checked: false },
  { label: "4-Good", checked: false },
  { label: "5-Excellent", checked: false }]);
  const [current, setCurrent] = useState(0);
  let sentencesTacotron = [
    {'text': 'Tao nghĩ một đứa không dám leo xuống cầu thang sẽ không bao giờ dám nhảy qua vòng lửa.', 'name': 'e0bd1cb2-7cba-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842764/gazwhaybrp7uetpw4yob.wav'},
    {'text': 'Thơ ca là thứ vô cùng phù phiếm nhưng vô cùng thiêng liêng.', 'name': 'e34014a8-7cba-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842768/beuubab1kzgia7vyy2o1.wav'},
    {'text': 'Có con mèo thầm thương chiếc lá.Chẳng màng đến cá, mặc cuộn len.Tình yêu là thế thôi em nhỉ?Chỉ cần người ấy chẳng cần gì.', 'name': 'e9111eb8-7cba-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842778/osklww5s0nfb4cvbho4c.wav'},
    {'text': 'Khi một kẻ được đối xử đặc biệt hơn những kẻ khác, tự nhiên hắn trở thành cái gai trong mắt những kẻ còn lại.', 'name': 'eb58702c-7cba-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842782/lxejubahivsrclbqhaeq.wav'},
    {'text': 'Chú nằm nghiên trong bóng nắng mai. Chú nằm nghiên trong bóng nắng, lưng dá vào nền gạch hoa, tay chân duỗi ra phía trước, mắt lim dim, biếng nhác thưởn thức cuộc sống.', 'name': 'f382a6fa-7cba-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842796/exhu2qfbspjm1kni69fb.wav'},
    {'text': 'Thục không dám hành động như Cúc Hương. Cái câu “nếu không nỡ từ chối” khiến Thục thấy tội tội. Hơn nữa, anh chàng Phong Khê khác xa Hùng quăn.', 'name': 'f9685272-7cba-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842806/uem3esptz89wby283vht.wav'},
    {'text': 'Học viện Phụ nữ Việt Nam dự kiến tuyển 1000 chỉ tiêu cho 9 ngành đại học chính quy, tăng 100 chỉ tiêu so với năm ngoái. Các ngành gồm Quản trị kinh doanh, Công tác xã hội, Giới và Phát triển, Luật, Luật kinh tế, Quản trị dịch vụ du lịch và lữ hành, Kinh tế, Tâm lý học và Truyền thông đa phương tiện.', 'name': '05a145f8-7cbb-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842826/zdosk69cgugkpgthgzbr.wav'},
    {'text': 'Tôi tới Quy Nhơn như tới một thế giới mới. Con trai núi về thành phố biển, chuyến hành hương tuyệt vời của con cháu Âu Cơ về xứ sở Lạc Long Quân gió cát đã giúp tôi nguôi nỗi đau phượng vĩ.', 'name': '0a9f7cfa-7cbb-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842834/buevu56o2rer5iasowwu.wav'},
    {'text': 'Trời không xanh. Mây cũng không trắng. Em không say nắng. Nhưng em lại say anh.', 'name': '1012fd42-7cbb-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842844/swmkdj6ulfdyrg2g7uvx.wav'},
    {'text': 'Thằng Lọ Nồi và thằng Đuôi Xoăn lúc đó đang nằm dán bụng trên nền đất ẩm dưới bóng lá, đưa mắt sầu não nhìn nhau, cảm thấy rảnh rỗi là một gánh nặng quá sức đối với tuổi trẻ của loài heo.', 'name': '12b5b4f4-7cbb-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842848/i04tsoszkruwz3xucrs9.wav'},
    {'text': 'Gió mưa là bệnh của trời / Tương tư là bệnh của tôi yêu nàng.', 'name': '14bf8fe0-7cbb-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842851/rpy457urvdckuwtzv2yo.wav'},
    {'text': 'Con Rùa còn khoe tôi nhờ nằm nhà uống thuốc suốt bốn năm trời, nó biết thêm khối thứ về cái loại cây lá chữa bệnh.', 'name': '16f1402e-7cbb-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842855/npnwq5bam1x6sx6rnakp.wav'},
    {'text': 'Chúa đảo và phó chúa đảo liếc nhau. Và cả hai cùng quay phắt lại, nhịp nhàng như đang cùng đứng trên một chiếc bàn xoay.', 'name': '1b973a02-7cbb-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842863/pqg81omks6mmn4lrzo4s.wav'},
    {'text': 'Em học Văn thì dốt. Tính toán cũng chẳng nhanh. Hỏi em học gì tốt? Đó là môn yêu Anh.', 'name': '1fe44640-7cbb-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842870/swvxw5shyi5dfvmewggj.wav'},
    {'text': 'Biền vốn thông minh nhanh nhạy hơn tôi, nhưng từ khi lâm vào đường tình ái nó tỏ ra đần độn kinh khủng. Tôi đành phải tặc lưỡi giải thích:', 'name': '2355ad6e-7cbb-11eb-bd73-0242ac1c0002.wav', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614842876/nbp0ewxakm1ve6d3lag6.wav'},]

  let sentencesFastSpeech2 = [{ 'text': 'Tao nghĩ một đứa không dám leo xuống cầu thang sẽ không bao giờ dám nhảy qua vòng lửa.', 'name': 'a9dccad0-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840526/ntpqoklxkyrqarnmxeg6.wav' },
  { 'text': 'Thơ ca là thứ vô cùng phù phiếm nhưng vô cùng thiêng liêng.', 'name': 'abe79166-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840528/qe1ex92miaw3cot2j396.wav' },
  { 'text': 'Có con mèo thầm thương chiếc lá.Chẳng màng đến cá, mặc cuộn len.Tình yêu là thế thôi em nhỉ?Chỉ cần người ấy chẳng cần gì.', 'name': 'ad9b0f10-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840531/g8gjhpjdo4sbxaqsn8nd.wav' },
  { 'text': 'Khi một kẻ được đối xử đặc biệt hơn những kẻ khác, tự nhiên hắn trở thành cái gai trong mắt những kẻ còn lại.', 'name': 'af817828-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840535/xvwcvoytrxhf92grv409.wav' },
  { 'text': 'Chú nằm nghiên trong bóng nắng mai. Chú nằm nghiên trong bóng nắng, lưng dá vào nền gạch hoa, tay chân duỗi ra phía trước, mắt lim dim, biếng nhác thưởn thức cuộc sống.', 'name': 'b186d532-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840538/ig6jmeexgio3sofpxosc.wav' },
  { 'text': 'Thục không dám hành động như Cúc Hương. Cái câu “nếu không nỡ từ chối” khiến Thục thấy tội tội. Hơn nữa, anh chàng Phong Khê khác xa Hùng quăn.', 'name': 'b38d0504-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840541/hlwtjkhv9unvhbsi8gj5.wav' },
  { 'text': 'Học viện Phụ nữ Việt Nam dự kiến tuyển 1000 chỉ tiêu cho 9 ngành đại học chính quy, tăng 100 chỉ tiêu so với năm ngoái. Các ngành gồm Quản trị kinh doanh, Công tác xã hội, Giới và Phát triển, Luật, Luật kinh tế, Quản trị dịch vụ du lịch và lữ hành, Kinh tế, Tâm lý học và Truyền thông đa phương tiện.', 'name': 'b6212912-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840546/yox4fqy5pqzxwttf2bl1.wav' },
  { 'text': 'Tôi tới Quy Nhơn như tới một thế giới mới. Con trai núi về thành phố biển, chuyến hành hương tuyệt vời của con cháu Âu Cơ về xứ sở Lạc Long Quân gió cát đã giúp tôi nguôi nỗi đau phượng vĩ.', 'name': 'b860b274-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840549/hdkhytwy4l8mxu3ulden.wav' },
  { 'text': 'Trời không xanh. Mây cũng không trắng. Em không say nắng. Nhưng em lại say anh.', 'name': 'ba327bd2-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840552/ls7fws8xix5hyipagftu.wav' },
  { 'text': 'Thằng Lọ Nồi và thằng Đuôi Xoăn lúc đó đang nằm dán bụng trên nền đất ẩm dưới bóng lá, đưa mắt sầu não nhìn nhau, cảm thấy rảnh rỗi là một gánh nặng quá sức đối với tuổi trẻ của loài heo.', 'name': 'bc246554-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840556/txeelcydkgqo0ygrhr3r.wav' },
  { 'text': 'Gió mưa là bệnh của trời / Tương tư là bệnh của tôi yêu nàng.', 'name': 'bdd94cde-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840558/tyu5hq8s9otehabpgq7t.wav' },
  { 'text': 'Con Rùa còn khoe tôi nhờ nằm nhà uống thuốc suốt bốn năm trời, nó biết thêm khối thứ về cái loại cây lá chữa bệnh.', 'name': 'bf7b7652-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840561/dzr9dylto9a1dfaburcb.wav' },
  { 'text': 'Chúa đảo và phó chúa đảo liếc nhau. Và cả hai cùng quay phắt lại, nhịp nhàng như đang cùng đứng trên một chiếc bàn xoay.', 'name': 'c1590d5e-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840565/samg3t0ccunqarh8nntg.wav' },
  { 'text': 'Em học Văn thì dốt. Tính toán cũng chẳng nhanh. Hỏi em học gì tốt? Đó là môn yêu Anh.', 'name': 'c339fce6-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840567/nssejqxvqohucbbcm4l8.wav' },
  { 'text': 'Biền vốn thông minh nhanh nhạy hơn tôi, nhưng từ khi lâm vào đường tình ái nó tỏ ra đần độn kinh khủng. Tôi đành phải tặc lưỡi giải thích:', 'name': 'c50b1870-7cb5-11eb-ba3d-0242ac1c0002', 'content': 'http://res.cloudinary.com/ducvyjutf/video/upload/v1614840571/o7d9cpov6fceetygak4x.wav' },]
  const onScore1 = (e) => {
    setRdiogr1(parseInt(e.target.value));
  };
  const onScore2 = (e) => {
    setRdiogr2(parseInt(e.target.value));
  };

  const reset = () => {
    let temp = [...values1];
    temp.forEach((value, index) => {
      value.checked = false;
    })
    setValues1(temp);
    let temp2 = [...values2];
    temp2.forEach((value, index) => {
      value.checked = false;
    })
    setValues2(temp2);
  }


  const handleNextClick = () => {
    if (current <= sentencesTacotron.length - 1) {
      if (rdiogr1 != -1 && rdiogr2 != -1) {
        console.log("Score1: " + score1 + ", score2: " + score2);
        score1 += rdiogr1 + 1;
        score2 += rdiogr2 + 1;
        setCurrent(current + 1);
        setRdiogr1(-1);
        setRdiogr2(-1);
        reset();
        console.log("Score1: " + score1 + ", score2: " + score2);
      } else {
        alert("Vui lòng đánh giá");
      }
    }
  };
  function validateEmail(e) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) && name !== "";
  }
  const handleSubmitClick = async () => {
    if (!validateEmail(email)) {
      alert("Vui lòng điền tên và email");
      return;
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
              name: name,
              score1: ((score1 + rdiogr1) / sentencesTacotron.length).toFixed(2),
              score2: ((score2 + rdiogr2) / sentencesTacotron.length).toFixed(2),
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

  const [name, setName] = useState("");
  const handleChangeName = (e) => {
    setName(e.target.value);
  }
  const hStyle = { color: "red" };
  return sentencesTacotron == null ? (
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
      <>
        <div className="container">
          <div className="input-group md-12 mt-5" >
            <div className="input-group-prepend">
              <span className="input-group-text">Họ và tên</span>
            </div>
            <input
              type="email"
              className="form-control"
              placeholder="Họ và tên"
              onChange={handleChangeName}
            />
          </div>
          <div className="input-group md-12 mt-2">
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
          <h4 style={hStyle}>{sentencesTacotron[current].text}</h4>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <EvalAudio values={values1}
                onScore={onScore1}
                modelName="Mô hình 1"
                link={sentencesFastSpeech2[current].content}
              //   link={
              //     "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav"
              //   }
              ></EvalAudio>
            </div>
            <div className="col-md-6 col-sm-12">
              <EvalAudio  values={values2}
                onScore={onScore2}
                modelName="Mô hình 2"
                link={sentencesTacotron[current].content}
              //   link={
              //     "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav"
              //   }
              ></EvalAudio>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-9"></div>
            <div className="col-3">
              {current == sentencesTacotron.length - 1 ? (
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
