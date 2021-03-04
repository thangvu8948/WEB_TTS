import { useEffect, useState } from "react";
export const EvalAudio = (props) => {
  const [values, setValues] = useState(props.values);

  const handleChange = (e) => {
    let temp = [...values];
    temp.forEach((value, index) => {
      value.checked = false;
    })
    temp[e.target.value].checked = true;
    setValues(temp);
  }

  useEffect(() => {
    let temp = [...values];
    temp.forEach((value, index) => {
      value.checked = false;
    })
    setValues(temp);

  }, [])
  return (
    <>
      <p>{props.modelName}</p>
      <div className="col-md-12 col-sm-12 embed-responsive ">
        <audio controls src={props.link}></audio>
      </div>
      <form onChange={(e) => {props.onScore(e); handleChange(e)}}>
        {values.map((value, index) => {
          return <div className="form-check-inline">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optradio"
                value={index}
                checked={value.checked}
              />
              {value.label}
            </label>
          </div>
        })}
        {/* <div className="form-check-inline">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="optradio"
              value="1"
            />
            1-Bad
          </label>
        </div>
        <div className="form-check-inline">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="optradio"
              value="2"
            />
            2-Poor
          </label>
        </div>
        <div className="form-check-inline">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="optradio"
              value="3"
            />
            3-Fair
          </label>
        </div>
        <div className="form-check-inline">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="optradio"
              value="4"
            />
            4-Good
          </label>
        </div>
        <div className="form-check-inline">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="optradio"
              value="5"
            />
            5-Excellent
          </label>
        </div> */}
      </form>
    </>
  );
};
