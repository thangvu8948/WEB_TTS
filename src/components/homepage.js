import { useState } from "react";

export const Homepage = () => {
    const [data,setData] = useState(null);
    const [text, setText] = useState("");

    const handleTextChange = (e) => {
        setText(e.target.value);
    }
    const getAudio = async () => {
        const value = text.trim();
        if (value == "") return;
        const formData = new FormData();
        formData.append('text', value);
        const res = await fetch("http://2b3cc9b6b202.ngrok.io/convert", {
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
    return (
        <div className="container">
            <div className="col">
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={handleTextChange}></textarea>
                    </div>
                </form>
                <button type="button" onClick={getAudio}>Start</button>
                <audio controls hidden={data == null} /*src={`data:audio/wav;base64,${data}`}*/ src={data}>
                    {/* <source src={data} type="audio/wav">
                    </source> */}
                </audio>
            </div>
        </div>

    )
}