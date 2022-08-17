import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useGetQuestionsQuery } from "./Service/api";

function App() {
  const [answers, setAnswers] = useState("");
  const [result, setResult] = useState("");
  const { data, isLoading, refetch, isFetching } = useGetQuestionsQuery();

  const question = data?.results[0];

  const saveAnswer = () => {
    if (!answers) {
      alert("Please enter your answer");
      return;
    }
    if (question?.correct_answer.toLowerCase() === answers.toLowerCase()) {
      setResult("Correct Answer");
    } else {
      setResult("Wrong Answer");
    }
    setTimeout(() => {
      refetch();
      setAnswers("");
      setResult("");
    }, 1000);
  };

  return (
    <Box h={"100vh"}>
      {isLoading || isFetching ? (
        <Center mt={62}>
          <Spinner size={"md"} />
        </Center>
      ) : (
        <Box m={"auto"} maxW={"3xl"} rounded={"lg"}>
          <Center>
            <Heading size={"lg"} color={"black"}>
              Question and Answer Game
            </Heading>
          </Center>
          <Box mt={6} p={8}>
            {data?.results.map((question, idx) => {
              return (
                <Box key={idx}>
                  <Text
                    textColor={"black"}
                    fontSize={"lg"}
                    textAlign={"center"}
                  >
                    Q{idx + 1}: {question.question}
                  </Text>
                  <Input
                    type={"text"}
                    textColor={"black"}
                    mt={6}
                    onChange={(e) => {
                      setAnswers(e.target.value);
                    }}
                  />
                </Box>
              );
            })}
          </Box>
          {result && (
            <Center>
              <Box mt={6}>
                <Text
                  textColor={
                    result === "Correct Answer" ? "green.500" : "red.500"
                  }
                  fontSize={"lg"}
                  fontWeight={"bold"}
                >
                  {result}
                </Text>
              </Box>
            </Center>
          )}
          <Center mt={6} pb={4}>
            <Button
              colorScheme={"blue"}
              onClick={() => {
                saveAnswer();
              }}
            >
              Submit
            </Button>
          </Center>
        </Box>
      )}
    </Box>
  );
}

export default App;
