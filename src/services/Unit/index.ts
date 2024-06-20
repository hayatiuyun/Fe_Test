import Api from "../interceptor";

const getUnits = () => Api.get("/unit");

export { getUnits };