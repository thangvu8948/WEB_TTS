import { useEffect, useState } from "react";
import "../assets/homepage.css"
import logo from "../images/logo_hcmus.png";
export const NewHomepage = () => {
  const [data, setData] = useState("https://res.cloudinary.com/ducvyjutf/video/upload/v1616003358/ct5hg9vbzpeyigylclwg.wav");
  const [text, setText] = useState("");
  const [urlFastspeech, setUrlFastspeech] = useState("");
  const [urlTacotron, setUrlTacotron] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [model, setModel] = useState("Fastspeech2");
  const [inferenceTime, setInferenceTime] = useState(0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  useEffect(async () => {
    console.log("av");
    const res = await fetch(`https://tts-api-hcmus.herokuapp.com/fastspeech2`);
    if (res) {
      res.json().then((res) => {
        console.log(res[0].ByName);
        setUrlFastspeech(res[0].ByName);
        setLoaded(true);
      });
    } else {
      console.log("error");
    }
    const res_tacotron = await fetch(
      `https://tts-api-hcmus.herokuapp.com/tacotron2`
    );
    if (res_tacotron) {
      res_tacotron.json().then((res) => {
        console.log(`tacotron: ${res[0].ByName}`);
        setUrlTacotron(res[0].ByName);
        setLoaded(true);
      });
    }
  }, []);
  const getAudio = async () => {
    setInferenceTime(0);
    const start = new Date().getTime();
    const value = text.trim();
    if (value == "") return;
    setIsSynthesizing(true);
    const formData = new FormData();
    formData.append("text", value);
    let url = "";
    console.log("request: " + model);
    switch (model) {
      case "Fastspeech2":
        url = `${urlFastspeech}/convert`;
        break;
      case "Tacotron2":
        url = `${urlTacotron}/convert`;
        break;
      default: {
        url = `${urlFastspeech}/convert`;
      }
    }
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (res) {
      console.log(res.status);
      if (res.status >= 400) {
        setIsSynthesizing(false);
        alert("Server đang bảo trì.");
        return;
      }
      res.json().then((res) => {
        console.log(res);
        setData(res.content);
        console.log(res.content);
      });
      setIsSynthesizing(false);
    } else {
      console.log("no data");
      setIsSynthesizing(false);
    }
    const end = new Date().getTime();
    const time = end - start;
    setInferenceTime(time);
  };

  const onChangeModel = (e) => {
    setModel(e.target.value);
    console.log(e.target.value);
  };
  const handleMOSclick = (e) => {
    window.location.href = "/eval";
  };
  return (
    <>
      {
        <div className="container" style={{ marginTop: "3rem"}} >
            
            <div className="row">
                
                <div className="col-lg-6 col-sm-12" style={{display:"flex"}}>
                  <div style={{textAlign:"center"}}>
                <div className="logo"/>

                  <h1 style={{maxWidth:"20ch"}}>WEBSITE DEMO </h1>
                  <h1>MÔ HÌNH TỔNG HỢP</h1>
                  <h1>ÂM THANH TIẾNG VIỆT</h1>

                  {/* <h2>ALo </h2> */}
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12" >
                    <div className="right-card">
 
                    <form>
                    <label for="exampleFormControlTextarea1">Lựa chọn mô hình</label>
                <div className="form-group">
                <div onChange={onChangeModel}>
                  <input
                    type="radio"
                    value="Fastspeech2"
                    name="model"
                    checked={model === "Fastspeech2"}
                  />{" "}
                  <label className="mr-2">Fastspeech 2</label>
                  <input
                    type="radio"
                    value="Tacotron2"
                    name="model"
                    checked={model === "Tacotron2"}
                  />{" "}
                  Tacotron 2
                </div>
                  <label for="exampleFormControlTextarea1">Đoạn văn bản</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    onChange={handleTextChange}
                  ></textarea>
                </div>
                
              </form>
              <div>
                <button
                  type="button"
                  className="customBtn"
                  onClick={getAudio}
                  disabled={isSynthesizing}
                >
                  Tạo âm thanh
                  <span hidden={!isSynthesizing}>
                    <div
                      class="mx-1 spinner-border text-light spinner-grow-sm"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  </span>
                </button>

                <div className="mt-3">


                  <audio
                    controls
                    
                    /*src={`data:audio/wav;base64,${data}`}*/ src={data}
                  >
                    {/* <source src={data} type="audio/wav">
              </source> */}
                  </audio>
                  <div style={{visibility:`${ inferenceTime == 0 ? "hidden" : ""}`}} class="alert alert-success" role="alert">
                Thời gian suy luận: {inferenceTime / 1000} giây
                </div>
                </div>
                    </div>

              </div>
                </div>
            </div>
         </div>
      }
    </>
  );
};
