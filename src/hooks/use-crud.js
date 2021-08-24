import { useState, useCallback } from "react";
import openSocket from "socket.io-client";
const useCRUD = (modelName, token, modelDefinition) => {
  const url = "http://localhost:8080/" + modelName.toLowerCase();
  const [modelRaws, setModelRaws] = useState([]);
  const [message, setMessage] = useState({ val: "", type: "" });
  const [editAction, setEdit] = useState({ status: false, raw: {} });
  const [deleteAction, setDelete] = useState({ status: false, raw: {} });

  const resetForm = useCallback(() => {
    modelDefinition.forEach((item) => {
      if (item.input) {
        item.input.set("");
      }
    });
  },[]);

  const cancelEdit = useCallback(() => {
    resetForm();
    setEdit({ status: false, raw: {} });
  },[resetForm]);

  const cancelDelete = useCallback(() => {
    resetForm();
    setDelete({ status: false, raw: {} });
  },[resetForm]);

  const handleCreate = useCallback(
    (result) => {
      resetForm();
      setModelRaws((prevModelRaws) => [result, ...prevModelRaws]);
    },
    [resetForm]
  );

  const handleRetrieve = useCallback((result) => {
    setModelRaws([...result]);
  },[]);

  const handleUpdate = useCallback((result) => {
    setModelRaws((prevModelRaws) => {
      return prevModelRaws.map((item, index) => {
        return item.id === result.id ? result : item;
      });
    });
  }, []);

  const handleDelete = useCallback((result) => {
    cancelDelete();
    setModelRaws((prevModelRaws) => {
      return prevModelRaws.filter((item) => item.id !== result.id);
    });
  },[cancelDelete]);

  const retrieveModelRaws = async () => {
    try {
      const response = await fetch(url, {
        Methode: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.ok) {
        const { data, msg } = await response.json();
        handleRetrieve(data);
        setMessage({ val: msg, type: "is-success" });
      }
    } catch (error) {
      setMessage("Error Retrieving " + modelName);
    }
  };

  const initialSocket = useCallback(() => {
    console.log('initial socket');
    const socket = openSocket("http://localhost:8080");
    socket.on(modelName.toLowerCase(), (notification) => {
      switch (notification.type) {
        case "update":
          console.log("update".notification);
          handleUpdate(notification.data);
          break;
        case "create":
          console.log("create", notification);
          handleCreate(notification.data);
          break;
        case "delete":
          console.log("delete", notification);
          handleDelete(notification.data);
          break;
        default:
          console.log(notification);
          break;
      }
    });
    return socket;
  }, [modelName]);

  const initialFetch = useCallback(retrieveModelRaws, [token, modelName, url,handleRetrieve]);

  const editRaw = (rawId) => {
    cancelDelete();
    const raw = modelRaws.filter((item) => item.id === rawId);
    if (raw.length === 1) {
      setEdit({ status: true, raw: raw[0] });
      modelDefinition.forEach((item) => {
        if (item.input) {
          item.input.set(raw[0][item.column]);
        }
      });
    } else {
      setMessage({ val: "Error Getting A Unique Raw", type: "is-danger" });
    }
  };
  const formDataGenerator = () => {
    let formData = new FormData();
    modelDefinition
      .filter((item) => item.input !== null)
      .forEach((input) => {
        formData[input.column] = input.input.get;
      });
    return formData;
  };
  const deleteRaw = (rawId) => {
    cancelEdit();
    setDelete({ status: true, raw: { id: rawId } });
  };

  

  const createRaw = async () => {
    try {
      console.log("create raw function");
      const formData = formDataGenerator();
      console.log(JSON.stringify(formData));
      const respone = await fetch(url, {
        body: JSON.stringify(formData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!respone.ok) {
        throw new Error("Connection Error ...");
      }
      const data = await respone.json();
      console.log(data);
      setMessage({ val: "Created", type: "is-sucess" });
    } catch (error) {
      setMessage({
        val: "Error Updating Resources: " + error.message,
        type: "is-danger",
      });
    }
  };
  const updateRaw = async () => {
    try {
      console.log("update raw function");
      const formData = formDataGenerator();
      console.log(JSON.stringify(formData));
      const respone = await fetch(url + "/" + editAction.raw.id, {
        body: JSON.stringify(formData),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!respone.ok) {
        throw new Error("Connection Error ...");
      }
      const data = await respone.json();
      console.log(data);
      setMessage({ val: "Updated", type: "is-sucess" });
    } catch (error) {
      setMessage({
        val: "Error Updating Resources: " + error.message,
        type: "is-danger",
      });
    }
  };

  const deleteRawConfirm = async () => {
    try {
      console.log("update raw function");
      const formData = formDataGenerator();
      console.log(JSON.stringify(formData));
      const respone = await fetch(url + "/" + deleteAction.raw.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!respone.ok) {
        throw new Error("Connection Error ...");
      }
      const data = await respone.json();
      console.log(data);
      setMessage({ val: "Deleted", type: "is-sucess" });
    } catch (error) {
      setMessage({
        val: "Error Updating Resources: " + error.message,
        type: "is-danger",
      });
    }
  };

  return {
    modelRaws,
    setModelRaws,
    message,
    setMessage,
    retrieveModelRaws,
    initialFetch,
    editRaw,
    deleteRaw,
    editAction,
    setEdit,
    deleteAction,
    setDelete,
    cancelEdit,
    cancelDelete,
    updateRaw,
    deleteRawConfirm,
    createRaw,
    handleUpdate,
    handleCreate,
    handleDelete,
    initialSocket
  };
};

export default useCRUD;
