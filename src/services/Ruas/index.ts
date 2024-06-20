import Api from "../interceptor";

interface RuasRequest {
  page: number;
}

const getRuas = (id: number) => Api.get(`/ruas/${id}`);
const deleteRuas = (id: number) => Api.delete(`/ruas/${id}`);
const getAllRuas = ({ page }: RuasRequest) => Api.get(`/ruas?page=${page}`);
const addRuas = (data: any, id: number | undefined) =>
  Api.post(`/ruas${id ? `/${id}` : ""}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const updateRuas = (data: any, id: number) =>
  Api.post(`/ruas/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export { getAllRuas, addRuas, getRuas, deleteRuas, updateRuas };
