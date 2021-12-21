import FadeLoader from "react-spinners/FadeLoader";
import styled from 'styled-components';

const Flex = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30rem;
`;

function Spinner() {
    return (
        <Flex>
            <FadeLoader 
                height="15" 
                width="7" 
                color="#29ca8e"  />
        </Flex>
    );
}

export default Spinner;