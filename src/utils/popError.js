import { notification } from "antd";

function popError() {
  notification.open({
    message: "Error",
    description: "No se pueden cargar los productos de la API FakeStore...",
  });
}

export default popError;
