import React from "react";
import { Message } from "semantic-ui-react";

export default function ErrorList(props) {
  const { errors } = props;
  return (
    <Message>
      <Message.Header>Errors</Message.Header>
      <Message.List>
        {errors.map((error, i) => {
          return <Message.Item key={i}>{error.stack}</Message.Item>;
        })}
      </Message.List>
    </Message>
  );
}
