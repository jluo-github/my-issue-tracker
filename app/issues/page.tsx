import { Flex, Text, Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = () => {
  return (
    <div>
      <Flex direction='column' gap='2'>
        <Text>Hello from Radix Themes :)</Text>
        <Button>
          <Link href='/issues/new'>New Issue</Link>
        </Button>
      </Flex>
    </div>
  );
};
export default IssuesPage;
