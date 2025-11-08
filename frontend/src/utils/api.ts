import axios from "axios";

const URL = "http://localhost:8000";

type PARAMS = Record<string, any>;

const getToken = async () => {
  const userToken = localStorage.getItem("token") ?? "";
  if (userToken) {
    const { data, status } = await axios.post(`${URL}/auth/verify/`, {
      token: userToken,
    });
    if (status >= 200 && status < 300) {
      return data;
    }
    return null;
  }
  return null;
};

const url = (endpoint: string) => {
  let e = endpoint.split("?")[0];
  const p = endpoint.split("?")[1] ?? "";
  if (e.startsWith("/")) {
    e = e.substring(1);
  }
  if (!e.endsWith("/")) {
    e += "/";
  }
  return `${URL}/${e}?${p}`;
};

const response = (data: PARAMS | PARAMS[], status: number) => {
  if (status >= 200 && status < 300) {
    return data;
  }
  return {
    error: "Server cannot be reach, please try again later",
  };
};

export async function uget(endpoint: string, params?: PARAMS) {
  const { data, status } = await axios.get(url(endpoint), {
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response(data, status);
}

export async function upost(endpoint: string, params: PARAMS) {
  const { data, status } = await axios.post(url(endpoint), params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response(data, status);
}

export async function get(endpoint: string, params?: PARAMS) {
  const token = await getToken();
  if (!token) {
    return {
      error: "Invalid credentials",
    };
  }
  const { data, status } = await axios.get(url(endpoint), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    params,
  });
  return response(data, status);
}

export async function post(endpoint: string, params: PARAMS) {
  const token = await getToken();

  if (!token) {
    return {
      error: "Invalid credentials",
    };
  }

  const { data, status } = await axios.post(url(endpoint), params, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response(data, status);
}

export async function update(endpoint: string, params: PARAMS) {
  const token = await getToken();

  if (!token) {
    return {
      error: "Invalid credentials",
    };
  }

  const { data, status } = await axios.put(url(endpoint), params, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response(data, status);
}

export async function eq_dry() {
  const { data, status } = await axios.get(
    "https://earthquakeapi.forestparty223.workers.dev/api/earthquakes",
  );
  return response(data, status);
}
