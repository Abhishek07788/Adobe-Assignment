import { Box, Grid, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getTopPosts, getTotalPosts } from "../../Api/api";

const PostAnalytics = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);

  //------------- (get posts data) -----------
  useEffect(() => {
    displayPosts();
    // totalPosts();
  }, []);

  //---------- (display posts) -----------
  const displayPosts = () => {
    setLoading(true);
    setError(false);
    getTopPosts()
      .then((res) => {
        console.log("res: ", res.data);
        setTopPosts(res.data);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  };

  //---------- (total posts) -----------
  const totalPosts = () => {
    setLoading(true);
    setError(false);
    getTotalPosts()
      .then((res) => {
        setTotal(res.data.TotalPost);
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

      <Box
        bg="#4587d0"
        p="2"
        pl="5"
        pr="5"
        borderRadius="8"
        w="75%"
        display="flex"
        alignItems="center"
        m="auto"
        justifyContent="space-between"
      >
        <Heading color="#ffffff">Post Analytics</Heading>
        <Heading color="#ffffff">Total Posts: {total}</Heading>
      </Box>

      <SimpleGrid w="80%" m="auto" mt="5" spacing={6} columns={[1, 2, 2, 2]}>
        {topPosts &&
          topPosts.map((el) => (
            <Box
              key={el._id}
              textAlign="left"
              borderRadius={8}
              bg="#ffffff"
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
              _hover={{
                h: "104%",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Box p="4">
                <Text fontSize={[15, 16, 18, 22]} lineHeight={6}>
                  <b>Content:</b> {el.content}
                </Text>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt="6"
                  cursor="pointer"
                >
                  <Text>
                    <b>Created At:</b> {el.created_at.slice(0, 21)}
                  </Text>
                  <Text>
                    <b>Updated At:</b> {el.updated_at.slice(0, 21)}
                  </Text>
                </Box>
                <Text>
                  <b>Likes:</b> {el.likes}
                </Text>
              </Box>
            </Box>
          ))}
      </SimpleGrid>
    </Grid>
  );
};

export default PostAnalytics;
