import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

function LinkForm(props) {
  const initialState = {
    url: "",
    name: "",
    description: "",
  };
  const [values, setValue] = useState(initialState);

  const handleInput = (e) => {
    setValue({
      ...values,
      [e.target.name]: e.target.value,
    });
  }


function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validURL(values.url)){
      return toast('Invalid URL',{
        type:"warning",
        autoClose:2000
    
      })

    }
    props.addEditLink(values);
    setValue({ ...initialState });
  };
  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setValue({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValue({ ...initialState });
    } else {
      getLinkById(props.currentId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);
  return (
    <div>
      <form className="card card-body" onSubmit={handleSubmit}>
        <div className="form-group input-group">
          <div className="input-group-text bg-light">
            <i className="material-icons">link</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="url"
            name="url"
            onChange={handleInput}
            value={values.url}
          ></input>
        </div>

        <div className="form-group input-group">
          <div className="input-group-text bg-light">
            <i className="material-icons">create</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="name   "
            name="name"
            onChange={handleInput}
            value={values.name}
          ></input>
        </div>

        <div className="form-group">
          <textarea
            name="description"
            rows="3"
            className="form-control"
            placeholder="write a description"
            onChange={handleInput}
            value={values.description}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          {props.currentId === "" ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
}

export default LinkForm;
