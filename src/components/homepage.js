import { useEffect, useState } from "react";
export const Homepage = () => {
    const [data, setData] = useState(null);
    const [text, setText] = useState("");
    const [urlFastspeech, setUrlFastspeech] = useState("");
    const [urlTacotron, setUrlTacotron] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [model, setModel] = useState("Fastspeech2");
    const handleTextChange = (e) => {
        setText(e.target.value);
    }
    useEffect(async () => {
        console.log("av")
        const res = await fetch(`https://tts-api-hcmus.herokuapp.com/fastspeech2`);
        if (res) {
            res.json().then((res) => {
                console.log(res[0].ByName)
                setUrlFastspeech(res[0].ByName);
                setLoaded(true)
            })
        } else {
            console.log("error");
        }
        const res_tacotron = await fetch(`https://tts-api-hcmus.herokuapp.com/tacotron2`);
        if (res_tacotron) {
            res_tacotron.json().then((res) => {
                console.log(`tacotron: ${res[0].ByName}`);
                setUrlTacotron(res[0].ByName);
                setLoaded(true);
            })
        }
    }, [])
    const getAudio = async () => {
        const value = text.trim();
        if (value == "") return;
        const formData = new FormData();
        formData.append('text', value);
        let url = "";
        console.log("request: " + model)
        switch(model) {
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
            // headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
            body: formData
        });
        if (res) {
            console.log(res);
            res.json().then((res) => {
                console.log(res);
                setData(res.content);
                console.log(res.content);
            })
        } else {
            console.log("no data");
        }
    }

    const onChangeModel = (e) => {
        setModel(e.target.value)
        console.log(e.target.value)
    }
    return (
        <>
            {
                <div className="container" style={{ marginTop: "3rem" }} >
                    {!loaded ? <div>Loading</div> : <div className="col">

                        <form>
                            <div onChange={onChangeModel}>
                                <input type="radio" value="Fastspeech2" name="model" checked={model==="Fastspeech2"} /> <label className="mr-2">Fastspeech 2</label>
                                <input type="radio" value="Tacotron2" name="model" checked={model==="Tacotron2"}/> Tacotron 2
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Đoạn văn bản</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={handleTextChange}></textarea>
                            </div>
                        </form>
                        <button type="button" className="btn btn-primary" onClick={getAudio}>Tạo âm thanh</button>
                        <div class="col-sm-4 col-sm-offset-4 embed-responsive embed-responsive-4by3">
                        <audio controls hidden={data == null} /*src={`data:audio/wav;base64,${data}`}*/ src={data}>
                            {/* <source src={data} type="audio/wav">
              </source> */}
                        </audio>
                        </div>
                    </div>
                    }
                </div>

            }
        </>
    )
}