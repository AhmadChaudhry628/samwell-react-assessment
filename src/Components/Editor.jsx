// Import necessary modules from antd library and react
import React from "react";
import { Button, Form, Input } from "antd";

// Destructure TextArea component from Input module
const { TextArea } = Input;

function Editor({ onChange, onSubmit, submitting, value }) {
  const [form] = Form.useForm();

  // Returns a form with a textarea for the user to input comments.
  return (
    <>
      <Form form={form} layout="vertical">
        <Form.Item layout="vertical" label="Comments">
          <TextArea
            disabled={submitting === true}
            rows={4}
            onChange={onChange}
            value={value}
          />
        </Form.Item>
        <Form.Item>
          {/* Submit button to submit the comment. */}
          <Button
            htmlType="submit"
            loading={submitting}
            onClick={onSubmit}
            type="primary"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Editor;
