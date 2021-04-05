import { React, useEffect, useState } from "react";
import { db } from "../firebase";
import LinkForm from "./LinkForm";
import { toast } from "react-toastify";

function Links() {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addEditLink = async (linkObject) => {

    try {
      if (currentId === "") {
        await db.collection("links").doc().set(linkObject);
        toast("New link added", {
          type: "succes",
          autoClose: 2000,
        });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast("Updated", {
          type: "info",
          autoClose: 2000,
        });
        setCurrentId('')
      }
      
    } catch (error) {
      console.log(error)
    }
    
  };

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapShot) => {
      const docs = [];

      querySnapShot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
      console.log(docs);
    });
  };

  const onDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await db.collection("links").doc(id).delete();
      toast("Delete", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  
  useEffect(
    () => {
      getLinks();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <div className="col-md-8 p-2">
        <LinkForm {...{ addEditLink, currentId, links }} />
      </div>

      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div className="">
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDelete(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>

              <p>{link.description}</p>

              <a href={"https://" + link.url} target="_blank" rel="noreferrer">
                go to the website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Links;
