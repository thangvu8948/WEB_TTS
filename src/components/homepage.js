import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
export const Homepage = () => {
  const [data, setData] = useState(null);
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
        <div className="container" style={{ marginTop: "3rem" }}>
          <h1>DEMO MÔ HÌNH TỔNG HỢP ÂM THANH TIẾNG VIỆT</h1>
          <button
            type="button"
            className="btn btn-secondary float-right"
            onClick={handleMOSclick}
          >
            Chế độ đánh giá MOS
          </button>
          <br />
          {!loaded ? (
            <div class="text-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="col">
              <form>
                <div className="form-group">
                  <label for="exampleFormControlTextarea1">Đoạn văn bản</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    onChange={handleTextChange}
                  ></textarea>
                </div>
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
              </form>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
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
                  <p hidden={inferenceTime == 0}>
                    Thời gian suy luận: {inferenceTime / 1000} giây
                  </p>
                  <audio
                    controls
                    hidden={data == null}
                    /*src={`data:audio/wav;base64,${data}`}*/ src={data}
                  >
                    {/* <source src={data} type="audio/wav">
              </source> */}
                  </audio>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </>
  );
};
