const fetchData = async (url, config, setData) => {
    let response;
    try {
      const response = await fetch(url, config);
      const data = await response.json();
    if(data.error) throw data.error;
      setData(data.data);
    response.data=data.data;
    } catch (error) {
        response.error=error;
    }

    return response
  };

  export default fetchData;