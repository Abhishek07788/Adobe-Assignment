import {
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
  Textarea,
  Select,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  addNewPost,
  deletePost,
  getAllPosts,
  getAllUsers,
  likePost,
  unlikePost,
  updatePost,
} from "../../Api/api";
import PostList from "../list/PostList";

const initialState = {
  content: "",
  user_id: "",
};

const PostForm = () => {
  const [form, setForm] = useState(initialState);
  const [postsData, setPostsData] = useState([]);
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
      console.log("form: ", form);
      addNewPost(form).then((res) => {
        displayPosts();
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
      updatePost(editId, form)
        .then((res) => {
          displayPosts();
          setLoading(false);
          setError(false);
          // ------------ Alert----------
          toast({
            title: "Post Updated!!",
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

  //------------- (get posts data) -----------
  useEffect(() => {
    displayPosts();
    displayUsers();
  }, []);

  //---------- (display posts) -----------
  const displayPosts = () => {
    setLoading(true);
    setError(false);
    getAllPosts()
      .then((res) => {
        setPostsData(res.data);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  };

  //------------- (like post) -----------
  const handleLike = (id) => {
    setLoading(true);
    setError(false);
    likePost(id)
      .then((res) => {
        displayPosts();
        setLoading(false);
        setError(false);
        // ------------ Alert----------
        toast({
          title: "Liked👍",
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

  //------------- (unlike post) -----------
  const handleUnlike = (id) => {
    setLoading(true);
    setError(false);
    unlikePost(id)
      .then((res) => {
        displayPosts();
        setLoading(false);
        setError(false);
        // ------------ Alert----------
        toast({
          title: res.data.message + "👎",
          status: "info",
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

  //------------- (delete post) -----------
  const handleDelete = (id) => {
    setLoading(true);
    setError(false);
    deletePost(id)
      .then((res) => {
        displayPosts();
        setLoading(false);
        setError(false);
        // ------------ Alert----------
        toast({
          title: "Post Deleted!!",
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

  //------------- (edit post) -----------
  const handleEdit = (id, data) => {
    seEditId(id);
    setEdit("edit");
    setForm(data);
    setHide(true);
  };

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
        <Heading color="#ffffff">Post Panel</Heading>
        <Button colorScheme="linkedin" onClick={handleHide}>
          {hide ? "Hide Form" : "Add New Post"}
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
        bg="#f8e7ef"
        border={"2px"}
        fontSize={18}
        display={hide ? "block" : "none"}
      >
        {/* --------------- (Form) ---------------- */}
        <form onSubmit={handleSubmit}>
          <Text fontWeight={500}>User (ID)*</Text>
          <Select
            bg="#ffff"
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            required
            borderBottom="1px"
          >
            <option value="">Select</option>
            {usersData &&
              usersData.map((el) => (
                <option key={el._id} value={el._id}>
                  {el.name}
                </option>
              ))}
          </Select>
          <Text mt="3" fontWeight={500}>
            Content*
          </Text>
          <Textarea
            bg="#ffff"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content.."
            required
            borderBottom="1px"
            minLength={1}
            maxLength={300}
          />
          <Button
            type="submit"
            w="100%"
            colorScheme={edit === "add" ? "linkedin" : "red"}
            fontSize={16}
            mt="10"
            isLoading={loading ? true : false}
          >
            {edit === "add" ? "Add New Post" : "Edit Post"}
          </Button>
        </form>
      </Box>

      {/* ----------- List ---------- */}
      <Table w="75%" m="auto" mt="10">
        <Thead bg="#dc143c">
          <Tr>
            <Th color="#ffff" fontSize={16} border="1px">
              Content
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Created At
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Updated At
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Like
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Likes
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Unlike
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Edit
            </Th>
            <Th color="#ffff" fontSize={16} border="1px">
              Delete
            </Th>
          </Tr>
        </Thead>
        {postsData &&
          postsData.map((el) => (
            <PostList
              key={el._id}
              {...el}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleUnlike={handleUnlike}
              handleLike={handleLike}
            />
          ))}
      </Table>
    </Grid>
  );
};

export default PostForm;
