import FadeLoader from "react-spinners/FadeLoader";
import styled from "styled-components";

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

function Spinner() {
    return (
        <Flex>
        <FadeLoader 
            color="#29ca8e" size={5} 
        />
        </Flex>
    );
}

export default Spinner;