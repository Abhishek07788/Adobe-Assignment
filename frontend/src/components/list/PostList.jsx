import { Tbody, Td, Tr } from "@chakra-ui/react";
import React from "react";

const PostList = (props) => {
  const {
    _id,
    user_id,
    content,
    likes,
    created_at,
    updated_at,
    handleEdit,
    handleDelete,
    handleLike,
    handleUnlike,
  } = props;

  return (
    <Tbody bg="#ffff">
      <Tr>
        <Td border="1px">{content}</Td>
        <Td border="1px">{created_at.slice(0, 19)}</Td>
        <Td border="1px">{updated_at.slice(0, 19)}</Td>
        <Td border="1px">
          <u onClick={() => handleLike(_id)} style={{ fontSize: "30px" }}>
            👍
          </u>
        </Td>
        <Td border="1px" fontSize={20}>
          <b> {likes} </b>
        </Td>
        <Td onClick={() => handleUnlike(_id)} border="1px">
          <u style={{ fontSize: "30px" }}>👎</u>
        </Td>
        <Td
          onClick={() => handleEdit(_id, { user_id, content })}
          border="1px"
          color="blue"
          title="Edit user"
        >
          <u>Update</u>
        </Td>
        <Td
          onClick={() => handleDelete(_id)}
          border="1px"
          color="red"
          title="Delete user"
        >
          <u>Delete</u>
        </Td>
      </Tr>
    </Tbody>
  );
};

export default PostList;
