import { Tbody, Td, Tr } from "@chakra-ui/react";
import React from "react";

const UserList = (props) => {
  const {
    _id,
    name,
    email,
    bio,
    created_at,
    updated_at,
    handleEdit,
    handleDelete,
  } = props;
  return (
    <Tbody bg="#ffff">
      <Tr>
        <Td border="1px">{name}</Td>
        <Td border="1px">{email}</Td>
        <Td border="1px" color={bio ? "" : "red"}>
          {bio ? bio : "No Bio!!"}
        </Td>
        <Td border="1px">{created_at.slice(0, 19)}</Td>
        <Td border="1px">{updated_at.slice(0, 19)}</Td>
        <Td
          onClick={() => handleEdit(_id, { name, email, bio })}
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

export default UserList;
