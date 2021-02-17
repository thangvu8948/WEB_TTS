import { useEffect, useState } from "react";

export const Homepage = () => {
    const [data, setData] = useState(null);
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [loaded, setLoaded] = useState(false);
    const handleTextChange = (e) => {
        setText(e.target.value);
    }
    useEffect(async () => {
        console.log("av")
        const res = await fetch(`https://tts-api-hcmus.herokuapp.com/getlink`);
        if (res) {  
            res.json().then((res) => {
                console.log(res[0].ByName)
                setUrl(res[0].ByName);
                setLoaded(true)
            })
        } else {
            console.log("error");
        }
    }, [])
    const getAudio = async () => {
        const value = text.trim();
        if (value == "") return;
        const formData = new FormData();
        formData.append('text', value);
        const res = await fetch(`${url}/convert`, {
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
    const handleAPIURLChange = (e) => {
        setUrl(e.target.value);
    }
    return (
        <>
            {
                <div className="container">
                    {!loaded ?<div>Loading</div> : <div className="col">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={handleAPIURLChange}></textarea>
                            <form>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Example textarea</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={handleTextChange}></textarea>
                                </div>
                            </form>
                            <button type="button" className="btn btn-primary" onClick={getAudio}>Start</button>
                            <audio controls hidden={data == null} /*src={`data:audio/wav;base64,${data}`}*/ src={data}>
                                {/* <source src={data} type="audio/wav">
              </source> */}
                            </audio>
                        </div>
                    }
                    </div>

                }
        </>
    )
}