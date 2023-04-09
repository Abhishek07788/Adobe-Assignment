import {
  Input,
  Button,
  Text,
  Box,
  useToast,
  Grid,
  Heading,
  Thead,
  Tr,
  Th,
  Table,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import UserList from "../list/UserList";
import { addNewUser, deleteUser, getAllUsers, updateUser } from "../../Api/api";

const initialState = {
  name: "",
  email: "",
  bio: "",
};

const UserForm = () => {
  const [form, setForm] = useState(initialState);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hide, setHide] = useState(false);
  const [editId, seEditId] = useState("");
  const [edit, setEdit] = useState("add");
  const toast = useToast();

  //------------ (Handle Form) --------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit === "add") {
      setLoading(true);
      setError(false);
      addNewUser(form).then((res) => {
        displayUsers();
        // ------------ Alert----------
        toast({
          title: res.data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });

        if (res.data.status) {
          setHide(false);
          e.target.reset();
        }
      });
    } else {
      setLoading(true);
      setError(false);
      updateUser(editId, form)
        .then((res) => {
          displayUsers();
          setLoading(false);
          setError(false);
          // ------------ Alert----------
          toast({
            title: "User Updated!!",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          setHide(false);
          e.target.reset();
        })
        .catch((e) => {
          setLoading(false);
          setError(true);
        });
    }
  };

  //---------- Form Toggle -----
  const handleHide = () => {
    setHide(!hide);
    setEdit("add");
  };

  //------------- (get users data) -----------
  useEffect(() => {
    displayUsers();
  }, []);

  //---------- (display users) -----------
  const displayUsers = () => {
    setLoading(true);
    setError(false);
    getAllUsers()
      .then((res) => {
        setUsersData(res.data);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  };

  //------------- (delete user) -----------
  const handleDelete = (id) => {
    setLoading(true);
    setError(false);
    deleteUser(id)
      .then((res) => {
        displayUsers();
        setLoading(false);
        setError(false);
        // ------------ Alert----------
        toast({
          title: "User Deleted!!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  };

  //------------- (edit user) -----------
  const handleEdit = (id, data) => {
    seEditId(id);
    setEdit("edit");
    setForm(data);
    setHide(true);
  };

  return (
    <Grid>
      {/*-------- ( error / loading ) -------- */}
      <Heading
        visibility={loading ? "visible" : "hidden"}
        mt="-5"
        fontSize={20}
        textAlign="center"
        color="green"
      >
        Loading...
      </Heading>
      <Heading
        visibility={error ? "visible" : "hidden"}
        mt="-5"
        fontSize={20}
        textAlign="center"
        color="red"
      >
        Server error please refresh...
      </Heading>

      {/* -------------- (Form Main Div) ----------- */}
      <Box
        bg="#565e59"
        p="2"
        borderRadius="8"
        w="75%"
        display="flex"
        alignItems="center"
        m="auto"
        justifyContent="space-between"
      >
        <Heading color="#ffffff">Users Panel</Heading>
        <Button colorScheme="linkedin" onClick={handleHide}>
          {hide ? "Hide Form" : "Add New User"}
        </Button>
      </Box>
      <Box
        w="65%"
        m="auto"
        mt="4"
        textAlign="left"
        p="10"
        borderRadius="20"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        bg="#c1c5d0"
        border={"2px"}
        fontSize={18}
        display={hide ? "block" : "none"}
      >
        {/* --------------- (Form) ---------------- */}
        <form onSubmit={handleSubmit}>
          <Text mt="3" fontWeight={500}>
            Name*
          </Text>
          <Input
            bg="#ffff"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name.."
            required
            borderBottom="1px"
            minLength={0}
            maxLength={50}
          />
          <Text mt="3" fontWeight={500}>
            Email*
          </Text>
          <Input
            bg="#ffff"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email.."
            required
            borderBottom="1px"
          />
          <Text mt="3" fontWeight={500}>
            Bio*
          </Text>
          <Input
            bg="#ffff"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio.."
            borderBottom="1px"
            minLength={0}
            maxLength={200}
          />
          <Button
            type="submit"
            w="100%"
            colorScheme={edit === "add" ? "linkedin" : "red"}
            fontSize={16}
            mt="10"
            isLoading={loading ? true : false}
          >
            {edit === "add" ? "Add User" : "Edit User"}
          </Button>
        </form>
      </Box>

      {/* ----------- List ---------- */}
      <Table w="75%" m="auto" mt="10">
        <Thead bg="teal">
          <Tr>
            <Th color="#ffff" fontSize={16} border="1px">
              Name
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Email
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Bio
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Posted At
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Updated At
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Edit
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Delete
            </Th>
          </Tr>
        </Thead>
        {usersData &&
          usersData.map((el) => (
            <UserList
              key={el._id}
              {...el}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
      </Table>
    </Grid>
  );
};

export default UserForm;
