import axios from "axios";

const chartInfoService = () => {

    const getUserTotal = async () => {
        const result = await axios.get('/api/chart/users')
        return result;
    }

    const getVisitorTotal = async () => {
        const result = await axios.get('/api/chart/visitors')
        return result;
    }

    const getRoomsTotal = async () => {
        const result = await axios.get('/api/chart/rooms')
        return result;
    }

    const getTest = async () => {
        const result = await axios.get('/api/chart/usertest')
        console.log("서버에서",result)
        return result;
    }

    return {getUserTotal, getVisitorTotal, getRoomsTotal, getTest}
}
export default chartInfoService();