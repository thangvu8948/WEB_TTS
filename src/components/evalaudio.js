import { useEffect, useState } from "react";
export const EvalAudio = (props) => {
  return (
    <>
      <p>{props.modelName}</p>
      <div className="col-md-12 col-sm-12 embed-responsive ">
        <audio controls src={props.link}></audio>
      </div>
      <form onChange={props.onScore}>
        <div className="form-check-inline">
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
        </div>
      </form>
    </>
  );
};
