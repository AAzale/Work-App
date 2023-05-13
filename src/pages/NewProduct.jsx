import { Button, Form, Input, Select } from "antd";
import useFetch from "../hooks/useFetch";
import { URL_API } from "../utils/constants";
import "../styles/uploadProduct.css";
import { useState } from "react";

export const NewProduct = () => {
  const { data } = useFetch(`${URL_API}/products/categories`);
  const [isLoading, setIsLoading] = useState(false);
  const [dataNewProduct, setDataNewProduct] = useState([]);
  const [onError, setOnError] = useState(false);

  const { Option } = Select;
  const { TextArea } = Input;
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 15,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 0,
    },
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const info = await fetch(`${URL_API}/products`, {
        method: "POST",
        body: JSON.stringify({
          title: values.nombre,
          price: values.precio,
          description: values.descripcion,
          image: values.imagen,
          category: values.categoria,
        }),
      });

      const parseo = await info.json();
      setTimeout(() => {}, 10000);

      if (parseo.length > 0) {
        setDataNewProduct(parseo);
        setIsLoading(false);
        form.resetFields();
      }
    } catch (error) {
      setOnError(true);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div className="product-frame">
        <header>
          <h1 className="add-product">Agregar Producto</h1>
        </header>

        <div className="new-product-form">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="descripcion"
              label="Descripción"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="precio"
              label="Precio"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="categoria"
              label="Categoría"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Selecciona una opción" allowClear>
                {data.map((categories) => {
                  return (
                    <Option key={categories} value={categories}>
                      {categories.charAt(0).toUpperCase() + categories.slice(1)}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              name="imagen"
              label="Imagén"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <div className="btn-area">
                <Button
                  className="bt-red-color"
                  type="primary"
                  htmlType="submit"
                >
                  Completar
                </Button>

                <Button htmlType="button" onClick={onReset}>
                  Resetear
                </Button>

                <Button className="bt-red-color" type="primary" href="/">
                  Home
                </Button>

                {isLoading ? (
                  <Button className="bt-red-color" type="primary">
                    Cargando
                  </Button>
                ) : null}

                {onError ? (
                  <Button className="bt-red-color" type="primary">
                    Error al Cargar
                  </Button>
                ) : null}
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
