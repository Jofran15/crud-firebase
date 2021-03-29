import {React,useState} from "react";


function LinkForm(props) {
    const initialState={
        url: '',
        name: '',
        description: '',
    }
    const [values, setvalue] = useState(initialState)

    const handleInput=(e)=>{
        setvalue({
            ...values,
            [e.target.name]:e.target.value
        })
    }

   
    const handleSubmit=(e)=>{
    
        e.preventDefault();
        props.addLink(values)
       
        
    
    }
  return (
    <div>
      <form className="card card-body" onSubmit={handleSubmit}>
        <div className="form-group input-group">
          <div className="input-group-text bg-light">
            <i class="material-icons">link</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="url"
            name="url"
            onChange={handleInput}
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
          ></input>
        </div>

        <div className="form-group">
            <textarea name="description" rows='3' className="form-control" placeholder='write a description'    onChange={handleInput}>

            </textarea>
            
        </div>
        <button type='submit' className='btn btn-primary btn-block' >
save
      </button>
      </form>
     
    </div>
  );
}

export default LinkForm;
